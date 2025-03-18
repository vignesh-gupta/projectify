"use client";

import MDXEditor from "@/components/md/mdx-editor";
import { api } from "@repo/backend/convex/_generated/api";
import { ProjectId } from "@/lib/types";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import { useParams } from "next/navigation";

const ChangeLogPreviewPage = () => {

  const { id } = useParams<ProjectId>()


  const projectDetails = useQuery(api.project.get, { id });

  const changelogs = useQuery(api.changelog.list, {
    projectId: id,
    showPublished: true,
  });

  if (!changelogs || !projectDetails) return <div>Loading...</div>;

  return (
    <section>
      <div className="mx-auto max-w-5xl px-8 py-16 md:px-12 lg:px-16 divide-y prose  dark:text-gray-500 prose-sm prose-headings:font-normal prose-headings:text-xl space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {projectDetails.title} Changelogs
          </h1>
          <p className="text-balance">
            {projectDetails.description ??
              `Explore the latest update featuring essential performance
            enhancements, new customization options, and critical bug fixes
            across our application.`}
          </p>
        </div>

        {!changelogs.length ? (
          <div>No changelogs available</div>
        ) : (
          changelogs.map((entry) => (
            <div key={entry.date} className="grid grid-cols-1 lg:grid-cols-4">
              <div>
                <div className="lg:sticky lg:pb-16 top-6">
                  <div className="pt-8">
                    <time dateTime={entry.date} className="font-semibold">
                      {format(new Date(entry.date), "MMM dd, yyyy")}
                    </time>
                    <p className="pl-2"> - v{entry.version}</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 pt-8">
                <div className="shrink-0">
                  <div className="mx-auto ">
                    <h3 className="text-lg text-primary font-bold my-0">
                      {entry.title}
                    </h3>
                    <MDXEditor content={entry.changes} readonly />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ChangeLogPreviewPage;
