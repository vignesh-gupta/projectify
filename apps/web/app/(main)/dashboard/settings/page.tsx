"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCcw, Trash } from "lucide-react";
import { toast } from "sonner";

const AccountSettingsPage = () => {
  const existingAPIKey = "DUMMY_API_KEY";

  // const existingAPIKey = useQuery(api.api_key.get);
  const handleCopy = () => {
    toast.error("This feature is disabled for now");
    // navigator.clipboard
    //   .writeText(existingAPIKey?.key || "")
    //   .then(() => toast.success("API key copied to clipboard"))
    //   .catch(() => toast.error("Failed to copy API key to clipboard"));
  };

  const handleCreate = () => {
    toast.error("This feature is disabled for now");
    // createAPIKey()
    //   .then(() => toast.success("API key generated"))
    //   .catch(() => toast.error("Failed to generate API key"));
  };

  const handleRevoke = () => {
    toast.error("This feature is disabled for now");

    // revokeAPIKey()
    //   .then(() => toast.success("API key revoked"))
    //   .catch(() => toast.error("Failed to revoke API key"));
  };

  return (
    <>
      {existingAPIKey ? (
        <div className="flex gap-2 items-center flex-col sm:flex-row">
          <Input value={existingAPIKey} disabled className="sm:w-96 w-auto" />
          <div className="flex gap-2">
            <Button onClick={handleCopy} size="icon">
              <Copy />
            </Button>
            <Button onClick={handleCreate} size="icon">
              <RefreshCcw />
            </Button>
            <Button onClick={handleRevoke} size="icon">
              <Trash />
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={handleCreate}>Generate a token</Button>
      )}
    </>
  );
};

export default AccountSettingsPage;
