import { ImageResponse } from "next/og";
import { business } from "@/config/business";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";

export const alt = "Snow Removal Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const title = post?.title ?? "Snow Removal Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a1220 0%, #16283f 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, color: "#ea580c", fontWeight: 700, display: "flex" }}>
          {business.name} Blog
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, marginTop: 24, lineHeight: 1.15, display: "flex" }}>
          {title}
        </div>
      </div>
    ),
    { ...size },
  );
}
