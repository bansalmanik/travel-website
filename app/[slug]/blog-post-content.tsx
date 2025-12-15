import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import { getRelatedPosts, getCategoryInfo } from '@/lib/blog'
import type { BlogPost } from '@/lib/blog'

export default async function BlogPostContent({ post }: { post: BlogPost }) {
  const relatedPosts = await getRelatedPosts(post, 3)
  const categoryInfo = getCategoryInfo(post.category)
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage.src,
    datePublished: post.publishedOn,
    dateModified: post.updatedOn || post.publishedOn,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Miles Go Round',
      logo: { '@type': 'ImageObject', url: 'https://milesgoround.com/Logo/MilesGoRound-Logo-Blue.png' },
    },
  }
  
  return (
    <div className="min-h-screen bg-white">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} 
      />
      
      {/* Breadcrumbs */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span className="text-slate-400">›</span>
            <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
            <span className="text-slate-400">›</span>
            <Link href={`/blog/category/${post.category}`} className="hover:text-slate-900 transition-colors">
              {categoryInfo.name}
            </Link>
          </nav>
        </div>
      </div>
      
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Category Badge */}
        <Link 
          href={`/blog/category/${post.category}`}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:scale-105 ${categoryInfo.color}`}
        >
          <span>{categoryInfo.icon}</span>
          <span>{categoryInfo.name}</span>
        </Link>
        
        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        
        {/* Meta */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold">
              {post.author.charAt(0)}
            </div>
            <span className="font-medium text-slate-900">{post.author}</span>
          </div>
          <span className="text-slate-400">•</span>
          <time dateTime={post.publishedOn} className="text-slate-600">
            {new Date(post.publishedOn).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">{post.readTime}</span>
        </div>
        
        {/* Hero Image */}
        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
          <Image 
            src={post.heroImage.src} 
            alt={post.heroImage.alt} 
            fill 
            className="object-cover" 
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="prose prose-slate mt-10 max-w-none">
          <MDXRemote source={post.content} />
        </div>
        
        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedPosts.map(related => (
                <Link 
                  key={related.slug} 
                  href={related.url}
                  className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <Image 
                      src={related.heroImage.src} 
                      alt={related.heroImage.alt} 
                      fill 
                      className="object-cover transition-transform duration-300 group-hover:scale-105" 
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3 ${getCategoryInfo(related.category).color}`}>
                      {getCategoryInfo(related.category).name}
                    </span>
                    <h3 className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors mb-2 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{related.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
