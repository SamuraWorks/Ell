# batch_push.ps1
# Rebuilds local main on top of origin/main with gallery files in small batches
# to avoid HTTP 408 push timeouts on large payloads.

param(
    [int]$BatchSize = 20
)

function Invoke-Git {
    param([string[]]$Arguments)
    $output = & git @Arguments 2>&1
    $output | ForEach-Object { Write-Host "  $_" }
    return $LASTEXITCODE
}

Write-Host "=== Batch Push Script ===" -ForegroundColor Cyan

# 1. Abort any in-progress operations
Write-Host "`n[1] Cleaning up any in-progress git operations..."
& git cherry-pick --abort 2>&1 | Out-Null
& git rebase --abort 2>&1 | Out-Null
& git merge --abort 2>&1 | Out-Null

# 2. Delete and recreate a clean 'push-main-rebuild' branch from origin/main
Write-Host "`n[2] Creating clean push-main-rebuild from origin/main..."
& git branch -D push-main-rebuild 2>&1 | Out-Null
& git checkout -b push-main-rebuild origin/main 2>&1 | ForEach-Object { Write-Host "  $_" }
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Could not create push-main-rebuild branch." -ForegroundColor Red
    exit 1
}
Write-Host "  On branch push-main-rebuild." -ForegroundColor Green

# 3. Get list of files in local main that differ from origin/main
Write-Host "`n[3] Identifying changed files..."
$changedFiles = @(& git diff --name-only origin/main main 2>&1)
Write-Host "  Total changed files: $($changedFiles.Count)"

$galleryFiles   = @($changedFiles | Where-Object { $_ -match '^public/gallery/' })
$nonGalleryFiles = @($changedFiles | Where-Object { $_ -notmatch '^public/gallery/' })

Write-Host "  Non-gallery files: $($nonGalleryFiles.Count)"
Write-Host "  Gallery files: $($galleryFiles.Count)"

# 4. Apply non-gallery files first
Write-Host "`n[4] Applying non-gallery file changes..."
foreach ($file in $nonGalleryFiles) {
    & git checkout main -- $file 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  WARNING: Skipping (not in main): $file" -ForegroundColor Yellow
    }
}

& git add -A 2>&1 | Out-Null
$statusOutput = @(& git status --porcelain 2>&1)
if ($statusOutput.Count -gt 0) {
    & git commit -m "chore: apply all code and data changes" 2>&1 | ForEach-Object { Write-Host "  $_" }
    Write-Host "  Committed non-gallery files." -ForegroundColor Green
} else {
    Write-Host "  No non-gallery file changes to commit."
}

# 5. Push non-gallery commit
Write-Host "`n[5] Pushing non-gallery commit..."
& git push origin push-main-rebuild 2>&1 | ForEach-Object { Write-Host "  $_" }
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Push of non-gallery files failed. Aborting." -ForegroundColor Red
    exit 1
}
Write-Host "  Non-gallery push succeeded." -ForegroundColor Green

# 6. Push gallery files in batches
Write-Host "`n[6] Pushing gallery files in batches of $BatchSize..."
$total = $galleryFiles.Count
$batchNum = 0

for ($i = 0; $i -lt $total; $i += $BatchSize) {
    $batchNum++
    $batch = @($galleryFiles | Select-Object -Skip $i -First $BatchSize)
    $end = [Math]::Min($i + $BatchSize, $total)
    Write-Host "`n  Batch $batchNum (files $($i+1)-$end of $total)..." -ForegroundColor Cyan

    foreach ($file in $batch) {
        & git checkout main -- $file 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "    WARNING: Skipping: $file" -ForegroundColor Yellow
        }
    }

    & git add -A 2>&1 | Out-Null
    $statusOutput = @(& git status --porcelain 2>&1)
    if ($statusOutput.Count -gt 0) {
        & git commit -m "media: add gallery batch $batchNum" 2>&1 | ForEach-Object { Write-Host "  $_" }

        $pushed = $false
        for ($attempt = 1; $attempt -le 3; $attempt++) {
            Write-Host "  Pushing batch $batchNum (attempt $attempt)..."
            & git push origin push-main-rebuild 2>&1 | ForEach-Object { Write-Host "  $_" }
            if ($LASTEXITCODE -eq 0) {
                Write-Host "  Batch $batchNum pushed successfully." -ForegroundColor Green
                $pushed = $true
                break
            }
            Write-Host "  Push attempt $attempt failed. Retrying in 5 seconds..." -ForegroundColor Yellow
            Start-Sleep -Seconds 5
        }
        if (-not $pushed) {
            Write-Host "ERROR: Failed to push batch $batchNum after 3 attempts. Aborting." -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "  No files in this batch to commit."
    }
}

# 7. Update local main and force-push to origin
Write-Host "`n[7] Updating local main and pushing to origin/main..."
& git checkout main 2>&1 | ForEach-Object { Write-Host "  $_" }
& git reset --hard push-main-rebuild 2>&1 | ForEach-Object { Write-Host "  $_" }
& git push origin main --force-with-lease 2>&1 | ForEach-Object { Write-Host "  $_" }

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n=== Push complete! ===" -ForegroundColor Green
    & git log --oneline -8
} else {
    Write-Host "ERROR: Final push to main failed. Your changes are on the 'push-main-rebuild' branch on origin." -ForegroundColor Red
    exit 1
}

# Cleanup
& git branch -D push-main-rebuild 2>&1 | Out-Null
& git push origin --delete push-main-rebuild 2>&1 | Out-Null
Write-Host "Cleanup done." -ForegroundColor Green
