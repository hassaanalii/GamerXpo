const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: 'http', hostname: 'localhost', port: '8000' },
        { protocol: 'https', hostname: 'images.crazygames.com' },
        { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      ],
    },
    // ... other configurations ...
  };
  
  module.exports = nextConfig;
  