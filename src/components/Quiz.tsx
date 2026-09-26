import { useState } from 'react'
import { quiz } from '../data/heritage'
import { IconArrow } from './icons'

const KEY = 'nam-am-quiz-best'

function readBest() {
  try {
    return Number(localStorage.getItem(KEY) || 0)
  } catch {
    return 0
  }
}

const verdicts = [
  { min: 6, title: 'Người thương Hò', body: 'Bạn nắm rất chắc câu chuyện Hò Đồng Tháp. Rủ thêm một người bạn cùng nghe nhé.' },
  { min: 4, title: 'Người nghe tinh ý', body: 'Bạn đã hiểu những nét chính. Đọc thêm trang Nghệ sĩ để biết trọn chuyện đời Kim Nhụy.' },
  { min: 0, title: 'Người mới ghé bến', body: 'Cuộc hẹn nào cũng bắt đầu từ lần đầu. Ghé trang Câu chuyện Hò rồi quay lại thử nhé.' },
]

export default function Quiz() {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [best, setBest] = useState(readBest)
  const q = quiz[i]

  const pick = (k: number) => {
    if (picked !== null) return
    setPicked(k)
    if (k === q.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (i + 1 < quiz.length) {
      setI(i + 1)
      setPicked(null)
    } else {
      setDone(true)
      if (score > best) {
        setBest(score)
        try {
          localStorage.setItem(KEY, String(score))
        } catch {
          /* bỏ qua */
        }
      }
    }
  }

  const restart = () => {
    setI(0)
    setPicked(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    const v = verdicts.find((x) => score >= x.min)!
    return (
      <div className="quiz step-panel" aria-live="polite">
        <div className="row" style={{ gap: 28, alignItems: 'center' }}>
          <div className="medal">
            <span>{v.title}</span>
          </div>
          <div className="stack" style={{ gap: 6 }}>
            <span className="quiz-score">
              {score}/{quiz.length}
            </span>
            <span className="muted">Điểm cao nhất của bạn: {Math.max(best, score)}/{quiz.length}</span>
          </div>
        </div>
        <p className="lede">{v.body}</p>
        <div className="step-actions">
          <button type="button" className="btn btn-primary" onClick={restart}>
            Chơi lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz">
      <div className="steps-nav" aria-label={`Câu ${i + 1} trên ${quiz.length}`}>
        {quiz.map((_, k) => (
          <i key={k} className={k <= i ? 'on' : ''} />
        ))}
      </div>
      <div className="step-panel" key={i}>
        <p className="eyebrow">
          Câu {i + 1} / {quiz.length}
        </p>
        <p className="quiz-q">{q.q}</p>
        <div className="choices">
          {q.options.map((o, k) => {
            const state = picked === null ? '' : k === q.answer ? 'right' : k === picked ? 'wrong' : ''
            return (
              <button key={o} type="button" className={`choice ${state}`} aria-pressed={picked === k} onClick={() => pick(k)} disabled={picked !== null && state === ''}>
                <b>{o}</b>
              </button>
            )
          })}
        </div>
        {picked !== null && (
          <div className="feedback" aria-live="polite">
            <b>{picked === q.answer ? 'Chính xác! ' : 'Chưa đúng. '}</b>
            {q.explain}
          </div>
        )}
        <div className="step-actions">
          <button type="button" className="btn btn-soft" disabled={picked === null} onClick={next} style={{ opacity: picked === null ? 0.5 : 1 }}>
            {i + 1 < quiz.length ? 'Câu tiếp' : 'Xem kết quả'} <IconArrow />
          </button>
        </div>
      </div>
    </div>
  )
}
