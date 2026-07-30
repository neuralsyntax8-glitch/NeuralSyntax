"use client"

import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Contact</h1>
          <p className="mt-2 text-text-secondary">Have a question or want to collaborate? Reach out.</p>
        </motion.div>

        <div className="mt-12 mx-auto max-w-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-8">
              <form action="https://forminit.com/f/q07fxftnwvs" method="POST" className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-secondary">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="fi-sender-fullName"
                    required
                    className="w-full rounded-xl border border-[#2A3245] bg-bg-card px-4 py-3 text-sm text-white placeholder-text-muted outline-none focus:border-cyan transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-secondary">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="fi-sender-email"
                    required
                    className="w-full rounded-xl border border-[#2A3245] bg-bg-card px-4 py-3 text-sm text-white placeholder-text-muted outline-none focus:border-cyan transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-secondary">Message</label>
                  <textarea
                    id="message"
                    name="fi-text-message"
                    rows={5}
                    required
                    className="w-full rounded-xl border border-[#2A3245] bg-bg-card px-4 py-3 text-sm text-white placeholder-text-muted outline-none focus:border-cyan transition-colors resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  <Send size={16} /> Send Message
                </Button>
              </form>
            </Card>
          </motion.div>


        </div>
      </div>
    </div>
  )
}
