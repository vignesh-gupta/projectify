"use client";

import Loading from "@/components/loading";
import { AuthLoading, Authenticated } from "convex/react";
import type { ReactNode } from "react";

type AuthLoadProviderProps = {
  children: ReactNode;
};

const AuthLoadProvider = ({ children }: AuthLoadProviderProps) => {
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
