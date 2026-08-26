import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Node, mergeAttributes } from "@tiptap/core";
import { useEffect, useCallback, useRef, useState } from "react";
import { uploadImage } from "@/lib/image-upload";

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
  fontFamily: "'Switzer', sans-serif",
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

// Body images carry their own dimensions so the browser can reserve space before
// they load, and default to lazy so a post full of pictures does not download all
// of them up front. The article's featured image is rendered separately and stays
// eager, since it is the one the reader sees first.
const BlogImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null },
      height: { default: null },
      loading: { default: "lazy" },
      decoding: { default: "async" },
    };
  },
});

// Pasting from Google Docs or Word can carry images as inline base64. TipTap would
// embed those straight into the post body, where they count against the same 4.5 MB
// ceiling on every save — a few of them and the whole draft stops saving. Uploaded
// images are referenced by a short URL instead, so they never bloat the document.
const DATA_URI_IMG = /<img[^>]+src\s*=\s*["']data:[^"']*["'][^>]*>/gi;

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
  const [notice, setNotice] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" } }),
      BlogImage.configure({ inline: false, allowBase64: false }),
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
          "font-family: 'Switzer', sans-serif",
          "font-size: 0.9rem",
          "line-height: 1.7",
          "color: rgba(255,255,255,0.85)",
        ].join(";"),
      },
      transformPastedHTML: (html) => {
        const stripped = html.replace(DATA_URI_IMG, "");
        if (stripped !== html) {
          setNotice(
            "Images pasted straight from Google Docs or Word can't be saved with the post, so they were left out. Save them to your computer first, then use Upload IMG or drag them in."
          );
        }
        return stripped;
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
              handleFiles([file]);
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
            handleFiles(imageFiles);
            return true;
          }
        }
        return false;
      },
    },
  });

  // Uploads run one at a time on purpose. They all insert at the caret, so letting
  // them finish out of order would scramble the order of a batch of dropped images.
  const handleFiles = useCallback(async (files: File[]) => {
    if (!editor) return;
    setUploading(true);
    setNotice(null);
    const failures: string[] = [];

    for (const file of files) {
      try {
        const { url, width, height } = await uploadImage(file);
        editor
          .chain()
          .focus()
          .insertContent({ type: "image", attrs: { src: url, width: width || null, height: height || null } })
          .run();
      } catch (err) {
        failures.push(err instanceof Error ? err.message : `"${file.name}" could not be uploaded.`);
      }
    }

    setUploading(false);
    if (failures.length) setNotice(failures.join(" "));
  }, [editor]);

  const onPickImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) handleFiles(files);
    e.target.value = "";
  }, [handleFiles]);

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
        multiple
        style={{ display: "none" }}
        onChange={onFileChange}
        data-testid="rte-image-file-input"
      />
      <MenuBar editor={editor} onPickImage={onPickImage} uploading={uploading} />
      {notice && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            padding: "0.6rem 0.75rem",
            backgroundColor: "rgba(220,120,60,0.12)",
            borderTop: "1px solid rgba(220,120,60,0.3)",
            borderBottom: "1px solid rgba(220,120,60,0.3)",
            fontFamily: "'Switzer', sans-serif",
            fontSize: "0.75rem",
            lineHeight: 1.5,
            color: "rgba(255,225,205,0.92)",
          }}
          data-testid="rte-notice"
        >
          <span style={{ flex: 1 }}>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,225,205,0.6)",
              cursor: "pointer",
              fontSize: "0.9rem",
              lineHeight: 1,
              padding: 0,
            }}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}
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
            fontFamily: "'Switzer', sans-serif",
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
