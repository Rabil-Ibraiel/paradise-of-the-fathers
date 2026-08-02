import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGitHubPages && repositoryName ? `/${repositoryName}` : "";
const editorialApiUrl =
  "https://aceya-saints.rabilibraiel.chatgpt.site/api/editorial";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: isGitHubPages
      ? `https://${process.env.GITHUB_REPOSITORY_OWNER?.toLowerCase()}.github.io${basePath}`
      : "https://aceya-saints.rabilibraiel.chatgpt.site",
    NEXT_PUBLIC_EDITORIAL_API_URL: editorialApiUrl,
  },
  images: {
    ...(isGitHubPages ? { unoptimized: true } : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "archive.org",
        pathname: "/services/img/**",
      },
      {
        protocol: "https",
        hostname: "aceya-saints.rabilibraiel.chatgpt.site",
        pathname: "/editorial-media/**",
      },
    ],
  },
};

export default nextConfig;
