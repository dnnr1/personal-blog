import type { NextConfig } from "next";

const imagesUrl = new URL(process.env.API_BASE_URL!);

const nextConfig: NextConfig = {
  images: {
    domains: [imagesUrl.hostname],
  },
};

export default nextConfig;
