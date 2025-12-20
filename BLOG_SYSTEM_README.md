# Blog System Documentation

## Overview

A complete, SEO-optimized blog system for Miles Go Round with flat URL structure, mobile-friendly design, and static export compatibility for Cloudflare Pages.

## Features

✅ **Flat URL Structure** - Blog posts at root level (milesgoround.com/post-slug)
✅ **SEO Optimized** - Complete metadata, Open Graph, Twitter Cards, JSON-LD
✅ **Mobile Friendly** - Responsive design, touch-optimized
✅ **Static Export** - All content compiled at build time
✅ **Category System** - 5 categories with dedicated pages
✅ **Related Posts** - Smart algorithm based on category and tags
✅ **Featured Posts** - Highlight important content
✅ **Reading Time** - Automatic calculation
✅ **Social Sharing** - Built-in share buttons

## URL Structure

```
milesgoround.com/best-travel-credit-cards-2025    ← Blog post
milesgoround.com/marriott-bonvoy-guide            ← Blog post
milesgoround.com/blog                             ← Blog landing
milesgoround.com/blog/credit-cards                ← Category page
milesgoround.com/blog/hotels                      ← Category page
```

## Directory Structure

```
content/blog/
├── credit-cards/
│   └── best-travel-credit-cards-2025.mdx
├── hotels/
│   └── marriott-bonvoy-guide.mdx
├── airlines/
│   └── maximize-airline-miles.mdx
├── travel-tips/
│   └── avoid-tourist-scams.mdx
└── destinations/
    └── tokyo-travel-guide.mdx

app/
├── [slug]/page.tsx              ← Blog post page (flat URLs)
├── blog/
│   ├── page.tsx                 ← Blog landing page
│   └── [category]/page.tsx      ← Category pages

lib/
└── blog.ts                      ← Blog utilities
```

## Categories

1. **Credit Cards** (💳) - Credit card reviews and comparisons
2. **Hotels** (🏨) - Hotel loyalty programs and strategies
3. **Airlines** (✈️) - Airline miles and flight booking tips
4. **Travel Tips** (💡) - Practical travel advice
5. **Destinations** (🌍) - Travel guides and itineraries

## Creating a New Blog Post

### 1. Create MDX File

Create a new `.mdx` file in the appropriate category folder:

```
content/blog/[category]/your-post-slug.mdx
```

### 2. Add Frontmatter

```yaml
---
title: "Your Post Title"
slug: "your-post-slug"
excerpt: "Brief description for previews and SEO"
author: "Manik"
publishedOn: "2025-01-15"
updatedOn: "2025-01-20"  # Optional
category: "credit-cards"  # Must match folder name
tags: ["tag1", "tag2", "tag3"]
featured: true  # Show on featured section
heroImage:
  src: "/images/blog/your-image.jpg"
  alt: "Image description"
seoTitle: "SEO-optimized title | Miles Go Round"
seoDescription: "SEO-optimized description (150-160 chars)"
readTime: "8 min read"  # Optional, auto-calculated if omitted
---
```

### 3. Write Content

Use standard Markdown/MDX syntax:

```markdown
## Introduction

Your introduction paragraph...

### Subheading

Content with **bold** and *italic* text.

- Bullet points
- More points

1. Numbered lists
2. More items

[Link text](https://example.com)

![Image alt text](/images/blog/image.jpg)
```

### 4. Build and Deploy

```bash
npm run build
```

The post will automatically:
- Generate at `/your-post-slug`
- Appear in category page
- Show in blog landing page
- Include in related posts algorithm

## Styling Guide

### Typography

The blog uses a custom prose configuration:
- Headings: Bold, slate-900, tight tracking
- Body: Slate-700, relaxed leading
- Links: Sky-600, no underline, hover underline
- Strong: Slate-900, semibold

### Images

- Hero images: 16:9 aspect ratio
- Rounded corners with shadow
- Hover scale effect
- Lazy loading enabled

### Colors

