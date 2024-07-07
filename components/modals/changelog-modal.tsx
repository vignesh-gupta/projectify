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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useChangelogModal } from "@/lib/store/use-changelog-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MDXEditor from "../md/mdx-editor";
import { DatePicker } from "../ui/date-picker";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Switch } from "../ui/switch";

const changelogFormSchema = z.object({
  title: z.string().min(5),
  version: z
    .string()
    .min(5, "Version must be at least 6 characters")
    .regex(new RegExp(/^\d+\.\d+\.\d+$/), "Invalid version format"),
  changes: z.string().min(10).max(500),
  date: z.date(),
  isPublished: z.boolean(),
});

const ChangelogModal = () => {
  const param = useParams();

  const { isOpen, onClose, values } = useChangelogModal();

  const { mutate: createChangeLog, isPending: isCreating } = useApiMutation(
    api.changelog.create
  );

  const form = useForm<z.infer<typeof changelogFormSchema>>({
    resolver: zodResolver(changelogFormSchema),
    defaultValues: {
      title: values?.title ?? "",
      version: values?.version ?? "",
      changes: values?.changes ?? "",
      date: values?.date ? new Date(values?.date) : undefined,
      isPublished: values?.isPublished ?? false,
    },
  });

  async function onSubmit(data: z.infer<typeof changelogFormSchema>) {
    console.log("Submitted:", data);

    createChangeLog({
      ...data,
      projectId: param.id as Id<"projects">,
      date: data.date.toISOString(),
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{values?._id ? "Edit" : "Create"} Changelog</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fixed XYZ bug and improved the performance by 20%"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Release Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-1  flex justify-center items-center w-6 h-6 m-2 ml-1 rounded-lg text-muted-foreground bg-muted">
                          v
                        </span>
                        <Input
                          placeholder="1.0.1"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel className="text-base">Keep it public</FormLabel>
                    <FormDescription>
                      Enable this  option to make the changelog public
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="changes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Changes</FormLabel>
                  <FormControl>
                    <div>
                      <MDXEditor
                        content={field.value}
                        onChange={field.onChange}
                        rows={10}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isCreating}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangelogModal;
