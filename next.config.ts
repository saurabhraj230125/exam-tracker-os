// If you see something like this in next.config.mjs, delete the redirects block!
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/app',
        permanent: false,
      },
    ];
  },
};