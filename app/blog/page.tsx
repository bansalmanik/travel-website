import { getAllBlogPosts, getCategoryInfo } from '@/lib/blog'
import BlogClient from './blog-client'

const CATEGORIES = ['credit-cards', 'hotels', 'airlines', 'travel-tips', 'destinations']

export const metadata = {
  title: 'Blog | Miles Go Round',
  description: 'Expert guides on credit cards, hotels, airlines, and travel tips to maximize your points and miles.',
  openGraph: {
    title: 'Blog | Miles Go Round',
    description: 'Expert guides on credit cards, hotels, airlines, and travel tips to maximize your points and miles.',
    type: 'website',
  },
}

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts()
  
  // Prepare category info as serializable data
  const categoryInfo = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = getCategoryInfo(cat)
    return acc
  }, {} as Record<string, { name: string; icon: string; color: string; description: string }>)
  
  return <BlogClient posts={allPosts} categories={CATEGORIES} categoryInfo={categoryInfo} />
}
