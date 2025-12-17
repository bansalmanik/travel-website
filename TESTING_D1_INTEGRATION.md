# Testing D1 Integration

## Local Testing

### Quick Test (Use Existing Data)
```bash
npm run dev
# Visit http://localhost:3000/pointsconversion
```
Uses the last generated `data/points-conversion.json`.

### Test with Fresh D1 Data
```bash
# 1. Fetch latest from D1
npm run generate:conversions

# 2. Start dev server
npm run dev

# 3. Check the page
# Visit http://localhost:3000/pointsconversion
```

### Test Full Build Process
```bash
# This mimics what happens on Cloudflare Pages
npm run build

# Serve the built site
npm start
# OR
npx serve out
```

## Verify Data Generation

### Check Generated File
```bash
# View file size and record count
node -e "const d=require('./data/points-conversion.json'); console.log('Sources:', d.length, '\nFirst:', d[0].from)"
```

Expected output:
```
Sources: 24
First: Axis Burgundy Private Card
```

### Check D1 Database
```bash
# Count records in D1
npx wrangler d1 execute points-conversion-db --remote --command="SELECT COUNT(*) FROM conversion_rates WHERE enabled=1"
```

Expected: 459 records

## Production Deployment Testing

### Before Deploying

1. **Test build locally**:
   ```bash
   npm run build
   ```
   Should complete without errors and show "✓ Got 459 records"

2. **Check generated JSON**:
   ```bash
   ls -lh data/points-conversion.json
   ```
   Should be ~30-40 KB

3. **Verify wrangler auth**:
   ```bash
   npx wrangler whoami
   ```
   Should show your Cloudflare account

### First Deployment

1. **Push to Git** (if using Git integration):
   ```bash
   git add .
   git commit -m "Add D1 integration"
   git push
   ```

2. **Monitor build logs** in Cloudflare Pages dashboard:
   - Look for "📊 Generating from D1..."
   - Should see "✓ Got 459 records"
   - Build should complete successfully

3. **Verify deployed site**:
   - Visit your-site.pages.dev/pointsconversion
   - Check that all programs and partners appear
   - Test the conversion calculator

### If Build Fails

**Error: "wrangler: command not found"**
- Cloudflare Pages should have wrangler pre-installed
- If not, add to `package.json` devDependencies (already there)

**Error: "Failed to authenticate"**
- Wrangler should auto-authenticate in Cloudflare environment
- No action needed - it uses the Pages project's permissions

**Error: "Database not found"**
- Check `wrangler.toml` has correct database_id
- Verify database exists: `npx wrangler d1 list`

## Updating Data Workflow

### Add New Conversion
```bash
# 1. Add to D1
npx wrangler d1 execute points-conversion-db --remote --command="
INSERT INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
VALUES (1, 50, '1:1', 'New partner', 1)
"

# 2. Test locally
npm run generate:conversions
npm run dev

# 3. Deploy
git push
# OR trigger manual deploy in Cloudflare dashboard
```

### Bulk Update
```bash
# 1. Update migration script with new data
# 2. Run migration
node scripts/migrate-to-d1.js

# 3. Test locally
npm run generate:conversions
npm run dev

# 4. Deploy
git push
```

## Troubleshooting

### "No data showing on site"
1. Check `data/points-conversion.json` exists and has data
2. Verify JSON format matches expected structure
3. Check browser console for errors

### "Old data showing after update"
1. Clear browser cache
2. Regenerate JSON: `npm run generate:conversions`
3. Rebuild: `npm run build`

### "Build works locally but fails on Cloudflare"
1. Check Cloudflare build logs for specific error
2. Verify `wrangler.toml` is committed to Git
3. Ensure database_id is correct
4. Check that D1 database is in same Cloudflare account as Pages project
