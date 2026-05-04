import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { BlogPost, BlogCategory } from "@shared/schema";
const RichTextEditor = lazy(() => import("@/components/admin/rich-text-editor"));

type Tab = "submissions" | "settings" | "problems" | "whatwedo" | "team" | "services" | "ourstory" | "joinpage" | "contactpage" | "blogcategories" | "blogposts";

const tabLabels: Record<Tab, string> = {
  submissions: "Form Entries",
  settings: "Site Settings",
  problems: "Problem Section",
  whatwedo: "What We Do",
  team: "Team Members",
  services: "Services",
  ourstory: "Our Story",
  joinpage: "Join Page",
  contactpage: "Contact Page",
  blogcategories: "Blog Categories",
  blogposts: "Blog Posts",
};

const inputStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.85rem",
  color: "#FFFFFF",
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "8px",
  padding: "0.7rem 0.85rem",
  width: "100%",
  outline: "none",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: "80px",
  resize: "vertical",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.55rem",
  color: "rgba(255,255,255,0.5)",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "0.35rem",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "1.25rem",
  marginBottom: "1rem",
};

const btnPrimary: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.6rem",
  letterSpacing: "0.1em",
  color: "#FFFFFF",
  backgroundColor: "#7B1E7A",
  border: "none",
  borderRadius: "6px",
  padding: "0.6rem 1.25rem",
  cursor: "pointer",
};

const btnDanger: React.CSSProperties = {
  ...btnPrimary,
  backgroundColor: "rgba(220,50,50,0.3)",
  fontSize: "0.55rem",
};

function SaveButton({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      style={{ ...btnPrimary, opacity: saving ? 0.6 : 1 }}
      data-testid="button-save"
    >
      {saving ? "SAVING..." : "SAVE CHANGES"}
    </button>
  );
}

function SuccessMessage({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.75rem",
        color: "#4ade80",
        marginLeft: "0.75rem",
      }}
    >
      Saved!
    </span>
  );
}

