import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';

// Optional backend proxy: set API_URL (e.g. http://localhost:4000) to forward /api/* to it.
const API_URL = process.env.API_URL;

const nextConfig: NextConfig = {
  // pin the project root so Next ignores stray lockfiles in parent folders
  turbopack: {
    root: fileURLToPath(new URL('.', import.meta.url)),
  },
  async rewrites() {
    if (!API_URL) return [];
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
