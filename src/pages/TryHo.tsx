import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DateStage from '../components/DateStage'
import { PageHead } from '../components/ui'
import { IconArrow } from '../components/icons'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useAmbient } from '../hooks/useAmbient'
import type { Mood } from '../three/moods'

const places: { id: string; mood: Mood; title: string; sub: string; feedback: string }[] = [
  {
    id: 'ghe',
    mood: 'day',
    title: 'Trên ghe giữa sông',
    sub: 'Kênh rạch dài, nước lặng, tiếng vang xa',
    feedback:
      'Sông nước là một trong những khung cảnh người trẻ nhớ nhất khi nghe Hò. Mặt nước rộng giúp tiếng hò vang xa, người ở bờ bên kia cũng nghe được.',
  },
  {
    id: 'ruong',
    mood: 'dusk',
    title: 'Ngoài đồng lúc làm lúa',
    sub: 'Việc nặng, trời rộng, người đứng rải rác',
    feedback:
      'Hò gắn với đời sống lao động. Giữa lúc làm việc, một câu hò có thể là lời trò chuyện, lời gửi gắm, hay cách cho nhau đỡ mệt.',
  },
  {
    id: 'ben',
    mood: 'night',
    title: 'Ở bến nước lúc trăng lên',
    sub: 'Nơi người ta gặp nhau sau một ngày',
    feedback:
      'Bến nước là điểm hẹn. Trong chiến dịch, đây là nơi cuộc hẹn của hai người mở rộng thành cuộc gặp gỡ của cả cộng đồng.',
  },
]

const intents = [
  { id: 'goi', title: 'Gọi một người ở xa', ok: false },
  { id: 'bay-to', title: 'Bày tỏ điều trong lòng', ok: false },
  { id: 'do-met', title: 'Cho đỡ mệt khi làm việc', ok: false },
  { id: 'ca-ba', title: 'Có thể là cả ba', ok: true },
]

const TOTAL = 5

