# Git Commit Guide - Image Case Changes

## ✅ Changes Ready to Commit

Git has detected **59 file changes** including:
- 58 image files renamed (uppercase → lowercase extensions)
- 1 new script file

## How to Commit

### Option 1: Commit Everything (Recommended)

```bash
git commit -m "fix: Normalize image extensions to lowercase for Linux compatibility

- Renamed 58 image files from .JPG/.PNG to .jpg/.png
- Updated JSON references to use lowercase extensions
- Added validation script to prevent future case-sensitivity issues
- Fixes deployment issues on Cloudflare Pages (Linux servers)"
```

### Option 2: Commit in Stages

**Step 1: Commit image renames**
```bash
git add public/
git commit -m "fix: Rename image files to lowercase extensions"
```

**Step 2: Commit JSON updates**
```bash
git add data/
git commit -m "fix: Update JSON references to use lowercase image extensions"
```

**Step 3: Commit scripts and docs**
```bash
git add *.ps1 *.md scripts/ package.json
git commit -m "feat: Add image validation scripts and documentation"
```

## Verify Changes

Before committing, review what will be committed:

```bash
# See all changes
git status

# See detailed diff
git diff --cached

# See just the renamed files
git status --short | findstr "R "
```

## What Git Shows

Git recognizes these as **renames** (not deletions + additions):
```
R  public/images/content/photo.JPG -> public/images/content/photo.jpg
```

This is good! It means:
- ✅ Git history is preserved
- ✅ Smaller commit size
- ✅ Clear intent (rename, not delete/add)

## After Committing

1. **Push to GitHub**:
   ```bash
   git push origin your-branch-name
   ```

2. **Verify on GitHub**:
   - Check that files show as renamed (not deleted/added)
   - Verify images load correctly in preview

3. **Deploy to Cloudflare**:
   - Images will now work on Linux servers!
   - No more 404 errors for case-mismatched files

## Why This Matters

### Before (Broken on Cloudflare):
- Local: `photo.JPG` works ✅
- Cloudflare: `photo.JPG` referenced as `photo.jpg` = 404 ❌

### After (Works Everywhere):
- Local: `photo.jpg` works ✅
- Cloudflare: `photo.jpg` works ✅

## Troubleshooting

### If GitHub Desktop doesn't show changes:

1. **Refresh**: Click the refresh button
2. **Restart**: Close and reopen GitHub Desktop
3. **Command line**: Use `git status` to verify changes are staged

### If you see duplicates:

This can happen if Git's case-sensitivity is confused. Fix with:
```bash
git rm --cached -r public/images/
git add public/images/
```

## Next Steps

1. ✅ Review changes: `git status`
2. ✅ Commit changes (use commands above)
3. ✅ Push to GitHub
4. ✅ Deploy to Cloudflare
5. ✅ Verify images load correctly

---

**Your changes are ready to commit! 🚀**
