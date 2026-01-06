import { getAllBlogPosts, getCategoryInfo } from '@/lib/blog'
import BlogClient from './blog-client'
import type { Metadata } from 'next'

const siteUrl = 'https://www.milesgoround.com'
const CATEGORIES = ['credit-cards', 'hotels', 'airlines', 'travel-tips', 'destinations']

export const metadata: Metadata = {
  title: 'Travel Rewards Blog | Points, Miles & Credit Card Guides',
  description: 'Expert guides on credit cards, hotels, airlines, and travel tips to maximize your points and miles for free flights and hotel stays.',
  keywords: [
    'travel blog',
    'points and miles blog',
    'credit card guides',
    'travel rewards tips',
    'airline miles',
    'hotel points',
  ],
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'Travel Rewards Blog | Miles Go Round',
    description: 'Expert guides on credit cards, hotels, airlines, and travel tips to maximize your points and miles.',
    type: 'website',
    url: `${siteUrl}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Rewards Blog | Miles Go Round',
    description: 'Expert guides on credit cards, hotels, airlines, and travel tips to maximize your points and miles.',
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
    name: 'Miles Go Round Blog',
    description: 'Expert guides on credit cards, hotels, airlines, and travel tips to maximize your points and miles.',
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
