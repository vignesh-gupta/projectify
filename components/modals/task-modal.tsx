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
import { api } from "@/convex/_generated/api";
import { LABELS, PRIORITIES, STATUSES, UNASSIGNED_USER } from "@/lib/constants";
import { useTaskModal } from "@/lib/store/use-task-modal";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import useApiMutation from "@/lib/hooks/use-api-mutation";
import { useParams, useSearchParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const taskFormSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().optional(),
  assigneeId: z.string(),
  status: z.enum(["backlog", "todo", "in progress", "done" , "canceled"]),
  priority: z.enum(["low", "medium", "high"]),
  type: z.enum(["documentation", "bug", "feature"]),
});

const TaskModal = () => {
  // Manage the task modal state.
  const { isOpen, onClose, values } = useTaskModal();

  // Fetch the organization users.
  const { organization } = useOrganization();
  const orgUsers = useQuery(api.users.list, {
    teamId: organization?.id as string,
  })?.map((user) => ({
    label: user?.firstName as string,
    value: user?._id as string,
  }));

  const params = useParams();

  const { mutate: createWorkItem, isPending } = useApiMutation(
    api.work_item.create
  );

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      assigneeId: UNASSIGNED_USER.value,
      status: "todo",
      priority: "low",
      type: "feature",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof taskFormSchema>) {
    const selectedUser = orgUsers?.find(
      (user) => user.value === values.assigneeId
    );

    createWorkItem({
      assignee: selectedUser?.label ?? UNASSIGNED_USER.label,
      assigneeId: (selectedUser?.value ?? UNASSIGNED_USER.value) as Id<"users">,
      title: values.title,
      status: values.status,
      priority: values.priority,
      label: values.type,
      description: values.description,
      projectId: params.id as Id<"projects">,
    });
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
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {orgUsers && (
              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Assignee</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {orgUsers.map((user) => (
                            <SelectItem key={user.value} value={user.value}>
                              {user.label}
                            </SelectItem>
                          ))}
                          <SelectItem value={UNASSIGNED_USER.value}>
                            {UNASSIGNED_USER.label}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-3 *:col-span-3 *:md:col-span-1 gap-2">
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
                          {STATUSES.map((status) => (
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
                name="priority"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="flex">
                          {PRIORITIES.map((priority) => (
                            <SelectItem
                              key={priority.value}
                              value={priority.value}
                            >
                              {priority.label}
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
                          {LABELS.map((label) => (
                            <SelectItem
                              key={label.value}
                              value={label.value}
                              className="capitalize"
                            >
                              {label.value}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      placeholder="Description of the task"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
