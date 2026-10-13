import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    // Evita que Next infiera otra raíz por lockfiles que existan fuera del repo.
    root: __dirname,
  },
};

export default nextConfig;
