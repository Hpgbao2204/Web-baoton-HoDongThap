type P = { className?: string }
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export const IconPlay = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
  </svg>
)
export const IconPause = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="6.5" y="5" width="4" height="14" rx="1" fill="currentColor" />
    <rect x="13.5" y="5" width="4" height="14" rx="1" fill="currentColor" />
  </svg>
)
export const IconArrow = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)
export const IconMoon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
  </svg>
)
export const IconSun = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </svg>
)
export const IconMenu = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M4 8c3-2 5 2 8 0s5 2 8 0M4 16c3-2 5 2 8 0s5 2 8 0" />
  </svg>
)
export const IconClose = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const IconSearch = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </svg>
)
export const IconWave = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M2 10c2.5-3 4.5 3 7 0s4.5 3 7 0 4.5 3 6 0M2 15c2.5-3 4.5 3 7 0s4.5 3 7 0 4.5 3 6 0" />
  </svg>
)
export const IconMute = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    <path d="M16 9.5l5 5M21 9.5l-5 5" />
  </svg>
)
export const IconFlag = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5v.01" />
  </svg>
)

/** Dấu hiệu nhận diện: một đường tiếng Hò đi qua vầng trăng. */
export const BrandMark = ({ className }: P) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <circle cx="25" cy="15" r="9" fill="var(--lotus-soft)" />
    <path d="M3 24c4-6 8 4 12-1s7-9 11-3 7 4 11-2" fill="none" stroke="var(--lotus-ink)" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M6 31c3-2 6 1 9 0s6-2 9 0 6 1 9-1" fill="none" stroke="var(--river)" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)
