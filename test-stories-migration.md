# Test Stories Migration

## Quick Test Commands

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test URLs

**Stories Listing Page:**
```
http://localhost:3000/stories
```

**Individual Stories:**
```
http://localhost:3000/lagoon-days-at-villa-nautica
http://localhost:3000/hills-and-horizons-san-francisco
http://localhost:3000/French-Escapade
http://localhost:3000/Grand-Macau
```

### 3. Mobile Testing

**Chrome DevTools:**
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Test these devices:
   - iPhone SE (375px)
   - iPhone 14 Pro (393px)
   - iPad (768px)
   - iPad Pro (1024px)

**Check:**
- [ ] Text is readable (not too small)
- [ ] Images load and scale properly
- [ ] Touch targets are easy to tap
- [ ] No horizontal scrolling
- [ ] Gallery swipes smoothly
- [ ] Video embeds work
- [ ] Buttons are easy to tap
- [ ] Layout looks good

### 4. Desktop Testing

**Check:**
- [ ] 3-column grid on listing page
- [ ] Hover effects work
- [ ] Images look sharp
- [ ] All links work
- [ ] Gallery navigation works
- [ ] Video plays

### 5. Functionality Testing

**Stories Listing:**
- [ ] All 4 stories display
- [ ] Cover images load
- [ ] Location badges show
- [ ] Category tags display
- [ ] Author info shows
- [ ] Read time displays
- [ ] Cards are clickable
- [ ] Hover effects work

**Individual Story:**
- [ ] Hero image loads
- [ ] Title displays correctly
- [ ] Author info shows
- [ ] Instagram link works (if present)
- [ ] Content renders properly
- [ ] Images in content load
- [ ] Gallery displays (if present)
- [ ] Video embeds (if present)
- [ ] Highlights section shows (if present)
- [ ] Back button works
- [ ] Scroll down button works

### 6. Performance Testing

**Lighthouse (Chrome DevTools):**
1. Open DevTools
2. Go to Lighthouse tab
3. Select "Mobile"
4. Click "Analyze page load"

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

### 7. Console Check

**Open Console (F12):**
- [ ] No errors
- [ ] No warnings (or only expected ones)
- [ ] No 404s for images
- [ ] No failed requests

### 8. Network Check

**Open Network tab (F12):**
- [ ] Images load successfully
- [ ] No 404 errors
- [ ] Reasonable file sizes
- [ ] Images are lazy loaded

### 9. SEO Check

**View Page Source (Ctrl+U):**
- [ ] Title tag present
- [ ] Meta description present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URL present
- [ ] Alt text on images

### 10. Cross-Browser Testing

**Test in:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Edge

## Expected Results

### Stories Listing Page
- Clean grid layout
- Responsive on all devices
- Fast loading
- Smooth interactions
- All stories visible

### Individual Story Pages
- Beautiful hero section
- Readable content
- Working galleries
- Video embeds functional
- Mobile-friendly
- Fast loading

## Common Issues & Solutions

### Images Not Loading
**Problem:** Images show broken icon
**Solution:** 
- Check image paths start with `/`
- Verify images exist in `public/images/content/`
- Check file extensions match (case-sensitive on production)

### Layout Broken on Mobile
**Problem:** Horizontal scroll or text too small
**Solution:**
- Clear browser cache
- Check Tailwind classes are correct
- Verify responsive classes (sm:, lg:) are applied

### MDX Compilation Error
**Problem:** Page shows error or doesn't load
**Solution:**
- Check frontmatter YAML is valid
- Verify all JSX tags are closed
- Check component names are correct
- Look for syntax errors in MDX

### Gallery Not Working
**Problem:** Gallery doesn't display or swipe
**Solution:**
- Verify `GallerySlider` component exists
- Check image array format in frontmatter
- Ensure layout values are valid

### Video Not Embedding
**Problem:** Video doesn't show or play
**Solution:**
- Check YouTube URL format
- Verify videoUrl in frontmatter
- Test video ID is correct
- Check iframe permissions

## Build Test

### Production Build
```bash
# Build the project
npm run build

# Check for errors
# Should complete without errors

# Test production build
npm run start

# Visit http://localhost:3000/stories
```

### Build Checklist
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] No build warnings
- [ ] All pages generate
- [ ] Production site works

## Final Verification

### Before Going Live
- [ ] All tests pass
- [ ] No console errors
- [ ] Mobile experience is smooth
- [ ] Desktop experience is good
- [ ] Performance is acceptable
- [ ] SEO metadata is correct
- [ ] All images load
- [ ] All links work
- [ ] Gallery works
- [ ] Videos work

### After Going Live
- [ ] Monitor error logs
- [ ] Check analytics
- [ ] Verify search indexing
- [ ] Test on real devices
- [ ] Get user feedback

## Rollback Plan

If issues occur:

1. **Quick Fix:**
   ```bash
   # Revert to old system temporarily
   git checkout HEAD~1 app/[slug]/page.tsx
   git checkout HEAD~1 lib/content-loader.ts
   ```

2. **Full Rollback:**
   ```bash
   # Restore old files
   git checkout HEAD~1 app/stories/
   git checkout HEAD~1 app/[slug]/story-content.tsx
   ```

3. **Fix and Redeploy:**
   - Identify issue
   - Fix in development
   - Test thoroughly
   - Redeploy

## Success Indicators

✅ **Migration is successful when:**
- All stories load correctly
- Mobile experience is excellent
- No errors in console
- Performance is good
- SEO is working
- Users can navigate easily
- Content is readable
- Images load properly
- Interactive elements work

## Support

If you encounter issues:
1. Check this testing guide
2. Review `STORIES_QUICK_START.md`
3. Check `STORIES_MDX_MIGRATION.md`
4. Look at example MDX files
5. Check console for errors
6. Test in incognito mode

## Notes

- Test on real mobile devices when possible
- Emulators are good but not perfect
- Check different screen sizes
- Test touch interactions
- Verify performance on slow connections
- Check accessibility with screen readers
