"use client";

import Footer from "@/components/landing-page/footer";
import Navbar from "@/components/landing-page/navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Please enter your name",
    })
    .max(100, {
      message: "Name is too long",
    }),
  email: z.string().email(),
  message: z.string().min(10, {
    message: "Message is too short",
  }),
});

const ContactPage = () => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    console.log(data);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 border-b bg-background">
        <Navbar />
      </div>
      <main className="flex-1 flex pt-20">
        <section className="flex flex-col justify-center items-center flex-1 container space-y-10 px-4 sm:px-6 md:px-10">
          <div className="space-y-4 text-center">
            <div className="inline-block px-3 py-1 text-sm bg-gray-100 rounded-lg dark:bg-gray-800">
              Contact Us
            </div>
            <h1 className="text-3xl font-bold tracking-tighter lg:leading-tighter sm:text-4xl md:text-5xl">
              Have a question or feedback?
            </h1>
            <p className=" text-balance max-w-3xl text-gray-500 text-sm md:text-base xl:text-xl dark:text-gray-400">
              We&apos;d love to hear from you! Send us a message and we&apos;ll
              get back to you asap.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-5 w-full md:w-2/3 xl:w-1/2 space-y-2 grid grid-cols-2 items-center gap-x-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 md:!mt-0">
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Textarea
                        placeholder="Let us know your thoughts"
                        className="resize-none"
                        rows={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="col-span-2">
                Submit
              </Button>
            </form>
          </Form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
