import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { Navbar } from "@/components/layout/Navbar";
import { useBlogPost, useBlogCategories } from "@/hooks/use-cms";
import type { BlogCategory } from "@shared/schema";

const ALLOWED_TAGS = [
  "p", "br", "strong", "em", "b", "i", "u", "a", "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "blockquote", "pre", "code", "img", "hr", "span", "div", "figure", "figcaption",
];
const ALLOWED_ATTRS = ["href", "src", "alt", "title", "target", "rel", "class", "id"];

function sanitizeHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ALLOWED_ATTRS,
  });
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const { data: post, isLoading, error } = useBlogPost(slug);
  const { data: categories } = useBlogCategories();

  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId || !categories) return null;
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name || null;
  };

  const formatDate = (dateStr: string | Date) => {
    const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  useEffect(() => {
    if (!post) return;

    const prevTitle = document.title;
    const metaTitle = post.metaTitle || post.title;
    const metaDescription = post.metaDescription || post.excerpt;
    const ogImage = post.ogImage || post.featuredImage;
    const canonicalUrl = post.canonicalUrl || window.location.href;

    document.title = metaTitle;

    const createdElements: Element[] = [];
    const previousValues: { el: Element; attr: string; value: string | null }[] = [];

    const setMeta = (name: string, content: string, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
        createdElements.push(el);
      } else {
        previousValues.push({ el, attr: "content", value: el.getAttribute("content") });
      }
      el.setAttribute("content", content);
    };

    setMeta("description", metaDescription);
    setMeta("og:title", metaTitle, true);
    setMeta("og:description", metaDescription, true);
    setMeta("og:type", "article", true);
    setMeta("og:url", canonicalUrl, true);
    if (ogImage) setMeta("og:image", ogImage, true);
    setMeta("twitter:title", metaTitle);
    setMeta("twitter:description", metaDescription);
    if (ogImage) setMeta("twitter:image", ogImage);

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const createdCanonical = !canonicalEl;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      document.head.appendChild(canonicalEl);
    }
    const prevCanonical = canonicalEl.href;
    canonicalEl.href = canonicalUrl;

    let jsonLd = document.querySelector('script[data-blog-jsonld]') as HTMLScriptElement | null;
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.type = "application/ld+json";
      jsonLd.setAttribute("data-blog-jsonld", "true");
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: metaDescription,
      image: ogImage || undefined,
      author: {
        "@type": "Person",
        name: post.authorName,
      },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      publisher: {
        "@type": "Organization",
        name: "The Story Shapers",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      wordCount: post.content?.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length || 0,
      timeRequired: `PT${post.readingTime || 1}M`,
    });

    return () => {
      document.title = prevTitle;
      const jsonLdEl = document.querySelector('script[data-blog-jsonld]');
      if (jsonLdEl) jsonLdEl.remove();
      createdElements.forEach((el) => el.remove());
      previousValues.forEach(({ el, attr, value }) => {
        if (value !== null) el.setAttribute(attr, value);
      });
      if (createdCanonical && canonicalEl) {
        canonicalEl.remove();
      } else if (canonicalEl) {
        canonicalEl.href = prevCanonical;
      }
    };
  }, [post]);

  if (isLoading) {
    return (
      <div style={{ backgroundColor: "#0C0A3E", minHeight: "100vh" }}>
        <Navbar />
        <div className="flex justify-center items-center pt-32">
          <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ backgroundColor: "#0C0A3E", minHeight: "100vh" }}>
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-32 px-4">
          <h1
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "1.5rem",
              color: "#FFFFFF",
              marginBottom: "1rem",
            }}
          >
            Post not found
          </h1>
          <Link
            href="/blog"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.1em",
              textDecoration: "none",
            }}
            data-testid="link-back-to-blog"
          >
            &larr; BACK TO BLOG
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = getCategoryName(post.categoryId);

  return (
    <div style={{ backgroundColor: "#0C0A3E", minHeight: "100vh" }}>
      <Navbar />

      <article className="px-4 md:px-8 pt-24 pb-16">
        <div className="max-w-[700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 mb-10 group"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "rgba(255, 255, 255, 0.5)",
                letterSpacing: "0.15em",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              data-testid="link-back-to-blog"
            >
              <span style={{ transition: "transform 0.2s", display: "inline-block" }} className="group-hover:-translate-x-1">
                &larr;
              </span>
              BACK TO BLOG
            </Link>
          </motion.div>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-5">
              {categoryName && (
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    color: "#a78bfa",
                    backgroundColor: "rgba(167,139,250,0.12)",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                  data-testid="text-post-category"
                >
                  {categoryName}
                </span>
              )}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.05em",
                }}
                data-testid="text-post-reading-time"
              >
                {post.readingTime} min read
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                color: "#FFFFFF",
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                marginBottom: "1.25rem",
              }}
              data-testid="text-post-title"
            >
              {post.title}
            </h1>

            <div className="flex items-center gap-4">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.7)",
                }}
                data-testid="text-post-author"
              >
                {post.authorName}
              </span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.45)",
                }}
                data-testid="text-post-date"
              >
                {post.publishedAt ? formatDate(post.publishedAt) : ""}
              </span>
            </div>

            <div
              style={{
                height: "1px",
                background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)",
                marginTop: "1.5rem",
              }}
            />
          </motion.header>

          {post.featuredImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10"
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                data-testid="img-featured"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="blog-content"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(255, 255, 255, 0.82)",
              lineHeight: 1.85,
            }}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            data-testid="text-post-content"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Link
              href="/blog"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              data-testid="link-back-to-blog-bottom"
            >
              &larr; ALL POSTS
            </Link>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
