import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Layout, ListTodo, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProjectMobileBar = () => {
  const param = useParams();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="md:hidden mr-3"
          variant="outline"
          size="icon"
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:hidden justify-start" side="left">
        <SheetHeader>
          <SheetTitle>Project Menu</SheetTitle>
        </SheetHeader>

        <div className="space-y-2 mt-5">
          <SheetClose
            asChild
            className={buttonVariants({
              variant: "ghost",
              className: "w-full",
            })}
          >
            <Link className="flex gap-1" href={`/projects/${param.id}`}>
              <Layout className="w-4 h-4 mr-2" /> Dashboard
            </Link>
          </SheetClose>
          <SheetClose
            asChild
            className={buttonVariants({
              variant: "ghost",
              className: "w-full",
            })}
          >
            <Link
              className="flex gap-1"
              href={`/projects/${param.id}/work-items`}
            >
              <ListTodo className="w-4 h-4 mr-2" /> Work Item
            </Link>
          </SheetClose>
          <SheetClose
            asChild
            className={buttonVariants({
              variant: "ghost",
              className: "w-full",
            })}
          >
            <Link
              className="flex gap-1"
              href={`/projects/${param.id}/settings`}
            >
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectMobileBar;
