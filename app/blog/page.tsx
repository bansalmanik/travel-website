import { getAllBlogPosts, getCategoryInfo } from '@/lib/blog'
import BlogClient from './blog-client'
import type { Metadata } from 'next'

const siteUrl = 'https://www.milesgoround.com'
const CATEGORIES = ['credit-cards', 'hotels', 'airlines', 'travel-tips', 'destinations']

export const metadata: Metadata = {
  title: 'Travel Blog | Destinations, Guides & Rewards Tips',
  description: 'Explore destination guides, travel stories, hotel reviews, and tips on maximizing your travel experiences with smart rewards strategies.',
  keywords: [
    'travel blog',
    'destination guides',
    'travel stories',
    'hotel reviews',
    'travel tips',
    'points and miles',
    'travel rewards',
  ],
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'Travel Blog | Miles Go Round',
    description: 'Explore destination guides, travel stories, hotel reviews, and tips on maximizing your travel experiences.',
    type: 'website',
    url: `${siteUrl}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Blog | Miles Go Round',
    description: 'Explore destination guides, travel stories, hotel reviews, and tips on maximizing your travel experiences.',
  },
}

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts()
  
  // Prepare category info as serializable data
  const categoryInfo = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = getCategoryInfo(cat)
    return acc
  }, {} as Record<string, { name: string; icon: string; color: string; description: string }>)
  
  // Structured data for blog listing
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Miles Go Round Travel Blog',
    description: 'Explore destination guides, travel stories, hotel reviews, and tips on maximizing your travel experiences.',
    url: `${siteUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Miles Go Round',
      url: siteUrl,
    },
    blogPost: allPosts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedOn,
      dateModified: post.updatedOn || post.publishedOn,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      url: `${siteUrl}${post.url}`,
      image: post.heroImage?.src,
    })),
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogClient posts={allPosts} categories={CATEGORIES} categoryInfo={categoryInfo} />
    </>
  )
}
