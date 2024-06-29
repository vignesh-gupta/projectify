import type { Editor } from "@tiptap/react";
import { Bold, Code, Italic, List } from "lucide-react";
import { Toggle } from "../ui/toggle";

type ToolbarProps = {
  editor: Editor;
};

const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className="border border-input bg-transparent rounded-t-lg space-x-2 p-2">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code className="w-4 h-4" />
      </Toggle>
    </div>
  );
};

export default Toolbar;
