import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    // Nunca ignorar erros de TypeScript no build.
    ignoreBuildErrors: false,
  },
  eslint: {
    // Nunca ignorar erros de lint no build.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
