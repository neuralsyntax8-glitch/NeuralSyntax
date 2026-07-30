"use client"

import { useEffect } from "react"

export function CodeBlockEnhancer() {
  useEffect(() => {
    const pres = document.querySelectorAll(".blog-content pre")
    pres.forEach((pre, index) => {
      if (pre.querySelector(".copy-btn")) return

      const code = pre.querySelector("code")
      if (!code) return

      const codeHtml = code.innerHTML
      const codeText = code.textContent || ""
      const lang = (code.className.match(/language-(\w+)/) || [])[1] || "code"

      const preEl = pre as HTMLElement
      preEl.innerHTML = ""
      preEl.style.padding = "0"

      const header = document.createElement("div")
      header.className = "code-header"
      header.innerHTML = `
        <span class="dot" style="background:#FF5F56"></span>
        <span class="dot" style="background:#FFBD2E"></span>
        <span class="dot" style="background:#27C93F"></span>
        <span class="filename">${lang}.py</span>
      `

      const body = document.createElement("div")
      body.className = "code-body"

      const lines = codeText.split("\n")
      const lineNumbers = document.createElement("div")
      lineNumbers.className = "line-numbers"
      lineNumbers.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join("")

      const content = document.createElement("div")
      content.className = "code-content"
      content.innerHTML = codeHtml

      body.appendChild(lineNumbers)
      body.appendChild(content)

      const btn = document.createElement("button")
      btn.className = "copy-btn"
      btn.setAttribute("aria-label", "Copy code")
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`

      btn.addEventListener("click", async () => {
        await navigator.clipboard.writeText(codeText)
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!`
        btn.style.color = "#00E6A8"
        btn.style.borderColor = "rgba(0, 230, 168, 0.5)"
        setTimeout(() => {
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`
          btn.style.color = ""
          btn.style.borderColor = ""
        }, 2000)
      })

      preEl.appendChild(header)
      preEl.appendChild(body)
      preEl.appendChild(btn)
    })
  }, [])

  return null
}
