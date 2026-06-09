/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow the product photos served from Unsplash. next/image refuses remote
    // hosts unless they're listed here.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
