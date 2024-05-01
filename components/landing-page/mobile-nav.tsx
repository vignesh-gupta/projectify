import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { navLinks } from "./navbar";

const MobileNav = () => {
  return (
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Projectify</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-4 py-4">
        {navLinks.map((link) => (
          <a href={link.href} className="text-sm font-medium hover:underline underline-offset-4" key={link.href.toLocaleLowerCase()}>
            {link.title}
          </a>
        ))}
      </div>
    </SheetContent>
  );
};

export default MobileNav;
