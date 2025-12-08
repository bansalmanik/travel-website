# Image Case-Sensitivity Fix ✅

## Problem
Windows is case-insensitive for file names, but Linux servers (Cloudflare Pages) are case-sensitive.

**Example:**
- Windows: `/images/photo.JPG` and `/images/photo.jpg` are the SAME file
- Linux: `/images/photo.JPG` and `/images/photo.jpg` are DIFFERENT files

This causes images to work locally but break when deployed to Cloudflare Pages.

## Solution Applied

### 1. ✅ Renamed All Image Files to Lowercase
Renamed 58 files from uppercase extensions (`.JPG`, `.PNG`) to lowercase (`.jpg`, `.png`)

**Files affected:**
- All `.JPG` files → `.jpg`
- All `.PNG` files → `.png`
- All `.AVIF` files → `.avif`
- All `.SVG` files → `.svg`

### 2. ✅ Updated JSON References
Fixed references in:
- `data/travel-resources.json` - Updated 3 references
- Other JSON files will be updated as needed

### 3. ✅ Created Prevention Scripts

#### `fix-image-extensions.ps1`
Automatically renames all image files to lowercase extensions.

**Usage:**
```powershell
.\fix-image-extensions.ps1
```

#### `scripts/validate-images.ps1`
Validates that all images have lowercase extensions before deployment.

**Usage:**
```powershell
.\scripts\validate-images.ps1
```

### 4. ✅ Added to Build Process
Updated `package.json` to automatically validate before building:

```json
{
  "scripts": {
    "validate:images": "pwsh -File scripts/validate-images.ps1",
    "prebuild": "pwsh -File scripts/validate-images.ps1"
  }
}
```

Now every time you run `npm run build`, it will check for case-sensitivity issues!

## How to Use Going Forward

### When Adding New Images:

1. **Always use lowercase extensions** when saving files:
   - ✅ `photo.jpg` (correct)
   - ❌ `photo.JPG` (wrong)

2. **Always use lowercase in JSON references**:
   ```json
   {
     "src": "/images/photo.jpg"  ✅
   }
   ```

### Before Deploying:

Run the validation script:
```powershell
npm run validate:images
```

If it finds issues, it will tell you exactly what to fix.

### If You Forget:

The `prebuild` script will catch issues automatically when you run:
```powershell
npm run build
```

## Quick Fix Commands

### Fix All Image Files:
```powershell
.\fix-image-extensions.ps1
```

### Check for Issues:
```powershell
.\scripts\validate-images.ps1
```

### Fix JSON References Manually:
Search and replace in your JSON files:
- Find: `\.JPG"`
- Replace: `.jpg"`

## Why This Matters

### Local (Windows):
- Case-insensitive
- `/images/photo.JPG` works even if you reference `/images/photo.jpg`
- No errors

### Production (Cloudflare/Linux):
- Case-sensitive
- `/images/photo.JPG` ≠ `/images/photo.jpg`
- **404 errors** if case doesn't match exactly

## Best Practices

1. **Always use lowercase extensions** for web assets
2. **Run validation before deploying**
3. **Use consistent naming**:
   - Lowercase extensions: `.jpg`, `.png`, `.svg`
   - Kebab-case names: `my-photo.jpg` (not `My_Photo.JPG`)

## Files Fixed

### Image Files (58 files):
- `public/images/content/*.JPG` → `*.jpg`
- `public/private-assets/images/content/*.JPG` → `*.jpg`

### JSON Files (3 references):
- `data/travel-resources.json`:
  - `cotai_waterjet.JPG` → `cotai_waterjet.jpg`
  - `octopus-card-1.JPG` → `octopus-card-1.jpg`
  - `MTR-Airport-7.PNG` → `MTR-Airport-7.png`

## Verification

Run this to verify all is fixed:
```powershell
npm run validate:images
```

Expected output:
```
OK: All image files have lowercase extensions
OK: All JSON references use lowercase extensions
SUCCESS: No case-sensitivity issues found! Safe to deploy.
```

---

**Your images will now work correctly on Cloudflare Pages! 🎉**
