import {
  DEFAULT_DEVICE_SIZES,
  DEFAULT_IMAGE_SIZES,
  handleImageOptimization,
} from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  MEDIA: R2Bucket;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: {
          format: string;
          quality: number;
        }): Promise<{ response(): Response }>;
      };
    };
  };
  ADMIN_EMAIL?: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type EditorialRow = {
  id: string;
  type: "saint" | "book";
  slug: string;
  status: "draft" | "published";
  title: string;
  payload: string;
  published_payload: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

const publicOrigins = new Set([
  "https://rabil-ibraiel.github.io",
  "https://aceya-saints.rabilibraiel.chatgpt.site",
]);

const jsonHeaders = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { ...jsonHeaders, ...(init.headers ?? {}) },
  });
}

function withPublicCors(request: Request, response: Response) {
  const origin = request.headers.get("origin");
  if (!origin || !publicOrigins.has(origin)) return response;

  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Vary", "Origin");
  return new Response(response.body, { status: response.status, headers });
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

function cleanSlug(value: unknown) {
  return typeof value === "string" ? value.trim().toLocaleLowerCase() : "";
}

function parseRow(row: EditorialRow, published = false) {
  const source = published ? row.published_payload : row.payload;
  return {
    id: row.id,
    type: row.type,
    slug: row.slug,
    status: row.status,
    title: row.title,
    payload: source ? JSON.parse(source) : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
  };
}

async function getAdminAccess(request: Request, env: Env) {
  const authenticatedUserId = request.headers
    .get("oai-authenticated-user-id")
    ?.trim();
  const authenticatedEmail = request.headers
    .get("oai-authenticated-user-email")
    ?.trim()
    .toLocaleLowerCase();
  if (!authenticatedUserId) {
    return { allowed: false as const, status: 401, reason: "Sign in is required." };
  }
  const authorizedByEmail = Boolean(
    env.ADMIN_EMAIL
      && authenticatedEmail
      && authenticatedEmail === env.ADMIN_EMAIL.trim().toLocaleLowerCase(),
  );
  if (!authorizedByEmail) {
    return {
      allowed: false as const,
      status: 403,
      reason: "This account is not authorized to edit the archive.",
    };
  }

  return {
    allowed: true as const,
    actorId: authenticatedUserId,
    email: authenticatedEmail,
  };
}

async function logEvent(
  env: Env,
  actorId: string,
  action: string,
  recordId: string | null = null,
) {
  await env.DB.prepare(
    "INSERT INTO editorial_events (record_id, action, actor_id) VALUES (?, ?, ?)",
  )
    .bind(recordId, action, actorId)
    .run();
}

async function handlePublicContent(request: Request, env: Env) {
  if (request.method === "OPTIONS") {
    return withPublicCors(request, new Response(null, { status: 204 }));
  }
  if (request.method !== "GET") {
    return withPublicCors(
      request,
      json({ error: "Method not allowed." }, { status: 405 }),
    );
  }

  const result = await env.DB.prepare(
    `SELECT id, type, slug, status, title, payload, published_payload,
      created_at, updated_at, published_at
     FROM editorial_records
     WHERE published_payload IS NOT NULL
     ORDER BY published_at DESC, title ASC`,
  ).all<EditorialRow>();
  const records = result.results.map((row) => parseRow(row, true));
  const updatedAt = records.reduce<string | null>((latest, record) => {
    if (!record.publishedAt) return latest;
    return !latest || record.publishedAt > latest ? record.publishedAt : latest;
  }, null);

  return withPublicCors(
    request,
    json(
      { records, updatedAt },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
    ),
  );
}

async function handleAdminApi(request: Request, env: Env, url: URL) {
  const access = await getAdminAccess(request, env);
  if (!access.allowed) {
    return json({ error: access.reason }, { status: access.status });
  }
  if (request.method !== "GET" && !isSameOrigin(request)) {
    return json({ error: "Cross-site requests are not allowed." }, { status: 403 });
  }

  if (url.pathname === "/api/admin/session" && request.method === "GET") {
    return json({
      authenticated: true,
      email: access.email,
    });
  }

  if (url.pathname === "/api/admin/records" && request.method === "GET") {
    const result = await env.DB.prepare(
      `SELECT id, type, slug, status, title, payload, published_payload,
        created_at, updated_at, published_at
       FROM editorial_records
       ORDER BY updated_at DESC, title ASC`,
    ).all<EditorialRow>();
    return json({ records: result.results.map((row) => parseRow(row)) });
  }

  if (url.pathname === "/api/admin/records" && request.method === "POST") {
    const body = (await request.json()) as {
      id?: string;
      type?: "saint" | "book";
      slug?: string;
      title?: string;
      payload?: Record<string, unknown>;
    };
    const id = body.id?.trim() || crypto.randomUUID();
    const slug = cleanSlug(body.slug);
    const title = body.title?.trim() ?? "";
    if (body.type !== "saint" && body.type !== "book") {
      return json({ error: "Choose a saint or book record." }, { status: 400 });
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return json(
        { error: "The URL slug may contain lowercase letters, numbers, and single hyphens." },
        { status: 400 },
      );
    }
    if (!title || !body.payload || body.payload.slug !== slug) {
      return json({ error: "A title, matching slug, and complete record are required." }, { status: 400 });
    }

    try {
      await env.DB.prepare(
        `INSERT INTO editorial_records
          (id, type, slug, status, title, payload, created_at, updated_at)
         VALUES (?, ?, ?, 'draft', ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         ON CONFLICT(id) DO UPDATE SET
           type = excluded.type,
           slug = excluded.slug,
           status = 'draft',
           title = excluded.title,
           payload = excluded.payload,
           updated_at = CURRENT_TIMESTAMP`,
      )
        .bind(id, body.type, slug, title, JSON.stringify(body.payload))
        .run();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save the record.";
      if (message.includes("UNIQUE") || message.includes("unique")) {
        return json({ error: "That URL slug is already in use." }, { status: 409 });
      }
      throw error;
    }
    await logEvent(env, access.actorId, "saved_draft", id);

    const row = await env.DB.prepare(
      `SELECT id, type, slug, status, title, payload, published_payload,
        created_at, updated_at, published_at
       FROM editorial_records WHERE id = ?`,
    )
      .bind(id)
      .first<EditorialRow>();
    return json({ record: row ? parseRow(row) : null }, { status: body.id ? 200 : 201 });
  }

  const recordMatch = url.pathname.match(
    /^\/api\/admin\/records\/([a-f0-9-]+)(?:\/(publish|unpublish))?$/,
  );
  if (recordMatch) {
    const [, id, action] = recordMatch;
    if (request.method === "DELETE" && !action) {
      await env.DB.prepare("DELETE FROM editorial_records WHERE id = ?").bind(id).run();
      await logEvent(env, access.actorId, "deleted", id);
      return new Response(null, { status: 204 });
    }
    if (request.method === "POST" && action === "publish") {
      await env.DB.prepare(
        `UPDATE editorial_records
         SET status = 'published', published_payload = payload,
           published_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
      )
        .bind(id)
        .run();
      await logEvent(env, access.actorId, "published", id);
    } else if (request.method === "POST" && action === "unpublish") {
      await env.DB.prepare(
        `UPDATE editorial_records
         SET status = 'draft', published_payload = NULL,
           published_at = NULL, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
      )
        .bind(id)
        .run();
      await logEvent(env, access.actorId, "unpublished", id);
    } else {
      return json({ error: "Method not allowed." }, { status: 405 });
    }
    const row = await env.DB.prepare(
      `SELECT id, type, slug, status, title, payload, published_payload,
        created_at, updated_at, published_at
       FROM editorial_records WHERE id = ?`,
    )
      .bind(id)
      .first<EditorialRow>();
    return json({ record: row ? parseRow(row) : null });
  }

  if (url.pathname === "/api/admin/media" && request.method === "POST") {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return json({ error: "Choose an image file." }, { status: 400 });
    }
    if (!new Set(["image/jpeg", "image/png", "image/webp"]).has(file.type)) {
      return json({ error: "Use a JPG, PNG, or WebP image." }, { status: 415 });
    }
    if (file.size > 8 * 1024 * 1024) {
      return json({ error: "Images must be smaller than 8 MB." }, { status: 413 });
    }
    const safeName = file.name
      .toLocaleLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/^-|-$/g, "") || "image";
    const key = `${crypto.randomUUID()}-${safeName}`;
    await env.MEDIA.put(key, file.stream(), {
      httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" },
    });
    await logEvent(env, access.actorId, "uploaded_media");
    return json({
      key,
      url: `${url.origin}/editorial-media/${encodeURIComponent(key)}`,
    }, { status: 201 });
  }

  return json({ error: "Admin endpoint not found." }, { status: 404 });
}

