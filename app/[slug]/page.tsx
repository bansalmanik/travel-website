import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getContentBySlug, getAllContentSlugs, RESERVED_ROUTES } from '@/lib/content-loader'

// Import content renderers
import BlogPostContent from './blog-post-content'
import StoryContent from './story-content'
import HotelProgramContent from './hotel-program-content'
import FlightProgramContent from './flight-program-content'
import CreditCardContent from './credit-card-content'
import TravelResourceContent from './travel-resource-content'

export async function generateStaticParams() {
  const slugs = await getAllContentSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  if (RESERVED_ROUTES.includes(slug)) return {}
  
  const content = await getContentBySlug(slug)
  if (!content) return {}
  
  // Generate metadata based on content type
  switch (content.type) {
    case 'blog': {
      const post = content.data
      return {
        title: post.seoTitle,
        description: post.seoDescription,
        keywords: post.tags.join(', '),
        authors: [{ name: post.author }],
        openGraph: {
          title: post.seoTitle,
          description: post.seoDescription,
          type: 'article',
          publishedTime: post.publishedOn,
          modifiedTime: post.updatedOn,
          authors: [post.author],
          images: [{ url: post.heroImage.src, alt: post.heroImage.alt }],
          url: `https://milesgoround.com/${slug}`,
        },
        twitter: {
          card: 'summary_large_image',
          title: post.seoTitle,
          description: post.seoDescription,
          images: [post.heroImage.src],
        },
        alternates: {
          canonical: `https://milesgoround.com/${slug}`,
        },
      }
    }
    case 'story': {
      const story = content.data
      const title = `${story.title} | Miles Go Round`
      const description = `${story.excerpt} Discover travel inspiration from ${story.city}, ${story.country}.`
      return {
        title,
        description,
        authors: [{ name: story.author }],
        openGraph: {
          title,
          description,
          type: 'article',
          images: [{ url: story.coverImage.src, alt: story.coverImage.alt }],
          url: `https://milesgoround.com/${slug}`,
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: [story.coverImage.src],
        },
        alternates: {
          canonical: `https://milesgoround.com/${slug}`,
        },
      }
    }
    default:
      return {
        title: `${slug} | Miles Go Round`,
        alternates: {
          canonical: `https://milesgoround.com/${slug}`,
        },
      }
  }
}

export default async function UnifiedContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  if (RESERVED_ROUTES.includes(slug)) notFound()
  
  const content = await getContentBySlug(slug)
  if (!content) notFound()
  
  // Render the appropriate component based on content type
  switch (content.type) {
    case 'blog':
      return <BlogPostContent post={content.data} />
    case 'story':
      return <StoryContent story={content.data} />
    case 'hotel-program':
      return <HotelProgramContent program={content.data} />
    case 'flight-program':
      return <FlightProgramContent program={content.data} />
    case 'credit-card':
      return <CreditCardContent card={content.data} />
    case 'travel-resource':
      return <TravelResourceContent resource={content.data} />
    default:
      notFound()
  }
}
