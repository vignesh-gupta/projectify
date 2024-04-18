"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeSwitch } from "../theme/theme-switch";
import { Button } from "../ui/button";

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <header className="container z-50 flex items-center h-[70px] lg:px-6">
      <Link className="flex items-center justify-center" href="#">
        {/* <MountainIcon className="w-6 h-6" /> */}
        <span>Projectify</span>
      </Link>
      <nav className="flex items-center gap-4 ml-auto sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
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
            <Button className="text-white">Sign In</Button>
          </SignInButton>
        )}
        <ThemeSwitch />
      </nav>
    </header>
  );
};

export default Navbar;
