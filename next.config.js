const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: 'http', hostname: '127.0.0.1', port: '8000' },
      ],
    },
    // ... other configurations ...
  };
  
  module.exports = nextConfig;
  