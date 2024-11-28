import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Specify "https" for security
        hostname: '**', // Match any hostname
      },
    ],
  },
};

export default nextConfig;
