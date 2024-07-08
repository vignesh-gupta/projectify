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
  rewrites: async () => [
    {
      source: "/changelog",
      destination: "/changelog/j5751yv98q3gahnprrwbxzd9th6ssfvm"
    }
  ]
};
