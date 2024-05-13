import { Id } from "@/convex/_generated/dataModel";
import { NextRequest, NextResponse } from "next/server";

export type FaviconResponse =
  | {
      success: true;
      storageId: Id<"_storage">;
    }
  | {
      success: false;
    };

export const POST = async (req: NextRequest) => {
  const url = new URL(req.url).search.replace("?url=", "");

  const icon = await fetch(
    `https://www.google.com/s2/favicons?domain=${url}&sz=128`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        AllowOrigin: "*",
      },
    }
  )
    .then(async (res) => {
      const test = await res.blob();
      console.log({ test });

      return test;
    })
    .catch(console.error);

  if (icon) {
    const reqUrl = `${process.env.NEXT_PUBLIC_CONVEX_URL?.replace(".cloud", ".site")}/uploadIcon`;
    try {
      const res = await fetch(reqUrl, {
        method: "POST",
        body: icon,
      }).then((res) => res.json());

      return NextResponse.json({ success: true, storageId: res.favicon });
    } catch (e) {
      console.error(e);
    }
  }

  return NextResponse.json({ success: false });
};
