"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeSwitch } from "../theme/theme-switch";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import MobileNav from "./mobile-nav";
import { useState } from "react";
import Image from "next/image";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export const navLinks = [
  { title: "Features", href: "#features" },
  { title: "Contact", href: "#" },
];

const Navbar = () => {
  const { isSignedIn } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="container z-50 flex items-center h-[70px] lg:px-6">
      <Link
        className={cn(
          "flex items-center justify-center font-bold text-2xl gap-1",
          poppins.className
        )}
        href="/"
      >
        <Image src="/logo.png" alt="Projectify" width={50} height={40} />
        <h1>Projectify</h1>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <nav className="md:flex items-center gap-4  sm:gap-6 hidden">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              className="text-sm font-medium hover:underline underline-offset-4"
              href={link.href}
            >
              {link.title}
            </Link>
          ))}
        </nav>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        )}
        <ThemeSwitch />
      </div>
      <Sheet>
        <SheetTrigger asChild className="-order-1">
          <Button
            className="md:hidden mr-3"
            variant="outline"
            size="icon"
            aria-label="Open Menu"
            onClick={handleMenuClick}
          >
            <MenuIcon className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <MobileNav />
      </Sheet>
    </header>
  );
};

export default Navbar;
