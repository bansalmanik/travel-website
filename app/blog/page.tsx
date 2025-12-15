import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts, getFeaturedPosts, getCategoryInfo } from '@/lib/blog'

const CATEGORIES = ['credit-cards', 'hotels', 'airlines', 'travel-tips', 'destinations']

export const metadata = {
  title: 'Blog | Miles Go Round',
  description: 'Expert guides on credit cards, hotels, airlines, and travel tips to maximize your points and miles.',
  openGraph: {
    title: 'Blog | Miles Go Round',
    description: 'Expert guides on credit cards, hotels, airlines, and travel tips to maximize your points and miles.',
    type: 'website',
  },
}

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts()
  const featuredPosts = await getFeaturedPosts(3)
  const latestPosts = allPosts.slice(0, 12)
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            Travel Smarter with Expert Guides
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Credit cards, hotels, airlines, and travel tips to maximize your adventures
          </p>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6 sm:text-2xl">Browse by Category</h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map(cat => {
              const info = getCategoryInfo(cat)
              const count = allPosts.filter(p => p.category === cat).length
              return (
                <Link 
                  key={cat} 
                  href={`/blog/category/${cat}`}
                  className={`group rounded-2xl border border-slate-200 p-5 text-center transition-all hover:shadow-lg hover:scale-105 ${info.color}`}
                >
                  <div className="text-3xl sm:text-4xl mb-2">{info.icon}</div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{info.name}</h3>
                  <p className="text-xs opacity-75">{count} {count === 1 ? 'article' : 'articles'}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50 py-10 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 sm:text-2xl">Featured Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map(post => (
                <Link 
                  key={post.slug} 
                  href={post.url}
                  className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <Image 
                      src={post.heroImage.src} 
                      alt={post.heroImage.alt} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3 ${getCategoryInfo(post.category).color}`}>
                      {getCategoryInfo(post.category).name}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-600 transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{post.readTime}</span>
                      <span className="text-slate-300">•</span>
                      <time>{new Date(post.publishedOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Latest Posts */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6 sm:text-2xl">Latest Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map(post => (
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
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3 ${getCategoryInfo(post.category).color}`}>
                    {getCategoryInfo(post.category).name}
                  </span>
                  <h3 className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{post.readTime}</span>
                    <span className="text-slate-300">•</span>
                    <time>
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
          
          {allPosts.length > 12 && (
            <div className="mt-10 text-center">
              <p className="text-slate-600">Showing {latestPosts.length} of {allPosts.length} articles</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
