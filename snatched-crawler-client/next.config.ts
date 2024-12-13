import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
};

export default nextConfig;
