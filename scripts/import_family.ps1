$src = 'C:\Users\USER\Desktop\Ella\Family'
$dest = 'C:\Users\USER\Downloads\v0-ella-20-website-main\v0-ella-20-website-main\public\gallery'
if (Test-Path $src) {
  $i = 1
  Get-ChildItem -Path $src -File | Sort-Object Name | ForEach-Object {
    $ext = $_.Extension
    $name = "family-$i$ext"
    Copy-Item -Path $_.FullName -Destination (Join-Path $dest $name) -Force
    Write-Output $name
    $i++
  }
} else {
  Write-Output 'SOURCE_NOT_FOUND'
}
