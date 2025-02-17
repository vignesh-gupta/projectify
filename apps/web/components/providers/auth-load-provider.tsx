"use client";

import { AuthLoading, Authenticated } from "convex/react";
import Image from "next/image";
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


const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        priority={true}
        className="animate-pulse duration-1000"
      />
    </div>
  );
};