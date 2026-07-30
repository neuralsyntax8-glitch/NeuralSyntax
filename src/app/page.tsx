"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Terminal, Brain, BookOpen, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardGrid } from "@/components/ui/card"
import { TypeAnimation } from "@/components/type-animation"
import NeuralBackground from "@/components/neural-background"
import TypingTerminal from "@/components/typing-terminal"

const features = [
  { icon: Terminal, title: "Python & Engineering", desc: "Deep-dive into Python, system design, and software architecture.", color: "cyan" },
  { icon: Brain, title: "AI & Machine Learning", desc: "From linear regression to LLMs—understand every layer.", color: "purple" },
  { icon: BookOpen, title: "Reading-Style Learning", desc: "No fast-paced video fluff. Read, re-read, and truly understand.", color: "blue" },
  { icon: Sparkles, title: "For All Levels", desc: "Designed for 5th graders to seasoned pros. Everyone learns.", color: "green" },
]

const colorMap: Record<string, { icon: string; border: string; glow: string }> = {
  cyan: { icon: "bg-cyan/10 text-cyan", border: "hover:border-cyan/50", glow: "rgba(23,222,209,0.25)" },
  purple: { icon: "bg-purple/10 text-purple", border: "hover:border-purple/50", glow: "rgba(138,61,255,0.25)" },
  blue: { icon: "bg-blue/10 text-blue", border: "hover:border-blue/50", glow: "rgba(61,142,255,0.25)" },
  green: { icon: "bg-green/10 text-green", border: "hover:border-green/50", glow: "rgba(0,230,168,0.25)" },
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <NeuralBackground />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-[#17DED1] opacity-[0.06] blur-[140px]" />
          <div className="absolute bottom-[-20%] left-[-10%] h-[700px] w-[700px] rounded-full bg-[#8A3DFF] opacity-[0.06] blur-[140px]" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#131420]/80 pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Master AI and Coding
              <br />
              <span className="bg-gradient-to-r from-[#17DED1] via-[#3D8EFF] to-[#8A3DFF] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                Before <TypeAnimation />
              </span>
            </h1>

            <p className="max-w-lg text-xl leading-relaxed text-[#B8C2D1]">
              Reading-style tutorials designed for 5th graders to pros. No fluff, just pure engineering thinking.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/videos">
                <Button variant="primary" size="lg">
                  <span>▶ Watch Tutorials</span>
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="purple" size="lg">
                  Explore Resources
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4 font-mono text-sm text-[#7D8898]">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#17DED1]" />
                50+ Tutorials
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3D8EFF]" />
                10K+ Students
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8A3DFF]" />
                AI Certified
              </span>
            </div>
          </motion.div>

          <div className="order-first lg:order-none">
            <TypingTerminal />
          </div>
        </div>
      </section>

      <section className="border-t border-[#2A3245] px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: '"Space Grotesk", sans-serif', letterSpacing: "-0.025em" }}>
              Why NeuralSyntax?
            </h2>
            <p className="mt-4 text-text-secondary">Engineering thinking, delivered through reading.</p>
          </motion.div>

          <CardGrid>
            {features.map((f, i) => {
              const c = colorMap[f.color]
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`${c.border} group relative`}
                    style={{ boxShadow: `0 20px 40px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)` }}
                  >
                    <div className="pointer-events-none absolute -inset-[3px] rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: f.color === "cyan" ? "#17DED1" : f.color === "purple" ? "#8A3DFF" : f.color === "blue" ? "#3D8EFF" : "#00E6A8", boxShadow: `0 0 20px ${c.glow}` }} />
                    </div>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${c.icon}`}>
                      <f.icon size={22} />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{f.title}</h3>
                    <p className="text-base leading-relaxed text-text-secondary">{f.desc}</p>
                  </Card>
                </motion.div>
              )
            })}
          </CardGrid>
        </div>
      </section>

      <section className="border-t border-[#2A3245] px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-[#2A3245] bg-gradient-to-br from-bg-card to-bg-secondary p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Ready to Master AI & Coding?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-secondary">
              Join thousands of students learning engineering thinking the right way.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="https://www.youtube.com/@NeuralSyntax-official" target="_blank">
                <Button variant="primary" size="lg">
                  Subscribe on YouTube <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
