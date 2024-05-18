/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9sCh756iW5V
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Component() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
        
        <div>
          <h2 className="text-lg font-semibold mb-6">Links</h2>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Design</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Useful design resources
                </p>
              </div>
              <Button size="icon" variant="ghost">
                <PlusIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    Figma Design System
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    Material Design Guidelines
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden mt-6">
            <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Development</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Helpful development resources
                </p>
              </div>
              <Button size="icon" variant="ghost">
                <PlusIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    React Documentation
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    Tailwind CSS Documentation
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-6">Links</h2>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Design</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Useful design resources
                </p>
              </div>
              <Button size="icon" variant="ghost">
                <PlusIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    Figma Design System
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    Material Design Guidelines
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden mt-6">
            <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Development</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Helpful development resources
                </p>
              </div>
              <Button size="icon" variant="ghost">
                <PlusIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    React Documentation
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    Tailwind CSS Documentation
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-6">Links</h2>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Design</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Useful design resources
                </p>
              </div>
              <Button size="icon" variant="ghost">
                <PlusIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    Figma Design System
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    Material Design Guidelines
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden mt-6">
            <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Development</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Helpful development resources
                </p>
              </div>
              <Button size="icon" variant="ghost">
                <PlusIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    React Documentation
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <a
                    className="font-medium hover:underline hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    Tailwind CSS Documentation
                  </a>
                </div>
                <Button size="icon" variant="ghost">
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function DownloadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function LinkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
