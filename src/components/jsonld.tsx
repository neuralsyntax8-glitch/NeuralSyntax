export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NeuralSyntax",
    url: "https://neuralsyntax.dev",
    description:
      "Learn AI, Python, and Software Engineering through premium reading-style tutorials. Master AI and Coding Before AnyOne Else.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://neuralsyntax.dev/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function VideoObjectSchema({ title, description, url, thumbnailUrl, duration }: {
  title: string
  description: string
  url: string
  thumbnailUrl: string
  duration: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    thumbnailUrl,
    uploadDate: new Date().toISOString(),
    duration: `PT${duration.replace(/:/g, "M")}S`,
    contentUrl: url,
    embedUrl: url,
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BlogPostingSchema({ title, description, datePublished, author }: {
  title: string
  description: string
  datePublished: string
  author: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
