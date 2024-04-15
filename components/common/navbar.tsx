import Link from "next/link";
import { ThemeSwitch } from "../theme-switch";

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        {/* <MountainIcon className="h-6 w-6" /> */}
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
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

        <ThemeSwitch />
      </nav>
    </header>
  );
};

export default Navbar;
