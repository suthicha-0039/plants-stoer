/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'images-na.ssl-images-amazon.com',
          },
          {
            hostname: 'utfs.io',
          },
          {
            hostname: 'park.co.th',
          },
        ],
      },
};

export default nextConfig;
