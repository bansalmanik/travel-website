# Fix Cloudflare Pages Build

## Problem

Your build is failing because Cloudflare Pages is using `npx @cloudflare/next-on-pages` instead of `npm run build`.

## Solution

Update your Cloudflare Pages build settings:

### Step 1: Go to Cloudflare Dashboard

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages**
3. Click on your project
4. Go to **Settings** → **Builds & deployments**

### Step 2: Update Build Configuration

Change these settings:

**Build command:**
```
npm run build
```

**Build output directory:**
```
out
```

**Root directory (if asked):**
```
/
```

### Step 3: Environment Variables (Optional)

If you want D1 data to refresh on each build, you need to bind the database. However, for now, the build will use the committed JSON file which is simpler.

**Current approach**: The script will try to fetch from D1, and if it fails (no auth), it will use the existing `data/points-conversion.json` that's committed to Git.

### Step 4: Redeploy

After updating settings:
1. Click **Save**
2. Go to **Deployments**
3. Click **Retry deployment** on the failed build

OR just push a new commit:
```bash
git add .
git commit -m "Fix build configuration"
git push
```

## How It Works Now

### Local Development
```bash
npm run build
```
- Queries D1 (you're authenticated)
- Generates fresh JSON
- Builds site

### Cloudflare Pages
```bash
npm run build
```
- Tries to query D1
- If fails (not authenticated), uses existing JSON from Git
- Builds site successfully

## To Enable D1 Refresh on Cloudflare

If you want Cloudflare Pages to fetch fresh data from D1 on each build, you need to:

1. **Bind the D1 database** to your Pages project:
   - In Cloudflare Dashboard → Your Pages Project
   - Go to **Settings** → **Functions**
   - Scroll to **D1 database bindings**
   - Add binding: `DB` → `points-conversion-db`

2. **Use Cloudflare API Token**:
   - Create API token with D1 permissions
   - Add as environment variable: `CLOUDFLARE_API_TOKEN`

**However**, this is optional. The simpler approach is:

1. Update data locally
2. Run `npm run generate:conversions`
3. Commit the updated JSON
4. Push to Git
5. Cloudflare builds with the committed data

This is actually **better** because:
- Faster builds (no D1 query)
- More reliable (no auth issues)
- You control when data updates
- Can review changes before deploying
