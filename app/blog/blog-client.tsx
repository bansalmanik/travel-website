'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/blog'

interface BlogClientProps {
  posts: BlogPost[]
  categories: string[]
  categoryInfo: Record<string, { name: string; icon: string; color: string; description: string }>
}

export default function BlogClient({ posts, categories, categoryInfo }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category === selectedCategory)
    : posts
  
  return (
    <div className="min-h-screen bg-white">
      {/* Compact Header */}
      <section className="border-b border-slate-200 bg-white py-6 sm:py-8 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-1">
            Travel Guides
          </h1>
          
          {/* Filter Label with scroll hint */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-600">Filter by category:</p>
            <p className="text-xs text-slate-400 sm:hidden">Swipe to see more →</p>
          </div>
          
          {/* Filter Pills - Horizontal Scroll on Mobile with gradient hint */}
          <div className="relative">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide snap-x snap-mandatory">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all snap-start ${
                  selectedCategory === null
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {categories.map(cat => {
                const info = categoryInfo[cat]
                const count = posts.filter(p => p.category === cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all snap-start ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span className="mr-1.5">{info.icon}</span>
                    {info.name}
                    <span className="ml-1.5 opacity-60">({count})</span>
                  </button>
                )
              })}
            </div>
            {/* Gradient hint for more content on mobile */}
            <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden" />
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No articles found in this category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 lg:gap-10">
                {filteredPosts.map(post => (
                  <Link 
                    key={post.slug} 
                    href={post.url}
                    className="group"
                  >
                    {/* Image with overlay text */}
                    <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image 
                        src={post.heroImage.src} 
                        alt={post.heroImage.alt} 
                        fill 
                        className="object-cover transition-transform duration-300 group-hover:scale-105" 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                        <h2 className="text-base sm:text-lg font-bold text-white line-clamp-2 drop-shadow-lg">
                          {post.title}
                        </h2>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 text-center text-sm text-slate-500">
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              </div>
            </>
          )}
        </div>
      </section>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
