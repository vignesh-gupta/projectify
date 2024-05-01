import React from "react";

const features = [
  {
    title: "Task Management",
    description:
      "Easily create, assign, and track tasks to keep your team organized and on track.",
  },
  {
    title: "Multiple Teams & Projects",
    description:
      "Manage multiple teams and projects in one place, keeping everything organized and accessible.",
  },
  {
    title: "Seamless Collaboration",
    description:
      "Invite your team members and collaborate in real-time on projects, tasks, and deadlines.",
  },
  {
    title: "Intuitive Dashboard",
    description:
      "Get a clear overview of project status, upcoming deadlines, and team performance at a glance.",
  },
  {
    title: "Resource Management 🚧",
    description:
      "Share documents, images, and other files securely within the platform, keeping all project-related information in one place.",
  },
  {
    title: "Team Communication 🚧",
    description:
      "Stay connected with your team members through built-in chat and messaging features.",
  },
];

const FeatureSection = () => {
  return (
    <>
      {features.map((feature, index) => (
        <div className="grid gap-1" key={`${feature.title}-${index}`}>
          <h3 className="text-lg font-bold">{feature.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {feature.description}
          </p>
        </div>
      ))}
    </>
  );
};

export default FeatureSection;
