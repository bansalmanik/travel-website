# D1 Database Integration

## Overview

Points conversion data is now managed in Cloudflare D1 database and automatically generated at build time.

## How It Works

1. **Data Storage**: All conversion data lives in D1 database (not in JSON)
2. **Build Time**: Script queries D1 and generates `data/points-conversion.json`
3. **Website**: Uses the generated JSON file (no runtime database queries)

## Database Details

- **Database ID**: `0611893c-4c50-4a29-8720-e76818fada69`
- **Database Name**: `points-conversion-db`
- **Records**: 459 conversion rates, 142 point sources, 8 programs

## Scripts

### Generate JSON from D1
```bash
npm run generate:conversions
```

This queries the D1 database and creates `data/points-conversion.json`.

### Build (Auto-generates)
```bash
npm run build
```

The `prebuild` script automatically runs `generate:conversions` before each build.

## Updating Data

### Option 1: Direct SQL (Recommended)
```bash
# Add a new conversion
npx wrangler d1 execute points-conversion-db --remote --command="
INSERT INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
VALUES (1, 50, '1:1', 'Direct transfer', 1)
"

# Then regenerate JSON
npm run generate:conversions
```

### Option 2: Via Migration Script
```bash
# Update your data in JSON format
# Then run the migration script
node scripts/migrate-to-d1.js
npm run generate:conversions
```

## Deployment

When you deploy to Cloudflare Pages:

1. The build process runs `prebuild` automatically
2. Script queries your production D1 database
3. Generates fresh JSON with latest data
4. Builds the site with updated data

**No code changes needed** - just update data in D1 and redeploy!

## Benefits

✅ Easy data management via SQL  
✅ No runtime database queries (fast static site)  
✅ Automatic updates on each build  
✅ Can add transfer bonuses later  
✅ Version control for schema, not data  

## Local Development

During development, the site uses the last generated JSON file. To get latest data from D1:

```bash
npm run generate:conversions
npm run dev
```
