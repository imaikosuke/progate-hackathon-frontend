/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 全ての API routes にマッチ
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      'placehold.jp',
      'pub-cbf08acd7c1b4f9d88dfeaf6e6f97284.r2.dev',
      'lh3.googleusercontent.com',
      'lh5.googleusercontent.com',
    ],
  },
};
export default nextConfig;
