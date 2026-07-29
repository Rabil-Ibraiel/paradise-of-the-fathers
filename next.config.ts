import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGitHubPages && repositoryName ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  ...(isGitHubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: isGitHubPages
      ? `https://${process.env.GITHUB_REPOSITORY_OWNER?.toLowerCase()}.github.io${basePath}`
      : "https://aceya-saints.rabilibraiel.chatgpt.site",
  },
};

export default nextConfig;
