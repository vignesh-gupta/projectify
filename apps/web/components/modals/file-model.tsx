import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useFileModal } from "@/lib/store/use-file-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@repo/backend/convex/_generated/api";
import type { Id } from "@repo/backend/convex/_generated/dataModel";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ResponsiveModel, { ResponsiveModelTitle } from "../responsive-model";

const fileFormSchema = z.object({
  id: z.string(),
  title: z.string().min(5).max(50),
});

const FileModal = () => {
  // Manage the link modal state.
  const { isOpen, onClose, values } = useFileModal();
  const { mutate: updateTitle, isPending } = useApiMutation(
    api.resources.file.update
  );

  const form = useForm<z.infer<typeof fileFormSchema>>({
    resolver: zodResolver(fileFormSchema),
    defaultValues: {
      id: values?._id ?? "",
      title: values?.title ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof fileFormSchema>) {
    if (isPending) return;
    updateTitle({
      id: values.id as Id<"files">,
      title: values.title,
    })
      .then(() => toast.success("File title updated successfully."))
      .catch(() =>
        toast.error("Failed to update file title. Please try again.")
      );
    onClose();
  }

  return (
    <ResponsiveModel open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ResponsiveModelTitle>Edit File Title</ResponsiveModelTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ResponsiveModel>
  );
};

export default FileModal;
