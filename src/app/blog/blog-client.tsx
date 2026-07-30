"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Calendar, ArrowRight } from "lucide-react"
import { Card, CardGrid } from "@/components/ui/card"

const tags = ["All", "Python", "AI", "Web", "Tutorial", "Opinion"]

type Post = {
  id: string
  slug: string
  title: string
  tag: string
  date: string
  excerpt: string
}

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = posts.filter(
    (p) =>
      (activeTag === "All" || p.tag === activeTag) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Blog</h1>
          <p className="mt-2 text-text-secondary">Deep reads on AI, coding, and engineering thinking.</p>
        </motion.div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#2A3245] bg-bg-card py-3 pl-10 pr-4 text-sm text-white placeholder-text-muted outline-none focus:border-cyan transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTag === t
                    ? "bg-cyan/10 text-cyan border border-cyan/30"
                    : "text-text-secondary hover:text-white border border-[#2A3245] hover:border-cyan/30"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <CardGrid className="mt-10">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/blog/${p.slug}`}>
                <Card className="h-full flex flex-col cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="rounded-md bg-purple/10 px-2 py-0.5 text-xs font-medium text-purple">{p.tag}</span>
                    <span className="flex items-center gap-1 text-xs text-text-muted ml-auto">
                      <Calendar size={12} /> {p.date}
                    </span>
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{p.title}</h3>
                  <p className="text-sm text-text-secondary flex-1">{p.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-cyan">
                    Read more <ArrowRight size={12} />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </CardGrid>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-text-muted">No posts match your search.</p>
        )}
      </div>
    </div>
  )
}
