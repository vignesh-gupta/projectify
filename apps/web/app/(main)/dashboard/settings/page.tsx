"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@repo/backend/convex/_generated/api";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useQuery } from "convex/react";
import { Copy, RefreshCcw, Trash } from "lucide-react";
import { toast } from "sonner";

const AccountSettingsPage = () => {
  const existingAPIKey = useQuery(api.api_key.get);

  const { mutate: createAPIKey, isPending } = useApiMutation(
    api.api_key.create
  );

  const { mutate: revokeAPIKey, isPending: isRevoking } = useApiMutation(
    api.api_key.revoke
  );

  const handleCopy = () => {
    navigator.clipboard
      .writeText(existingAPIKey?.key || "")
      .then(() => toast.success("API key copied to clipboard"))
      .catch(() => toast.error("Failed to copy API key to clipboard"));
  };

  const handleCreate = () => {
    createAPIKey()
      .then(() => toast.success("API key generated"))
      .catch(() => toast.error("Failed to generate API key"));
  };

  const handleRevoke = () => {
    revokeAPIKey()
      .then(() => toast.success("API key revoked"))
      .catch(() => toast.error("Failed to revoke API key"));
  };

  return (
    <>
      {existingAPIKey ? (
        <div className="flex gap-2 items-center flex-col sm:flex-row">
          <Input value={existingAPIKey.key} disabled className="sm:w-96 w-auto" />
          <div className="flex gap-2">
            <Button onClick={handleCopy} disabled={isPending} size="icon">
              <Copy />
            </Button>
            <Button onClick={handleCreate} disabled={isPending} size="icon">
              <RefreshCcw />
            </Button>
            <Button onClick={handleRevoke} disabled={isRevoking} size="icon">
              <Trash />
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={handleCreate} disabled={isPending}>
          Generate a token
        </Button>
      )}
    </>
  );
};

export default AccountSettingsPage;
