// Unified content loader for flat URL structure
import { getBlogPost, getAllBlogPosts } from './blog'
import { getStoryBySlug, getAllStorySummaries } from './stories'
import { 
  getCreditCardContent, 
  getFlightProgramContent, 
  getHotelProgramContent
} from './contentData'
import { getTravelResource, getAllTravelResources } from './travel-resources'

export type ContentType = 'blog' | 'story' | 'hotel-program' | 'flight-program' | 'credit-card' | 'travel-resource'

export interface UnifiedContent {
  slug: string
  type: ContentType
  data: any
}

// Reserved routes that should NOT be handled by the catch-all
export const RESERVED_ROUTES = [
  'about',
  'blog',
  'contact',
  'learning',
  'pointsconversion',
  'privacy',
  'stories',
  'terms',
  'travel-resources',
  'travel-with-points',
  '_next',
  'api',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
]

/**
 * Get content by slug from any content type
 */
export async function getContentBySlug(slug: string): Promise<UnifiedContent | null> {
  if (RESERVED_ROUTES.includes(slug)) {
    return null
  }

  // Try blog post
  const blogPost = await getBlogPost(slug)
  if (blogPost) {
    return { slug, type: 'blog', data: blogPost }
  }

  // Try story
  const story = await getStoryBySlug(slug)
  if (story) {
    return { slug, type: 'story', data: story }
  }

  // Try hotel program
  const hotelContent = await getHotelProgramContent()
  const hotelProgram = hotelContent.programs.find((p: any) => p.slug === slug)
  if (hotelProgram) {
    return { slug, type: 'hotel-program', data: hotelProgram }
  }

  // Try flight program
  const flightContent = await getFlightProgramContent()
  const flightProgram = flightContent.programs.find((p: any) => p.slug === slug)
  if (flightProgram) {
    return { slug, type: 'flight-program', data: flightProgram }
  }

  // Try credit card
  const creditCardContent = await getCreditCardContent()
  const creditCard = creditCardContent.cards.find((c: any) => c.slug === slug)
  if (creditCard) {
    return { slug, type: 'credit-card', data: creditCard }
  }

  // Try travel resource (MDX)
  const travelResource = await getTravelResource(slug)
  if (travelResource) {
    return { slug, type: 'travel-resource', data: travelResource }
  }

  return null
}

/**
 * Get all slugs for static generation
 */
export async function getAllContentSlugs(): Promise<string[]> {
  const slugs: string[] = []

  // Blog posts
  const blogPosts = await getAllBlogPosts()
  slugs.push(...blogPosts.map(post => post.slug))

  // Stories
  const stories = await getAllStorySummaries()
  slugs.push(...stories.map(story => story.slug))

  // Hotel programs
  const hotelContent = await getHotelProgramContent()
  slugs.push(...hotelContent.programs.map((p: any) => p.slug))

  // Flight programs
  const flightContent = await getFlightProgramContent()
  slugs.push(...flightContent.programs.map((p: any) => p.slug))

  // Credit cards
  const creditCardContent = await getCreditCardContent()
  slugs.push(...creditCardContent.cards.map((c: any) => c.slug))

  // Travel resources (MDX)
  const travelResources = await getAllTravelResources()
  slugs.push(...travelResources.map(r => r.slug))

  return slugs
}
