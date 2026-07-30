"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const commands = [
  { text: "$ pip install neural-syntax", color: "#7D8898" },
  { text: "Fetching AI packages...", color: "#B8C2D1" },
  { text: "✓ TensorFlow 2.15.0", color: "#17DED1" },
  { text: "✓ PyTorch 2.2.0", color: "#3D8EFF" },
  { text: "✓ NeuralCore loaded. Ready.", color: "#8A3DFF" },
]

export default function TypingTerminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (isReducedMotion) {
      setDisplayedLines(commands.map((cmd) => cmd.text))
      setIsComplete(true)
      return
    }

    if (lineIndex >= commands.length) {
      setIsComplete(true)
      return
    }

    const currentLine = commands[lineIndex].text
    if (charIndex <= currentLine.length) {
      const timer = setTimeout(() => {
        if (charIndex === 0) {
          setDisplayedLines((prev) => [...prev, ""])
        }
        setDisplayedLines((prev) => {
          const newLines = [...prev]
          newLines[newLines.length - 1] = currentLine.slice(0, charIndex + 1)
          return newLines
        })
        setCharIndex(charIndex + 1)
      }, 25)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setLineIndex(lineIndex + 1)
        setCharIndex(0)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [lineIndex, charIndex, isReducedMotion])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="transition-all duration-700 ease-out hover:scale-[1.02]"
        style={{
          transform: "rotateY(-6deg) rotateX(3deg)",
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          rotateY: 0,
          rotateX: 0,
          boxShadow: "0 0 60px -12px rgba(23,222,209,0.3)",
          transition: { duration: 0.7, ease: "easeOut" },
        }}
      >
        <div className="rounded-2xl border border-[#2A3245] bg-[#0D0D0F] shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[#2A3245] bg-[#1A1A1E] px-5 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
            </div>
            <span className="ml-4 select-none font-mono text-xs tracking-widest text-[#7D8898]">
              ~/neural-syntax
            </span>
            <span className="ml-auto select-none font-mono text-[10px] text-[#7D8898] opacity-50">zsh</span>
          </div>

          <div className="min-h-[260px] bg-[#0D0D0F] p-6 font-mono text-sm md:text-base">
            {displayedLines.map((line, idx) => {
              const cmd = commands[idx]
              return (
                <p key={idx} className="leading-relaxed" style={{ color: cmd ? cmd.color : "#B8C2D1" }}>
                  {line}
                </p>
              )
            })}
            {!isComplete && !isReducedMotion && (
              <span className="ml-1 inline-block h-5 w-2 animate-blink bg-[#17DED1]" />
            )}
            {isComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-2 font-medium text-[#17DED1]"
              >
                ✓ NeuralSyntax environment active.
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
