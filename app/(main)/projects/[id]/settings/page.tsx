"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ProjectStatus from "@/components/projects/project-status";
import { Button } from "@/components/ui/button";
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
import { PROJECTS_STAGES } from "@/lib/constants";
import useApiMutation from "@/lib/hooks/use-api-mutation";

type ProjectSettingsPageProps = {
  params: {
    id: Id<"projects">;
  };
};

const ProjectSettingsPage = ({ params: { id } }: ProjectSettingsPageProps) => {
  const project = useQuery(api.project.get, { id });

  const { mutate: updateProject, isPending } = useApiMutation(
    api.project.update
  );

  const formSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.union([
      z.literal("development"),
      z.literal("live"),
      z.literal("stale"),
      z.literal("archived"),
      z.literal(""),
    ]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: project?.title || "",
      status: project?.status || "",
      description: project?.description || "",
    },
  });

  function onSubmit({
    status,
    title,
    description,
  }: z.infer<typeof formSchema>) {
    if (status === "") return;

    updateProject({ id, status, title, description })
      .then(() => {
        toast.success("Project updated successfully");
      })
      .catch(() => {
        toast.error("An error occurred while updating the project");
      });
  }

  if (!project)
    return (
      <div className="flex justify-center items-center h-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                {field.value && (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full md:w-1/2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECTS_STAGES.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          <ProjectStatus status={stage} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ProjectSettingsPage;
