# Design Document

## Overview

The blog system for Miles Go Round will be a statically-generated, SEO-optimized content platform built on Next.js with static export. The system uses a file-based architecture with MDX files for content storage, organized by category to ensure scalability, maintainability, and optimal performance on Cloudflare Pages.

The design prioritizes:
- **SEO Excellence**: Complete metadata, structured data, and static HTML
- **Cloudflare Optimization**: Static export to avoid worker bundle limits
- **Scalability**: Efficient file organization supporting 100+ posts
- **Performance**: Fast builds, optimized images, lazy loading
- **Developer Experience**: Simple content authoring with MDX
- **User Experience**: Intuitive navigation, search, and discovery

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Static Export                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   /blog      │  │ /blog/[cat]  │  │/blog/[cat]/  │      │
│  │   Landing    │  │   Category   │  │   [slug]     │      │
│  │     Page     │  │    Pages     │  │  Post Pages  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ /blog/tags/  │  │   Shared     │  │   Content    │      │
│  │   [tag]      │  │  Components  │  │   Utilities  │      │
│  │  Tag Pages   │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Content Layer (MDX)                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  content/blog/                                               │
│  ├── credit-cards/                                           │
│  │   ├── best-cards-2025.mdx                                │
│  │   └── card-comparison.mdx                                │
│  ├── hotels/                                                 │
│  ├── airlines/                                               │
│  ├── travel-tips/                                            │
│  └── destinations/                                           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```


### Storage Strategy: MDX Files vs JSON

**Recommended Approach: MDX Files**

For your blog system, **MDX (Markdown + JSX)** is the optimal storage format because:

1. **Content-First Authoring**: Write in Markdown, embed React components when needed
2. **No Bundle Bloat**: MDX files are processed at build time, not included in the worker bundle
3. **SEO-Friendly**: Content is compiled to static HTML during build
4. **Scalability**: File system handles 1000+ posts without performance issues
5. **Version Control**: Each post is a separate file, easy to track changes in Git
6. **Flexibility**: Can embed custom components (comparison tables, interactive elements)

**File Organization Structure:**

```
content/
└── blog/
    ├── credit-cards/
    │   ├── best-credit-cards-2025.mdx
    │   ├── hdfc-regalia-review.mdx
    │   └── axis-magnus-vs-infinia.mdx
    ├── hotels/
    │   ├── marriott-bonvoy-guide.mdx
    │   └── hyatt-vs-hilton.mdx
    ├── airlines/
    │   ├── air-india-maharaja-club.mdx
    │   └── indigo-bluechip-review.mdx
    ├── travel-tips/
    │   ├── avoid-tourist-scams-paris.mdx
    │   └── packing-light-guide.mdx
    └── destinations/
        ├── tokyo-3-day-itinerary.mdx
        └── bali-budget-guide.mdx
```

**MDX Frontmatter Structure:**

```yaml
---
title: "Best Credit Cards for Travel in 2025"
slug: "best-credit-cards-2025"
excerpt: "Comprehensive guide to the top travel credit cards..."
author: "Manik"
publishedOn: "2025-01-15"
updatedOn: "2025-01-20"
category: "credit-cards"
tags: ["credit cards", "travel rewards", "points", "2025"]
featured: true
heroImage:
  src: "/images/blog/credit-cards-2025.jpg"
  alt: "Top travel credit cards laid out on a map"
