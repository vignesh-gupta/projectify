import { type ClassValue, clsx } from "clsx";
import {
  FileBox,
  Layout,
  ListTodo,
  MessageCircle,
  Settings,
} from "lucide-react";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MetaTagProps = {
  title?: string;
  description?: string;
  SITE_URL?: string;
  keywords?: string[];
};

export function constructMetaTags({
  SITE_URL = "https://projectify.vigneshgupta.tech/",
  description = "Struggling to stay organized and meet deadlines? Projectify is the ultimate free project management tool for you!  Boost your productivity and achieve your goals effortlessly with our intuitive features.  Manage tasks, deadlines, resources, and collaborate seamlessly with your team.  Sign up today and experience the difference!",
  title = "Projectify - Your projects, simplified",
  keywords = [],
}: MetaTagProps): Metadata {
  return {
    title,
    description,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@VighneshGupta9",
      images: "/thumbnail.png",
    },
    openGraph: {
      title,
      description,
      images: "/thumbnail.png",
      type: "website",
      url: SITE_URL,
    },
    metadataBase: new URL(SITE_URL),
    authors: {
      name: "Vighnesh Gupta",
      url: new URL("https://vigneshgupta.tech/"),
    },
    creator: "Vighnesh Gupta",
    keywords: [
      "nextjs",
      "frontend",
      "starter",
      "vignesh",
      "react",
      "vercel",
      "shadcn",
      "clerk",
      ...keywords,
    ],
  };
}

export const getNavLinks = (id: string) => {
  return [
    {
      name: "Dashboard",
      href: `/projects/${id}/dashboard`,
      Icon: Layout,
    },
    {
      name: "Work Items",
      href: `/projects/${id}/work-items`,
      Icon: ListTodo,
    },
    {
      name: "Resources",
      href: `/projects/${id}/resources`,
      Icon: FileBox,
    },
    {
      name: "Messages",
      href: `/projects/${id}/messages`,
      Icon: MessageCircle,
    },
    {
      name: "Settings",
      href: `/projects/${id}/settings`,
      Icon: Settings,
    },
  ];
};
