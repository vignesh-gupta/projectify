"use client";

import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProjectSwitcherProps = {
  orgId: string;
};

const ProjectSwitcher = ({ orgId }: ProjectSwitcherProps) => {
  const projectList = useQuery(api.project.list, { orgId });

  const param = useParams();
  const router = useRouter();

  const projects =
    projectList?.data?.map((project) => ({
      label: project.title,
      value: project._id,
    })) || [];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (param.id) {
      setValue(param.id as string);
    }
  }, [projectList, param.id]);

  const handleProjectChange = (value: string) => {
    setValue(value);
    setOpen(false);
    router.push(`/projects/${value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? projects.find((project) => project.value === value)?.label
            : "Select Project..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Select a project..." />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {projects.map((project) => (
              <CommandItem
                key={project.value}
                value={project.value}
                onSelect={handleProjectChange}
              >
                {project.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectSwitcher;
