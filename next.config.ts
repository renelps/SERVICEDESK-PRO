import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
    // Ignora erros de lint durante o build (apenas em produção)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
