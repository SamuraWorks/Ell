const fs = require('fs')
const path = require('path')

const workspace = process.cwd()
const galleryDir = path.join(workspace, 'public', 'gallery')
const dataFiles = [
  path.join(workspace, 'data', 'gallery.json'),
  path.join(workspace, 'data', 'videos.json')
]

if (!fs.existsSync(galleryDir)) {
  console.error('public/gallery not found, aborting')
  process.exit(1)
}

function sanitizeName(name) {
  // remove occurrences like " (1)" that commonly come from duplicates
  let s = name.replace(/\s*\(\d+\)/g, '')
  // replace spaces with dashes
  s = s.replace(/\s+/g, '-')
  // collapse multiple dashes
  s = s.replace(/-+/g, '-')
  // trim dashes
  s = s.replace(/^\-+|\-+$/g, '')
  return s
}

const files = fs.readdirSync(galleryDir)
const mapping = {}
const used = new Set(fs.readdirSync(galleryDir))

for (const f of files) {
  const safe = sanitizeName(f)
  let target = safe
  if (target === f) continue
  // ensure unique target
  const ext = path.extname(target)
  const base = path.basename(target, ext)
  let i = 1
  while (used.has(target)) {
    i++
    target = `${base}-${i}${ext}`
  }
  const from = path.join(galleryDir, f)
  const to = path.join(galleryDir, target)
  try {
    fs.renameSync(from, to)
    mapping[f] = target
    used.add(target)
    used.delete(f)
    console.log(`renamed: ${f} -> ${target}`)
  } catch (err) {
    console.error(`failed to rename ${f}:`, err.message)
  }
}

if (Object.keys(mapping).length === 0) {
  console.log('No filenames needed renaming.')
} else {
  // update JSON data files
  for (const df of dataFiles) {
    if (!fs.existsSync(df)) continue
    let text = fs.readFileSync(df, 'utf8')
    for (const [oldName, newName] of Object.entries(mapping)) {
      // replace occurrences of the filename only
      const esc = oldName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      const re = new RegExp(esc, 'g')
      text = text.replace(re, newName)
    }
    fs.writeFileSync(df, text, 'utf8')
    console.log(`Updated references in ${path.relative(workspace, df)}`)
  }
}

console.log('Done. Please run your validation/build step to confirm.')
