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
      destination: "/changelog/j5775aqxkjg4avhhdjgwn05jqh6rkcyp"
    }
  ]
};
