# Stories Image Usage Guide

## Image Components Available

Stories support multiple ways to display images with full control over size, layout, and presentation.

## 1. Standard Markdown Images (Responsive)

The simplest way - images automatically scale to fit the container.

```mdx
![Image description](/images/content/photo.jpg)
```

**Result:**
- Responsive width (fills container)
- Maintains aspect ratio
- Rounded corners
- Shadow effect
- Max width: 2xl (672px)

## 2. MDXImage Component (Controlled Size)

Use when you need precise control over image dimensions.

### Responsive (Default)
```mdx
<MDXImage src="/images/content/photo.jpg" alt="Description" />
```

**Result:**
- Responsive width
- Max width: 2xl (672px)
- Centered
- Rounded corners
- Shadow effect

### Portrait Images (Fixed Width)
```mdx
<MDXImage 
  src="/images/content/portrait.jpg" 
  alt="Person standing in front of historic building" 
  width={400} 
  height={600} 
/>
```

**Best for:**
- Vertical photos
- Phone screenshots
- Portrait photography
- Tall images

**Common sizes:**
- Small portrait: `width={300} height={450}`
- Medium portrait: `width={400} height={600}`
- Large portrait: `width={500} height={750}`

### Landscape Images (Fixed Width)
```mdx
<MDXImage 
  src="/images/content/landscape.jpg" 
  alt="Mountain range at sunset with lake in foreground" 
  width={800} 
  height={500} 
/>
```

**Best for:**
- Horizontal photos
- Panoramas
- Wide scenes
- Desktop screenshots

**Common sizes:**
- Small landscape: `width={600} height={400}`
- Medium landscape: `width={800} height={500}`
- Large landscape: `width={1000} height={600}`

### Square Images (Fixed Width)
```mdx
<MDXImage 
  src="/images/content/square.jpg" 
  alt="Traditional coffee cup on wooden table" 
  width={500} 
  height={500} 
/>
```

**Best for:**
- Instagram-style photos
- Profile pictures
- Product shots
- Symmetrical compositions

**Common sizes:**
- Small square: `width={300} height={300}`
- Medium square: `width={500} height={500}`
- Large square: `width={700} height={700}`

## 3. ImageRow Component (Side-by-Side)

Display multiple images in a row.

### Two Images Side-by-Side
```mdx
<ImageRow>
  <MDXImage src="/images/photo1.jpg" alt="First" width={400} height={300} />
  <MDXImage src="/images/photo2.jpg" alt="Second" width={400} height={300} />
</ImageRow>
```

### Three Images Side-by-Side
```mdx
<ImageRow>
  <MDXImage src="/images/photo1.jpg" alt="First" width={300} height={250} />
  <MDXImage src="/images/photo2.jpg" alt="Second" width={300} height={250} />
  <MDXImage src="/images/photo3.jpg" alt="Third" width={300} height={250} />
</ImageRow>
```

**Features:**
- Wraps on mobile (stacks vertically)
- Gap between images
- Centered alignment
- Responsive

**Best for:**
- Before/after comparisons
- Multiple angles of same subject
- Step-by-step visuals
- Related photos

## 4. ImageGallery Component (Slider)

For multiple images in a swipeable gallery.

```mdx
<ImageGallery
  images={[
    { src: "/images/photo1.jpg", alt: "First", layout: "landscape" },
    { src: "/images/photo2.jpg", alt: "Second", layout: "portrait" },
    { src: "/images/photo3.jpg", alt: "Third", layout: "square" }
  ]}
  columns={2}
/>
```

**Features:**
- Swipeable on mobile
- Grid layout on desktop
- Lightbox view
- Touch-friendly

**Best for:**
- Photo collections
- Multiple related images
- Travel photo sets
- Event galleries

## 5. Figure with Caption

For images that need captions.

```mdx
<figure className="my-8">
  <MDXImage src="/images/photo.jpg" alt="Description" width={800} height={500} />
  <figcaption className="text-center text-sm text-slate-600 mt-2">
    This is the image caption explaining what's shown
  </figcaption>
</figure>
```

**Best for:**
- Images needing context
- Historical photos
- Technical diagrams
- Credited photos

## Layout Examples

### Full-Width Hero Image
```mdx
<MDXImage src="/images/hero.jpg" alt="Hero" />
```

### Portrait + Landscape Combo
```mdx
<ImageRow>
  <MDXImage src="/images/portrait.jpg" alt="Tall cathedral spire against cloudy sky" width={400} height={600} />
  <MDXImage src="/images/landscape.jpg" alt="City plaza with fountain and people" width={600} height={400} />
</ImageRow>
```

### Three Squares
```mdx
<ImageRow>
  <MDXImage src="/images/1.jpg" alt="One" width={300} height={300} />
  <MDXImage src="/images/2.jpg" alt="Two" width={300} height={300} />
  <MDXImage src="/images/3.jpg" alt="Three" width={300} height={300} />
</ImageRow>
```

### Mixed Sizes
```mdx
## Large Feature Image

<MDXImage src="/images/feature.jpg" alt="Feature" width={1000} height={600} />

## Supporting Images

<ImageRow>
  <MDXImage src="/images/detail1.jpg" alt="Detail 1" width={400} height={300} />
  <MDXImage src="/images/detail2.jpg" alt="Detail 2" width={400} height={300} />
</ImageRow>
```

