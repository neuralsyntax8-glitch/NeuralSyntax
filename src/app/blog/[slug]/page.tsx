import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react"
import { getPosts } from "@/lib/blogger"
import { CodeBlockEnhancer } from "@/components/code-block"
import { BlogPostingSchema, BreadcrumbSchema } from "@/components/jsonld"

export const dynamicParams = true
export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

function estimateReadTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "")
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const allPosts = await getPosts()
  const post = allPosts.find((p) => p.slug === slug) || null
  if (!post) notFound()

  const readTime = estimateReadTime(post.content)

  const related = allPosts
    .filter((p) => p.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return (
    <div className="px-4 py-20 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-cyan transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="rounded-md bg-purple/10 px-3 py-1 text-xs font-medium text-purple">{post.tag}</span>
            <span className="flex items-center gap-1.5 text-sm text-text-muted">
              <Calendar size={14} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-text-muted">
              <Clock size={14} /> {readTime} min read
            </span>
          </div>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            {post.title}
          </h1>
        </header>

        <div
          className="blog-content text-base leading-relaxed text-text-secondary sm:text-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <CodeBlockEnhancer />

        <BlogPostingSchema
          title={post.title}
          description={post.excerpt}
          datePublished={post.date}
          author="NeuralSyntax"
        />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "https://neuralsyntax.dev" },
            { name: "Blog", url: "https://neuralsyntax.dev/blog" },
            { name: post.title, url: `https://neuralsyntax.dev/blog/${post.slug}` },
          ]}
        />

        <div className="mt-16 border-t border-[#2A3245] pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan hover:text-blue transition-colors"
          >
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-[#2A3245] pt-12">
            <h2 className="mb-8 text-2xl font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                  <div className="rounded-2xl border border-[#2A3245] bg-bg-card/50 p-5 transition-all duration-300 group-hover:border-purple/50 group-hover:-translate-y-1"
                    style={{ boxShadow: "0 20px 40px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)" }}
                  >
                    <span className="mb-2 inline-block rounded-md bg-purple/10 px-2.5 py-0.5 text-xs font-medium text-purple">{r.tag}</span>
                    <h3 className="text-sm font-semibold text-white group-hover:text-purple transition-colors">{r.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs text-text-muted">{r.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-purple opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
