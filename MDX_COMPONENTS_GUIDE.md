# MDX Components Guide

This guide shows you how to use custom components in your blog MDX files.

## Available Components

### 1. Callout Boxes

Use callout boxes to highlight important information, tips, warnings, or success messages.

**Types:** `info`, `tip`, `warning`, `success`

#### Examples:

```mdx
<Callout type="info">
**Did you know?** Tokyo has over 13 million residents in the city proper!
</Callout>

<Callout type="tip">
**Pro Tip:** Visit popular attractions early in the morning to avoid crowds.
</Callout>

<Callout type="warning">
**Important:** Always carry cash in Japan as many places don't accept cards.
</Callout>

<Callout type="success">
**Great choice!** This credit card offers 5x points on travel purchases.
</Callout>
```

#### Visual Styles:
- **info** (blue): General information, facts
- **tip** (green): Helpful tips, recommendations
- **warning** (amber): Important warnings, things to avoid
- **success** (green): Positive outcomes, achievements

---

### 2. YouTube Video Embeds

Embed YouTube videos directly in your blog posts.

#### Syntax:

```mdx
<YouTube videoId="VIDEO_ID_HERE" title="Optional video title" />
```

#### How to get the Video ID:
From a YouTube URL like: `https://www.youtube.com/watch?v=wSF82AwSDiU`
The video ID is: `wSF82AwSDiU` (everything after `v=`)

#### Examples:

```mdx
<YouTube videoId="wSF82AwSDiU" title="Shibuya Crossing Tokyo" />

<YouTube videoId="dQw4w9WgXcQ" />
```

---

### 3. Image Gallery / Carousel

Display multiple images in an interactive carousel with navigation arrows and thumbnails.

#### Syntax:

```mdx
<ImageGallery 
  images={[
    {
      src: "/images/blog/image1.jpg",
      alt: "Description of image 1",
      caption: "Optional caption for image 1"
    },
    {
      src: "/images/blog/image2.jpg",
      alt: "Description of image 2",
      caption: "Optional caption for image 2"
    },
    {
      src: "/images/blog/image3.jpg",
      alt: "Description of image 3"
    }
  ]}
/>
```

#### Features:
- ✅ Left/Right navigation arrows
- ✅ Thumbnail navigation at bottom
- ✅ Image counter (1/3, 2/3, etc.)
- ✅ Optional captions
- ✅ Responsive design
- ✅ Touch/swipe support on mobile

#### Example:

```mdx
<ImageGallery 
  images={[
    {
      src: "/images/content/cover_1.jpg",
      alt: "Senso-ji Temple main gate",
      caption: "The iconic Kaminarimon Gate at Senso-ji Temple"
    },
    {
      src: "/images/content/cover_2.jpg",
      alt: "Nakamise Shopping Street",
      caption: "Traditional shops along Nakamise Street"
    },
    {
      src: "/images/content/cover_3.jpg",
      alt: "Temple grounds",
      caption: "Beautiful temple architecture and gardens"
    }
  ]}
/>
```

---

## Complete Example Blog Post

Here's a complete example showing all components in use:

```mdx
---
title: "Best Credit Cards for Travel in 2025"
slug: "best-travel-credit-cards-2025"
excerpt: "Discover the top credit cards for maximizing travel rewards"
author: "Your Name"
publishedOn: "2025-01-15"
category: "credit-cards"
tags: ["credit-cards", "rewards", "travel"]
featured: true
heroImage:
  src: "/images/blog/credit-cards.jpg"
  alt: "Travel credit cards"
seoTitle: "Best Travel Credit Cards 2025"
seoDescription: "Top credit cards for travel rewards"
readTime: "8 min read"
---

## Introduction

Finding the right travel credit card can transform your travel experience.

<Callout type="tip">
**New to travel rewards?** Start with a card that has no annual fee and simple earning structure.
</Callout>

## Top 3 Travel Credit Cards

### 1. Chase Sapphire Preferred

This card is perfect for beginners in the points and miles game.

<ImageGallery 
  images={[
    {
      src: "/images/cards/chase-sapphire-preferred.jpg",
      alt: "Chase Sapphire Preferred Card",
      caption: "Earn 5x on travel through Chase portal"
    },
    {
      src: "/images/cards/chase-benefits.jpg",
      alt: "Card benefits overview"
    }
  ]}
/>

**Key Benefits:**
- 60,000 point welcome bonus
- 5x points on travel booked through Chase
- No foreign transaction fees

<Callout type="warning">
**Note:** This card has a $95 annual fee, but the welcome bonus more than covers it in the first year.
</Callout>

### 2. Capital One Venture X

Watch this review to learn more:

<YouTube videoId="EXAMPLE_VIDEO_ID" title="Capital One Venture X Review" />

<Callout type="success">
**Best for:** Frequent travelers who want premium perks and lounge access.
</Callout>

## How to Maximize Your Rewards

<Callout type="info">
**Pro Tip:** Always pay your balance in full each month. Interest charges will quickly negate any rewards you earn!
</Callout>

## Conclusion

Choose the card that best fits your spending habits and travel goals.
```

---

## Tips for Using Components

### 1. Spacing
- Components automatically add vertical spacing (margin)
- No need to add extra blank lines before/after components

### 2. Nesting
- Don't nest components inside each other
- Keep components at the top level of your content

### 3. Images
- Store images in `/public/images/blog/` or `/public/images/content/`
- Reference them as `/images/blog/your-image.jpg` (no "public" in the path)
- Use descriptive alt text for accessibility

### 4. Callouts
- Keep callout content concise
- Use markdown formatting inside callouts (bold, italic, links)
- Choose the right type for your message

### 5. YouTube
- Test video IDs to make sure they work
- Videos are responsive and work on mobile

### 6. Image Gallery
- Use 3-5 images for best experience
- All images should be similar aspect ratios
- Compress images before uploading (use tools like TinyPNG)

---

## Reference Implementation

See the **Tokyo Travel Guide** blog post for a complete working example:
`content/blog/destinations/tokyo-travel-guide.mdx`

This blog demonstrates:
- ✅ Multiple callout types (info, tip, warning, success)
- ✅ YouTube video embed
- ✅ Image gallery with 3 images and captions

---

## Need Help?

If you encounter issues:
1. Check your syntax matches the examples exactly
2. Ensure image paths are correct (start with `/images/`)
3. Verify YouTube video IDs are correct
4. Make sure you're using the correct component names (case-sensitive)

Happy blogging! 🚀
