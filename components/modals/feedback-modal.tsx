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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FEEDBACK_STATUS, FEEDBACK_TYPES } from "@/lib/constants";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useFeedbackModal } from "@/lib/store/use-feedback-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const feedbackFormSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(10).max(500),
  projectId: z.string().min(10),
  senderName: z.string(),
  senderEmail: z.string().email(),
  status: z.enum(["open", "reviewed", "closed"]),
  type: z.enum([
    "documentation",
    "feature",
    "issue",
    "question",
    "idea",
    "other",
  ]),
});

const FeedbackModal = () => {
  const param = useParams();

  const { mutate: createFeedback, isPending: isCreating } = useApiMutation(
    api.feedback.create
  );
  const { mutate: updateFeedback, isPending: isUpdating } = useApiMutation(
    api.feedback.update
  );

  const { isOpen, onClose, values } = useFeedbackModal();
  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      id: values?._id ?? "",
      content: values?.content ?? "",
      projectId: param.id as Id<"feedbacks">,
      senderName: values?.senderName ?? "",
      senderEmail: values?.senderEmail ?? "",
      status: values?.status ?? "open",
      type: values?.type ?? "feature",
    },
  });

  async function onSubmit(values: z.infer<typeof feedbackFormSchema>) {
    const feedbackObject = {
      type: values.type,
      status: values.status,
      content: values.content,
      senderName: values.senderName,
      senderEmail: values.senderEmail,
      projectId: param.id as Id<"projects">,
    };

    if (values.id) {
      await updateFeedback({
        ...feedbackObject,
        _id: values.id as Id<"feedbacks">,
      })
        .then(() => {
          toast.success("Feedback updated successfully");
          onClose();
        })
        .catch((e) => {
          console.log("[FEEDBACK_MODAL_ERR]", e);
          toast.error("Failed to update feedback");
        });
    } else {
      await createFeedback(feedbackObject)
        .then(() => {
          toast.success("Feedback created successfully");
          onClose();
        })
        .catch((e) => {
          console.log("[FEEDBACK_MODAL_ERR]", e);
          toast.error("Failed to create feedback");
        });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{values?._id ? "Edit" : "Create"} Work item</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="senderName"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Deo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senderEmail"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.deo@acme.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="flex">
                          {FEEDBACK_STATUS.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="flex">
                          {FEEDBACK_TYPES.map((label) => (
                            <SelectItem key={label.value} value={label.value}>
                              {label.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      placeholder="I would like to see..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={false}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
