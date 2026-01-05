import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedOn: string
  updatedOn?: string
  category: string
  tags: string[]
  featured: boolean
  heroImage: { src: string; alt: string }
  seoTitle: string
  seoDescription: string
  readTime: string
  url: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')
const CATEGORIES = ['credit-cards', 'hotels', 'airlines', 'travel-tips', 'destinations']

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = []
  
  for (const category of CATEGORIES) {
    const categoryPath = path.join(CONTENT_DIR, category)
    try {
      const files = await fs.readdir(categoryPath)
      for (const file of files) {
        if (file.endsWith('.mdx')) {
          const filePath = path.join(categoryPath, file)
          const fileContent = await fs.readFile(filePath, 'utf-8')
          const { data, content } = matter(fileContent)
          
          posts.push({
            ...data,
            content,
            category,
            readTime: data.readTime || readingTime(content).text,
            url: `/${data.slug}`,
          } as BlogPost)
        }
      }
    } catch (error) {
      console.warn(`Category ${category} not found, skipping...`)
    }
  }
  
  return posts.sort((a, b) => 
    new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
  )
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  return posts.filter(post => post.category === category)
}

export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts()
  return posts.filter(post => post.featured).slice(0, limit)
}

export async function getRelatedPosts(currentPost: BlogPost, limit: number = 4): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  const otherPosts = allPosts.filter(p => p.slug !== currentPost.slug)
  
  const scored = otherPosts.map(post => {
    let score = 0
    if (post.category === currentPost.category) score += 10
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag))
    score += sharedTags.length
    return { post, score }
  })
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}

export function getCategoryInfo(category: string) {
  const categoryMap: Record<string, { name: string; icon: string; color: string; description: string }> = {
    'credit-cards': { 
      name: 'Credit Cards', 
      icon: '💳', 
      color: 'bg-violet-100 text-violet-900',
      description: 'Maximize rewards with the best travel credit cards'
    },
    'hotels': { 
      name: 'Hotels', 
      icon: '🏨', 
      color: 'bg-sky-100 text-sky-900',
      description: 'Hotel loyalty programs and booking strategies'
    },
    'airlines': { 
      name: 'Airlines', 
      icon: '✈️', 
      color: 'bg-emerald-100 text-emerald-900',
      description: 'Airline miles programs and flight booking tips'
    },
    'travel-tips': { 
      name: 'Travel Tips', 
      icon: '💡', 
      color: 'bg-amber-100 text-amber-900',
      description: 'Practical advice for smarter travel'
    },
    'destinations': { 
      name: 'Destinations', 
      icon: '🌍', 
      color: 'bg-rose-100 text-rose-900',
      description: 'Travel guides and destination insights'
    },
  }
  
  return categoryMap[category] || { 
    name: category, 
    icon: '📝', 
    color: 'bg-slate-100 text-slate-900',
    description: 'Travel insights and guides'
  }
}
