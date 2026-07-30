"use client"

import { useEffect, useState } from "react"

const words = ["AnyOne Else.", "Everyone Else.", "the Rest."] as const

export function TypeAnimation() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), 2000)
      return
    }

    if (deleting && text === "") {
      timer = setTimeout(() => {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      }, 500)
      return
    }

    timer = setTimeout(
      () => {
        setText(deleting ? current.slice(0, -1) : current.slice(0, text.length + 1))
      },
      deleting ? 50 : 100
    )

    return () => clearTimeout(timer)
  }, [text, deleting, index])

  return (
    <span>
      {text}
      <span className="ml-1 animate-pulse text-cyan" style={{ animationDuration: "1s" }}>|</span>
    </span>
  )
}
