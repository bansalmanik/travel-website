# Stories MDX Migration - Quick Start Guide

## ✅ What's Been Done

### 1. New MDX Infrastructure
- ✅ Created `lib/stories.ts` - MDX loader for stories
- ✅ Created `app/[slug]/story-mdx-content.tsx` - Mobile-friendly story renderer
- ✅ Updated `app/stories/page.tsx` - Mobile-optimized listing page
- ✅ Updated `app/[slug]/page.tsx` - Uses new MDX content
- ✅ Updated `lib/content-loader.ts` - Points to new stories loader

### 2. Example MDX Stories Created
- ✅ `content/stories/lagoon-days-at-villa-nautica.mdx`
- ✅ `content/stories/hills-and-horizons-san-francisco.mdx`

### 3. Mobile-First Design
- ✅ Responsive typography (text-3xl → sm:text-4xl → lg:text-5xl)
- ✅ Touch-friendly spacing (px-4, gap-3 on mobile)
- ✅ Optimized images with proper aspect ratios
- ✅ Mobile-friendly hero section
- ✅ Responsive meta badges and author info
- ✅ Touch-optimized buttons (min 44x44px)

## 📝 Next Steps

### Step 1: Create Remaining MDX Files

Convert these stories from JSON to MDX:

1. **French Escapade** (`french-escapade.mdx`)
2. **Grand Macau** (`grand-macau.mdx`)

Use the existing examples as templates.

### Step 2: Test on Mobile

```bash
npm run dev
```

Visit on mobile or use Chrome DevTools:
- http://localhost:3000/stories
- http://localhost:3000/lagoon-days-at-villa-nautica
- http://localhost:3000/hills-and-horizons-san-francisco

Check:
- [ ] Text is readable (not too small)
- [ ] Images load and scale properly
- [ ] Touch targets are easy to tap
- [ ] No horizontal scrolling
- [ ] Gallery swipes smoothly
- [ ] Video embeds work

### Step 3: Verify All Functionality

- [ ] Story listing page displays all stories
- [ ] Individual story pages load correctly
- [ ] Cover images display properly
- [ ] Gallery slider works
- [ ] Video embeds play
- [ ] Instagram links work
- [ ] Highlights section displays
- [ ] Breadcrumb navigation works
- [ ] SEO metadata is correct

### Step 4: Remove Old Files (After Testing)

Once everything works:
```bash
# Remove old JSON file
rm app/stories/stories.json

# Remove old data loader
rm app/stories/data.ts

# Remove old story content component
rm app/[slug]/story-content.tsx
```

## 🎨 Mobile Design Features

### Typography Scale
```
Mobile:  text-3xl (30px)
Tablet:  sm:text-4xl (36px)
Desktop: lg:text-5xl (48px)
```

### Spacing
```
Mobile:  px-4 (16px), gap-3 (12px)
Tablet:  sm:px-6 (24px), sm:gap-4 (16px)
Desktop: lg:px-8 (32px), lg:gap-6 (24px)
```

### Touch Targets
- Minimum 44x44px for all interactive elements
- Adequate spacing between clickable items
- Large, easy-to-tap buttons

### Images
- Responsive with `object-cover`
- Proper aspect ratios maintained
- Lazy loading for performance
- Priority loading for above-fold images

## 📱 Testing Checklist

### Mobile (< 640px)
- [ ] Single column layout
- [ ] Readable text size (16px minimum)
- [ ] Images scale properly
- [ ] No horizontal scroll
- [ ] Touch targets are large enough
- [ ] Gallery swipes work
- [ ] Video embeds responsive

### Tablet (640px - 1024px)
- [ ] 2-column grid on listing page
- [ ] Proper spacing
- [ ] Images look good
- [ ] Navigation works

### Desktop (> 1024px)
- [ ] 3-column grid on listing page
- [ ] Max-width container (max-w-6xl)
- [ ] Hover effects work
- [ ] All features functional

## 🚀 Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test production build
npm run start

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues
npm run lint
```

## 📖 Writing New Stories

### 1. Create MDX File
```bash
# Create new story file
touch content/stories/your-story-slug.mdx
```

### 2. Add Frontmatter
```yaml
---
title: "Your Story Title"
slug: "your-story-slug"
excerpt: "Brief description"
author: "Your Name"
instagramHandle: "yourusername"
publishedOn: "2024-12-17"
readTime: "8 min read"
category: "Destination"
city: "City Name"
country: "Country"
coverImage:
  src: "/images/content/cover.jpg"
  alt: "Cover description"
videoUrl: "https://www.youtube.com/embed/VIDEO_ID"
gallery:
  - src: "/images/content/img1.jpg"
    alt: "Description"
    layout: "portrait"
highlights:
  - "Key point one"
  - "Key point two"
seoTitle: "SEO Title"
seoDescription: "SEO description"
---
```

### 3. Write Content
```mdx
## Section Title

Your content here with natural paragraphs.

<Callout type="tip">
Helpful tip for readers
</Callout>

<!-- Image Gallery -->
<ImageGallery
  images={[
    { src: "/images/photo.jpg", alt: "Description", layout: "landscape" }
  ]}
/>

<!-- Single Image (responsive) -->
<MDXImage src="/images/photo.jpg" alt="Description" />

<!-- Portrait Image (fixed size) -->
<MDXImage src="/images/photo.jpg" alt="Description" width={400} height={600} />

<!-- Landscape Image (fixed size) -->
<MDXImage src="/images/photo.jpg" alt="Description" width={800} height={500} />

<!-- Side-by-Side Images -->
<ImageRow>
  <MDXImage src="/images/photo1.jpg" alt="First" width={400} height={300} />
  <MDXImage src="/images/photo2.jpg" alt="Second" width={400} height={300} />
</ImageRow>

<!-- YouTube Video -->
<YouTube videoId="VIDEO_ID" title="Video title" />
```

## 🐛 Troubleshooting

### Images Not Loading
- Check image paths start with `/`
- Verify images exist in `public/images/content/`
- Check file extensions match (case-sensitive)

### MDX Compilation Errors
- Ensure frontmatter is valid YAML
- Check for unclosed JSX tags
- Verify component names are correct

### Mobile Layout Issues
- Test with Chrome DevTools mobile emulation
- Check for fixed widths that break responsive design
- Verify touch targets are large enough

### Gallery Not Working
- Ensure `GallerySlider` component exists
- Check image array format
- Verify layout values are valid

## 📚 Resources

- [MDX Documentation](https://mdxjs.com/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Mobile-First Design Principles](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first)

## 🎯 Success Criteria

Migration is complete when:
- [ ] All stories converted to MDX
- [ ] Mobile experience is smooth and readable
- [ ] All images load correctly
- [ ] Gallery and video embeds work
- [ ] SEO metadata is correct
- [ ] No console errors
- [ ] Performance is good (< 3s load time)
- [ ] Old JSON files removed
- [ ] Documentation updated

## 💡 Tips

1. **Test on real devices** - Emulators are good, but real mobile devices are better
2. **Check different screen sizes** - iPhone SE, iPhone 14, iPad, Android phones
3. **Test touch interactions** - Swipes, taps, scrolls should feel natural
4. **Optimize images** - Use WebP format, compress large images
5. **Monitor performance** - Use Lighthouse to check mobile performance scores

## 🆘 Need Help?

If you encounter issues:
1. Check the example MDX files for reference
2. Review the migration guide (`STORIES_MDX_MIGRATION.md`)
3. Check console for error messages
4. Verify all imports are correct
5. Test in incognito mode to rule out caching issues
