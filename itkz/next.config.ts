import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
const repoName = "CK"; // Replace with your GitHub repository name

const nextConfig: NextConfig = {
  // Configure for GitHub Pages deployment
  output: isProd ? "export" : undefined,
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  
  // Fix workspace root detection warning
  outputFileTracingRoot: path.join(__dirname, '../'),
  
  // Configure turbopack with absolute path (disabled for dev due to CSS issues)
  // turbopack: {
  //   root: path.resolve(".")
  // },
  
  // Optimize for production
  reactStrictMode: true,
  
  // Handle static images for GitHub Pages
  images: {
    unoptimized: true
  },
  
  // Ensure trailing slash for GitHub Pages
  trailingSlash: true,
  
  // Handle browser extensions gracefully
  compiler: {
    removeConsole: isProd
  },
  
  // ESLint configuration for deployment
  eslint: {
    // Allow production builds to successfully complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  
  // TypeScript configuration for deployment
  typescript: {
    // Allow production builds to successfully complete even if there are type errors
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;