export default function TryHo() {
  const { theme } = useTheme()
  const ambient = useAmbient()
  const [step, setStep] = useState(0)
  const [call, setCall] = useState(0)
  const [place, setPlace] = useState<(typeof places)[number] | null>(null)
  const [intent, setIntent] = useState<string | null>(null)
  const [responded, setResponded] = useState(false)
  const [keyHold, setKeyHold] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const raf = useRef(0)

  const mood: Mood = place?.mood ?? themeMood(theme, 'dusk')

  const playCall = () => {
    cancelAnimationFrame(raf.current)
    const start = performance.now()
    const run = (now: number) => {
      const k = Math.min(1, (now - start) / 2600)
      setCall(k)
      if (k < 1) raf.current = requestAnimationFrame(run)
    }
    raf.current = requestAnimationFrame(run)
  }
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const restart = () => {
    setStep(0)
    setCall(0)
    setPlace(null)
    setIntent(null)
    setResponded(false)
    setResetKey((k) => k + 1)
  }

  const chosenIntent = intents.find((i) => i.id === intent)

  return (
    <div>
      <PageHead
        mood={themeMood(theme, 'dusk')}
        crumb="Thử Hò"
        eyebrow="Cùng Hò"
        title={
          <>
            Một cuộc hẹn <i>5 phút</i> với Hò
          </>
        }
        lede="Nghe một tiếng gọi, chọn bối cảnh, đoán ý người hò, rồi thử gửi lời đáp của bạn qua sông."
      />

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap date-shell">
          <div className="stack">
            <div className="stage">
              <DateStage mood={mood} call={call} canRespond={step === 3 && !responded} onResponded={() => setResponded(true)} resetKey={resetKey} forceHold={keyHold} />
              <p className="stage-hint">
                {step === 3 && !responded
                  ? 'Nhấn giữ trên khung này để gửi lời đáp. Kéo lên xuống để đổi độ cao.'
                  : step === 3
                    ? 'Lời đáp của bạn đã tới bờ bên kia.'
                    : place
                      ? place.title
                      : 'Người hò trên xuồng · Bến nước bên kia sông'}
              </p>
            </div>
            <p className="note">
              Đây là trải nghiệm minh hoạ để hiểu bối cảnh, chưa phải bài học hò. Bản ghi thật và phần hướng dẫn hò đáp sẽ được bổ sung sau khi nghệ nhân duyệt.
            </p>
          </div>

          <div>
            <div className="steps-nav" aria-label={`Bước ${step + 1} trên ${TOTAL}`}>
              {Array.from({ length: TOTAL }, (_, i) => (
                <i key={i} className={i <= step ? 'on' : ''} />
              ))}
            </div>

            {step === 0 && (
              <div className="step-panel" key="s0">
                <p className="eyebrow">Bước 1 · Nghe</p>
                <h3>Một tiếng hò vang lên từ phía sông</h3>
                <p className="lede">
                  Trước khi biết đó là gì, cứ nghe đã. Hò là thực hành bằng giọng, và cái tai thường hiểu trước cả đầu óc.
                </p>
                <div className="step-actions">
                  <button type="button" className="btn btn-primary" onClick={playCall}>
                    Nghe tiếng gọi
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={ambient.toggle} aria-pressed={ambient.playing}>
                    {ambient.playing ? 'Tắt tiếng sông' : 'Bật tiếng sông nước'}
                  </button>
                </div>
                {call >= 1 && (
                  <div className="feedback">
                    Tiếng gọi đã vang sang bờ bên kia. Bản ghi giọng hò thật sẽ được gắn vào đây khi có tư liệu đã xác minh.
                  </div>
                )}
                <div className="step-actions">
                  <button type="button" className="btn btn-soft" disabled={call < 1} onClick={() => setStep(1)} style={{ opacity: call < 1 ? 0.5 : 1 }}>
                    Tiếp theo <IconArrow />
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="step-panel" key="s1">
                <p className="eyebrow">Bước 2 · Bối cảnh</p>
                <h3>Bạn nghĩ người ấy đang hò ở đâu?</h3>
                <div className="choices">
                  {places.map((p) => (
                    <button key={p.id} type="button" className="choice" aria-pressed={place?.id === p.id} onClick={() => setPlace(p)}>
                      <b>{p.title}</b>
                      <span>{p.sub}</span>
                    </button>
                  ))}
                </div>
                {place && <div className="feedback" key={place.id}>{place.feedback}</div>}
                <div className="step-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(0)}>
                    Quay lại
                  </button>
                  <button type="button" className="btn btn-soft" disabled={!place} onClick={() => setStep(2)} style={{ opacity: place ? 1 : 0.5 }}>
                    Tiếp theo <IconArrow />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step-panel" key="s2">
                <p className="eyebrow">Bước 3 · Đoán ý</p>
                <h3>Người hò đang muốn điều gì?</h3>
                <div className="choices">
                  {intents.map((i) => (
                    <button key={i.id} type="button" className="choice" aria-pressed={intent === i.id} onClick={() => setIntent(i.id)}>
                      <b>{i.title}</b>
                    </button>
                  ))}
                </div>
                {chosenIntent && (
                  <div className="feedback" key={chosenIntent.id}>
                    {chosenIntent.ok
                      ? 'Đúng vậy. Hò có thể là tiếng gọi, lời bày tỏ, hay cách giải khuây. Nghĩa của câu hò phụ thuộc vào ai hò, hò ở đâu và hò cho ai nghe.'
                      : 'Có thể lắm. Nhưng Hò còn nhiều hơn thế: cùng một cách cất tiếng có thể vừa là tiếng gọi, vừa là lời bày tỏ, vừa là cách giải khuây.'}
                  </div>
                )}
                <div className="step-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                    Quay lại
                  </button>
                  <button type="button" className="btn btn-soft" disabled={!intent} onClick={() => setStep(3)} style={{ opacity: intent ? 1 : 0.5 }}>
                    Tiếp theo <IconArrow />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step-panel" key="s3">
                <p className="eyebrow">Bước 4 · Đáp lời</p>
                <h3>Gửi lời đáp của bạn qua sông</h3>
                <p className="lede">
                  Nhấn giữ trên khung sông nước cho tới khi đường đáp lời chạm tới người hò. Lên cao hay xuống thấp là tuỳ lòng bạn.
                </p>
                <div className="step-actions">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    disabled={responded}
                    onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && (e.preventDefault(), setKeyHold(true))}
                    onKeyUp={() => setKeyHold(false)}
                    onPointerDown={() => setKeyHold(true)}
                    onPointerUp={() => setKeyHold(false)}
                    onPointerLeave={() => setKeyHold(false)}
                  >
                    Giữ để đáp lời
                  </button>
                </div>
                {responded && (
                  <div className="feedback">
                    Lời đáp đã tới. Trong Hò, có người cất tiếng thì có người lắng nghe và đáp lại. Chính mối quan hệ ấy làm nên không gian của Hò.
                  </div>
                )}
                <div className="step-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>
                    Quay lại
                  </button>
                  <button type="button" className="btn btn-soft" disabled={!responded} onClick={() => setStep(4)} style={{ opacity: responded ? 1 : 0.5 }}>
                    Tiếp theo <IconArrow />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="step-panel" key="s4">
                <p className="eyebrow">Bước 5 · Ghi nhớ</p>
                <div className="learn-card">
                  <p className="eyebrow">Tấm thẻ của bạn</p>
                  <p className="eq">
                    <b>Hò</b> = tiếng nói + tình huống + mối quan hệ + không gian văn hoá
                  </p>
                  <p style={{ color: 'var(--ink-2)' }}>
                    Bạn vừa nghe một tiếng gọi {place ? `${place.title.toLowerCase()}` : ''}, đoán ý người hò và gửi lại lời đáp. Đó cũng là cách Hò Đồng Tháp từng nối người với
                    người ở Đồng Tháp Mười.
                  </p>
                </div>
                <div className="step-actions">
                  <Link to="/thu-vien" className="btn btn-primary">
                    Vào thư viện <IconArrow />
                  </Link>
                  <Link to="/kham-pha" className="btn btn-ghost">
                    Tìm hiểu thêm
                  </Link>
                  <button type="button" className="btn btn-ghost" onClick={restart}>
                    Hẹn lại từ đầu
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
