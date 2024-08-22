// eslint-disable-next-line import/no-anonymous-default-export
export default {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CLERK_ISSUER_BASE_URL,
      applicationID: "convex",
    },
  ],
};
