import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface TravelGuide {
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

const CONTENT_DIR = path.join(process.cwd(), 'content/travel-guides')

export async function getAllTravelGuides(): Promise<TravelGuide[]> {
  const guides: TravelGuide[] = []
  
  try {
    const files = await fs.readdir(CONTENT_DIR)
    
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const filePath = path.join(CONTENT_DIR, file)
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const { data, content } = matter(fileContent)
        
        guides.push({
          ...data,
          content,
          readTime: data.readTime || readingTime(content).text,
          url: `/${data.slug}`,
        } as TravelGuide)
      }
    }
  } catch (error) {
    console.warn('Travel guides directory not found, skipping...')
  }
  
  return guides.sort((a, b) => 
    new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
  )
}

export async function getTravelGuide(slug: string): Promise<TravelGuide | null> {
  const guides = await getAllTravelGuides()
  return guides.find(guide => guide.slug === slug) || null
}
