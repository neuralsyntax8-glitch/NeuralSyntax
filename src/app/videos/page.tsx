import { getVideos } from "@/lib/youtube"
import VideosClient from "./videos-client"

export const revalidate = 3600

export default async function VideosPage() {
  const videos = await getVideos()
  return <VideosClient videos={videos} />
}
