import FeatureSection from "@/components/landing-page/features-section";
import Footer from "@/components/landing-page/footer";
import Navbar from "@/components/landing-page/navbar";
import { buttonVariants } from "@/components/ui/button";
import { DASHBOARD_ROUTE } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 border-b bg-background">
        <Navbar />
      </div>
      <main className="flex-1 mt-20">
        <section className="relative z-0 flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background">

          <div
            className="relative z-50 flex container justify-center flex-1 flex-col px-5 md:px-10 gap-4"
            style={{ opacity: 1, transform: "none", willChange: "auto" }}
          >
            <h1 className="bg-gradient-to-br from-slate-300 to-primary bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-7xl font-heading caret-black">
              Build visually, export code.
            </h1>
            <p className="mt-4 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-xl tracking-tight text-transparent md:text-2xl caret-black">
              Build beautiful websites. The right way.
            </p>
            <div className="relative mx-auto mt-8">
              <div className="grid grid-cols-2 gap-3">
                <a
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-8 h-12 border-border text-base sm:h-14 sm:px-10 cursor-pointer"
                  href="#"
                >
                  Learn More
                </a>
                <a
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-8 h-12 text-base sm:h-14 sm:px-10 cursor-pointer"
                  href="#"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-lg dark:bg-gray-800">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Designed for Productivity
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform is packed with features to help your team work
                  smarter, not harder. Here are some of the highlights.
                </p>
              </div>
            </div>
            <div
              className="grid items-start max-w-5xl gap-6 py-12 mx-auto lg:grid-cols-2 lg:gap-12 scroll-mt-64"
              id="features"
            >
              <FeatureSection />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Manage your project efficiently for absolute
                <span className="underline">no cost</span> .
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We believe that project management should not be pocket heavy.
              </p>
            </div>
            <div className="flex space-x-4 lg:justify-end">
              <Link className={buttonVariants()} href={DASHBOARD_ROUTE}>
                Get Started
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 border-t md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-lg dark:bg-gray-800">
                  Performance
                </div>
                <h2 className="text-3xl font-bold tracking-tighter lg:leading-tighter sm:text-4xl md:text-5xl">
                  Traffic spikes should be exciting, not scary.
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Using a planner keeps the resources organized and your team,
                  ready for that spike.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-lg dark:bg-gray-800">
                  Improvement
                </div>
                <h2 className="text-3xl font-bold tracking-tighter lg:leading-tighter sm:text-4xl md:text-5xl">
                  Always improving
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  The app is designed to help you improve your productivity and
                  efficiency. We are constantly working on new features to make
                  your experience better.
                </p>
                <Link
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors bg-white border border-gray-200 rounded-md shadow-sm h-9 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="/contact"
                >
                  Drop a suggestion
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
