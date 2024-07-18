import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { navLinks } from "./navbar";

const MobileNav = () => {
  return (
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Projectify</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-4 py-4">
        {navLinks.map((link) => (
          <Link
            prefetch={false}
            href={link.href}
            className="text-sm font-medium hover:underline underline-offset-4"
            key={link.href.toLocaleLowerCase()}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </SheetContent>
  );
};

export default MobileNav;
