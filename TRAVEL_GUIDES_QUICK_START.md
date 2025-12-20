# Travel Guides - Quick Start

## ✅ Migration Complete

Travel guides now use MDX files instead of JSON!

## File Location

```
content/travel-guides/
├── macau-transportation-essentials.mdx
└── hongkong-transportation-essentials.mdx
```

## Add New Travel Guide

1. Create file: `content/travel-guides/your-slug.mdx`

2. Add frontmatter:
```yaml
---
slug: your-slug
title: Your Title
author: Your Name
excerpt: Short description
publishedOn: 2025-12-15
displayDate: December 15, 2025
readTime: 5 minute read
heroImage:
  src: /images/content/your-image.jpg
  alt: Image description
seoTitle: SEO Title
seoDescription: SEO Description
---
```

3. Write content:
```mdx
## Your Heading

Your content with **markdown**.

<Callout type="tip">
Pro tips here
</Callout>

<ImageGallery 
  images={[
    { src: "/images/photo1.jpg", alt: "Description" }
  ]}
/>
```

4. Save and it's live!

## Available Components

- `<Callout type="info|tip|warning|success">` - Highlight boxes
- `<ImageGallery images={[...]} />` - Photo carousel
- `<YouTube videoId="..." />` - Video embeds
- `![text](/image.jpg)` - Regular images

## Test URLs

- `/macau-transportation-essentials`
- `/hongkong-transportation-essentials`

Done! 🚀
