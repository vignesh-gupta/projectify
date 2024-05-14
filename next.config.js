/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    UNASSIGNED_USER_ID: process.env.UNASSIGNED_USER_ID,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "img.clerk.com",
        protocol: "https",
      },
      {
        hostname: "www.google.com",
        protocol: "https",
      },
      {
        hostname: "duckduckgo.com",
        protocol: "https",
      }
    ],
  },
};
