/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vimly.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
