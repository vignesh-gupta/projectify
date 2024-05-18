"use client";
import AddButton from "@/components/resources/add-link";
import { Button } from "@/components/ui/button";
import { DownloadIcon, Edit, File, TrashIcon, UploadIcon } from "lucide-react";
import Image from "next/image";

const ResourcesPage = () => {
  return (
    <div className="space-y-5">
      <div className="z-10 flex justify-between bg-background/30 ">
        <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">Resources</h3>
        <AddButton />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <div className="col-span-3">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Files</h2>
              <Button size="sm">
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>
            <div className="p-6 grid gap-6">
              {[0, 0, 0].map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[48px_1fr_auto] items-center gap-4"
                >
                  <File className="h-8 w-8" />
                  <div>
                    <div className="font-medium">Design Mockups.zip</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      12.3 MB
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <h4 className="text-lg font-semibold mb-6">Links</h4>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
