import type { NextConfig } from "next";

const imagesUrl = new URL(process.env.MINIO_URL!);

const nextConfig: NextConfig = {
  images: {
    domains: [imagesUrl.hostname],
  },
};

export default nextConfig;
