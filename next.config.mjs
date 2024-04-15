/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns : [
      {
        hostname: 'placehold.co',
        protocol: 'https', 
      }
    ]
  }
};

export default nextConfig;
