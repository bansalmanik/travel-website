import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getContentBySlug, getAllContentSlugs, RESERVED_ROUTES } from '@/lib/content-loader'

// Import content renderers
import BlogPostContent from './blog-post-content'
import HotelProgramContent from './hotel-program-content'
import FlightProgramContent from './flight-program-content'
import CreditCardContent from './credit-card-content'
import BankProgramContent from './bank-program-content'
import TravelGuideMDXContent from './travel-guide-mdx-content'

const siteUrl = 'https://www.milesgoround.com'

export async function generateStaticParams() {
  const slugs = await getAllContentSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  if (RESERVED_ROUTES.includes(slug)) return {}
  
  const content = await getContentBySlug(slug)
  if (!content) return {}
  
  const canonicalUrl = `${siteUrl}/${slug}`
  
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
          url: canonicalUrl,
        },
        twitter: {
          card: 'summary_large_image',
          title: post.seoTitle,
          description: post.seoDescription,
          images: [post.heroImage.src],
        },
        alternates: {
          canonical: canonicalUrl,
        },
      }
    }
    case 'travel-guide': {
      const guide = content.data
      return {
        title: guide.seoTitle,
        description: guide.seoDescription,
        authors: [{ name: guide.author }],
        openGraph: {
          title: guide.seoTitle,
          description: guide.seoDescription,
          type: 'article',
          publishedTime: guide.publishedOn,
          authors: [guide.author],
          images: [{ url: guide.heroImage.src, alt: guide.heroImage.alt }],
          url: canonicalUrl,
        },
        twitter: {
          card: 'summary_large_image',
          title: guide.seoTitle,
          description: guide.seoDescription,
          images: [guide.heroImage.src],
        },
        alternates: {
          canonical: canonicalUrl,
        },
      }
    }
    case 'hotel-program': {
      const program = content.data
      return {
        title: `${program.name} Loyalty Program Guide | Miles Go Round`,
        description: program.summary || `Complete guide to ${program.name} loyalty program. Learn about elite status, points earning, and redemption strategies.`,
        keywords: [program.name, 'hotel loyalty program', 'hotel points', 'elite status'].join(', '),
        openGraph: {
          title: `${program.name} Loyalty Program Guide`,
          description: program.summary || `Complete guide to ${program.name} loyalty program.`,
          type: 'article',
          url: canonicalUrl,
        },
        twitter: {
          card: 'summary_large_image',
          title: `${program.name} Loyalty Program Guide`,
          description: program.summary || `Complete guide to ${program.name} loyalty program.`,
        },
        alternates: {
          canonical: canonicalUrl,
        },
      }
    }
    case 'flight-program': {
      const program = content.data
      return {
        title: `${program.name} Miles Guide | Award Sweet Spots | Miles Go Round`,
        description: program.summary || `Complete guide to ${program.name}. Find award sweet spots, alliance partners, and redemption strategies.`,
        keywords: [program.name, 'airline miles', 'frequent flyer', 'award travel', program.alliance || ''].filter(Boolean).join(', '),
        openGraph: {
          title: `${program.name} Miles Guide | Award Sweet Spots`,
          description: program.summary || `Complete guide to ${program.name}.`,
          type: 'article',
          url: canonicalUrl,
        },
        twitter: {
          card: 'summary_large_image',
          title: `${program.name} Miles Guide`,
          description: program.summary || `Complete guide to ${program.name}.`,
        },
        alternates: {
          canonical: canonicalUrl,
        },
      }
    }
    case 'credit-card': {
      const card = content.data
      return {
        title: `${card.name} Review | ${card.issuer} | Miles Go Round`,
        description: `${card.name} credit card review. Learn about rewards, benefits, annual fee, and whether this card is right for your travel strategy.`,
        keywords: [card.name, card.issuer, 'credit card review', 'travel credit card', card.rewardsCurrency || ''].filter(Boolean).join(', '),
        openGraph: {
          title: `${card.name} Review | ${card.issuer}`,
          description: `${card.name} credit card review. Learn about rewards, benefits, and annual fee.`,
          type: 'article',
          url: canonicalUrl,
        },
        twitter: {
          card: 'summary_large_image',
          title: `${card.name} Review`,
          description: `${card.name} credit card review. Learn about rewards, benefits, and annual fee.`,
        },
        alternates: {
          canonical: canonicalUrl,
        },
      }
    }
    case 'bank-program': {
      const program = content.data
      return {
        title: `${program.name} Points Guide | Transfer Partners | Miles Go Round`,
        description: program.summary || `Complete guide to ${program.name}. Learn about transfer partners, redemption options, and maximizing your points.`,
        keywords: [program.name, 'bank points', 'transfer partners', 'points program'].join(', '),
        openGraph: {
          title: `${program.name} Points Guide`,
          description: program.summary || `Complete guide to ${program.name}.`,
          type: 'article',
          url: canonicalUrl,
        },
        twitter: {
          card: 'summary_large_image',
          title: `${program.name} Points Guide`,
          description: program.summary || `Complete guide to ${program.name}.`,
        },
        alternates: {
          canonical: canonicalUrl,
        },
      }
    }
    default:
      return {
        title: `${slug} | Miles Go Round`,
        alternates: {
          canonical: canonicalUrl,
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
    case 'hotel-program':
      return <HotelProgramContent program={content.data} />
    case 'flight-program':
      return <FlightProgramContent program={content.data} />
    case 'credit-card':
      return <CreditCardContent card={content.data} />
    case 'bank-program':
      return <BankProgramContent program={content.data} />
    case 'travel-guide':
      return <TravelGuideMDXContent guide={content.data} />
    default:
      notFound()
  }
}