## Mobile Considerations

### Responsive Behavior

**MDXImage with width/height:**
- Desktop: Shows at specified width
- Mobile: Scales down to fit screen
- Maintains aspect ratio

**ImageRow:**
- Desktop: Images side-by-side
- Mobile: Stacks vertically
- Full width on mobile

### Mobile-Friendly Sizes

For best mobile experience:
- Portrait: `width={400}` or less
- Landscape: `width={800}` or less
- Square: `width={500}` or less

### Mobile Testing

Always test on mobile:
```bash
# Open DevTools (F12)
# Toggle device toolbar (Ctrl+Shift+M)
# Test on iPhone SE, iPhone 14, iPad
```

## Best Practices

### 1. Choose the Right Component

- **Standard markdown** - Quick, responsive images
- **MDXImage** - Controlled size, specific dimensions
- **ImageRow** - Side-by-side comparisons
- **ImageGallery** - Multiple related photos

### 2. Optimize Image Files

- Use WebP format when possible
- Compress images before uploading
- Reasonable file sizes (< 500KB)
- Proper dimensions (don't use 4K for 400px display)

### 3. Alt Text

Always provide descriptive alt text that describes what's IN the image:
```mdx
<!-- Bad - Not descriptive -->
<MDXImage src="/photo.jpg" alt="photo" />
<MDXImage src="/photo.jpg" alt="landscape" />
<MDXImage src="/photo.jpg" alt="image" />

<!-- Good - Describes the content -->
<MDXImage src="/photo.jpg" alt="Sunset over Golden Gate Bridge with fog rolling in" />
<MDXImage src="/photo.jpg" alt="Street vendor selling fresh fruit at night market" />
<MDXImage src="/photo.jpg" alt="Ancient temple entrance with stone guardian statues" />
```

**Alt text should:**
- Describe what's visible in the image
- Be concise but informative
- Help visually impaired users understand the content
- NOT describe the orientation (portrait/landscape)
- NOT use words like "image of" or "picture of"

### 4. Aspect Ratios

Common aspect ratios:
- **16:9** - Landscape (1600x900, 800x450)
- **4:3** - Standard (800x600, 400x300)
- **3:2** - Photography (900x600, 450x300)
- **1:1** - Square (500x500, 300x300)
- **2:3** - Portrait (400x600, 300x450)

### 5. Spacing

Add spacing around images:
```mdx
## Section Title

Some text before the image.

<MDXImage src="/photo.jpg" alt="Description" width={800} height={500} />

Some text after the image.
```

The `my-8` class adds vertical spacing automatically.

## Common Patterns

### Story Opening
```mdx
---
# frontmatter
---

## Introduction

Opening paragraph with context.

<MDXImage src="/images/hero.jpg" alt="Main scene" />

More story content...
```

### Before/After
```mdx
## Transformation

<ImageRow>
  <figure>
    <MDXImage src="/before.jpg" alt="Before" width={400} height={300} />
    <figcaption className="text-center text-sm mt-2">Before</figcaption>
  </figure>
  <figure>
    <MDXImage src="/after.jpg" alt="After" width={400} height={300} />
    <figcaption className="text-center text-sm mt-2">After</figcaption>
  </figure>
</ImageRow>
```

### Photo Essay
```mdx
## Day One

<MDXImage src="/day1-morning.jpg" alt="Morning" width={800} height={500} />

Morning description...

<MDXImage src="/day1-afternoon.jpg" alt="Afternoon" width={800} height={500} />

Afternoon description...
```

### Mixed Media
```mdx
## Experience

<MDXImage src="/photo.jpg" alt="Photo" width={800} height={500} />

<Callout type="tip">
Pro tip about the location
</Callout>

<YouTube videoId="VIDEO_ID" title="Video tour" />
```

## Troubleshooting

### Image Not Showing
- Check file path starts with `/`
- Verify file exists in `public/images/content/`
- Check file extension matches (case-sensitive)

### Image Too Large on Mobile
- Use smaller width values
- Test on mobile devices
- Consider using responsive (no width/height)

### Images Not Aligned
- Use `ImageRow` for side-by-side
- Check width values are consistent
- Verify aspect ratios match

### Spacing Issues
- Add blank lines before/after images
- Use `my-8` class for spacing
- Check for extra whitespace in MDX

## Quick Reference

```mdx
<!-- Responsive -->
<MDXImage src="/photo.jpg" alt="Description" />

<!-- Portrait -->
<MDXImage src="/photo.jpg" alt="Description" width={400} height={600} />

<!-- Landscape -->
<MDXImage src="/photo.jpg" alt="Description" width={800} height={500} />

<!-- Square -->
<MDXImage src="/photo.jpg" alt="Description" width={500} height={500} />

<!-- Side-by-Side -->
<ImageRow>
  <MDXImage src="/photo1.jpg" alt="First" width={400} height={300} />
  <MDXImage src="/photo2.jpg" alt="Second" width={400} height={300} />
</ImageRow>

<!-- Gallery -->
<ImageGallery
  images={[
    { src: "/photo1.jpg", alt: "First", layout: "landscape" },
    { src: "/photo2.jpg", alt: "Second", layout: "portrait" }
  ]}
/>
```
