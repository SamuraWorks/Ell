import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'gallery.json');
const publicGalleryPath = path.join(process.cwd(), 'public');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let missing = 0;
let checked = 0;

function checkItems(items) {
  if (!items) return;
  for (const item of items) {
    if (item.src) {
      checked++;
      // Handle the case where src is absolute or relative
      const cleanSrc = item.src.startsWith('/') ? item.src : `/${item.src}`;
      const filePath = path.join(publicGalleryPath, cleanSrc);
      
      if (!fs.existsSync(filePath)) {
        console.error(`[MISSING] ID: ${item.id} | Section: ${item.section} | src: ${item.src}`);
        missing++;
      }
    }
  }
}

// Check anniversarySections
if (data.anniversarySections) {
  for (const section of data.anniversarySections) {
    checkItems(section.items);
  }
}

// Check birthdaySections
if (data.birthdaySections) {
  for (const section of data.birthdaySections) {
    checkItems(section.items);
  }
}

console.log(`\nValidation complete:`);
console.log(`- Total assets checked: ${checked}`);
console.log(`- Missing assets: ${missing}`);

if (missing > 0) {
  process.exit(1);
}
