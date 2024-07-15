"use client";

import Loading from "@/components/loading";
import { AuthLoading, Authenticated } from "convex/react";
import type { PropsWithChildren } from "react";

const AuthLoadProvider = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[100dvh]">
      <AuthLoading>
        <Loading />
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
    </div>
  );
};

export default AuthLoadProvider;
