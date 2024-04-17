"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import {
  ConvexReactClient
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

type ConvexClientProviderProps = {
  children: React.ReactNode;
};

const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexURL);

const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;