seoTitle: "Best Travel Credit Cards 2025 | Miles Go Round"
seoDescription: "Discover the best credit cards for travel rewards..."
readTime: "8 min read"
---
```


### Why MDX Over JSON?

| Aspect | MDX Files | JSON Files |
|--------|-----------|------------|
| **Content Authoring** | Natural Markdown syntax | Requires escaping, verbose |
| **Rich Formatting** | Native support | Must store as HTML strings |
| **Component Embedding** | Direct JSX components | Not possible |
| **Bundle Size** | Compiled at build time | Can bloat bundle if not careful |
| **Version Control** | Clean diffs | Messy diffs with escaped content |
| **Scalability** | Excellent (1000+ posts) | Good (requires careful indexing) |
| **SEO** | Perfect (static HTML) | Perfect (static HTML) |
| **Build Performance** | Fast with caching | Fast with caching |

### Alternative: Hybrid Approach (If Needed Later)

For metadata-heavy operations (search, filtering), you can generate a `blog-index.json` at build time:

```json
{
  "posts": [
    {
      "slug": "best-credit-cards-2025",
      "title": "Best Credit Cards for Travel in 2025",
      "category": "credit-cards",
      "tags": ["credit cards", "travel rewards"],
      "publishedOn": "2025-01-15",
      "excerpt": "Comprehensive guide...",
      "readTime": "8 min read"
    }
  ],
  "categories": {
    "credit-cards": { "name": "Credit Cards", "count": 45 },
    "hotels": { "name": "Hotels", "count": 32 }
  },
  "tags": {
    "credit cards": 45,
    "travel rewards": 38
  }
}
```

This index is generated during build and used for client-side search/filtering without bloating the bundle.


## Components and Interfaces

### Page Components

#### 1. Blog Landing Page (`/blog/page.tsx`)

**Purpose**: Main entry point for the blog, showcasing featured posts and categories

**Key Features**:
- Hero section with site tagline
- Featured posts carousel (3-4 posts)
- Category grid with post counts
- Latest posts section (6-9 posts)
- Search bar for filtering

**Props**: None (server component, fetches data at build time)

#### 2. Category Page (`/blog/[category]/page.tsx`)

**Purpose**: Display all posts within a specific category

**Key Features**:
- Category header with description
- Post grid/list with filtering
- Tag cloud for the category
- Pagination or load more
- Breadcrumbs

**Props**:
```typescript
interface CategoryPageProps {
  params: { category: string }
}
```

#### 3. Blog Post Page (`/blog/[category]/[slug]/page.tsx`)

**Purpose**: Display individual blog post with full content

**Key Features**:
- Hero image
- Post metadata (author, date, reading time)
- Table of contents (auto-generated)
- Rich MDX content
- Related posts section
- Social sharing buttons
- Breadcrumbs

**Props**:
```typescript
interface BlogPostPageProps {
  params: { 
    category: string
    slug: string 
  }
}
```

#### 4. Tag Page (`/blog/tags/[tag]/page.tsx`)

**Purpose**: Display all posts with a specific tag

**Key Features**:
- Tag header with post count
- Post grid/list
- Related tags
- Breadcrumbs

**Props**:
```typescript
interface TagPageProps {
  params: { tag: string }
}
```


### Shared Components

#### BlogPostCard

**Purpose**: Reusable card component for displaying post previews

```typescript
interface BlogPostCardProps {
  post: {
    slug: string
    title: string
    excerpt: string
    category: string
    publishedOn: string
    readTime: string
    heroImage: {
      src: string
      alt: string
    }
    tags: string[]
  }
  variant?: 'default' | 'featured' | 'compact'
}
```

#### CategoryBadge

**Purpose**: Display category with consistent styling

```typescript
interface CategoryBadgeProps {
  category: string
  size?: 'sm' | 'md' | 'lg'
}
```

#### TableOfContents

**Purpose**: Auto-generated navigation for blog post sections

```typescript
interface TableOfContentsProps {
  headings: Array<{
    id: string
    text: string
    level: number
  }>
}
```

#### RelatedPosts

**Purpose**: Display related posts at the end of an article

```typescript
interface RelatedPostsProps {
  currentPost: BlogPost
  maxPosts?: number
}
```

#### SearchBar

**Purpose**: Client-side search and filtering

```typescript
interface SearchBarProps {
  posts: BlogPost[]
  onFilter: (filtered: BlogPost[]) => void
}
```


## Data Models

### BlogPost

```typescript
interface BlogPost {
  // Core Content
  slug: string                    // URL-friendly identifier
  title: string                   // Post title
  excerpt: string                 // Short summary (150-200 chars)
  content: string                 // Full MDX content
  
  // Metadata
  author: string                  // Author name
  publishedOn: string            // ISO date string
  updatedOn?: string             // ISO date string (optional)
  category: string               // Category slug
  tags: string[]                 // Array of tag strings
  featured: boolean              // Featured on homepage
  
