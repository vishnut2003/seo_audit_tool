import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webspidersolutions.websiteauditserver.com',
      },
      {
        protocol: 'https',
        hostname: 'seoptimer.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ]
  }
};

export default nextConfig;
