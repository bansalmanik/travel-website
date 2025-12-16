# Stories Image Features - Complete

## ✅ What's Been Added

Stories now have the same powerful image control as travel-resources, with multiple components for different use cases.

## Available Components

### 1. MDXImage ✅
**Purpose:** Precise control over image size and layout

**Usage:**
```mdx
<!-- Responsive (default) -->
<MDXImage src="/images/photo.jpg" alt="Description" />

<!-- Portrait (400x600) -->
<MDXImage src="/images/photo.jpg" alt="Tall waterfall cascading down cliff face" width={400} height={600} />

<!-- Landscape (800x500) -->
<MDXImage src="/images/photo.jpg" alt="Wide beach with palm trees and turquoise water" width={800} height={500} />

<!-- Square (500x500) -->
<MDXImage src="/images/photo.jpg" alt="Traditional tea ceremony setup on bamboo mat" width={500} height={500} />
```

**Features:**
- Responsive by default (no width/height)
- Fixed size when width/height provided
- Centered alignment
- Rounded corners
- Shadow effect
- Mobile-friendly scaling

### 2. ImageRow ✅
**Purpose:** Display images side-by-side

**Usage:**
```mdx
<ImageRow>
  <MDXImage src="/images/photo1.jpg" alt="First" width={400} height={300} />
  <MDXImage src="/images/photo2.jpg" alt="Second" width={400} height={300} />
</ImageRow>
```

**Features:**
- Side-by-side on desktop
- Stacks vertically on mobile
- Gap between images
- Centered alignment
- Wraps automatically

### 3. ImageGallery ✅
**Purpose:** Multiple images in a swipeable gallery

**Usage:**
```mdx
<ImageGallery
  images={[
    { src: "/images/photo1.jpg", alt: "First", layout: "landscape" },
    { src: "/images/photo2.jpg", alt: "Second", layout: "portrait" }
  ]}
  columns={2}
/>
```

**Features:**
- Swipeable on mobile
- Grid layout on desktop
- Supports landscape/portrait/square
- Touch-friendly

### 4. Standard Markdown ✅
**Purpose:** Quick, simple images

**Usage:**
```mdx
![Description](/images/photo.jpg)
```

**Features:**
- Automatic via `img: MDXImage` mapping
- Responsive width
- Rounded corners
- Shadow effect

## Image Layout Options

### Portrait Images
```mdx
<MDXImage src="/photo.jpg" alt="Historic clock tower reaching into blue sky" width={400} height={600} />
```
- Vertical orientation
- Best for: Phone screenshots, portraits, tall scenes
- Common sizes: 300x450, 400x600, 500x750

### Landscape Images
```mdx
<MDXImage src="/photo.jpg" alt="Coastal village with boats in harbor at sunset" width={800} height={500} />
```
- Horizontal orientation
- Best for: Panoramas, wide scenes, desktop screenshots
- Common sizes: 600x400, 800x500, 1000x600

### Square Images
```mdx
<MDXImage src="/photo.jpg" alt="Steaming bowl of ramen with chopsticks" width={500} height={500} />
```
- Equal dimensions
- Best for: Instagram-style, product shots, symmetrical
- Common sizes: 300x300, 500x500, 700x700

### Responsive Images
```mdx
<MDXImage src="/photo.jpg" alt="Crowded street market with colorful lanterns overhead" />
```
- No fixed size
- Fills container width
- Max width: 672px (2xl)
- Best for: Flexible layouts

## Comparison Layouts

### Before/After
```mdx
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

### Multiple Angles
```mdx
<ImageRow>
  <MDXImage src="/angle1.jpg" alt="Front view" width={300} height={250} />
  <MDXImage src="/angle2.jpg" alt="Side view" width={300} height={250} />
  <MDXImage src="/angle3.jpg" alt="Top view" width={300} height={250} />
</ImageRow>
```

### Mixed Sizes
```mdx
<ImageRow>
  <MDXImage src="/portrait.jpg" alt="Tall skyscraper with glass facade" width={400} height={600} />
  <MDXImage src="/landscape.jpg" alt="City skyline at dusk with lights" width={600} height={400} />
