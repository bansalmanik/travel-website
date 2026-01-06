import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://www.milesgoround.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private-assets/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
