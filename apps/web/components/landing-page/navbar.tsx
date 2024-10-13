"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { MenuIcon, XIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { ThemeSwitch } from "../theme/theme-switch";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export const navLinks = [
  { title: "Features", href: "#features" },
  { title: "Changelogs", href: "/changelog" },
  { title: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { isSignedIn } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="container flex items-center justify-between gap-10 py-4">
      <Link className="flex items-center gap-3 flex-1 cursor-pointer" href="/">
        <span
          className={cn("font-heading text-xl font-bold", poppins.className)}
        >
          Projectify
        </span>
      </Link>
      <nav className="hidden items-center gap-10 md:flex flex-1 justify-center z-50">
        {navLinks.map(({ title, href }) => (
          <Link
            className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm cursor-pointer"
            href={href}
            key={title}
          >
            {title}
          </Link>
        ))}
      </nav>
      <div className="hidden items-center gap-2 md:flex flex-1 justify-end">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Button asChild>
            <SignInButton mode="modal">Sign In</SignInButton>
          </Button>
        )}
        <ThemeSwitch />
      </div>
      <Button variant="ghost" className="md:hidden" onClick={handleMenuClick}>
        {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </Button>
      {isMenuOpen && (
        <div className="fixed inset-0 top-[50px] z-40 size-full overflow-auto bg-black/40 animate-in slide-in-from-top-24 md:hidden">
          <div className="rounded-b-lg bg-background py-4 container text-foreground shadow-xl">
            <nav className="flex flex-col gap-1 pt-2">
              {navLinks.map(({ title, href }) => (
                <Link
                  className="flex w-full items-center rounded-md p-2 font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                  href={href}
                  key={`mobile-${title}`}
                >
                  {title}
                </Link>
              ))}
              <a
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 mt-2 w-full cursor-pointer"
                href="#"
              >
                Get Started
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
