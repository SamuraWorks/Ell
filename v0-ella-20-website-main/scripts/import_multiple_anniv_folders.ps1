$dest = 'C:\Users\USER\Downloads\v0-ella-20-website-main\v0-ella-20-website-main\public\gallery'
$folders = @(
  @{ src = 'C:\Users\USER\Desktop\Ella\Us Being Silly'; prefix = 'silly' },
  @{ src = 'C:\Users\USER\Desktop\Ella\All Grown Up'; prefix = 'grown' },
  @{ src = 'C:\Users\USER\Desktop\Ella\Special Moments'; prefix = 'special' },
  @{ src = 'C:\Users\USER\Desktop\Ella\Your Man'; prefix = 'yourman' }
)
$result = @{ }
foreach ($f in $folders) {
  $src = $f.src
  $prefix = $f.prefix
  if (Test-Path $src) {
    $i = 1
    $copied = @()
    Get-ChildItem -Path $src -File | Sort-Object Name | ForEach-Object {
      $ext = $_.Extension
      $name = "$prefix-$i$ext"
      Copy-Item -Path $_.FullName -Destination (Join-Path $dest $name) -Force
      $copied += $name
      $i++
    }
    $result[$prefix] = $copied
  } else {
    $result[$prefix] = 'SOURCE_NOT_FOUND'
  }
}
# Output results as JSON for easy parsing
$result | ConvertTo-Json -Compress
