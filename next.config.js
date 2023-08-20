/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["objects.tekken.work"],
  },
};

module.exports = nextConfig;
