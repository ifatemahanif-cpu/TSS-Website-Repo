import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useCallback } from "react";

const menuBtnStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.6rem",
  letterSpacing: "0.05em",
  padding: "0.35rem 0.5rem",
  backgroundColor: "rgba(255,255,255,0.06)",
  color: "rgba(255,255,255,0.7)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "all 0.15s ease",
};

const menuBtnActiveStyle: React.CSSProperties = {
  ...menuBtnStyle,
  backgroundColor: "rgba(123,30,122,0.4)",
  color: "#FFFFFF",
  borderColor: "rgba(123,30,122,0.6)",
};

function MenuBar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const url = window.prompt("Image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const url = window.prompt("Link URL:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  const buttons = [
    { label: "B", action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { label: "I", action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { label: "H2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
    { label: "H3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }) },
    { label: "•", action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { label: "1.", action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { label: "❝", action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
    { label: "</>", action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive("codeBlock") },
    { label: "Link", action: addLink, active: editor.isActive("link") },
    { label: "IMG", action: addImage, active: false },
    { label: "—", action: () => editor.chain().focus().setHorizontalRule().run(), active: false },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.25rem",
        padding: "0.5rem",
        backgroundColor: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px 8px 0 0",
      }}
      data-testid="rich-text-toolbar"
    >
      {buttons.map((btn, i) => (
        <button
          key={i}
          type="button"
          onClick={btn.action}
          style={btn.active ? menuBtnActiveStyle : menuBtnStyle}
          data-testid={`rte-btn-${btn.label.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: [
          "min-height: 300px",
          "padding: 1rem",
          "outline: none",
          "font-family: 'Inter', sans-serif",
          "font-size: 0.9rem",
          "line-height: 1.7",
          "color: rgba(255,255,255,0.85)",
        ].join(";"),
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content]);

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "8px",
        backgroundColor: "rgba(255,255,255,0.04)",
        overflow: "hidden",
      }}
      data-testid="rich-text-editor"
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
