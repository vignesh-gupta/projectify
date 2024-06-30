"use client";

import { cn } from "@/lib/utils";

import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

import Toolbar from "./toolbar";

type MDXEditorProps = {
  content: string;
  readonly?: boolean;
};

const MDXEditor = ({ content, readonly }: MDXEditorProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      ListItem,
      BulletList,
      CodeBlock,
      Link,
      Italic,
      Bold.extend({
        renderHTML({ HTMLAttributes }) {
          return ["b", HTMLAttributes, 0];
        },
      }),
    ],
    content,
    editable: !readonly,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none dark:text-white",
      },
    },
  });

  return (
    <>
      {!readonly && editor && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        disabled={readonly}
        className={cn("p-2  focus:outline-none", {
          "border rounded-b-lg": !readonly,
        })}
      />
    </>
  );
};

export default MDXEditor;
