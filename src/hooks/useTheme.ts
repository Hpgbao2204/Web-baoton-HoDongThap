import { useCallback, useEffect, useState } from 'react'
import type { Mood } from '../three/moods'

export type Theme = 'light' | 'dark'
const KEY = 'hen-ho-theme'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'light' || attr === 'dark') return attr
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* bộ nhớ trình duyệt bị chặn */
  }
  return systemTheme()
}

/** Chủ đề sáng/tối. Tối = "trăng lên", cũng là lúc cảnh 3D chuyển sang đêm. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readTheme)

  useEffect(() => {
    const root = document.documentElement
    const obs = new MutationObserver(() => {
      const a = root.getAttribute('data-theme')
      setThemeState(a === 'light' || a === 'dark' ? a : systemTheme())
    })
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    const m = window.matchMedia('(prefers-color-scheme: dark)')
    const onSys = () => {
      if (!root.getAttribute('data-theme')) setThemeState(systemTheme())
    }
    m.addEventListener('change', onSys)
    return () => {
      obs.disconnect()
      m.removeEventListener('change', onSys)
    }
  }, [])

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute('data-theme', t)
    try {
      localStorage.setItem(KEY, t)
    } catch {
      /* bỏ qua */
    }
    setThemeState(t)
  }, [])

  return { theme, setTheme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}

export function themeMood(theme: Theme, lightMood: Mood = 'dusk'): Mood {
  return theme === 'dark' ? 'night' : lightMood
}
