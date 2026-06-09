const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const galleryDir = path.join(root, 'public', 'gallery')
const dataFiles = ['data/gallery.json', 'data/videos.json']

function collectRefs(obj) {
  const refs = []
  if (Array.isArray(obj)) {
    obj.forEach(item => refs.push(...collectRefs(item)))
    return refs
  }
  if (obj && typeof obj === 'object') {
    Object.entries(obj).forEach(([key, value]) => {
      if (key === 'src' && typeof value === 'string' && value.startsWith('/gallery/')) {
        refs.push(value.slice('/gallery/'.length))
      } else {
        refs.push(...collectRefs(value))
      }
    })
  }
  return refs
}

let refs = []
for (const relPath of dataFiles) {
  const absPath = path.join(root, relPath)
  if (!fs.existsSync(absPath)) {
    console.error(`Missing data file: ${relPath}`)
    process.exit(1)
  }

  try {
    const data = JSON.parse(fs.readFileSync(absPath, 'utf8'))
    refs = refs.concat(collectRefs(data))
  } catch (err) {
    console.error(`Failed to parse ${relPath}:`, err)
    process.exit(1)
  }
}

const refSet = new Set(refs)
const existingFiles = fs.existsSync(galleryDir) ? new Set(fs.readdirSync(galleryDir)) : new Set()

const missingRefs = [...refSet].filter(src => !existingFiles.has(src))
const unsafeRefs = [...refSet].filter(src => /[ \(\)]/.test(src))
const unusedFiles = [...existingFiles].filter(file => !refSet.has(file))

const lfsPointers = [...existingFiles].filter(file => {
  const filePath = path.join(galleryDir, file)
  try {
    const stats = fs.statSync(filePath)
    if (stats.isFile() && stats.size < 1000) {
      const content = fs.readFileSync(filePath, 'utf8')
      return content.startsWith('version https://git-lfs.github.com/spec/v1')
    }
  } catch (err) {
    // Ignore read errors
  }
  return false
})

console.log(`Gallery asset validation:`)
console.log(`  referenced files: ${refSet.size}`)
console.log(`  existing files:   ${existingFiles.size}`)
console.log(`  unused files:     ${unusedFiles.length}`)
console.log(`  LFS pointers:     ${lfsPointers.length}`)

if (unusedFiles.length > 0) {
  console.log(`  note: ${unusedFiles.length} gallery files are not referenced by data and may be unused.`)
}

if (unsafeRefs.length > 0) {
  console.error('\nError: gallery asset references include unsafe filename characters:')
  unsafeRefs.forEach(src => console.error(`  - ${src}`))
}

if (missingRefs.length > 0) {
  console.error('\nError: gallery asset references are missing from public/gallery:')
  missingRefs.forEach(src => console.error(`  - ${src}`))
}

if (lfsPointers.length > 0) {
  console.error('\nError: The following gallery files are Git LFS pointer files (not actual binary files):')
  lfsPointers.forEach(file => console.error(`  - ${file}`))
}

if (unsafeRefs.length > 0 || missingRefs.length > 0 || lfsPointers.length > 0) {
  console.error('\nFix the above gallery asset references or add the missing files to public/gallery (ensure they are downloaded/committed as regular binary files).')
  process.exit(1)
}

console.log('Gallery validation passed.')

