import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { useBlogPosts, useBlogCategories } from "@/hooks/use-cms";
import type { BlogPost, BlogCategory } from "@shared/schema";

export default function Blog() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const { data: categoriesData } = useBlogCategories();
  const { data, isLoading } = useBlogPosts({ page, categoryId: selectedCategory });

  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;
  const categories = categoriesData || [];

  const formatDate = (dateStr: string | Date) => {
    const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return null;
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name || null;
  };

  return (
    <div style={{ backgroundColor: "#0C0A3E", minHeight: "100vh" }}>
      <Navbar />

      <div className="px-4 md:px-8 lg:px-12 pt-24 pb-16">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="block mb-4"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "rgba(255, 255, 255, 0.5)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
              data-testid="text-blog-label"
            >
              Blog
            </span>

            <h1
              className="mb-4"
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#FFFFFF",
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
              data-testid="text-blog-heading"
            >
              Insights & Thinking
            </h1>

            <p
              className="mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "rgba(255, 255, 255, 0.6)",
                maxWidth: "600px",
                lineHeight: 1.7,
              }}
            >
              Observations on brand strategy, content systems, and the work of making marketing make sense.
            </p>

            <div
              style={{
                height: "1px",
                background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)",
                marginBottom: "2rem",
              }}
            />
          </motion.div>

          {categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-8 flex flex-wrap gap-2"
            >
              <button
                onClick={() => { setSelectedCategory(undefined); setPage(1); }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  color: !selectedCategory ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                  backgroundColor: !selectedCategory ? "rgba(123,30,122,0.3)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${!selectedCategory ? "rgba(123,30,122,0.5)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "6px",
                  padding: "0.45rem 0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                data-testid="button-filter-all"
              >
                ALL
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setPage(1); }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: selectedCategory === cat.id ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                    backgroundColor: selectedCategory === cat.id ? "rgba(123,30,122,0.3)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${selectedCategory === cat.id ? "rgba(123,30,122,0.5)" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "6px",
                    padding: "0.45rem 0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textTransform: "uppercase",
                  }}
                  data-testid={`button-filter-category-${cat.id}`}
                >
                  {cat.name}
                </button>
              ))}
            </motion.div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-20">
              <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>Loading...</p>
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "3rem 2rem",
                  maxWidth: "500px",
                  margin: "0 auto",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "1.1rem",
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: "0.75rem",
                  }}
                  data-testid="text-blog-empty"
                >
                  No posts yet.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Check back soon for insights on brand strategy, content systems, and marketing that makes sense.
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div
                        style={{
                          backgroundColor: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "12px",
                          overflow: "hidden",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        className="hover:border-[rgba(123,30,122,0.3)] hover:bg-[rgba(255,255,255,0.05)]"
                        data-testid={`card-blog-post-${post.id}`}
                      >
                        {post.featuredImage && (
                          <div
                            style={{
                              width: "100%",
                              height: "180px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              data-testid={`img-blog-post-${post.id}`}
                            />
                          </div>
                        )}

                        <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                          <div className="flex items-center gap-3 mb-3">
                            {getCategoryName(post.categoryId) && (
                              <span
                                style={{
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: "0.55rem",
                                  letterSpacing: "0.1em",
                                  color: "#a78bfa",
                                  backgroundColor: "rgba(167,139,250,0.12)",
                                  padding: "0.2rem 0.5rem",
                                  borderRadius: "4px",
                                  textTransform: "uppercase",
                                }}
                                data-testid={`text-category-${post.id}`}
                              >
                                {getCategoryName(post.categoryId)}
                              </span>
                            )}
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.55rem",
                                color: "rgba(255,255,255,0.35)",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {post.readingTime} min read
                            </span>
                          </div>

                          <h3
                            style={{
                              fontFamily: "'Libre Baskerville', serif",
                              fontSize: "1.05rem",
                              color: "#FFFFFF",
                              lineHeight: 1.4,
                              marginBottom: "0.75rem",
                              fontWeight: 400,
                            }}
                            data-testid={`text-post-title-${post.id}`}
                          >
                            {post.title}
                          </h3>

                          {post.excerpt && (
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.82rem",
                                color: "rgba(255,255,255,0.55)",
                                lineHeight: 1.6,
                                marginBottom: "1rem",
                                flex: 1,
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                              data-testid={`text-post-excerpt-${post.id}`}
                            >
                              {post.excerpt}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.75rem",
                                color: "rgba(255,255,255,0.4)",
                              }}
                              data-testid={`text-post-author-${post.id}`}
                            >
                              {post.authorName}
                            </span>
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.6rem",
                                color: "rgba(255,255,255,0.3)",
                              }}
                              data-testid={`text-post-date-${post.id}`}
                            >
                              {post.publishedAt ? formatDate(post.publishedAt) : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: page <= 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      padding: "0.5rem 1rem",
                      cursor: page <= 1 ? "default" : "pointer",
                      letterSpacing: "0.1em",
                    }}
                    data-testid="button-prev-page"
                  >
                    PREV
                  </button>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0.05em",
                    }}
                    data-testid="text-page-info"
                  >
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: page >= totalPages ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      padding: "0.5rem 1rem",
                      cursor: page >= totalPages ? "default" : "pointer",
                      letterSpacing: "0.1em",
                    }}
                    data-testid="button-next-page"
                  >
                    NEXT
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
