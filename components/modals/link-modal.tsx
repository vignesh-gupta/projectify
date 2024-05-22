import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useLinkModal } from "@/lib/store/use-link-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const linkFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5).max(50),
  url: z.string().url(),
});

const LinkModal = () => {
  // Manage the link modal state.
  const { isOpen, onClose, values } = useLinkModal();

  const params = useParams();

  const saveFavicon = useAction(api.resources.storage.saveFavicon);

  const { mutate: createLink, isPending: isCreating } = useApiMutation(
    api.resources.link.create
  );

  const { mutate: updateLink, isPending: isUpdating } = useApiMutation(
    api.resources.link.update
  );

  const form = useForm<z.infer<typeof linkFormSchema>>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      id: values?._id ?? "",
      title: values?.title ?? "",
      url: values?.url ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof linkFormSchema>) {
    let resourceId = values.id as Id<"links"> | undefined;

    try {
      if (resourceId) {
        await updateLink({
          title: values.title,
          url: values.url,
          _id: resourceId,
        });
      } else {
        resourceId = await createLink({
          title: values.title,
          url: values.url,
          projectId: params.id as Id<"projects">,
        });
      }

      await saveFavicon({
        id: resourceId,
        url: values.url,
      }).catch((err) => {
        console.log("Failed to save favicon", err);
        toast.error("Failed to save favicon");
      });

      toast.success("Link saved successfully.");
    } catch (error) {
      console.log("Failed to save link", error);
      toast.error("Failed to save link. Please try again.");
    }

    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {values?._id ? "Edit" : "Create"} Link Resource
          </DialogTitle>
        </DialogHeader>

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

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isCreating || isUpdating}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LinkModal;
