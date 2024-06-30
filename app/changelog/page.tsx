"use client";

import MDXEditor from "@/components/md/mdx-editor";

type ChangeLog = {
  version: string;
  date: string;
  title: string;
  changes: string; // will support MDX
};

const changelogs: ChangeLog[] = [
  {
    date: "16 March - 2024",
    title: "80% faster widgets",
    version: "v1.2.0",
    changes: `<ol><li>hello</li></ol>`,
  },
];

const ChangeLogPage = () => {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-8 py-24 md:px-12 lg:px-16 divide-y prose  dark:text-gray-500 prose-sm prose-headings:font-normal prose-headings:text-xl space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Projectify Changelog
          </h1>
          <p className="text-balance">
            Explore the latest update featuring essential performance
            enhancements, new customization options, and critical bug fixes
            across our application.
          </p>
        </div>

        {changelogs.map((entry) => (
          <div key={entry.date} className="grid grid-cols-1 lg:grid-cols-4">
            <div>
              <div className="lg:sticky lg:pb-16 top-24">
                <div className="pt-8">
                  <time dateTime={entry.date} className="font-semibold">
                    {entry.date}
                  </time>
                  <p className="pl-2"> - {entry.version}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 pt-8">
              <div className="flex-shrink-0">
                <div className="mx-auto ">
                  <h1 className="font-semibold text-lg text-primary">
                    {entry.title}
                  </h1>
                  <MDXEditor content={entry.changes} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChangeLogPage;
