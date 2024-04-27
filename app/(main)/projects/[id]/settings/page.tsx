"use client";

import ProjectStatus from "@/components/projects/project-status";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PROJECTS_STAGES } from "@/lib/constants";
import { useQuery } from "convex/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
    status: z.union([
      z.literal("development"),
      z.literal("live"),
      z.literal("stale"),
      z.literal("archived"),
    ]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: project?.title || "",
      status: project?.status || "development",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    updateProject({ id, ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
