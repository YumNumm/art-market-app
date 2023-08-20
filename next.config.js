/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  output: "export",
  redirects: {
    async redirects() {
      return [
        {
          source: "/art-market/:id",
          destination: "/art-market/"
        }
      ];
    }
  }
};

module.exports = nextConfig;
