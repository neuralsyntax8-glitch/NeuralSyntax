"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NeuralSyntaxLogo from "./logo"
import { Button } from "./ui/button"

const links = [
  { href: "/", label: "Home" },
  { href: "/videos", label: "Videos" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 px-4 sm:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <NeuralSyntaxLogo size={36} />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "text-cyan"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link href="https://www.youtube.com/@NeuralSyntax-official" target="_blank">
            <Button variant="primary" size="sm">
              Subscribe
            </Button>
          </Link>
        </div>

        <button
          className="flex md:hidden items-center justify-center text-text-secondary hover:text-white z-50 min-h-12 min-w-12"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 left-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden"
            style={{
              background: "rgba(19, 20, 32, 0.92)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
            }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-2xl font-bold transition-colors ${
                  pathname === l.href
                    ? "gradient-text"
                    : "text-text-secondary hover:text-white"
                }`}
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                {l.label}
              </Link>
            ))}
            <Link href="https://www.youtube.com/@NeuralSyntax-official" target="_blank" className="mt-4">
              <Button variant="primary" size="lg">
                Subscribe
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
