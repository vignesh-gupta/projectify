import AuthLoadProvider from "@/components/providers/auth-load-provider";
import React from "react";

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AuthLoadProvider>{children}</AuthLoadProvider>;
};

export default AppLayout;
