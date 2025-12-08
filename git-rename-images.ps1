# Script to rename image files for Git (case-sensitive)
# This ensures Git tracks the case changes properly

Write-Host "`nRenaming images for Git..." -ForegroundColor Cyan
Write-Host ""

$count = 0

# Find all image files
$imageFiles = Get-ChildItem -Path "public" -Recurse -File | Where-Object {
    $_.Extension -match '\.(jpg|jpeg|png|gif|svg|webp|avif)$'
}

foreach ($file in $imageFiles) {
    $currentName = $file.Name
    $newName = $file.BaseName + $file.Extension.ToLower()
    
    # Check if the name would change (case-wise)
    if ($currentName -cne $newName) {
        $relativePath = $file.FullName.Replace((Get-Location).Path + '\', '').Replace('\', '/')
        $tempName = $file.BaseName + "_temp" + $file.Extension
        
        Write-Host "Renaming: $currentName -> $newName" -ForegroundColor Yellow
        
        # Git rename in two steps to handle case-only changes
        # Step 1: Rename to temp name
        git mv $relativePath ($file.DirectoryName + "\" + $tempName).Replace((Get-Location).Path + '\', '').Replace('\', '/')
        
        # Step 2: Rename to final lowercase name
        $tempPath = ($file.DirectoryName + "\" + $tempName).Replace((Get-Location).Path + '\', '').Replace('\', '/')
        $finalPath = ($file.DirectoryName + "\" + $newName).Replace((Get-Location).Path + '\', '').Replace('\', '/')
        git mv $tempPath $finalPath
        
        $count++
    }
}

Write-Host ""
if ($count -gt 0) {
    Write-Host "Renamed $count files for Git" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Review changes: git status" -ForegroundColor White
    Write-Host "2. Commit changes: git commit -m 'Fix: Normalize image extensions to lowercase'" -ForegroundColor White
} else {
    Write-Host "No files need renaming" -ForegroundColor Green
}
Write-Host ""
