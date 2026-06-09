/**
 * content-schema.ts
 *
 * Strict content schema for the birthday and anniversary pages.
 * Rules:
 *  - Every section OWNS its own `items` array. No shared flat arrays feed into sections.
 *  - Each section declares an optional `expectedAssetCount` for hard validation.
 *  - `validateSection()` checks each item's src; missing/empty srcs are replaced
 *    with a placeholder and the missing asset is logged to the console.
 *  - `validateSections()` processes an entire page's sections array.
 */

export type AssetType = 'image' | 'video'

export interface SectionAsset {
  id: number | string
  src: string
  caption: string
  type?: AssetType
  poster?: string
  videoDuration?: string
  videoAutoplay?: boolean
  section?: string
  date?: string
  order?: number
  tags?: string[]
  aspectRatio?: string
}

export type SectionLayout =
  | 'masonry'
  | 'mixed'
  | 'featured'
  | 'editorial'
  | 'friends'
  | 'family'
  | 'playful'
  | 'minimal'
  | 'hero'
  | 'spotlight'
  | 'strict'
  | 'special'

export interface ContentSection {
  /** Unique title — used as the section key. Must not be duplicated within a page. */
  title: string
  subtitle?: string
  layout: SectionLayout
  closingNote: string
  themeWord?: string
  /**
   * Items owned exclusively by this section.
   * No other section or shared array should reference the same src paths.
   */
  items: SectionAsset[]
  /**
   * Optional expected count. When set, a warning is logged if the
   * number of valid (non-placeholder) items doesn't match.
   */
  expectedAssetCount?: number
}

/** Placeholder image shown when a declared asset src is missing or empty. */
export const PLACEHOLDER_SRC = '/gallery/placeholder.png'

/** Infer asset type from src extension when not explicitly set. */
function inferType(src: string): AssetType {
  return src.toLowerCase().endsWith('.mp4') ? 'video' : 'image'
}

/** Normalise and validate a single item. Returns the item (with placeholder if needed). */
function validateItem(item: SectionAsset, sectionTitle: string): SectionAsset {
  const resolved: SectionAsset = {
    ...item,
    type: item.type ?? inferType(item.src ?? ''),
  }

  if (!resolved.src || resolved.src.trim() === '') {
    console.warn(
      `[content-schema] MISSING ASSET — section: "${sectionTitle}", id: ${resolved.id}. ` +
        `src is empty. Replacing with placeholder.`
    )
    resolved.src = PLACEHOLDER_SRC
    resolved.type = 'image'
  }

  if (!resolved.caption || resolved.caption.trim() === '') {
    resolved.caption = 'A moment captured in time.'
  }

  return resolved
}

/**
 * Validate a single section.
 * - Replaces missing/empty srcs with a placeholder and logs them.
 * - Deduplicates by src.
 * - Sorts by `order` field (ascending).
 * - Warns if `expectedAssetCount` doesn't match the valid item count.
 */
export function validateSection(section: ContentSection): ContentSection {
  const seen = new Set<string>()
  const validatedItems: SectionAsset[] = []

  for (const item of section.items ?? []) {
    const validated = validateItem(item, section.title)

    const dedupeKey = `src:${validated.src}::id:${validated.id}`
    if (seen.has(dedupeKey)) {
      console.warn(
        `[content-schema] DUPLICATE ASSET — section: "${section.title}", src: "${validated.src}" (id: ${validated.id}). Skipping.`
      )
      continue
    }
    seen.add(dedupeKey)
    validatedItems.push(validated)
  }

  // Sort by order field
  validatedItems.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // Count non-placeholder items
  const realCount = validatedItems.filter((i) => i.src !== PLACEHOLDER_SRC).length

  if (
    section.expectedAssetCount !== undefined &&
    realCount !== section.expectedAssetCount
  ) {
    console.warn(
      `[content-schema] ASSET COUNT MISMATCH — section: "${section.title}". ` +
        `Expected ${section.expectedAssetCount}, found ${realCount} real asset(s) ` +
        `(${validatedItems.length} total including placeholders).`
    )
  }

  return { ...section, items: validatedItems }
}

/**
 * Validate an entire page's sections array.
 * - Deduplicates section titles (logs and skips duplicates).
 * - Validates each section individually.
 */
export function validateSections(sections: ContentSection[]): ContentSection[] {
  const seenTitles = new Set<string>()
  const result: ContentSection[] = []

  for (const section of sections ?? []) {
    const key = section.title.trim().toLowerCase()
    if (seenTitles.has(key)) {
      console.warn(
        `[content-schema] DUPLICATE SECTION TITLE — "${section.title}" appears more than once. ` +
          `Only the first occurrence is kept.`
      )
      continue
    }
    seenTitles.add(key)
    result.push(validateSection(section))
  }

  return result
}