function SubmissionsViewer() {
  const queryClient = useQueryClient();
  const { data: submissions, isLoading } = useQuery<any[]>({
    queryKey: ["/api/cms/submissions"],
  });
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (isLoading) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>;
  if (!submissions || submissions.length === 0) {
    return <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem" }}>No form submissions yet.</p>;
  }

  const markRead = async (id: number, read: boolean) => {
    await fetch(`/api/cms/submissions/${id}/read`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/submissions"] });
  };

  const deleteSubmission = async (id: number) => {
    if (!confirm("Delete this submission?")) return;
    await fetch(`/api/cms/submissions/${id}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/submissions"] });
    if (expandedId === id) setExpandedId(null);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
      " at " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  };

  const fieldLabels: Record<string, string> = {
    name: "Name",
    email: "Email",
    linkedin: "LinkedIn",
    portfolio: "Portfolio",
    superpower: "Superpower",
    workstyle: "Work Style",
    company: "Company",
    message: "Message",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {submissions.map((sub: any) => {
        const isExpanded = expandedId === sub.id;
        const data = sub.data as Record<string, string>;
        return (
          <div
            key={sub.id}
            style={{
              backgroundColor: sub.read ? "rgba(255,255,255,0.03)" : "rgba(123,30,122,0.08)",
              border: `1px solid ${sub.read ? "rgba(255,255,255,0.06)" : "rgba(123,30,122,0.25)"}`,
              borderRadius: "8px",
              overflow: "hidden",
            }}
            data-testid={`submission-${sub.id}`}
          >
            <div
              onClick={() => {
                setExpandedId(isExpanded ? null : sub.id);
                if (!sub.read) markRead(sub.id, true);
              }}
              style={{
                padding: "0.75rem 1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              {!sub.read && (
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  backgroundColor: "#7B1E7A", flexShrink: 0,
                }} />
              )}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.1em",
                  color: sub.formType === "join" ? "#a78bfa" : "#38bdf8",
                  backgroundColor: sub.formType === "join" ? "rgba(167,139,250,0.12)" : "rgba(56,189,248,0.12)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "4px",
                  flexShrink: 0,
                }}
              >
                {sub.formType === "join" ? "JOIN" : "TALK"}
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.8rem",
                color: "#FFFFFF", flex: 1,
                fontWeight: sub.read ? 400 : 600,
              }}>
                {data.name || "—"}
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
                color: "rgba(255,255,255,0.4)",
              }}>
                {data.email || ""}
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                color: "rgba(255,255,255,0.3)", flexShrink: 0,
              }}>
                {formatDate(sub.createdAt)}
              </span>
            </div>

            {isExpanded && (
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                padding: "1rem",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "0.5rem 1rem" }}>
                  {Object.entries(data).map(([key, value]) => (
                    <div key={key} style={{ display: "contents" }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                        letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase", paddingTop: "0.15rem",
                      }}>
                        {fieldLabels[key] || key}
                      </span>
                      <span style={{
                        fontFamily: "'Inter', sans-serif", fontSize: "0.8rem",
                        color: "#FFFFFF", whiteSpace: "pre-wrap", wordBreak: "break-word",
                      }}>
                        {value || "—"}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <button
                    onClick={() => markRead(sub.id, !sub.read)}
                    style={{
                      ...btnPrimary,
                      backgroundColor: "rgba(255,255,255,0.08)",
                      fontSize: "0.55rem",
                    }}
                    data-testid={`button-toggle-read-${sub.id}`}
                  >
                    {sub.read ? "MARK UNREAD" : "MARK READ"}
                  </button>
                  <button
                    onClick={() => deleteSubmission(sub.id)}
                    style={btnDanger}
                    data-testid={`button-delete-submission-${sub.id}`}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SettingsEditor() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery<Record<string, any>>({
    queryKey: ["/api/cms/settings"],
  });
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    if (settings) setFormData(settings);
  }, [settings]);

  if (isLoading) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>;

  const saveSection = async (key: string) => {
    setSaving(true);
    await fetch(`/api/cms/settings/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData[key]),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/settings"] });
    setSaving(false);
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  const updateField = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const sections = [
    {
      key: "hero",
      title: "Hero Section",
      fields: [
        { name: "label", label: "Label", type: "text" },
        { name: "heading", label: "Heading (HTML allowed)", type: "text" },
        { name: "subheading", label: "Subheading", type: "textarea" },
        { name: "ctaText", label: "CTA Button Text", type: "text" },
        { name: "tickerLabel", label: "Ticker Label", type: "text" },
        { name: "brands", label: "Brands (comma-separated)", type: "brands" },
      ],
    },
    {
      key: "problem",
      title: "Problem Section",
      fields: [
        { name: "label", label: "Section Label", type: "text" },
        { name: "heading", label: "Heading (HTML allowed)", type: "text" },
        { name: "subheading", label: "Subheading", type: "text" },
      ],
    },
    {
      key: "origin",
      title: "What We Do Section",
      fields: [
        { name: "label", label: "Section Label", type: "text" },
        { name: "heading", label: "Heading", type: "text" },
        { name: "subtitle", label: "Subtitle", type: "textarea" },
      ],
    },
    {
      key: "team",
      title: "Team Section",
      fields: [
        { name: "label", label: "Section Label", type: "text" },
        { name: "headingLine1", label: "Heading Line 1", type: "text" },
        { name: "headingLine2", label: "Heading Line 2 (italic)", type: "text" },
        { name: "intro", label: "Intro Paragraph", type: "textarea" },
      ],
    },
    {
      key: "services",
      title: "Services Section",
      fields: [
        { name: "label", label: "Section Label", type: "text" },
        { name: "heading", label: "Heading", type: "text" },
        { name: "subheading", label: "Subheading", type: "text" },
      ],
    },
    {
      key: "cta",
      title: "CTA Section",
      fields: [
        { name: "label", label: "Section Label", type: "text" },
        { name: "heading", label: "Heading", type: "text" },
        { name: "paragraph", label: "Paragraph", type: "textarea" },
        { name: "buttonText", label: "Button Text", type: "text" },
        { name: "buttonLink", label: "Button Link", type: "text" },
      ],
    },
  ];

  return (
    <div>
      {sections.map((section) => (
        <div key={section.key} style={cardStyle}>
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: "1rem",
            }}
          >
            {section.title}
          </h3>
          {section.fields.map((field) => (
            <div key={field.name} style={{ marginBottom: "0.75rem" }}>
              <label style={labelStyle}>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  value={formData[section.key]?.[field.name] || ""}
                  onChange={(e) => updateField(section.key, field.name, e.target.value)}
                  style={textareaStyle}
                  data-testid={`input-settings-${section.key}-${field.name}`}
                />
              ) : field.type === "brands" ? (
                <input
                  type="text"
                  value={(formData[section.key]?.[field.name] || []).join(", ")}
                  onChange={(e) =>
                    updateField(
                      section.key,
                      field.name,
                      e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean)
                    )
                  }
                  style={inputStyle}
                  data-testid={`input-settings-${section.key}-${field.name}`}
                />
              ) : (
                <input
                  type="text"
                  value={formData[section.key]?.[field.name] || ""}
                  onChange={(e) => updateField(section.key, field.name, e.target.value)}
                  style={inputStyle}
                  data-testid={`input-settings-${section.key}-${field.name}`}
                />
              )}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center" }}>
            <SaveButton onClick={() => saveSection(section.key)} saving={saving} />
            <SuccessMessage show={saved === section.key} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProblemsEditor() {
  const queryClient = useQueryClient();
  const { data: problems = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/cms/problems"],
  });
  const [editData, setEditData] = useState<Record<number, any>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);

  useEffect(() => {
    if (problems.length) {
      const map: Record<number, any> = {};
      problems.forEach((p) => (map[p.id] = { ...p }));
      setEditData(map);
    }
  }, [problems]);

  if (isLoading) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>;

  const saveProblem = async (id: number) => {
    setSaving(id);
    await fetch(`/api/cms/problems/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData[id]),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/problems"] });
    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const deleteProblem = async (id: number) => {
    if (!confirm("Delete this problem?")) return;
    await fetch(`/api/cms/problems/${id}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/problems"] });
  };

  const addProblem = async () => {
    const nextNum = String(problems.length + 1).padStart(2, "0");
    await fetch("/api/cms/problems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayId: nextNum,
        text: "New problem statement",
        sortOrder: problems.length,
      }),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/problems"] });
  };

  return (
    <div>
      {problems.map((p: any) => (
        <div key={p.id} style={cardStyle}>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ width: "60px" }}>
              <label style={labelStyle}>ID</label>
              <input
                type="text"
                value={editData[p.id]?.displayId || ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    [p.id]: { ...prev[p.id], displayId: e.target.value },
                  }))
                }
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Text</label>
              <input
                type="text"
                value={editData[p.id]?.text || ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    [p.id]: { ...prev[p.id], text: e.target.value },
                  }))
                }
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <SaveButton onClick={() => saveProblem(p.id)} saving={saving === p.id} />
            <SuccessMessage show={saved === p.id} />
            <button onClick={() => deleteProblem(p.id)} style={btnDanger}>DELETE</button>
          </div>
        </div>
      ))}
      <button onClick={addProblem} style={btnPrimary} data-testid="button-add-problem">
        + ADD PROBLEM
      </button>
    </div>
  );
}

