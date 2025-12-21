import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostsByCategory, getCategoryInfo } from '@/lib/blog'

const CATEGORIES = ['credit-cards', 'hotels', 'airlines', 'travel-tips', 'destinations']

export async function generateStaticParams() {
  return CATEGORIES.map(category => ({ category }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const info = getCategoryInfo(category)
  return {
    title: `${info.name} | Blog | Miles Go Round`,
    description: `${info.description}. Expert guides and tips to maximize your travel rewards.`,
    openGraph: {
      title: `${info.name} | Blog | Miles Go Round`,
      description: `${info.description}. Expert guides and tips to maximize your travel rewards.`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  if (!CATEGORIES.includes(category)) notFound()
  
  const posts = await getPostsByCategory(category)
  const info = getCategoryInfo(category)
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span className="text-slate-400">›</span>
            <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
            <span className="text-slate-400">›</span>
            <span className="text-slate-900">{info.name}</span>
          </nav>
          
          <div className="flex items-center gap-4 sm:gap-5">
            <div className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl text-4xl sm:text-5xl ${info.color}`}>
              {info.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{info.name}</h1>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">{info.description}</p>
              <p className="mt-1 text-sm text-slate-500">{posts.length} {posts.length === 1 ? 'article' : 'articles'}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Posts Grid */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600">No articles in this category yet. Check back soon!</p>
              <Link 
                href="/blog"
                className="mt-4 inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to all articles
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <Link 
                  key={post.slug} 
                  href={post.url}
                  className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    <Image 
                      src={post.heroImage.src} 
                      alt={post.heroImage.alt} 
                      fill 
                      className="object-cover transition-transform duration-300 group-hover:scale-105" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{post.readTime}</span>
                      <span className="text-slate-300">•</span>
                      <time dateTime={post.publishedOn}>
                        {new Date(post.publishedOn).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
