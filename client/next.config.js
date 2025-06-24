/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // 例：リライトを正しく書く場合
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'http://localhost:4000/api/:path*'
    }
  ],

  // 実験的な設定は必要なければ削除
  // experimental: {
  //   allowedDevOrigins: ["http://localhost:4000"]
  // },
};

module.exports = nextConfig;