  // Media
  heroImage: {
    src: string                  // Image path
    alt: string                  // Alt text for accessibility
  }
  
  // SEO
  seoTitle: string               // Custom SEO title (60 chars)
  seoDescription: string         // Meta description (155 chars)
  keywords?: string[]            // Optional keywords
  
  // Computed
  readTime: string               // e.g., "8 min read"
  wordCount: number              // Total words
  url: string                    // Full URL path
}
```

### Category

```typescript
interface Category {
  slug: string                   // URL-friendly identifier
  name: string                   // Display name
  description: string            // Category description
  icon?: string                  // Optional icon/emoji
  color?: string                 // Theme color
  postCount: number              // Number of posts
  featured: boolean              // Show on homepage
}
```

### Tag

```typescript
interface Tag {
  slug: string                   // URL-friendly identifier
  name: string                   // Display name
  postCount: number              // Number of posts
}
```

### BlogIndex (Generated at Build)

```typescript
interface BlogIndex {
  posts: BlogPost[]
  categories: Record<string, Category>
  tags: Record<string, Tag>
  featuredPosts: BlogPost[]
  latestPosts: BlogPost[]
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Acceptance Criteria Testing Prework

**1.1 WHEN a content creator writes a blog post THEN the system SHALL support the following categories: Credit Cards, Hotels, Airlines, Travel Tips, and Destinations**

Thoughts: This is about validating that blog posts can only be assigned to valid categories. We can test this by generating random blog post data with both valid and invalid categories, and ensuring the system accepts valid ones and rejects invalid ones.

Testable: yes - property

**1.2 WHEN a blog post is created THEN the system SHALL store it in a structured format with metadata including title, slug, excerpt, author, publish date, category, tags, and SEO fields**

Thoughts: This is testing that all required fields are present in a blog post. We can generate random blog posts and validate that each one contains all required fields with proper types.

Testable: yes - property

**1.5 WHEN the site is built THEN the system SHALL generate static HTML pages for all blog posts**

Thoughts: This is testing the build output. We can verify that for every MDX file in the content directory, a corresponding HTML file exists in the output directory.

Testable: yes - property

**2.4 WHEN a category page loads THEN the system SHALL include proper SEO metadata and structured data**

Thoughts: This is testing that generated pages contain required SEO elements. We can parse the HTML output and verify presence of meta tags, Open Graph tags, and JSON-LD structured data.

Testable: yes - property

**3.5 WHEN a blog post loads THEN the system SHALL include breadcrumb navigation showing Blog > Category > Post Title**

Thoughts: This is testing that breadcrumbs are correctly generated. We can verify that the breadcrumb structure matches the expected hierarchy for any given post.

Testable: yes - property

**4.3 WHEN related posts are shown THEN the system SHALL prioritize posts from the same category first, then by shared tags**

Thoughts: This is testing the related posts algorithm. We can create test posts with various category and tag combinations, then verify the related posts are sorted correctly.

Testable: yes - property

**5.1 WHEN a blog post page is generated THEN the system SHALL include complete HTML meta tags for title, description, and keywords**

Thoughts: This is testing SEO metadata completeness. We can parse generated HTML and verify all required meta tags are present and non-empty.

Testable: yes - property

**5.4 WHEN a blog post page is generated THEN the system SHALL include JSON-LD structured data with Article schema**

Thoughts: This is testing structured data generation. We can parse the JSON-LD from generated pages and validate it against the Article schema specification.

Testable: yes - property

**6.1 WHEN blog posts exceed 100 articles THEN the system SHALL maintain fast build times under 5 minutes**

Thoughts: This is a performance test. We can measure build time with varying numbers of posts to ensure it scales linearly and stays under the threshold.

Testable: yes - property

**7.2 WHEN a visitor enters a search query THEN the system SHALL display matching results in real-time using client-side filtering**

Thoughts: This is testing search functionality. We can simulate search queries and verify that results match the expected posts based on title and content matching.

Testable: yes - property


### Property Reflection

After reviewing all testable properties, here are the consolidated, non-redundant properties:

**Redundancy Analysis**:
- Properties 5.1 and 2.4 both test SEO metadata presence - can be combined into one comprehensive property
- Properties 1.2 and 5.1 overlap on metadata validation - the comprehensive metadata property covers both

**Final Properties** (after removing redundancy):

1. **Category Validation Property** (from 1.1)
2. **Required Fields Property** (from 1.2) 
3. **Static Generation Property** (from 1.5)
4. **SEO Completeness Property** (combines 2.4, 5.1, 5.4)
5. **Breadcrumb Structure Property** (from 3.5)
6. **Related Posts Sorting Property** (from 4.3)
7. **Build Performance Property** (from 6.1)
8. **Search Filtering Property** (from 7.2)

### Correctness Properties

Property 1: Valid Category Assignment
*For any* blog post, the category field must be one of the five valid categories: credit-cards, hotels, airlines, travel-tips, or destinations
**Validates: Requirements 1.1**

Property 2: Required Metadata Completeness
*For any* blog post, all required fields (title, slug, excerpt, author, publishedOn, category, tags, heroImage, seoTitle, seoDescription) must be present and non-empty
**Validates: Requirements 1.2**

Property 3: Static HTML Generation
*For any* MDX file in the content/blog directory, a corresponding static HTML file must exist in the build output at the correct path
**Validates: Requirements 1.5**

Property 4: SEO Metadata Completeness
*For any* generated blog post page, the HTML must contain complete meta tags (title, description), Open Graph tags (og:title, og:description, og:image, og:url), Twitter Card tags, and valid JSON-LD structured data with Article schema
**Validates: Requirements 2.4, 5.1, 5.4**

Property 5: Breadcrumb Hierarchy
*For any* blog post page, the breadcrumb navigation must follow the structure: Home > Blog > [Category Name] > [Post Title], with each segment linking to the correct URL
**Validates: Requirements 3.5**

Property 6: Related Posts Prioritization
*For any* blog post, the related posts list must be sorted such that posts from the same category appear before posts from different categories, and within each group, posts with more shared tags appear first
**Validates: Requirements 4.3**

Property 7: Build Performance Scaling
*For any* number of blog posts N where N ≤ 200, the total build time must be less than 5 minutes, demonstrating linear or sub-linear scaling
**Validates: Requirements 6.1**

Property 8: Search Result Accuracy
*For any* search query string, the filtered results must include only posts where the query appears in the title, excerpt, or tags (case-insensitive), and all matching posts must be included
**Validates: Requirements 7.2**


## Error Handling

### Content Validation Errors

**Scenario**: MDX file missing required frontmatter fields

**Handling**:
- Build-time validation catches missing fields
- Clear error message indicates which file and which fields are missing
- Build fails with exit code 1 to prevent deployment of incomplete content
- Error message format: `[Blog Build Error] content/blog/credit-cards/post.mdx: Missing required field 'seoDescription'`

**Scenario**: Invalid category slug in frontmatter

**Handling**:
- Validation checks category against allowed list
- Error message shows invalid category and lists valid options
- Build fails to prevent broken category pages
- Suggestion provided to fix the category or add new category to config

### File System Errors

**Scenario**: MDX file cannot be read or parsed

**Handling**:
- Try-catch around file reading operations
- Log specific file path and error details
- Skip the problematic file and continue build (with warning)
- Generate error report at end of build listing all skipped files

**Scenario**: Image referenced in post doesn't exist

**Handling**:
- Validate image paths during build
- Warning logged but build continues
- Fallback placeholder image used in production
- Error report lists all missing images for content team to fix

### URL Generation Errors

**Scenario**: Duplicate slugs across posts

**Handling**:
- Build-time check for slug uniqueness within each category
- Error message shows both files with duplicate slugs
- Build fails to prevent URL conflicts
- Suggestion to rename one of the slugs

**Scenario**: Invalid characters in slug

**Handling**:
- Validation ensures slugs match pattern: `^[a-z0-9-]+$`
- Auto-sanitization option: convert spaces to hyphens, remove special chars
- Warning if auto-sanitization applied
- Error if slug becomes empty after sanitization


### Runtime Errors

**Scenario**: Search query causes performance issues

**Handling**:
- Debounce search input (300ms delay)
- Limit search to first 1000 characters of content
- Show loading indicator for searches taking >100ms
- Graceful degradation: if search fails, show all posts

**Scenario**: Related posts algorithm fails

**Handling**:
- Try-catch around related posts calculation
- Fallback to showing latest posts from same category
- Log error for debugging but don't break page render
- Minimum of 3 related posts always shown (even if not truly related)

### Build Optimization Errors

**Scenario**: Build exceeds Cloudflare Pages limits

**Handling**:
- Monitor build output size during build
- Warning at 80% of size limit
- Error with specific recommendations if limit exceeded:
  - Optimize images (convert to WebP, reduce quality)
  - Enable image lazy loading
  - Split large posts into series
  - Consider pagination for category pages

**Scenario**: Build time exceeds 5 minutes

**Handling**:
- Progress indicators during build showing which posts are being processed
- Identify slowest posts and log warnings
- Recommendations for optimization:
  - Reduce image sizes
  - Simplify complex MDX components
  - Enable incremental builds
  - Consider build caching strategies


## Testing Strategy

### Unit Testing

**Content Utilities**:
- Test MDX parsing and frontmatter extraction
- Test slug generation and sanitization
- Test reading time calculation
- Test excerpt generation from content
- Test category and tag validation

**Component Testing**:
- Test BlogPostCard renders correctly with various props
- Test TableOfContents generates correct structure
- Test SearchBar filters posts accurately
- Test RelatedPosts algorithm with various post combinations
- Test CategoryBadge displays correct styling

**URL Generation**:
- Test blog post URL construction
- Test category URL construction
- Test tag URL construction
- Test breadcrumb URL generation

### Property-Based Testing

The system will use **fast-check** (JavaScript property-based testing library) for verifying universal properties.

**Configuration**: Each property test will run a minimum of 100 iterations to ensure thorough coverage.

**Property Test 1: Valid Category Assignment**
- **Feature: blog-system, Property 1: Valid Category Assignment**
- Generate random blog post objects with various category values
- Verify that validation accepts only valid categories and rejects invalid ones
- **Validates: Requirements 1.1**

**Property Test 2: Required Metadata Completeness**
- **Feature: blog-system, Property 2: Required Metadata Completeness**
- Generate random blog post objects with missing or empty fields
- Verify that validation catches all missing required fields
- **Validates: Requirements 1.2**

**Property Test 3: Static HTML Generation**
- **Feature: blog-system, Property 3: Static HTML Generation**
- Generate random MDX files in test content directory
- Run build process
- Verify corresponding HTML files exist at correct paths
- **Validates: Requirements 1.5**

**Property Test 4: SEO Metadata Completeness**
- **Feature: blog-system, Property 4: SEO Metadata Completeness**
- Generate random blog posts and build pages
- Parse generated HTML
- Verify all required meta tags, Open Graph tags, and JSON-LD are present and valid
- **Validates: Requirements 2.4, 5.1, 5.4**

**Property Test 5: Breadcrumb Hierarchy**
- **Feature: blog-system, Property 5: Breadcrumb Hierarchy**
- Generate random blog posts with various categories
- Verify breadcrumb structure matches expected hierarchy
- Verify all breadcrumb links are valid URLs
- **Validates: Requirements 3.5**

**Property Test 6: Related Posts Prioritization**
- **Feature: blog-system, Property 6: Related Posts Prioritization**
- Generate sets of blog posts with various category and tag combinations
- For each post, verify related posts are sorted correctly (same category first, then by shared tags)
- **Validates: Requirements 4.3**

**Property Test 7: Build Performance Scaling**
- **Feature: blog-system, Property 7: Build Performance Scaling**
- Generate varying numbers of test blog posts (10, 50, 100, 150, 200)
- Measure build time for each set
- Verify build time remains under 5 minutes and scales linearly or better
- **Validates: Requirements 6.1**

**Property Test 8: Search Result Accuracy**
- **Feature: blog-system, Property 8: Search Result Accuracy**
- Generate random blog posts and random search queries
- Verify search results include all matching posts and exclude non-matching posts
- Verify case-insensitive matching
- **Validates: Requirements 7.2**


### Integration Testing

**Build Process Integration**:
- Test complete build pipeline from MDX files to static HTML
- Verify all pages are generated correctly
- Test that generateStaticParams returns all expected paths
- Verify no broken links in generated pages

**Navigation Integration**:
- Test navigation from homepage to blog landing
- Test navigation from blog landing to category pages
- Test navigation from category pages to individual posts
- Test tag navigation across the site
- Verify breadcrumbs work correctly at all levels

**SEO Integration**:
- Test that all pages have unique titles and descriptions
- Verify canonical URLs are correct
- Test that structured data validates against schema.org
- Verify sitemap includes all blog pages
- Test robots.txt allows blog indexing

**Performance Integration**:
- Test that images are optimized and lazy-loaded
- Verify bundle size stays within Cloudflare limits
- Test that pages load quickly (< 2s on 3G)
- Verify Core Web Vitals meet thresholds

### End-to-End Testing

**User Journeys**:
1. Visitor lands on homepage → clicks blog link → browses categories → reads post
2. Visitor searches for topic → filters by tag → reads multiple posts
3. Visitor reads post → clicks related post → shares on social media
4. Visitor navigates via breadcrumbs → returns to category → finds another post

**Content Creator Workflows**:
1. Create new MDX file → add frontmatter → write content → build → verify output
2. Update existing post → change metadata → rebuild → verify changes reflected
3. Add new category → create posts → verify category page generated
4. Add images → reference in post → verify images display correctly


## Implementation Details

### MDX Processing Pipeline

**Step 1: File Discovery**
```typescript
// lib/blog.ts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const contentDir = path.join(process.cwd(), 'content/blog')
  const categories = await fs.readdir(contentDir)
  
  const posts = []
  for (const category of categories) {
    const categoryPath = path.join(contentDir, category)
    const files = await fs.readdir(categoryPath)
    
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const post = await processMDXFile(categoryPath, file, category)
        posts.push(post)
      }
    }
  }
  
  return posts.sort((a, b) => 
    new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
  )
}
```

**Step 2: MDX Parsing**
```typescript
import { compileMDX } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

async function processMDXFile(
  categoryPath: string, 
  filename: string, 
  category: string
): Promise<BlogPost> {
  const filePath = path.join(categoryPath, filename)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  
  // Parse frontmatter
  const { data: frontmatter, content } = matter(fileContent)
  
  // Validate required fields
  validateFrontmatter(frontmatter, filePath)
  
  // Calculate reading time
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200) + ' min read'
  
  // Generate URL
  const url = `/blog/${category}/${frontmatter.slug}`
  
  return {
    ...frontmatter,
    category,
    content,
    wordCount,
    readTime,
    url,
  } as BlogPost
}
```

**Step 3: Static Path Generation**
```typescript
// app/blog/[category]/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }))
}
```


### SEO Metadata Generation

**Page Metadata**:
```typescript
// app/blog/[category]/[slug]/page.tsx
import { Metadata } from 'next'

export async function generateMetadata({ 
  params 
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.category, params.slug)
  
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
      images: [
        {
          url: post.heroImage.src,
          alt: post.heroImage.alt,
        },
      ],
      url: `https://milesgoround.com${post.url}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.heroImage.src],
    },
    alternates: {
      canonical: `https://milesgoround.com${post.url}`,
    },
  }
}
```

**Structured Data**:
```typescript
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.category, params.slug)
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage.src,
    datePublished: post.publishedOn,
    dateModified: post.updatedOn || post.publishedOn,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Miles Go Round',
      logo: {
        '@type': 'ImageObject',
        url: 'https://milesgoround.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://milesgoround.com${post.url}`,
    },
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Page content */}
    </>
  )
}
```


### Search and Filtering

**Client-Side Search Implementation**:
```typescript
'use client'

