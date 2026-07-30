"use server"

export type BlogPost = {
  id: string
  slug: string
  title: string
  tag: string
  date: string
  excerpt: string
  content: string
}

const TAG_KEYWORDS: Record<string, RegExp[]> = {
  Python: [/\bpython\b/i],
  AI: [/\bai\b/i, /\bartificial\s+intelligence\b/i, /\bneural\b/i, /\btransformer\b/i, /\bllm\b/i, /\bmachine\s+learning\b/i],
  Web: [/\bnext\.?js\b/i, /\breact\b/i, /\bweb\b/i, /\bfrontend\b/i, /\bcss\b/i],
  Tutorial: [/\bguide\b/i, /\btutorial\b/i, /\bhow.to\b/i, /\bbeginner\b/i, /\bstep.by.step\b/i],
  Opinion: [/\bopinion\b/i, /\bwhy\b/i, /\bthink\b/i, /\bbelieve\b/i, /\bphilosophy\b/i],
}

function inferTag(title: string): string {
  for (const [tag, patterns] of Object.entries(TAG_KEYWORDS)) {
    if (patterns.some((p) => p.test(title))) return tag
  }
  return "Python"
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim()
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + "..." : text
}

function slugify(title: string, id: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return `${slug}-${id}`
}

async function resolveBlogId(apiKey: string): Promise<string> {
  const blogUrl = process.env.BLOGGER_BLOG_URL
  if (!blogUrl) throw new Error("BLOGGER_BLOG_URL not set")

  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/byurl?url=${encodeURIComponent(blogUrl)}&key=${apiKey}`
  )
  if (!res.ok) throw new Error(`Blogger blog lookup failed: ${res.status}`)
  const data = await res.json()
  return data.id
}

export async function getPosts(): Promise<BlogPost[]> {
  const apiKey = process.env.BLOGGER_API_KEY
  const blogUrl = process.env.BLOGGER_BLOG_URL

  if (!apiKey || !blogUrl) {
    console.warn("BLOGGER_API_KEY or BLOGGER_BLOG_URL not set, using fallback data")
    return getFallbackPosts()
  }

  try {
    const blogId = await resolveBlogId(apiKey)
    const allPosts: BlogPost[] = []
    let pageToken: string | undefined

    do {
      const params = new URLSearchParams({
        key: apiKey,
        maxResults: "100",
        fetchImages: "false",
      })
      if (pageToken) params.set("pageToken", pageToken)

      const res = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?${params}`,
        { next: { tags: ["blog-posts"] } }
      )
      if (!res.ok) throw new Error(`Blogger API failed: ${res.status}`)
      const data = await res.json()

      for (const item of data.items || []) {
        const title = item.title
        const id = item.id
        allPosts.push({
          id,
          slug: slugify(title, id),
          title,
          tag: inferTag(title),
          date: item.published.slice(0, 10),
          excerpt: truncate(stripHtml(item.content), 120),
          content: item.content,
        })
      }

      pageToken = data.nextPageToken
    } while (pageToken)

    return allPosts
  } catch (err) {
    console.error("Blogger API error:", err)
    return getFallbackPosts()
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPosts()
  return posts.find((p) => p.slug === slug) || null
}

function getFallbackPosts(): BlogPost[] {
  return [
    { id: "1", slug: "why-reading-beats-video-for-learning-code-1", title: "Why Reading Beats Video for Learning Code", tag: "Opinion", date: "2026-07-28", excerpt: "Speed matters. Comprehension matters more.", content: "<p>Speed matters. Comprehension matters more. When you read, you control the pace. You pause. You re-read. You think. Video forces you along at the creator's speed. For deep understanding, reading wins every time.</p><p>NeuralSyntax is built on this philosophy. Every tutorial is designed to be read, re-read, and truly understood.</p>" },
    { id: "2", slug: "build-a-transformer-from-scratch-2", title: "Build a Transformer from Scratch", tag: "AI", date: "2026-07-20", excerpt: "Understand attention is all you need.", content: "<p>The Transformer architecture changed everything. In this post, we build one from scratch — token by token, head by head.</p><p>We cover self-attention, multi-head attention, positional encoding, and the feed-forward block. By the end, you'll have a working transformer you can train on your own data.</p>" },
    { id: "3", slug: "python-type-hints-guide-3", title: "Python Type Hints Guide", tag: "Python", date: "2026-07-15", excerpt: "Write cleaner, safer Python code.", content: "<p>Type hints make Python code self-documenting and catch bugs before they happen. This guide covers everything from basic annotations to advanced generics.</p><p>Learn about Optional, Union, Literal, TypedDict, and Protocol — and how to use them effectively in real projects.</p>" },
    { id: "4", slug: "next-js-app-router-deep-dive-4", title: "Next.js App Router Deep Dive", tag: "Web", date: "2026-07-10", excerpt: "Server components, streaming, and caching.", content: "<p>The App Router is a fundamental shift in how we build React apps. Server components, streaming, and the new caching model — this deep dive covers it all.</p><p>We explore layouts, loading states, error boundaries, parallel routes, and the powerful new data fetching patterns.</p>" },
    { id: "5", slug: "ml-pipeline-for-beginners-5", title: "ML Pipeline for Beginners", tag: "Tutorial", date: "2026-07-05", excerpt: "End-to-end machine learning project.", content: "<p>Building an ML pipeline from data collection to deployment. This beginner-friendly guide walks through every step with real code.</p><p>Topics: data cleaning, feature engineering, model selection, training, evaluation, and deployment with a REST API.</p>" },
  ]
}
