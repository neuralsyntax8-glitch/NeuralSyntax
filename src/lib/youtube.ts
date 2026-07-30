"use server"

type YouTubeVideo = {
  id: string
  title: string
  category: string
  duration: string
  difficulty: string
  thumbnail: string
}

const CATEGORY_KEYWORDS: Record<string, RegExp[]> = {
  Python: [/\bpython\b/i],
  AI: [/\bai\b/i, /\bartificial\s+intelligence\b/i, /\bneural\b/i, /\btransformer\b/i, /\bllm\b/i],
  ML: [/\bmachine\s+learning\b/i, /\bregression\b/i, /\bclassification\b/i],
  Agents: [/\bagent\b/i, /\brag\b/i, /\btool\b/i],
  Web: [/\bnext\.?js\b/i, /\breact\b/i, /\bweb\b/i, /\bfrontend\b/i],
}

function inferCategory(title: string): string {
  for (const [cat, patterns] of Object.entries(CATEGORY_KEYWORDS)) {
    if (patterns.some((p) => p.test(title))) return cat
  }
  return "Python"
}

function inferDifficulty(title: string): string {
  if (/\badvanced|deep\s+dive|mastery\b/i.test(title)) return "Advanced"
  if (/\bintermediate|guide\b/i.test(title)) return "Intermediate"
  return "Beginner"
}

function formatDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return "0:00"
  const h = match[1] ? parseInt(match[1]) : 0
  const m = match[2] ? parseInt(match[2]) : 0
  const s = match[3] ? parseInt(match[3]) : 0
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  return `${m}:${String(s).padStart(2, "0")}`
}

export async function getVideos(): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID

  if (!apiKey || !channelId) {
    console.warn("YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID not set, using fallback data")
    return getFallbackVideos()
  }

  try {
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=50&type=video`,
      { next: { tags: ["youtube-videos"] } }
    )
    if (!searchRes.ok) throw new Error(`YouTube search failed: ${searchRes.status}`)
    const searchData = await searchRes.json()

    const videoIds = searchData.items.map((i: any) => i.id.videoId).join(",")
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=contentDetails,snippet`,
      { next: { tags: ["youtube-videos"] } }
    )
    if (!statsRes.ok) throw new Error(`YouTube video fetch failed: ${statsRes.status}`)
    const statsData = await statsRes.json()

    return statsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      category: inferCategory(item.snippet.title),
      duration: formatDuration(item.contentDetails.duration),
      difficulty: inferDifficulty(item.snippet.title),
      thumbnail: item.snippet.thumbnails.medium.url,
    }))
  } catch (err) {
    console.error("YouTube API error:", err)
    return getFallbackVideos()
  }
}

function getFallbackVideos(): YouTubeVideo[] {
  return [
    { id: "1", title: "Python Generators Explained", category: "Python", duration: "12:34", difficulty: "Beginner", thumbnail: "" },
    { id: "2", title: "Neural Networks from Scratch", category: "AI", duration: "28:15", difficulty: "Advanced", thumbnail: "" },
    { id: "3", title: "Building LLM Agents", category: "Agents", duration: "22:08", difficulty: "Intermediate", thumbnail: "" },
    { id: "4", title: "Next.js 15 Deep Dive", category: "Web", duration: "45:00", difficulty: "Intermediate", thumbnail: "" },
    { id: "5", title: "Linear Regression in Python", category: "ML", duration: "18:42", difficulty: "Beginner", thumbnail: "" },
    { id: "6", title: "Transformers Visualized", category: "AI", duration: "35:20", difficulty: "Advanced", thumbnail: "" },
    { id: "7", title: "RAG Applications", category: "Agents", duration: "30:00", difficulty: "Advanced", thumbnail: "" },
    { id: "8", title: "Async Python Mastery", category: "Python", duration: "25:10", difficulty: "Intermediate", thumbnail: "" },
  ]
}
