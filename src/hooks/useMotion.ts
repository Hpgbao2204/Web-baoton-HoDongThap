import { useEffect, useRef, useState } from 'react'

export function usePrefersReducedMotion() {
  const q = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setReduced(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return reduced
}

/**
 * Hiện dần khi cuộn tới. Phần tử luôn hiển thị sẵn; chỉ những phần tử nằm dưới màn hình lúc tải
 * mới được gắn trạng thái chờ, nên trang không bao giờ bị trống nếu script lỗi.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    const below = items.filter((n) => n.getBoundingClientRect().top > window.innerHeight * 0.92)
    below.forEach((n) => n.classList.add('reveal-wait'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.remove('reveal-wait')
            e.target.classList.add('reveal-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    below.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
  return ref
}

/** Nghiêng 3D theo con trỏ cho thẻ. */
export function useTilt<T extends HTMLElement>(max = 8) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover)').matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`)
      el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
      el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
    }
    const leave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])
  return ref
}
