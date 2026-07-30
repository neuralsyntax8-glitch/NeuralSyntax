"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ChevronDown } from "lucide-react"
import { Card, CardGrid } from "@/components/ui/card"

const seriesFilters = ["All Series", "Python", "AI", "Machine Learning", "AI Agents", "Web Development", "Projects", "Roadmaps"]

type Video = {
  id: string
  title: string
  category: string
  duration: string
  difficulty: string
  thumbnail: string
}

export default function VideosClient({ videos }: { videos: Video[] }) {
  const [activeSeries, setActiveSeries] = useState("All Series")
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest")
  const [difficulty, setDifficulty] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = videos.filter(
    (v) =>
      (activeSeries === "All Series" || v.category === activeSeries) &&
      (difficulty === "All" || v.difficulty === difficulty) &&
      v.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Videos</h1>
          <p className="mt-2 text-text-secondary">Engineering tutorials, filtered by topic.</p>
        </motion.div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          <aside className="shrink-0 lg:w-56">
            <div className="sticky top-24 space-y-1">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Series</h3>
              {seriesFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSeries(s)}
                  className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors min-h-12 ${
                    activeSeries === s
                      ? "bg-cyan/10 text-cyan"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-[#2A3245] bg-bg-card py-3.5 pl-10 pr-4 text-sm text-white placeholder-text-muted outline-none focus:border-cyan transition-colors min-h-12"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="rounded-xl border border-[#2A3245] bg-bg-card px-4 py-3.5 text-sm text-white outline-none focus:border-cyan transition-colors min-h-12"
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "popular")}
                  className="rounded-xl border border-[#2A3245] bg-bg-card px-4 py-3.5 text-sm text-white outline-none focus:border-cyan transition-colors min-h-12"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
            </div>

            <CardGrid className="mt-8">
              {filtered.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card>
                    <div
                      className="mb-4 aspect-video rounded-xl bg-gradient-to-br from-bg-secondary to-bg-card flex items-center justify-center border border-[#2A3245] bg-cover bg-center group"
                      style={v.thumbnail ? { backgroundImage: `url(${v.thumbnail})` } : undefined}
                    >
                      {!v.thumbnail && (
                        <div className="h-12 w-12 rounded-full border-2 border-cyan/30 flex items-center justify-center transition-transform group-hover:scale-110">
                          <div className="ml-0.5 h-0 w-0 border-y-6 border-y-transparent border-l-8 border-l-cyan" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-md bg-cyan/10 px-2 py-0.5 text-xs font-medium text-cyan">{v.category}</span>
                      <span className="rounded-md bg-purple/10 px-2 py-0.5 text-xs font-medium text-purple">{v.difficulty}</span>
                      <span className="ml-auto text-xs text-text-muted">{v.duration}</span>
                    </div>
                    <h3 className="font-semibold text-white">{v.title}</h3>
                  </Card>
                </motion.div>
              ))}
            </CardGrid>

            {filtered.length === 0 && (
              <p className="mt-16 text-center text-text-muted">No videos match your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
