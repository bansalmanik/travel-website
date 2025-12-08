# Validates that all images have lowercase extensions
# Run before deploying to catch case-sensitivity issues

Write-Host ""
Write-Host "Checking for case-sensitivity issues..." -ForegroundColor Cyan
Write-Host ""

$hasIssues = $false

# Check actual files
Write-Host "Checking image files..." -ForegroundColor Yellow
$uppercaseFiles = Get-ChildItem -Path "public" -Recurse -File | Where-Object { 
    $_.Extension -cmatch '[A-Z]' 
}

if ($uppercaseFiles.Count -gt 0) {
    Write-Host "ERROR: Found $($uppercaseFiles.Count) files with uppercase extensions:" -ForegroundColor Red
    $uppercaseFiles | ForEach-Object {
        $relativePath = $_.FullName.Replace((Get-Location).Path + '\', '')
        Write-Host "   $relativePath" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "TIP: Run: .\fix-image-extensions.ps1" -ForegroundColor Yellow
    Write-Host ""
    $hasIssues = $true
} else {
    Write-Host "OK: All image files have lowercase extensions" -ForegroundColor Green
    Write-Host ""
}

# Check JSON references
Write-Host "Checking JSON references..." -ForegroundColor Yellow
$jsonFiles = Get-ChildItem -Path "data" -Filter "*.json" -File

$uppercaseRefs = @()
foreach ($file in $jsonFiles) {
    $content = Get-Content $file.FullName -Raw
    # Look for uppercase extensions in src paths (case-sensitive)
    if ($content -cmatch '\.JPG"|\.JPEG"|\.PNG"|\.GIF"|\.SVG"|\.WEBP"|\.AVIF"') {
        $uppercaseRefs += $file.Name
    }
}

if ($uppercaseRefs.Count -gt 0) {
    Write-Host "ERROR: Found uppercase extension references in JSON:" -ForegroundColor Red
    $uppercaseRefs | ForEach-Object {
        Write-Host "   $_" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "TIP: Update these references to use lowercase extensions" -ForegroundColor Yellow
    Write-Host ""
    $hasIssues = $true
} else {
    Write-Host "OK: All JSON references use lowercase extensions" -ForegroundColor Green
    Write-Host ""
}

if ($hasIssues) {
    Write-Host "WARNING: Case-sensitivity issues found! Fix before deploying to Cloudflare." -ForegroundColor Red
    Write-Host ""
    exit 1
} else {
    Write-Host "SUCCESS: No case-sensitivity issues found! Safe to deploy." -ForegroundColor Green
    Write-Host ""
    exit 0
}