</ImageRow>
```

## Mobile Behavior

### Desktop
- Images display at specified width
- ImageRow shows side-by-side
- Full control over layout

### Mobile
- Images scale down to fit screen
- ImageRow stacks vertically
- Maintains aspect ratios
- Touch-friendly spacing

## Implementation Details

### Updated Files
1. **`app/[slug]/story-mdx-content.tsx`**
   - Added MDXImage import
   - Added ImageRow import
   - Added to mdxComponents
   - Mapped `img` to MDXImage

2. **`content/stories/grand-macau.mdx`**
   - Updated to use MDXImage
   - Examples of different sizes
   - Shows landscape images

### Component Mapping
```typescript
const mdxComponents = {
  Callout,
  ImageGallery,
  YouTube,
  MDXImage,
  ImageRow,
  img: MDXImage,  // Maps standard markdown images
};
```

## Examples in Stories

### Grand Macau Story
```mdx
<!-- Landscape image -->
<MDXImage src="/images/content/macau-ferry-1.jpg" alt="Ferry" width={800} height={500} />

<!-- Responsive image -->
<MDXImage src="/images/content/macau-casino.jpg" alt="Casino" />
```

### Lagoon Days Story
```mdx
<!-- Portrait images in gallery -->
<ImageGallery
  images={[
    { src: "/images/content/christmas_tree.jpg", alt: "Christmas", layout: "portrait" },
    { src: "/images/content/speed_boat.jpg", alt: "Boat", layout: "portrait" }
  ]}
/>
```

## Documentation

### Complete Guides
1. **`STORIES_IMAGE_GUIDE.md`** - Comprehensive image usage guide
2. **`STORIES_MDX_MIGRATION.md`** - Updated with image examples
3. **`STORIES_QUICK_START.md`** - Updated with image examples

### Quick Reference
See `STORIES_IMAGE_GUIDE.md` for:
- All component options
- Size recommendations
- Layout patterns
- Mobile considerations
- Best practices
- Troubleshooting

## Testing

### Test Different Sizes
```bash
npm run dev
# Visit http://localhost:3000/Grand-Macau
```

### Check on Mobile
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on:
   - iPhone SE (375px)
   - iPhone 14 (393px)
   - iPad (768px)

### Verify
- [ ] Portrait images display correctly
- [ ] Landscape images display correctly
- [ ] Square images display correctly
- [ ] ImageRow works on desktop
- [ ] ImageRow stacks on mobile
- [ ] Images scale on mobile
- [ ] Aspect ratios maintained

## Benefits

### For Content Authors
- Full control over image size
- Easy portrait/landscape selection
- Side-by-side comparisons
- Flexible layouts

### For Readers
- Optimized image sizes
- Fast loading
- Mobile-friendly
- Beautiful presentation

### For Developers
- Reusable components
- Consistent styling
- Type-safe
- Easy to maintain

## Common Use Cases

### Travel Stories
```mdx
<!-- Hero landscape -->
<MDXImage src="/destination.jpg" alt="Destination" width={1000} height={600} />

<!-- Portrait details -->
<ImageRow>
  <MDXImage src="/detail1.jpg" alt="Detail 1" width={400} height={600} />
  <MDXImage src="/detail2.jpg" alt="Detail 2" width={400} height={600} />
</ImageRow>
```

### Food Stories
```mdx
<!-- Square food shots -->
<ImageRow>
  <MDXImage src="/dish1.jpg" alt="Dish 1" width={400} height={400} />
  <MDXImage src="/dish2.jpg" alt="Dish 2" width={400} height={400} />
  <MDXImage src="/dish3.jpg" alt="Dish 3" width={400} height={400} />
</ImageRow>
```

### Architecture Stories
```mdx
<!-- Tall buildings (portrait) -->
<MDXImage src="/building.jpg" alt="Modern glass skyscraper reflecting clouds" width={500} height={750} />

<!-- Wide cityscapes (landscape) -->
<MDXImage src="/cityscape.jpg" alt="Downtown skyline with river in foreground" width={1000} height={600} />
```

## Status

✅ **Complete and Production-Ready**

All image features from travel-resources are now available in stories with:
- Full size control
- Portrait/landscape/square support
- Side-by-side layouts
- Mobile optimization
- Comprehensive documentation

---

**Last Updated:** December 17, 2024
**Components Added:** MDXImage, ImageRow
**Documentation:** Complete
**Status:** ✅ Ready for Use
