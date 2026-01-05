# Cloudflare Pages Deployment Guide

## ✅ Build Configuration Fixed

Your app is now configured for **static export** which eliminates the 3 MiB worker bundle size limit.

## Changes Made

### 1. next.config.ts
- Added `output: "export"` - generates static HTML files
- Added `images: { unoptimized: true }` - required for static export
- Added `trailingSlash: true` - better Cloudflare Pages compatibility

### 2. Removed Edge Runtime
- Removed all `export const runtime = "edge"` declarations
- This prevents Next.js from creating a worker bundle

### 3. Added Static Generation
- Added `generateStaticParams()` to all dynamic routes:
  - `/travel-guides/[slug]`
  - `/travel-with-points/bank-programs/[slug]`
  - `/travel-with-points/credit-cards/[slug]`
  - `/travel-with-points/flight-programs/[slug]`
  - `/travel-with-points/hotel-programs/[slug]`
  - `/travel-with-points/points-and-miles-explained/[slug]`

## Deployment to Cloudflare Pages

### Option 1: Via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **Create application** → **Pages**
3. Connect your Git repository
4. Configure build settings:
   ```
   Build command: npm run build
   Build output directory: out
   ```
5. **Important**: Add environment variable for D1 access:
   - Go to **Settings** → **Environment variables**
   - Add `CLOUDFLARE_API_TOKEN` with your API token (or the build will use your local auth)
   - Alternatively, the build uses `wrangler` which should authenticate automatically in Cloudflare's build environment
6. Click **Save and Deploy**

**Note**: The `prebuild` script automatically queries your D1 database before building. This happens during the Cloudflare Pages build process.

### Option 2: Via Wrangler CLI

```bash
# Install Wrangler (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npx wrangler pages deploy out --project-name=your-project-name
```

## What This Means

### ✅ Benefits
- **No worker bundle** - everything is static HTML/CSS/JS
- **No 3 MiB limit** - static assets can be any size
- **Faster performance** - served directly from CDN
- **Better SEO** - full HTML content in initial load
- **Lower costs** - no worker execution time

### 🔒 Security
- **JSON data**: Compiled into JS bundles, not directly accessible
- **Images**: Public (as they need to be for browsers to load them)
- **Source code**: Minified and obfuscated

### 📊 SEO Impact
- ✅ **Full HTML with content** - all pages pre-rendered
- ✅ **Meta tags included** - OpenGraph, Twitter cards, structured data
- ✅ **No client-side rendering** - content in initial HTML
- ✅ **Better Core Web Vitals** - faster load times

## Troubleshooting

### If deployment still fails:
1. Make sure you're deploying the `out` folder, not `.next`
2. Check that `npm run build` completes successfully locally
3. Verify no `export const runtime = "edge"` remains in your code

### To verify locally:
```bash
# Build the site
npm run build

# Check the output folder exists
ls out

# Serve locally (optional)
npx serve out
```

## D1 Database Integration

Your points conversion data is now stored in Cloudflare D1 and automatically fetched during build:

1. **Build Process**: `npm run build` → runs `prebuild` → queries D1 → generates JSON → builds site
2. **Authentication**: Wrangler automatically authenticates in Cloudflare's build environment
3. **No Runtime Queries**: Data is baked into static files (fast!)

### Updating Points Data

To update conversion data:
1. Update data in D1 (via SQL or migration script)
2. Trigger a new deployment (push to Git or manual deploy)
3. Build process fetches fresh data automatically

See `D1_INTEGRATION.md` for details.

## Need Dynamic Features?

If you need server-side features in the future:
- Use Cloudflare Pages Functions (separate from the main bundle)
- Store data in Cloudflare KV or R2
- Use API routes in `/functions` directory

But for your current content-focused site, static export is optimal!
