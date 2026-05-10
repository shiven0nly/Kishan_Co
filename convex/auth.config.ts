import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      // Clerk JWT issuer domain from the Clerk publishable key
      domain: "https://valued-owl-21.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
