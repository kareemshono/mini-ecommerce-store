import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
remotePatterns: [
      {
        protocol: "https",
        hostname: "front-test.r-link.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;