Category badges use distinct colors:
- Credit Cards: Violet (bg-violet-100 text-violet-900)
- Hotels: Sky (bg-sky-100 text-sky-900)
- Airlines: Emerald (bg-emerald-100 text-emerald-900)
- Travel Tips: Amber (bg-amber-100 text-amber-900)
- Destinations: Rose (bg-rose-100 text-rose-900)

## SEO Features

### Metadata
- Title, description, keywords
- Author information
- Publication and modification dates

### Open Graph
- Title, description, type
- Images with alt text
- URL canonical

### Twitter Cards
- Large image card
- Title and description
- Images

### JSON-LD Structured Data
- Article schema
- Author and publisher info
- Publication dates
- Images

### Breadcrumbs
- Home → Blog → Category → Post
- Improves navigation and SEO

## Mobile Optimization

- Responsive grid layouts
- Touch-friendly tap targets (min 44x44px)
- Optimized images with proper sizes
- Fast loading with static generation
- Readable typography on small screens

## Performance

- Static generation (no runtime)
- Optimized images with Next.js Image
- Minimal JavaScript
- CSS-only animations
- Lazy loading for images

## Adding to Navigation

The blog link is already added to the main navigation. To modify:

Edit `app/components/site-nav.tsx`:

```typescript
const navigationLinks = [
  { href: "/travel-with-points", label: "Travel with points" },
  { href: "/travel-guides", label: "Travel Guides" },
  { href: "/blog", label: "Blog" },  // ← Blog link
  { href: "/stories", label: "Stories" },
];
```

## Homepage Integration

Blog posts are featured on the homepage with:
- 3 featured posts with images
- Category badges
- Link to full blog

To modify, edit `app/page.tsx` in the "Blog Section".

## Customization

### Add New Category

1. Add folder: `content/blog/new-category/`
2. Update `lib/blog.ts`:
   ```typescript
   const CATEGORIES = [..., 'new-category']
   ```
3. Add category info:
   ```typescript
   'new-category': { 
     name: 'Category Name', 
     icon: '🎯', 
     color: 'bg-blue-100 text-blue-900',
     description: 'Category description'
   }
   ```

### Modify Related Posts Algorithm

Edit `getRelatedPosts()` in `lib/blog.ts`:
- Adjust category weight (currently +10)
- Adjust tag weight (currently +1 per shared tag)
- Change limit (currently 4)

### Change Featured Posts Count

Edit blog landing page:
```typescript
const featuredPosts = await getFeaturedPosts(3) // Change number
```

## Troubleshooting

### Post Not Showing
- Check frontmatter syntax (YAML format)
- Verify slug matches filename
- Ensure category matches folder name
- Run `npm run build` to regenerate

### Images Not Loading
- Verify image path is correct
- Check image exists in public folder
- Ensure proper file extension

### Build Errors
- Check MDX syntax
- Verify all required frontmatter fields
- Look for TypeScript errors in console

## Best Practices

1. **SEO**
   - Use descriptive, keyword-rich titles
   - Write compelling meta descriptions (150-160 chars)
   - Include relevant tags
   - Use proper heading hierarchy (H1 → H2 → H3)

2. **Content**
   - Write engaging introductions
   - Use subheadings for scannability
   - Include images to break up text
   - Add internal links to related content

3. **Images**
   - Optimize before uploading (compress)
   - Use descriptive alt text
   - Maintain consistent aspect ratios
   - Use high-quality images

4. **Performance**
   - Keep posts under 3000 words for optimal loading
   - Optimize images (WebP format recommended)
   - Minimize external dependencies

## Future Enhancements

Potential additions:
- Search functionality
- Tag pages
- Author pages
- Comments system
- Newsletter signup
- RSS feed
- Pagination for large post counts
- Table of contents for long posts
- Estimated reading progress bar

## Support

For issues or questions:
1. Check this documentation
2. Review sample posts in `content/blog/`
3. Inspect working examples in the codebase
4. Test locally with `npm run dev`
5. Verify build with `npm run build`
