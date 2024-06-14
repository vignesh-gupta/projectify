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
    ],
  },
  redirects: async () => [
    {
      source: "/projects",
      destination: "/dashboard",
      permanent: true,
    },
  ],
};