import { useState, useMemo } from 'react'

export function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  const filteredPosts = useMemo(() => {
    let filtered = posts
    
    // Text search
    if (query) {
      const lowerQuery = query.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    }
    
    // Tag filtering
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.every(tag => post.tags.includes(tag))
      )
    }
    
    return filtered
  }, [posts, query, selectedTags])
  
  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
      />
      {/* Tag filters and results */}
    </div>
  )
}
```

### Related Posts Algorithm

```typescript
export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  maxResults: number = 4
): BlogPost[] {
  const otherPosts = allPosts.filter(p => p.slug !== currentPost.slug)
  
  // Score each post
  const scored = otherPosts.map(post => {
    let score = 0
    
    // Same category: +10 points
    if (post.category === currentPost.category) {
      score += 10
    }
    
    // Shared tags: +1 point per tag
    const sharedTags = post.tags.filter(tag => 
      currentPost.tags.includes(tag)
    )
    score += sharedTags.length
    
    return { post, score }
  })
  
  // Sort by score and return top results
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.post)
}
```

### Performance Optimizations

**Image Optimization**:
- Use Next.js Image component with `unoptimized: true` for static export
- Manually optimize images before adding to project (WebP format, 80% quality)
- Implement lazy loading for images below the fold
- Use responsive images with appropriate sizes

**Bundle Size Management**:
- MDX content compiled at build time (not included in bundle)
- Blog index JSON generated at build time (< 100KB for 200 posts)
- Code splitting for search functionality
- Tree-shaking unused components

**Build Performance**:
- Parallel processing of MDX files
- Caching of parsed frontmatter
- Incremental builds (only rebuild changed posts)
- Build progress indicators

## Deployment Considerations

### Cloudflare Pages Configuration

**Build Settings**:
```
Build command: npm run build
Build output directory: out
Node version: 18
```

**Environment Variables**:
```
NEXT_PUBLIC_SITE_URL=https://milesgoround.com
```

**Redirects** (in `public/_redirects`):
```
/blog/* /blog/:splat 200
```

### Static Export Verification

**Pre-deployment Checklist**:
1. ✅ All blog posts have valid frontmatter
2. ✅ All images exist and are optimized
3. ✅ No duplicate slugs
4. ✅ Build completes successfully
5. ✅ Output directory size < 25MB
6. ✅ All pages have proper metadata
7. ✅ Structured data validates
8. ✅ No broken links

### Monitoring and Analytics

**Key Metrics to Track**:
- Page views per blog post
- Average time on page
- Bounce rate
- Most popular categories
- Most popular tags
- Search queries (if implemented server-side)
- Social shares

**Implementation**:
```typescript
// app/blog/[category]/[slug]/page.tsx
export default function BlogPostPage() {
  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: post.title,
        page_location: window.location.href,
        page_path: post.url,
      })
    }
  }, [])
  
  return (/* ... */)
}
```

## Future Enhancements

### Phase 2 Features (Post-MVP)

1. **Newsletter Integration**: Collect emails for blog updates
2. **Comments System**: Integrate with Disqus or similar
3. **Author Pages**: Dedicated pages for each author
4. **Series/Collections**: Group related posts into series
5. **Reading Progress**: Show progress bar as user scrolls
6. **Bookmarking**: Allow users to save posts for later
7. **Dark Mode**: Theme toggle for blog pages
8. **RSS Feed**: Auto-generated RSS feed for subscribers
9. **Sitemap**: Auto-generated sitemap for SEO
10. **Admin Dashboard**: Simple CMS for non-technical content creators

### Scalability Considerations

**When blog exceeds 500 posts**:
- Consider pagination on category pages (20 posts per page)
- Implement virtual scrolling for long lists
- Add category-level caching
- Consider CDN caching strategies

**When blog exceeds 1000 posts**:
- Consider moving to a headless CMS (Contentful, Sanity)
- Implement full-text search with Algolia or similar
- Add database for metadata (keep content in MDX)
- Consider incremental static regeneration (ISR) if moving away from pure static

## Summary

This design provides a robust, SEO-optimized blog system that:
- ✅ Scales to 200+ posts without performance issues
- ✅ Generates fully static HTML for Cloudflare Pages
- ✅ Stays within worker bundle size limits
- ✅ Provides excellent SEO with complete metadata
- ✅ Offers great UX with search, filtering, and related posts
- ✅ Maintains consistency with existing site design
- ✅ Supports rich content authoring with MDX
- ✅ Enables easy content management with file-based approach

The MDX-based approach ensures content is compiled at build time, keeping the runtime bundle small while providing maximum flexibility for content creators.
