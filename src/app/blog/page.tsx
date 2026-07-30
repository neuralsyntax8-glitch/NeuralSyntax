import { getPosts } from "@/lib/blogger"
import BlogClient from "./blog-client"

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogClient posts={posts} />
}
