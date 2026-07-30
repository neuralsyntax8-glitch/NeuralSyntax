import type { HTMLAttributes } from "react"

export function Card({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 hover-lift ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardGrid({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {children}
    </div>
  )
}

export function VideoCard({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`group relative glass-card rounded-2xl overflow-hidden hover-lift ${className}`}
      {...props}
    >
      <div className="video-card-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300" />
      {children}
    </div>
  )
}
