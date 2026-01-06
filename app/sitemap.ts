import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/blog'
import { getAllTravelGuides } from '@/lib/travel-guides'
import { getCreditCardContent, getHotelProgramContent, getFlightProgramContent, getBankProgramContent } from '@/lib/contentData'
import { getMilesPointsArticleSlugs } from '@/lib/milesPointsArticles'

export const dynamic = 'force-static'

const siteUrl = 'https://www.milesgoround.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/travel-guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/travel-with-points`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/travel-with-points/points-and-miles-explained`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/credit-cards`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/hotel-programs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/flight-programs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/bank-programs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/pointsconversion`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/travel-essentials`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Blog category pages
  const categories = ['credit-cards', 'hotels', 'airlines', 'travel-tips', 'destinations']
  const categoryPages: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${siteUrl}/blog/category/${category}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Learning/Miles Points Explained articles
  const learningArticleSlugs = getMilesPointsArticleSlugs()
  const learningPages: MetadataRoute.Sitemap = learningArticleSlugs.map(slug => ({
    url: `${siteUrl}/learning/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Dynamic content pages
  const [blogPosts, travelGuides, creditCards, hotelPrograms, flightPrograms, bankPrograms] = await Promise.all([
    getAllBlogPosts(),
    getAllTravelGuides(),
    getCreditCardContent().then(c => c.cards),
    getHotelProgramContent().then(c => c.programs),
    getFlightProgramContent().then(c => c.programs),
    getBankProgramContent().then(c => c.programs),
  ])

  const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: post.updatedOn ? new Date(post.updatedOn) : new Date(post.publishedOn),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const guidePages: MetadataRoute.Sitemap = travelGuides.map(guide => ({
    url: `${siteUrl}/${guide.slug}`,
    lastModified: new Date(guide.publishedOn),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const creditCardPages: MetadataRoute.Sitemap = creditCards.map(card => ({
    url: `${siteUrl}/${card.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const hotelProgramPages: MetadataRoute.Sitemap = hotelPrograms.map(program => ({
    url: `${siteUrl}/${program.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const flightProgramPages: MetadataRoute.Sitemap = flightPrograms.map(program => ({
    url: `${siteUrl}/${program.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const bankProgramPages: MetadataRoute.Sitemap = bankPrograms.map(program => ({
    url: `${siteUrl}/${program.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...categoryPages,
    ...learningPages,
    ...blogPages,
    ...guidePages,
    ...creditCardPages,
    ...hotelProgramPages,
    ...flightProgramPages,
    ...bankProgramPages,
  ]
}
