# Script to rename all image files to lowercase extensions
# This fixes case-sensitivity issues on Linux servers (Cloudflare Pages)

Write-Host "Finding files with uppercase extensions..." -ForegroundColor Cyan

$files = Get-ChildItem -Path "public" -Recurse -File | Where-Object { 
    $_.Extension -cmatch '[A-Z]' 
}

Write-Host "Found $($files.Count) files with uppercase extensions" -ForegroundColor Yellow

foreach ($file in $files) {
    $newName = $file.Name.Replace($file.Extension, $file.Extension.ToLower())
    $newPath = Join-Path $file.DirectoryName $newName
    
    if ($file.FullName -ne $newPath) {
        Write-Host "Renaming: $($file.Name) -> $newName" -ForegroundColor Green
        Rename-Item -Path $file.FullName -NewName $newName -Force
    }
}

Write-Host "`nDone! All image extensions are now lowercase." -ForegroundColor Green
Write-Host "Next: Update JSON files to use lowercase extensions." -ForegroundColor Cyan
