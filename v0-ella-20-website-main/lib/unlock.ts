// Client-side unlock logic. No backend.
// June 4 -> birthday experience (/birthday)
// June 24 -> anniversary page (/anniversary)
//
// DEV_MODE: when true, ALL routes are open regardless of date.
// Set this to false to re-enable date-based locking after content upload + testing.
export const DEV_MODE = true

const YEAR = new Date().getFullYear()

// Month is 0-indexed: 5 = June
export const BIRTHDAY_UNLOCK = new Date(YEAR, 5, 4, 0, 0, 0)
export const ANNIVERSARY_UNLOCK = new Date(YEAR, 5, 24, 0, 0, 0)

export function getBirthdayTarget(now: Date = new Date()): Date {
  // Countdown always targets the next upcoming June 4.
  const target = new Date(now.getFullYear(), 5, 4, 0, 0, 0)
  if (now.getTime() >= target.getTime()) {
    return new Date(now.getFullYear() + 1, 5, 4, 0, 0, 0)
  }
  return target
}

export function getAnniversaryTarget(now: Date = new Date()): Date {
  // Countdown always targets the next upcoming June 24.
  const target = new Date(now.getFullYear(), 5, 24, 0, 0, 0)
  if (now.getTime() >= target.getTime()) {
    return new Date(now.getFullYear() + 1, 5, 24, 0, 0, 0)
  }
  return target
}

export function isBirthdayUnlocked(now: Date = new Date()): boolean {
  if (DEV_MODE) return true
  return now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() >= 4)
}

export function isAnniversaryUnlocked(now: Date = new Date()): boolean {
  if (DEV_MODE) return true
  return now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() >= 24)
}

export type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

export function getCountdown(target: Date, now: Date = new Date()): Countdown {
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, done: false }
}
