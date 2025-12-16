# Stories MDX Migration Guide

## Overview
This guide documents the migration of stories from JSON to MDX format, similar to the travel-resources migration. The new system provides better content authoring, mobile-friendly design, and maintains all existing functionality.

## Migration Benefits

### Content Authoring
- **Rich text editing** - Write naturally in Markdown with React components
- **Better formatting** - Headers, lists, quotes, and emphasis without JSON escaping
- **Component embedding** - Use Callout, ImageGallery, YouTube directly in content
- **Version control** - Easier to review changes in git diffs

### Mobile-First Design
- **Responsive images** - Optimized loading and display on all devices
- **Touch-friendly** - Proper spacing and tap targets
- **Performance** - Lazy loading and optimized assets
- **Readable typography** - Comfortable reading on small screens

## File Structure

```
content/
  stories/
    lagoon-days-at-villa-nautica.mdx
    hills-and-horizons-san-francisco.mdx
    french-escapade.mdx
    grand-macau.mdx
```

## MDX Frontmatter Schema

```yaml
---
title: "Story Title"
slug: "story-slug"
excerpt: "Brief description for listing page"
author: "Author Name"
instagramHandle: "milesgoround"  # optional
publishedOn: "2024-12-20"
readTime: "10 min read"
category: "Maldives"
city: "Paradise Island"
country: "Maldives"
coverImage:
  src: "/images/content/cover.jpg"
  alt: "Cover image description"
videoUrl: "https://www.youtube.com/embed/VIDEO_ID"  # optional
gallery:  # optional
  - src: "/images/content/image1.jpg"
    alt: "Image description"
    layout: "portrait"  # landscape, portrait, square
  - src: "/images/content/image2.jpg"
    alt: "Another image"
    layout: "landscape"
highlights:  # optional
  - "Key takeaway one"
  - "Key takeaway two"
seoTitle: "SEO optimized title"
seoDescription: "SEO meta description"
---
```

## Available MDX Components

### Callout
```mdx
<Callout type="tip">
Helpful travel tip or important information
</Callout>

<Callout type="warning">
Warning or caution message
</Callout>

<Callout type="info">
General information
</Callout>
```

### ImageGallery
```mdx
<ImageGallery
  images={[
    { src: "/images/content/img1.jpg", alt: "Description", layout: "portrait" },
    { src: "/images/content/img2.jpg", alt: "Description", layout: "landscape" }
  ]}
  columns={2}
/>
```

### YouTube
```mdx
<YouTube videoId="VIDEO_ID" title="Video title" />
```

### Image with Caption
```mdx
<figure className="my-8">
  <img src="/images/content/photo.jpg" alt="Description" className="rounded-2xl" />
  <figcaption className="text-center text-sm text-slate-600 mt-2">
    Photo caption
  </figcaption>
</figure>
```

### MDXImage (Controlled Size)
```mdx
<!-- Responsive image (default) -->
<MDXImage src="/images/content/photo.jpg" alt="Description" />

<!-- Fixed width image (portrait) -->
<MDXImage src="/images/content/photo.jpg" alt="Description" width={400} height={600} />

<!-- Fixed width image (landscape) -->
<MDXImage src="/images/content/photo.jpg" alt="Description" width={800} height={500} />
```

### ImageRow (Side-by-Side Images)
```mdx
<ImageRow>
  <MDXImage src="/images/content/photo1.jpg" alt="First" width={400} height={300} />
  <MDXImage src="/images/content/photo2.jpg" alt="Second" width={400} height={300} />
</ImageRow>
```

## Content Writing Guidelines

### Headers
- Use `##` for main sections
- Use `###` for subsections
- Keep headers descriptive and scannable

### Paragraphs
- Write naturally without JSON array syntax
- Use blank lines between paragraphs
- Keep paragraphs focused and readable

### Images
- Place images near related content
- Use descriptive alt text
- Choose appropriate layout (portrait/landscape/square)
- Consider mobile viewing when selecting images

### Lists
```mdx
- Bullet point one
- Bullet point two
- Bullet point three
```

## Mobile-Friendly Best Practices

### Typography
- Base font size: 16px minimum
- Line height: 1.6-1.8 for body text
- Adequate spacing between sections
- Readable contrast ratios

### Images
- Responsive sizing with `max-w-full`
- Proper aspect ratios maintained
- Lazy loading for performance
- Touch-friendly galleries

### Layout
- Single column on mobile
- Adequate padding (px-4 minimum)
- Touch targets minimum 44x44px
- Smooth scrolling

### Performance
- Optimized images (WebP format)
- Lazy loading below fold
- Minimal JavaScript
- Fast page loads

## Migration Checklist

For each story:
- [ ] Create MDX file in `content/stories/`
- [ ] Convert frontmatter from JSON
- [ ] Convert content paragraphs to Markdown
- [ ] Convert sections to headers and content
- [ ] Add MDX components where appropriate
- [ ] Verify images load correctly
- [ ] Test on mobile devices
- [ ] Check SEO metadata
- [ ] Verify gallery functionality
- [ ] Test video embeds (if present)

## Example Migration

### Before (JSON)
```json
{
  "slug": "example-story",
  "title": "Example Story",
  "sections": [
    {
      "id": "intro",
      "title": "Introduction",
      "paragraphs": [
        "First paragraph.",
        "Second paragraph."
      ],
      "media": [
        {
          "src": "/images/photo.jpg",
          "alt": "Photo",
          "layout": "landscape"
        }
      ]
    }
  ]
}
```

### After (MDX)
```mdx
---
title: "Example Story"
slug: "example-story"
# ... other frontmatter
---

## Introduction

First paragraph.

Second paragraph.

<ImageGallery
  images={[
    { src: "/images/photo.jpg", alt: "Photo", layout: "landscape" }
  ]}
/>
```

## Testing

### Desktop
- [ ] Story listing page loads
- [ ] Individual stories display correctly
- [ ] Images load and display properly
- [ ] Gallery slider works
- [ ] Video embeds play
- [ ] Navigation works

### Mobile
- [ ] Responsive layout works
- [ ] Images scale properly
- [ ] Touch interactions work
- [ ] Gallery swipes smoothly
- [ ] Text is readable
- [ ] No horizontal scroll

### Performance
- [ ] Page load time < 3s
- [ ] Images lazy load
- [ ] No layout shift
- [ ] Smooth scrolling

## Rollback Plan

If issues arise:
1. Keep JSON files temporarily
2. Feature flag to switch between JSON/MDX
3. Gradual migration (story by story)
4. Monitor analytics and errors

## Next Steps

1. Create MDX loader in `lib/stories.ts`
2. Update `story-content.tsx` to use MDX
3. Migrate stories one by one
4. Test thoroughly on mobile
5. Remove JSON files after verification
6. Update documentation