async function handleMedia(request: Request, env: Env, url: URL) {
  if (request.method === "OPTIONS") {
    return withPublicCors(request, new Response(null, { status: 204 }));
  }
  if (request.method !== "GET") {
    return withPublicCors(request, new Response(null, { status: 405 }));
  }
  const key = decodeURIComponent(url.pathname.slice("/editorial-media/".length));
  const object = await env.MEDIA.get(key);
  if (!object) return withPublicCors(request, new Response("Not found", { status: 404 }));

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("ETag", object.httpEtag);
  headers.set("X-Content-Type-Options", "nosniff");
  return withPublicCors(request, new Response(object.body, { headers }));
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(
        request,
        {
          fetchAsset: (path) =>
            env.ASSETS.fetch(new Request(new URL(path, request.url))),
          transformImage: async (body, { width, format, quality }) => {
            const result = await env.IMAGES.input(body)
              .transform(width > 0 ? { width } : {})
              .output({ format, quality });
            return result.response();
          },
        },
        allowedWidths,
      );
    }

    if (url.pathname === "/api/editorial/content") {
      return handlePublicContent(request, env);
    }
    if (url.pathname.startsWith("/editorial-media/")) {
      return handleMedia(request, env, url);
    }
    if (url.pathname.startsWith("/api/admin/")) {
      try {
        return await handleAdminApi(request, env, url);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected editorial service error.";
        return json({ error: message }, { status: 500 });
      }
    }
    if (url.pathname === "/admin" || url.pathname === "/admin/") {
      const access = await getAdminAccess(request, env);
      if (!access.allowed) {
        return Response.redirect(new URL("/admin/login/", url), 302);
      }
      const response = await handler.fetch(request, env, ctx);
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "no-store");
      headers.set("Content-Security-Policy", "default-src 'self'; img-src 'self' https: data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
      headers.set("Referrer-Policy", "no-referrer");
      headers.set("X-Frame-Options", "DENY");
      return new Response(response.body, { status: response.status, headers });
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
