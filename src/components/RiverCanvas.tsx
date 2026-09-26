import { useEffect, useRef, useState } from 'react'
import type { Mood } from '../three/moods'
import type { RiverScene } from '../three/RiverScene'
import { usePrefersReducedMotion } from '../hooks/useMotion'

interface Props {
  mood: Mood
  singer?: boolean
  className?: string
  label?: string
}

/** Khung chứa cảnh 3D. Tự dừng khi cuộn khuất, tự co giãn, có nền dự phòng nếu máy không hỗ trợ WebGL. */
export default function RiverCanvas({ mood, singer = true, className = '', label }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const scene = useRef<RiverScene | null>(null)
  const [failed, setFailed] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    let alive = true
    let ro: ResizeObserver | undefined
    let io: IntersectionObserver | undefined
    const onMove = (e: PointerEvent) => {
      scene.current?.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1))
    }
    const onVis = () => {
      if (document.hidden) scene.current?.stop()
    }

    import('../three/RiverScene')
      .then(({ RiverScene }) => {
        if (!alive || !canvas.current || !wrap.current) return
        try {
          scene.current = new RiverScene(canvas.current, { mood, reducedMotion: reduced, singer })
        } catch {
          setFailed(true)
          return
        }
        const s = scene.current
        const el = wrap.current
        ro = new ResizeObserver(() => s.resize(el.clientWidth, el.clientHeight))
        ro.observe(el)
        s.resize(el.clientWidth, el.clientHeight)
        io = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && !document.hidden && !reduced) s.start()
          else s.stop()
        })
        io.observe(el)
        if (reduced) s.renderOnce()
        window.addEventListener('pointermove', onMove, { passive: true })
        document.addEventListener('visibilitychange', onVis)
      })
      .catch(() => setFailed(true))

    return () => {
      alive = false
      ro?.disconnect()
      io?.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
      scene.current?.dispose()
      scene.current = null
    }
    // cảnh chỉ dựng lại khi đổi chế độ chuyển động hoặc có/không người hò
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, singer])

  useEffect(() => {
    scene.current?.setMood(mood)
  }, [mood])

  return (
    <div ref={wrap} className={`river-canvas mood-${mood} ${failed ? 'is-fallback' : ''} ${className}`} role="img" aria-label={label ?? 'Cảnh sông nước Đồng Tháp Mười với hoa sen và chiếc xuồng'}>
      {!failed && <canvas ref={canvas} />}
    </div>
  )
}
