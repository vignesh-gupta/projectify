"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeSwitch } from "../theme/theme-switch";
import { Button } from "../ui/button";
import { Poppins } from "next/font/google"; 
import { cn } from "@/lib/utils";

const poppins = Poppins({ weight: "600" , subsets: ["latin"]});

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <header className="container z-50 flex items-center h-[70px] lg:px-6">
      <Link className={cn("flex items-center justify-center font-bold text-xl", poppins.className)} href="#" >
        <h1>Projectify</h1>
      </Link>
      <nav className="flex items-center gap-4 ml-auto sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Contact
        </Link>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        )}
        <ThemeSwitch />
      </nav>
    </header>
  );
};

export default Navbar;
