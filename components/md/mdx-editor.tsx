"use client";

import Bold from "@tiptap/extension-bold";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import Toolbar from "./toolbar";

type MDXEditorProps = {
  content: string;
  readonly?: boolean;
};

const MDXEditor = ({ content, readonly }: MDXEditorProps) => {
  const [value, setValue] = useState(content);

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Bold.extend({
        renderHTML({ HTMLAttributes }) {
          return ["b", HTMLAttributes, 0];
        },
      }),
    ],
    content: value,
    editable: !readonly,
    editorProps: {
      attributes: {
        class:
          "prose focus:outline-none dark:text-white",
      },
    },
    onUpdate({ editor }) {
      setValue(editor.getHTML());
    },
  });

  return (
    <>
      {!readonly && editor && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className="p-2 border rounded-b-lg focus:outline-none"
      />
    </>
  );
};

export default MDXEditor;
