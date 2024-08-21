import { ThemeSwitch } from "@/components/theme/theme-switch";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getNavLinks } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Layout, ListTodo, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProjectMobileBar = () => {
  const param = useParams();

  const navLinks = getNavLinks(param.id as string);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="lg:hidden mr-3"
          variant="outline"
          size="icon"
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:hidden" side="left">
        <SheetHeader>
          <SheetTitle>Project Menu</SheetTitle>
        </SheetHeader>

        <div className="space-y-2 mt-5">
          {navLinks.map(({ href, Icon, name }) => (
            <SheetClose
              key={`${href}-mobile`}
              asChild
              className={buttonVariants({
                variant: "ghost",
                className: "w-full",
              })}
            >
              <Link className="flex gap-1" href={href}>
                <Icon className="w-4 h-4 mr-2" /> {name}
              </Link>
            </SheetClose>
          ))}
        </div>
        <div className="flex justify-evenly mt-5">
          <UserButton />
          <ThemeSwitch />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectMobileBar;
