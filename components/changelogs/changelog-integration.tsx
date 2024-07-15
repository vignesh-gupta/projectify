"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectId } from "@/lib/types";
import { useParams } from "next/navigation";

import Link from "next/link";
import type { PropsWithChildren } from "react";
import CodeWithCopy from "../code-with-copy";

const ChangelogIntegration = ({ children }: PropsWithChildren) => {
  const { id } = useParams<ProjectId>();

  const nextJSCode = `rewrites: async () => [
  {
    source: "/changelog",
    destination: "https://projectify.vigneshgupta.tech/changelog/${id}"
  }
]`;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="md:max-w-xl">
        <SheetHeader>
          <SheetTitle>Changelog Integration</SheetTitle>
          <SheetDescription>
            Integrate changelogs into your project.
          </SheetDescription>
          <Tabs defaultValue="account" className="min-w-[400px] space-y-5">
            <TabsList>
              <TabsTrigger value="nextjs">NextJS</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>
            <TabsContent value="nextjs" className="space-y-5">
              <h3 className="text-lg font-semibold">NextJS Integration</h3>
              <p>
                This will integrate your app custom endpoint to our{" "}
                <Link
                  href={`/changelog/${id}`}
                  className="underline underline-offset-4"
                >
                  Preview Page
                </Link>
              </p>

              <p>
                First, Add the following code in your{" "}
                <span className="underline underline-offset-8">
                  next.config.js
                </span>
              </p>

              <CodeWithCopy code={nextJSCode} />

              <p>Now, replace the source with your custom path</p>
            </TabsContent>
            <TabsContent value="api" className="space-y-5">
              <h3 className="text-lg font-semibold">API call Integration</h3>
              <p>
                This will help you to fetch the changelog data from our server
              </p>

              <p>Send a GET request to</p>

              <CodeWithCopy
                code={`https://projectify.vigneshgupta.tech/api/changelog/${id}`}
              />
            </TabsContent>
          </Tabs>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ChangelogIntegration;
