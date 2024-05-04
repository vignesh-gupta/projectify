import { Inter } from "next/font/google";

import ConvexClientProvider from "@/components/providers/convex-client-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn, constructMetaTags } from "@/lib/utils";

import ModelProvider from "@/components/modals/modal-provider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetaTags({
  keywords: [
    "project management software",
    "free project planner",
    "online project management tool",
    "best project planner app",
    "project planning for small business",
    "project management for teams",
    "simple project planner",
    "free project planner",
    "project management app",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn("flex flex-col min-h-[100dvh]", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            {children}
            <Toaster />
            <ModelProvider />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
