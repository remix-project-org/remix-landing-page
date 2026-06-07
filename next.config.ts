import type { NextConfig } from "next";
import path from "path";

const isPagesDeployment = process.env.PAGES_BASE_PATH === "1";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isPagesDeployment ? "/remix-landing-page" : "",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
