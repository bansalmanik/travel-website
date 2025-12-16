# MDX Components - Quick Reference

## 🎨 Callout Box
```mdx
<Callout type="tip">
Your message here with **markdown** support
</Callout>
```
Types: `info` | `tip` | `warning` | `success`

---

## 📹 YouTube Video
```mdx
<YouTube videoId="wSF82AwSDiU" title="Video title" />
```
Get videoId from: `youtube.com/watch?v=VIDEO_ID`

---

## 🖼️ Image Gallery
```mdx
<ImageGallery 
  images={[
    {
      src: "/images/blog/photo1.jpg",
      alt: "Description",
      caption: "Optional caption"
    },
    {
      src: "/images/blog/photo2.jpg",
      alt: "Description"
    }
  ]}
/>
```

---

## 📝 Example Blog with All Components

See: `content/blog/destinations/tokyo-travel-guide.mdx`

---

## 📂 File Locations

**Components:**
- `app/components/mdx/ImageGallery.tsx`
- `app/components/mdx/Callout.tsx`
- `app/components/mdx/YouTube.tsx`

**Full Guide:** `MDX_COMPONENTS_GUIDE.md`
