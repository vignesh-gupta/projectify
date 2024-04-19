"use client";

import { AuthLoading, Authenticated } from "convex/react";
import React from "react";
import Loading from "@/components/loading";

type AuthLoadProviderProps = {
  children: React.ReactNode;
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
