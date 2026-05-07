import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Node, mergeAttributes } from "@tiptap/core";
import { useEffect, useCallback, useRef, useState } from "react";

const VIDEO_HOSTS = ["youtube.com", "youtube-nocookie.com", "vimeo.com", "player.vimeo.com", "www.youtube.com", "www.youtube-nocookie.com"];

function isAllowedVideoUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    return VIDEO_HOSTS.some((h) => host === h || host.endsWith("." + h));
  } catch {
    return false;
  }
}

function toEmbedUrl(url: string): string | null {
  if (!isAllowedVideoUrl(url)) return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    if (host.includes("youtube") && !host.includes("nocookie")) {
      const vid = parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
      if (vid) return `https://www.youtube-nocookie.com/embed/${vid}`;
    }
    if (host.includes("vimeo")) {
      const vid = parsed.pathname.split("/").filter(Boolean).pop();
      if (vid) return `https://player.vimeo.com/video/${vid}`;
    }
    return url;
  } catch {
    return null;
  }
}

const VideoEmbed = Node.create({
  name: "videoEmbed",
  group: "block",
  atom: true,
  addAttributes() {
    return { src: { default: null } };
  },
  parseHTML() {
    return [{ tag: "iframe[src]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "video-embed-wrapper", style: "position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:10px;margin:1.5rem 0;" },
      [
        "iframe",
        mergeAttributes(HTMLAttributes, {
          style: "position:absolute;top:0;left:0;width:100%;height:100%;border:none;",
          frameborder: "0",
          allowfullscreen: "true",
          allow: "accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture",
          loading: "lazy",
        }),
      ],
    ];
  },
});

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

async function uploadImageFile(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) return null;
    const { url } = await res.json();
    return url || null;
  } catch {
    return null;
  }
}

function MenuBar({ editor, onPickImage, uploading }: { editor: ReturnType<typeof useEditor>; onPickImage: () => void; uploading: boolean }) {
  if (!editor) return null;

  const addLink = useCallback(() => {
    const url = window.prompt("Link URL:");
    if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addVideo = useCallback(() => {
    const url = window.prompt("YouTube or Vimeo URL:");
    if (!url) return;
    const embedUrl = toEmbedUrl(url);
    if (!embedUrl) {
      alert("Only YouTube and Vimeo URLs are supported.");
      return;
    }
    editor.chain().focus().insertContent({ type: "videoEmbed", attrs: { src: embedUrl } }).run();
  }, [editor]);

  const addImageByUrl = useCallback(() => {
    const url = window.prompt("Image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
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
    { label: uploading ? "Uploading…" : "Upload IMG", action: onPickImage, active: false },
    { label: "IMG URL", action: addImageByUrl, active: false },
    { label: "▶ Video", action: addVideo, active: false },
    { label: "—", action: () => editor.chain().focus().setHorizontalRule().run(), active: false },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.25rem",
        padding: "0.5rem",
        backgroundColor: "rgba(20,18,60,0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px 8px 0 0",
        position: "sticky",
        top: 0,
        zIndex: 20,
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" } }),
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder: "Start writing your blog post..." }),
      VideoEmbed,
    ],
    content: content || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
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
      handlePaste: (_view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              event.preventDefault();
              handleFileUpload(file);
              return true;
            }
          }
        }
        return false;
      },
      handleDrop: (_view, event) => {
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
          if (imageFiles.length > 0) {
            event.preventDefault();
            imageFiles.forEach((f) => handleFileUpload(f));
            return true;
          }
        }
        return false;
      },
    },
  });

  const handleFileUpload = useCallback(async (file: File) => {
    if (!editor) return;
    setUploading(true);
    const url = await uploadImageFile(file);
    setUploading(false);
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    } else {
      alert("Failed to upload image.");
    }
  }, [editor]);

  const onPickImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = "";
  }, [handleFileUpload]);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content]);

  return (
    <div
      style={{
        border: dragActive ? "1px solid rgba(123,30,122,0.7)" : "1px solid rgba(255,255,255,0.12)",
        borderRadius: "8px",
        backgroundColor: dragActive ? "rgba(123,30,122,0.08)" : "rgba(255,255,255,0.04)",
        overflow: "visible",
        position: "relative",
        transition: "border-color 0.15s, background-color 0.15s",
      }}
      onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
      onDrop={() => setDragActive(false)}
      data-testid="rich-text-editor"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onFileChange}
        data-testid="rte-image-file-input"
      />
      <MenuBar editor={editor} onPickImage={onPickImage} uploading={uploading} />
      <EditorContent editor={editor} />
      {dragActive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Drop image to upload
        </div>
      )}
    </div>
  );
}
