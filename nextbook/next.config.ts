const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'nextbook-api.onrender.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

module.exports = nextConfig;