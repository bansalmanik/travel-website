import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface TravelResource {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedOn: string
  displayDate: string
  readTime: string
  heroImage: { src: string; alt: string; caption?: string }
  seoTitle: string
  seoDescription: string
  url: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content/travel-resources')

export async function getAllTravelResources(): Promise<TravelResource[]> {
  const resources: TravelResource[] = []
  
  try {
    const files = await fs.readdir(CONTENT_DIR)
    
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const filePath = path.join(CONTENT_DIR, file)
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const { data, content } = matter(fileContent)
        
        resources.push({
          ...data,
          content,
          readTime: data.readTime || readingTime(content).text,
          url: `/${data.slug}`,
        } as TravelResource)
      }
    }
  } catch (error) {
    console.warn('Travel resources directory not found, skipping...')
  }
  
  return resources.sort((a, b) => 
    new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
  )
}

export async function getTravelResource(slug: string): Promise<TravelResource | null> {
  const resources = await getAllTravelResources()
  return resources.find(resource => resource.slug === slug) || null
}
