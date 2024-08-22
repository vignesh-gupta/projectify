"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { DASHBOARD_ROUTE } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div className="h-full flex justify-center items-center flex-col gap-3">
      <Image src={"/error.svg"} width={200} height={200} alt="Error" />
      <h2>Oops, Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => router.push(DASHBOARD_ROUTE)
        }
      >
        Back to Dashboard
      </Button>
    </div>
  );
}