function WhatWeDoEditor() {
  const queryClient = useQueryClient();
  const { data: blocks = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/cms/whatwedo"],
  });
  const [editData, setEditData] = useState<Record<number, any>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);

  useEffect(() => {
    if (blocks.length) {
      const map: Record<number, any> = {};
      blocks.forEach((b) => (map[b.id] = { ...b }));
      setEditData(map);
    }
  }, [blocks]);

  if (isLoading) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>;

  const saveBlock = async (id: number) => {
    setSaving(id);
    await fetch(`/api/cms/whatwedo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData[id]),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/whatwedo"] });
    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const deleteBlock = async (id: number) => {
    if (!confirm("Delete this block?")) return;
    await fetch(`/api/cms/whatwedo/${id}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/whatwedo"] });
  };

  const addBlock = async () => {
    await fetch("/api/cms/whatwedo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New block title",
        description: "Description here",
        teaser: "Case study teaser",
        expanded: "Full case study text",
        sortOrder: blocks.length,
      }),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/whatwedo"] });
  };

  const updateField = (id: number, field: string, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <div>
      {blocks.map((b: any) => (
        <div key={b.id} style={cardStyle}>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              value={editData[b.id]?.title || ""}
              onChange={(e) => updateField(b.id, "title", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={editData[b.id]?.description || ""}
              onChange={(e) => updateField(b.id, "description", e.target.value)}
              style={textareaStyle}
            />
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Case Study Teaser</label>
            <textarea
              value={editData[b.id]?.teaser || ""}
              onChange={(e) => updateField(b.id, "teaser", e.target.value)}
              style={textareaStyle}
            />
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Case Study Expanded</label>
            <textarea
              value={editData[b.id]?.expanded || ""}
              onChange={(e) => updateField(b.id, "expanded", e.target.value)}
              style={{ ...textareaStyle, minHeight: "120px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <SaveButton onClick={() => saveBlock(b.id)} saving={saving === b.id} />
            <SuccessMessage show={saved === b.id} />
            <button onClick={() => deleteBlock(b.id)} style={btnDanger}>DELETE</button>
          </div>
        </div>
      ))}
      <button onClick={addBlock} style={btnPrimary} data-testid="button-add-whatwedo">
        + ADD BLOCK
      </button>
    </div>
  );
}

function TeamEditor() {
  const queryClient = useQueryClient();
  const { data: members = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/cms/team"],
  });
  const [editData, setEditData] = useState<Record<number, any>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);
  const [uploading, setUploading] = useState<number | null>(null);

  useEffect(() => {
    if (members.length) {
      const map: Record<number, any> = {};
      members.forEach((m) => (map[m.id] = { ...m }));
      setEditData(map);
    }
  }, [members]);

  if (isLoading) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>;

  const saveMember = async (id: number) => {
    setSaving(id);
    await fetch(`/api/cms/team/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData[id]),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/team"] });
    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const deleteMember = async (id: number) => {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/cms/team/${id}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/team"] });
  };

  const uploadImage = async (id: number, file: File) => {
    setUploading(id);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const { url } = await res.json();
    setEditData((prev) => ({
      ...prev,
      [id]: { ...prev[id], image: url },
    }));
    setUploading(null);
  };

  const addMember = async () => {
    await fetch("/api/cms/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "New Team Member",
        image: "",
        decisionsLed: "",
        brands: "",
        brandsLabel: "Brands",
        whatSheBrings: [""],
        sortOrder: members.length,
      }),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/team"] });
  };

  const updateField = (id: number, field: string, value: any) => {
    setEditData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <div>
      {members.map((m: any) => (
        <div key={m.id} style={cardStyle}>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,255,255,0.15)" }}>
              {editData[m.id]?.image && (
                <img src={editData[m.id].image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                value={editData[m.id]?.name || ""}
                onChange={(e) => updateField(m.id, "name", e.target.value)}
                style={inputStyle}
              />
              <div style={{ marginTop: "0.5rem" }}>
                <label style={labelStyle}>Photo</label>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <input
                    type="text"
                    value={editData[m.id]?.image || ""}
                    onChange={(e) => updateField(m.id, "image", e.target.value)}
                    style={{ ...inputStyle, fontSize: "0.75rem" }}
                    placeholder="Image URL or upload"
                  />
                  <label
                    style={{
                      ...btnPrimary,
                      fontSize: "0.5rem",
                      padding: "0.5rem 0.75rem",
                      whiteSpace: "nowrap",
                      opacity: uploading === m.id ? 0.6 : 1,
                    }}
                  >
                    {uploading === m.id ? "..." : "UPLOAD"}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) uploadImage(m.id, f);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Decisions Led</label>
            <input
              type="text"
              value={editData[m.id]?.decisionsLed || ""}
              onChange={(e) => updateField(m.id, "decisionsLed", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Brands</label>
            <input
              type="text"
              value={editData[m.id]?.brands || ""}
              onChange={(e) => updateField(m.id, "brands", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Bio</label>
            <textarea
              value={(editData[m.id]?.whatSheBrings || []).join("\n\n")}
              onChange={(e) =>
                updateField(m.id, "whatSheBrings", e.target.value.split("\n\n").filter(Boolean))
              }
              style={{ ...textareaStyle, minHeight: "100px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <SaveButton onClick={() => saveMember(m.id)} saving={saving === m.id} />
            <SuccessMessage show={saved === m.id} />
            <button onClick={() => deleteMember(m.id)} style={btnDanger}>DELETE</button>
          </div>
        </div>
      ))}
      <button onClick={addMember} style={btnPrimary} data-testid="button-add-team">
        + ADD MEMBER
      </button>
    </div>
  );
}

function ServicesEditor() {
  const queryClient = useQueryClient();
  const { data: servicesList = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/cms/services"],
  });
  const [editData, setEditData] = useState<Record<number, any>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);

  useEffect(() => {
    if (servicesList.length) {
      const map: Record<number, any> = {};
      servicesList.forEach((s) => (map[s.id] = { ...s }));
      setEditData(map);
    }
  }, [servicesList]);

  if (isLoading) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>;

  const saveService = async (id: number) => {
    setSaving(id);
    await fetch(`/api/cms/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData[id]),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/services"] });
    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const deleteService = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/cms/services/${id}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/services"] });
  };

  const addService = async () => {
    await fetch("/api/cms/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: `service-${Date.now()}`,
        title: "New Service",
        subtitle: "Service description",
        items: ["Item 1"],
        sortOrder: servicesList.length,
      }),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/services"] });
  };

  const updateField = (id: number, field: string, value: any) => {
    setEditData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <div>
      {servicesList.map((s: any) => (
        <div key={s.id} style={cardStyle}>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              value={editData[s.id]?.title || ""}
              onChange={(e) => updateField(s.id, "title", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Subtitle</label>
            <textarea
              value={editData[s.id]?.subtitle || ""}
              onChange={(e) => updateField(s.id, "subtitle", e.target.value)}
              style={textareaStyle}
            />
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Items (one per line)</label>
            <textarea
              value={(editData[s.id]?.items || []).join("\n")}
              onChange={(e) =>
                updateField(s.id, "items", e.target.value.split("\n").filter(Boolean))
              }
              style={textareaStyle}
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <SaveButton onClick={() => saveService(s.id)} saving={saving === s.id} />
            <SuccessMessage show={saved === s.id} />
            <button onClick={() => deleteService(s.id)} style={btnDanger}>DELETE</button>
          </div>
        </div>
      ))}
      <button onClick={addService} style={btnPrimary} data-testid="button-add-service">
        + ADD SERVICE
      </button>
    </div>
  );
}

function OurStoryEditor() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery<Record<string, any>>({
    queryKey: ["/api/cms/settings"],
  });
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    if (settings?.ourStory) setFormData(settings.ourStory);
  }, [settings]);

  if (isLoading) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>;

  const save = async () => {
    setSaving(true);
    setSaveError(false);
    const res = await fetch("/api/cms/settings/ourStory", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSaving(false);
    if (!res.ok) { setSaveError(true); return; }
    queryClient.invalidateQueries({ queryKey: ["/api/cms/settings"] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const storyFields = [
    { key: "label", label: "Section Label", multiline: false },
    { key: "headingMain", label: "Heading (main)", multiline: false },
    { key: "headingItalic", label: "Heading (italic part)", multiline: false },
    { key: "opening", label: "Opening paragraph", multiline: true },
    { key: "misplacedVoice", label: "Misplaced voice paragraph", multiline: true },
    { key: "photocopy", label: "Photocopy paragraph", multiline: true },
    { key: "person1", label: "Person 1 (writer)", multiline: true },
    { key: "person2", label: "Person 2 (pitch deck)", multiline: true },
    { key: "person3", label: "Person 3 (smartest person)", multiline: true },
    { key: "notBoardroom", label: "Not a boardroom", multiline: true },
    { key: "slowlyThenAtOnce", label: "Slowly then at once", multiline: true },
    { key: "notJustHer", label: "Not just her", multiline: false },
    { key: "sameWeight", label: "Same quiet weight", multiline: true },
    { key: "stoppedWaiting", label: "Stopped waiting", multiline: true },
    { key: "noAgency", label: "No agency", multiline: true },
    { key: "threeHumans", label: "Three humans", multiline: true },
    { key: "bigQuestion", label: "The big question", multiline: true },
    { key: "notBornFromBusiness", label: "Not born from business", multiline: true },
    { key: "collectiveExhale", label: "Collective exhale", multiline: false },
    { key: "interdisciplinary", label: "Interdisciplinary", multiline: true },
    { key: "nowTheyDo", label: "Now they do", multiline: true },
    { key: "dontClaimAnswers", label: "Don't claim answers", multiline: true },
    { key: "closing", label: "Closing line", multiline: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {storyFields.map((f) => (
        <div key={f.key}>
          <label style={labelStyle}>{f.label}</label>
          {f.multiline ? (
            <textarea
              style={{ ...inputStyle, minHeight: "80px" }}
              value={formData[f.key] || ""}
              onChange={(e) => update(f.key, e.target.value)}
              data-testid={`input-ourstory-${f.key}`}
            />
          ) : (
            <input
              style={inputStyle}
              value={formData[f.key] || ""}
              onChange={(e) => update(f.key, e.target.value)}
              data-testid={`input-ourstory-${f.key}`}
            />
          )}
        </div>
      ))}
      {saveError && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#f87171" }}>Save failed. Please try again.</span>}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <SaveButton onClick={save} saving={saving} />
        <SuccessMessage show={saved} />
      </div>
    </div>
  );
}

function JoinPageEditor() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery<Record<string, any>>({
    queryKey: ["/api/cms/settings"],
  });
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    if (settings?.join) setFormData(settings.join);
  }, [settings]);

  if (isLoading) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>;

  const save = async () => {
    setSaving(true);
    setSaveError(false);
    const res = await fetch("/api/cms/settings/join", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSaving(false);
    if (!res.ok) { setSaveError(true); return; }
    queryClient.invalidateQueries({ queryKey: ["/api/cms/settings"] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayItem = (field: string, index: number, prop: string, value: string) => {
    setFormData((prev) => {
      const arr = [...(prev[field] || [])];
      arr[index] = { ...arr[index], [prop]: value };
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field: string, template: Record<string, string>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), template],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_: any, i: number) => i !== index),
    }));
  };

  const renderListEditor = (field: string, label: string, hasLabel = false) => {
    const items = formData[field] || [];
    return (
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ ...labelStyle, fontSize: "0.7rem", marginBottom: "0.75rem" }}>{label}</label>
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            {hasLabel && (
              <div style={{ marginBottom: "0.5rem" }}>
                <label style={labelStyle}>Badge Label</label>
                <input
                  style={inputStyle}
                  value={item.label || ""}
                  onChange={(e) => updateArrayItem(field, idx, "label", e.target.value)}
                />
              </div>
            )}
            <div style={{ marginBottom: "0.5rem" }}>
              <label style={labelStyle}>Title</label>
              <input
                style={inputStyle}
                value={item.title || ""}
                onChange={(e) => updateArrayItem(field, idx, "title", e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <label style={labelStyle}>Description</label>
              <textarea
                style={{ ...inputStyle, minHeight: "60px" }}
                value={item.body || ""}
                onChange={(e) => updateArrayItem(field, idx, "body", e.target.value)}
              />
            </div>
            <button onClick={() => removeArrayItem(field, idx)} style={btnDanger}>REMOVE</button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem(field, hasLabel ? { label: "", title: "", body: "" } : { title: "", body: "" })}
          style={{ ...btnPrimary, fontSize: "0.55rem" }}
        >
          + ADD ITEM
        </button>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={labelStyle}>Section Label</label>
        <input style={inputStyle} value={formData.label || ""} onChange={(e) => update("label", e.target.value)} data-testid="input-join-label" />
      </div>
      <div>
        <label style={labelStyle}>Heading (main)</label>
        <input style={inputStyle} value={formData.headingMain || ""} onChange={(e) => update("headingMain", e.target.value)} data-testid="input-join-headingMain" />
      </div>
      <div>
        <label style={labelStyle}>Heading (italic)</label>
        <input style={inputStyle} value={formData.headingItalic || ""} onChange={(e) => update("headingItalic", e.target.value)} data-testid="input-join-headingItalic" />
      </div>
      <div>
        <label style={labelStyle}>Intro Paragraphs (one per line)</label>
        <textarea
          style={{ ...inputStyle, minHeight: "100px" }}
          value={(formData.introParagraphs || []).join("\n\n")}
          onChange={(e) => update("introParagraphs", e.target.value.split("\n\n").filter((s: string) => s.trim()))}
          data-testid="input-join-introParagraphs"
        />
      </div>
      <div>
        <label style={labelStyle}>"Third space" line</label>
        <input style={inputStyle} value={formData.thirdSpace || ""} onChange={(e) => update("thirdSpace", e.target.value)} />
      </div>
      <div>
        <label style={labelStyle}>Operating Principles (comma-separated)</label>
        <input
          style={inputStyle}
          value={(formData.principles || []).join(", ")}
          onChange={(e) => update("principles", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))}
          data-testid="input-join-principles"
        />
      </div>

      {renderListEditor("collectiveAdvantages", "Collective Advantages")}
      
      <div>
        <label style={labelStyle}>Benefits Intro</label>
        <textarea style={{ ...inputStyle, minHeight: "60px" }} value={formData.benefitsIntro || ""} onChange={(e) => update("benefitsIntro", e.target.value)} />
      </div>

      {renderListEditor("memberBenefits", "Member Benefits")}

      <div>
        <label style={labelStyle}>Levels Intro</label>
        <input style={inputStyle} value={formData.levelsIntro || ""} onChange={(e) => update("levelsIntro", e.target.value)} />
      </div>

      {renderListEditor("levels", "Membership Levels", true)}

      <div>
        <label style={labelStyle}>Levels Footer</label>
        <input style={inputStyle} value={formData.levelsFooter || ""} onChange={(e) => update("levelsFooter", e.target.value)} />
      </div>
      <div>
        <label style={labelStyle}>How to Join Intro</label>
        <textarea style={{ ...inputStyle, minHeight: "60px" }} value={formData.howToJoinIntro || ""} onChange={(e) => update("howToJoinIntro", e.target.value)} />
      </div>
      <div>
        <label style={labelStyle}>How to Join Button Text</label>
        <input style={inputStyle} value={formData.howToJoinButton || ""} onChange={(e) => update("howToJoinButton", e.target.value)} />
      </div>

      {saveError && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#f87171" }}>Save failed. Please try again.</span>}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <SaveButton onClick={save} saving={saving} />
        <SuccessMessage show={saved} />
      </div>
    </div>
  );
}

function ContactPageEditor() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery<Record<string, any>>({
    queryKey: ["/api/cms/settings"],
  });
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    if (settings?.contact) setFormData(settings.contact);
  }, [settings]);

  if (isLoading) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>;

  const save = async () => {
    setSaving(true);
    setSaveError(false);
    const res = await fetch("/api/cms/settings/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSaving(false);
    if (!res.ok) { setSaveError(true); return; }
    queryClient.invalidateQueries({ queryKey: ["/api/cms/settings"] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactFields = [
    { key: "joinHeadingMain", label: "Join Section — Heading (main)" },
    { key: "joinHeadingItalic", label: "Join Section — Heading (italic)" },
    { key: "joinIntro", label: "Join Section — Intro text", multiline: true },
    { key: "joinSuccessTitle", label: "Join Section — Success title" },
    { key: "joinSuccessBody", label: "Join Section — Success body" },
    { key: "talkHeadingMain", label: "Talk Section — Heading (main)" },
    { key: "talkHeadingItalic", label: "Talk Section — Heading (italic)" },
    { key: "talkIntro", label: "Talk Section — Intro text", multiline: true },
    { key: "talkSuccessTitle", label: "Talk Section — Success title" },
    { key: "talkSuccessBody", label: "Talk Section — Success body" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {contactFields.map((f) => (
        <div key={f.key}>
          <label style={labelStyle}>{f.label}</label>
          {f.multiline ? (
            <textarea
              style={{ ...inputStyle, minHeight: "80px" }}
              value={formData[f.key] || ""}
              onChange={(e) => update(f.key, e.target.value)}
              data-testid={`input-contact-${f.key}`}
            />
          ) : (
            <input
              style={inputStyle}
              value={formData[f.key] || ""}
              onChange={(e) => update(f.key, e.target.value)}
              data-testid={`input-contact-${f.key}`}
            />
          )}
        </div>
      ))}
      {saveError && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#f87171" }}>Save failed. Please try again.</span>}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <SaveButton onClick={save} saving={saving} />
        <SuccessMessage show={saved} />
      </div>
    </div>
  );
}

function BlogCategoriesEditor() {
  const queryClient = useQueryClient();
  const { data: categories = [], isLoading } = useQuery<BlogCategory[]>({
    queryKey: ["/api/cms/blog/categories"],
  });
  const [editData, setEditData] = useState<Record<number, Partial<BlogCategory>>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);

  useEffect(() => {
    if (categories.length) {
      const map: Record<number, Partial<BlogCategory>> = {};
      categories.forEach((c) => (map[c.id] = { ...c }));
      setEditData(map);
    }
  }, [categories]);

  if (isLoading) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>;

  const saveCategory = async (id: number) => {
    setSaving(id);
    const res = await fetch(`/api/cms/blog/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData[id]),
    });
    setSaving(null);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Save failed" }));
      alert(err.message || "Failed to save category");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["/api/cms/blog/categories"] });
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const deleteCategory = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/cms/blog/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Delete failed" }));
      alert(err.message || "Failed to delete category");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["/api/cms/blog/categories"] });
  };

  const addCategory = async () => {
    await fetch("/api/cms/blog/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `New Category ${Date.now()}`,
        description: "",
        sortOrder: categories.length,
      }),
    });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/blog/categories"] });
  };

  const updateField = (id: number, field: string, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <div>
      {categories.map((c) => (
        <div key={c.id} style={cardStyle}>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                value={editData[c.id]?.name || ""}
                onChange={(e) => updateField(c.id, "name", e.target.value)}
                style={inputStyle}
                data-testid={`input-blog-category-name-${c.id}`}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Slug</label>
              <input
                type="text"
                value={editData[c.id]?.slug || ""}
                onChange={(e) => updateField(c.id, "slug", e.target.value)}
                style={inputStyle}
                data-testid={`input-blog-category-slug-${c.id}`}
              />
            </div>
            <div style={{ width: "80px" }}>
              <label style={labelStyle}>Order</label>
              <input
                type="number"
                value={editData[c.id]?.sortOrder ?? 0}
                onChange={(e) => updateField(c.id, "sortOrder", e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={editData[c.id]?.description || ""}
              onChange={(e) => updateField(c.id, "description", e.target.value)}
              style={textareaStyle}
              data-testid={`input-blog-category-desc-${c.id}`}
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <SaveButton onClick={() => saveCategory(c.id)} saving={saving === c.id} />
            <SuccessMessage show={saved === c.id} />
            <button onClick={() => deleteCategory(c.id)} style={btnDanger} data-testid={`button-delete-category-${c.id}`}>DELETE</button>
          </div>
        </div>
      ))}
      <button onClick={addCategory} style={btnPrimary} data-testid="button-add-blog-category">
        + ADD CATEGORY
      </button>
    </div>
  );
}

function BlogPostsEditor() {
  const queryClient = useQueryClient();
  const { data: postsData, isLoading } = useQuery<{ posts: BlogPost[]; total: number; page: number; totalPages: number }>({
    queryKey: ["/api/cms/blog/posts"],
  });
  const { data: categories = [] } = useQuery<BlogCategory[]>({
    queryKey: ["/api/cms/blog/categories"],
  });
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);

  const posts = postsData?.posts || [];

  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return "—";
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name || "—";
  };

  const formatDate = (dateStr: string | Date | null) => {
    if (!dateStr) return "—";
    const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const startEditing = async (postId: number) => {
    const res = await fetch(`/api/cms/blog/posts/${postId}`);
    if (!res.ok) {
      alert("Failed to load post");
      return;
    }
    const post = await res.json();
    setEditingPost({ ...post });
    setEditingPostId(postId);
    setSeoOpen(false);
  };

  const createNewPost = async () => {
    const res = await fetch("/api/cms/blog/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Untitled Post",
        slug: `untitled-${Date.now()}`,
        content: "",
        excerpt: "",
        status: "draft",
        authorName: "The Story Shapers",
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Create failed" }));
      alert(err.message || "Failed to create post");
      return;
    }
    const post = await res.json();
    queryClient.invalidateQueries({ queryKey: ["/api/cms/blog/posts"] });
    setEditingPost({ ...post });
    setEditingPostId(post.id);
    setSeoOpen(false);
  };

  const savePost = async () => {
    if (!editingPost) return;
    setSaving(true);
    const res = await fetch(`/api/cms/blog/posts/${editingPostId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingPost),
    });
    setSaving(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Save failed" }));
      alert(err.message || "Failed to save post");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["/api/cms/blog/posts"] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deletePost = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/cms/blog/posts/${id}`, { method: "DELETE" });
    queryClient.invalidateQueries({ queryKey: ["/api/cms/blog/posts"] });
    if (editingPostId === id) {
      setEditingPostId(null);
      setEditingPost(null);
    }
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        alert("Failed to upload image");
        return;
      }
      const { url } = await res.json();
      setEditingPost((prev) => prev ? { ...prev, featuredImage: url } : prev);
    } finally {
      setUploading(false);
    }
  };

  const updatePostField = (field: string, value: string | number | null) => {
    setEditingPost((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  if (isLoading) return <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>;

  if (editingPost) {
    return (
      <div>
        <button
          onClick={() => { setEditingPostId(null); setEditingPost(null); }}
          style={{
            ...btnPrimary,
            backgroundColor: "rgba(255,255,255,0.08)",
            marginBottom: "1.5rem",
            fontSize: "0.55rem",
          }}
          data-testid="button-back-to-posts"
        >
          &larr; BACK TO LIST
        </button>

        <div style={cardStyle}>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              value={editingPost.title || ""}
              onChange={(e) => {
                updatePostField("title", e.target.value);
                if (!editingPost.slug || editingPost.slug === generateSlug(editingPost.title || "") || editingPost.slug.startsWith("untitled-")) {
                  updatePostField("slug", generateSlug(e.target.value));
                }
              }}
              style={inputStyle}
              data-testid="input-post-title"
            />
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Slug</label>
            <input
              type="text"
              value={editingPost.slug || ""}
              onChange={(e) => updatePostField("slug", e.target.value)}
              style={{ ...inputStyle, fontSize: "0.75rem" }}
              data-testid="input-post-slug"
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Author Name</label>
              <input
                type="text"
                value={editingPost.authorName || ""}
                onChange={(e) => updatePostField("authorName", e.target.value)}
                style={inputStyle}
                data-testid="input-post-author"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Category</label>
              <select
                value={editingPost.categoryId || ""}
                onChange={(e) => updatePostField("categoryId", e.target.value ? parseInt(e.target.value) : null)}
                style={inputStyle}
                data-testid="select-post-category"
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Status</label>
              <select
                value={editingPost.status || "draft"}
                onChange={(e) => updatePostField("status", e.target.value)}
                style={inputStyle}
                data-testid="select-post-status"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Publish Date</label>
              <input
                type="date"
                value={editingPost.publishedAt ? new Date(editingPost.publishedAt).toISOString().split("T")[0] : ""}
                onChange={(e) => updatePostField("publishedAt", e.target.value ? new Date(e.target.value).toISOString() : null)}
                style={inputStyle}
                data-testid="input-post-publish-date"
              />
            </div>
          </div>

          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Featured Image</label>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input
                type="text"
                value={editingPost.featuredImage || ""}
                onChange={(e) => updatePostField("featuredImage", e.target.value)}
                style={{ ...inputStyle, fontSize: "0.75rem" }}
                placeholder="Image URL or upload"
                data-testid="input-post-featured-image"
              />
              <label
                style={{
                  ...btnPrimary,
                  fontSize: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  whiteSpace: "nowrap",
                  opacity: uploading ? 0.6 : 1,
                }}
              >
                {uploading ? "..." : "UPLOAD"}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadImage(f);
                  }}
                  data-testid="input-post-upload-image"
                />
              </label>
            </div>
            {editingPost.featuredImage && (
              <div style={{ marginTop: "0.5rem", maxWidth: "200px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                <img src={editingPost.featuredImage} alt="" style={{ width: "100%", height: "auto" }} />
              </div>
            )}
          </div>

          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Excerpt</label>
            <textarea
              value={editingPost.excerpt || ""}
              onChange={(e) => updatePostField("excerpt", e.target.value)}
              style={textareaStyle}
              placeholder="Brief summary of the post..."
              data-testid="input-post-excerpt"
            />
          </div>

          <div style={{ marginBottom: "0.75rem" }}>
            <label style={labelStyle}>Content</label>
            <Suspense fallback={<div style={{ color: "rgba(255,255,255,0.5)", padding: "1rem" }}>Loading editor...</div>}>
              <RichTextEditor
                content={editingPost.content || ""}
                onChange={(html) => updatePostField("content", html)}
              />
            </Suspense>
          </div>

          <div style={{ marginBottom: "0.75rem" }}>
            <button
              onClick={() => setSeoOpen(!seoOpen)}
              style={{
                ...btnPrimary,
                backgroundColor: "rgba(255,255,255,0.06)",
                fontSize: "0.55rem",
                width: "100%",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              data-testid="button-toggle-seo"
            >
              <span>SEO SETTINGS</span>
              <span>{seoOpen ? "▲" : "▼"}</span>
            </button>

            {seoOpen && (
              <div style={{ ...cardStyle, marginTop: "0.5rem", backgroundColor: "rgba(255,255,255,0.02)" }}>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={labelStyle}>Meta Title</label>
                  <input
                    type="text"
                    value={editingPost.metaTitle || ""}
                    onChange={(e) => updatePostField("metaTitle", e.target.value)}
                    style={inputStyle}
                    placeholder="Custom page title for search engines"
                    data-testid="input-post-meta-title"
                  />
                </div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={labelStyle}>Meta Description</label>
                  <textarea
                    value={editingPost.metaDescription || ""}
                    onChange={(e) => updatePostField("metaDescription", e.target.value)}
                    style={{ ...textareaStyle, minHeight: "60px" }}
                    placeholder="Description shown in search results"
                    data-testid="input-post-meta-description"
                  />
                </div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={labelStyle}>OG Image URL</label>
                  <input
                    type="text"
                    value={editingPost.ogImage || ""}
                    onChange={(e) => updatePostField("ogImage", e.target.value)}
                    style={inputStyle}
                    placeholder="Image URL for social sharing"
                    data-testid="input-post-og-image"
                  />
                </div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={labelStyle}>Focus Keyword</label>
                  <input
                    type="text"
                    value={editingPost.focusKeyword || ""}
                    onChange={(e) => updatePostField("focusKeyword", e.target.value)}
                    style={inputStyle}
                    placeholder="Primary keyword for SEO"
                    data-testid="input-post-focus-keyword"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Canonical URL</label>
                  <input
                    type="text"
                    value={editingPost.canonicalUrl || ""}
                    onChange={(e) => updatePostField("canonicalUrl", e.target.value)}
                    style={inputStyle}
                    placeholder="https://..."
                    data-testid="input-post-canonical-url"
                  />
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <SaveButton onClick={savePost} saving={saving} />
            <SuccessMessage show={saved} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={createNewPost} style={btnPrimary} data-testid="button-add-blog-post">
          + NEW POST
        </button>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem" }}>No blog posts yet. Create your first post above.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                ...cardStyle,
                marginBottom: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                cursor: "pointer",
              }}
              onClick={() => startEditing(post.id)}
              data-testid={`post-row-${post.id}`}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.1em",
                  color: post.status === "published" ? "#4ade80" : "#fbbf24",
                  backgroundColor: post.status === "published" ? "rgba(74,222,128,0.12)" : "rgba(251,191,36,0.12)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "4px",
                  flexShrink: 0,
                  textTransform: "uppercase",
                }}
              >
                {post.status}
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.85rem",
                color: "#FFFFFF", flex: 1, fontWeight: 500,
              }}>
                {post.title}
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
                color: "rgba(255,255,255,0.4)", flexShrink: 0,
              }}>
                {getCategoryName(post.categoryId)}
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                color: "rgba(255,255,255,0.3)", flexShrink: 0,
              }}>
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); deletePost(post.id); }}
                style={{ ...btnDanger, flexShrink: 0 }}
                data-testid={`button-delete-post-${post.id}`}
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("submissions");
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
  });
  const { data: submissions } = useQuery<any[]>({
    queryKey: ["/api/cms/submissions"],
    enabled: !!user,
  });
  const unreadCount = submissions?.filter((s: any) => !s.read).length || 0;

  useEffect(() => {
    if (!isLoading && (error || !user)) {
      setLocation("/admin/login");
    }
  }, [isLoading, error, user, setLocation]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setLocation("/admin/login");
  };

  if (isLoading) {
    return (
      <div style={{ backgroundColor: "#0C0A3E", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const tabs: Tab[] = ["submissions", "settings", "problems", "whatwedo", "team", "services", "ourstory", "joinpage", "contactpage", "blogcategories", "blogposts"];

  return (
    <div style={{ backgroundColor: "#0C0A3E", minHeight: "100vh" }}>
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          backgroundColor: "#0C0A3E",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <h1
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "1rem",
              color: "#FFFFFF",
            }}
          >
            CMS
          </h1>
          <a
            href="/"
            target="_blank"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              letterSpacing: "0.1em",
            }}
          >
            VIEW SITE →
          </a>
        </div>
        <button
          onClick={handleLogout}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            color: "rgba(255,255,255,0.5)",
            background: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "6px",
            padding: "0.4rem 0.75rem",
            cursor: "pointer",
            letterSpacing: "0.1em",
          }}
          data-testid="button-admin-logout"
        >
          LOGOUT
        </button>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 50px)" }}>
        <div
          style={{
            width: "200px",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            padding: "1rem 0",
            flexShrink: 0,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                color: activeTab === tab ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                backgroundColor: activeTab === tab ? "rgba(123,30,122,0.2)" : "transparent",
                borderLeft: activeTab === tab ? "2px solid #7B1E7A" : "2px solid transparent",
                border: "none",
                borderLeftWidth: "2px",
                borderLeftStyle: "solid",
                borderLeftColor: activeTab === tab ? "#7B1E7A" : "transparent",
                padding: "0.65rem 1.25rem",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              data-testid={`tab-${tab}`}
            >
              {tabLabels[tab]}
              {tab === "submissions" && unreadCount > 0 && (
                <span style={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#7B1E7A",
                  color: "#FFFFFF",
                  fontSize: "0.55rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: "0.1rem 0.4rem",
                  borderRadius: "10px",
                  minWidth: "18px",
                  textAlign: "center",
                  display: "inline-block",
                }} data-testid="badge-unread-count">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, padding: "1.5rem", maxWidth: "800px" }}>
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "1.25rem",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
            }}
          >
            {tabLabels[activeTab]}
          </h2>

          {activeTab === "submissions" && <SubmissionsViewer />}
          {activeTab === "settings" && <SettingsEditor />}
          {activeTab === "problems" && <ProblemsEditor />}
          {activeTab === "whatwedo" && <WhatWeDoEditor />}
          {activeTab === "team" && <TeamEditor />}
          {activeTab === "services" && <ServicesEditor />}
          {activeTab === "ourstory" && <OurStoryEditor />}
          {activeTab === "joinpage" && <JoinPageEditor />}
          {activeTab === "contactpage" && <ContactPageEditor />}
          {activeTab === "blogcategories" && <BlogCategoriesEditor />}
          {activeTab === "blogposts" && <BlogPostsEditor />}
        </div>
      </div>
    </div>
  );
}
