"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useTheme } from "next-themes";
import type { PropsWithChildren } from "react";

const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexURL);

const ConvexClientProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;
