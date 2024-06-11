"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeSwitch } from "../theme/theme-switch";
import MobileNav from "./mobile-nav";

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
        <h1 className="hidden sm:block">Projectify</h1>
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
          <Button asChild>
            <SignInButton mode="modal">Sign In</SignInButton>
          </Button>
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
