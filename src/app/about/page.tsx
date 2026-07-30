"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Code2, Heart, Lightbulb, ChevronDown, Award, Users, Target } from "lucide-react"
import { Card, CardGrid } from "@/components/ui/card"

const values = [
  { icon: BookOpen, title: "Reading-First", desc: "Deep understanding comes from reading, not skipping." },
  { icon: Code2, title: "Engineering Thinking", desc: "Not just syntax—how to reason about systems." },
  { icon: Heart, title: "For Everyone", desc: "5th graders to senior engineers all learn here." },
  { icon: Lightbulb, title: "No Fluff", desc: "Every word earns its place. Time is precious." },
]

const timeline = [
  { year: "2024 Q1", title: "Channel Launch", desc: "First tutorial published. Mission: teach AI through reading." },
  { year: "2024 Q3", title: "10K Subscribers", desc: "Community grows. Reading-first approach validated." },
  { year: "2025 Q1", title: "AI Series Launch", desc: "Deep-dive into transformers, LLMs, and agents." },
  { year: "2025 Q3", title: "50+ Tutorials", desc: "Comprehensive library covering Python to production AI." },
  { year: "2026", title: "NeuralSyntax Website", desc: "Documentation-grade hub for the entire community." },
]

const techStack = [
  { name: "Python", color: "#3776AB" },
  { name: "TensorFlow", color: "#FF6F00" },
  { name: "PyTorch", color: "#EE4C2C" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "React", color: "#61DAFB" },
  { name: "Docker", color: "#2496ED" },
  { name: "FastAPI", color: "#009688" },
  { name: "LangChain", color: "#1C3C3C" },
  { name: "OpenAI", color: "#00A67E" },
  { name: "Git", color: "#F05032" },
  { name: "Linux", color: "#FCC624" },
  { name: "VS Code", color: "#007ACC" },
]

const faqs = [
  { q: "Who is NeuralSyntax for?", a: "Anyone from 5th graders curious about coding to senior engineers diving into AI. Every concept is explained from first principles." },
  { q: "Why reading-style tutorials?", a: "Reading lets you learn at your own pace. Pause. Re-read. Truly understand. Video moves too fast for deep learning." },
  { q: "Is the content free?", a: "All reading-style tutorials are free on YouTube and our blog. Premium courses and resources are coming soon." },
  { q: "What topics do you cover?", a: "Python, Machine Learning, AI/LLMs, AI Agents, Web Development, and Software Engineering." },
]

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            About NeuralSyntax
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            NeuralSyntax was founded on a simple idea: <strong className="text-white">the best way to learn AI and coding is by reading</strong>.
            Video tutorials move too fast. Documentation assumes too much. We bridge the gap.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            Our tagline, <em className="gradient-text not-italic font-semibold">&ldquo;Master AI and Coding Before AnyOne Else,&rdquo;</em> reflects our mission:
            give you the engineering intuition that sets you apart.
          </p>
        </motion.div>

        <div className="mt-20">
          <h2 className="mb-10 text-2xl font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Our Values</h2>
          <CardGrid>
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple/10">
                    <v.icon className="text-purple" size={22} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{v.title}</h3>
                  <p className="text-sm text-text-secondary">{v.desc}</p>
                </Card>
              </motion.div>
            ))}
          </CardGrid>
        </div>

        <div className="mt-24">
          <h2 className="mb-12 text-2xl font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Timeline</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-[#2A3245]" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-cyan bg-bg-primary" />
                  <span className="inline-block rounded-md bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">{t.year}</span>
                  <h3 className="mt-2 text-lg font-semibold text-white">{t.title}</h3>
                  <p className="text-sm text-text-secondary">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="mb-10 text-2xl font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Tech Stack</h2>
          <div className="flex flex-wrap gap-4">
            {techStack.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border border-[#2A3245] bg-bg-card px-5 py-3 hover:border-cyan/30 transition-colors"
              >
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: t.color }} />
                <span className="text-sm font-medium text-white">{t.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h2 className="mb-10 text-2xl font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>FAQ</h2>
          <div className="space-y-3 max-w-3xl">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-[#2A3245] bg-bg-card/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/5"
                >
                  <span className="font-medium text-white">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-text-muted transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t border-[#2A3245] px-6 py-4">
                        <p className="text-sm leading-relaxed text-text-secondary">{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
