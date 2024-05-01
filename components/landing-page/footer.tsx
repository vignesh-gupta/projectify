import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Built by{" "}
        <Link
          href="https://vigneshgupta.tech"
          className="underline font-semibold"
        >
          Vignesh Gupta
        </Link>
      </p>
      {/* <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </nav> */}
    </footer>
  );
};

export default Footer;
