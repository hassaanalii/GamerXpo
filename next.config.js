const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: 'http', hostname: 'localhost', port: '8000' },
        { protocol: 'https', hostname: 'images.crazygames.com' },
      ],
    },
    // ... other configurations ...
  };
  
  module.exports = nextConfig;
  