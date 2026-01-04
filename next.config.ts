import type { NextConfig } from "next";

const imagesUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL)
  : null;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    ...(imagesUrl && { domains: [imagesUrl.hostname] }),
  },
};

export default nextConfig;
