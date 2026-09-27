import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DateStage from '../components/DateStage'
import Quiz from '../components/Quiz'
import { PageHead, SectionHead } from '../components/ui'
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
            Chơi cùng <i>Hò Đồng Tháp</i>
          </>
        }
        lede="Hai trò chơi nhỏ: một cuộc hẹn bên sông để hiểu bối cảnh của Hò, và sáu câu hỏi xem bạn đã biết Hò Đồng Tháp đến đâu."
      />

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Trắc nghiệm"
            title={
              <>
                Bạn hiểu Hò Đồng Tháp <i>đến đâu?</i>
              </>
            }
          />
          <Quiz />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Cuộc hẹn bên sông"
            title={
              <>
                Một cuộc hẹn <i>5 phút</i>
              </>
            }
            lede="Nghe một tiếng hò, chọn bối cảnh, đoán ý người hò, rồi gửi lại tiếng lòng của bạn qua sông."
          />
        </div>
        <div className="wrap date-shell">
          <div className="stack">
            <div className="stage">
              <DateStage mood={mood} call={call} canRespond={step === 3 && !responded} onResponded={() => setResponded(true)} resetKey={resetKey} forceHold={keyHold} />
              <p className="stage-hint">
                {step === 3 && !responded
                  ? 'Nhấn giữ trên khung này để gửi tiếng lòng. Kéo lên xuống để đổi độ cao.'
                  : step === 3
                    ? 'Tiếng lòng của bạn đã tới bờ bên kia.'
                    : place
                      ? place.title
                      : 'Người hò trên xuồng · Bến nước bên kia sông'}
              </p>
            </div>
            <p className="note">
              Đây là trò chơi minh hoạ bối cảnh, không phải bài học hò. Muốn học hò, hãy tìm tới các lớp truyền dạy của nghệ nhân ở Đồng Tháp.
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
                    Tiếng hò đã vang sang bờ bên kia. Muốn nghe giọng hò thật, ghé trang Nghe Hò để nghe bản thu của nghệ sĩ Kim Nhụy.
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
                <p className="eyebrow">Bước 4 · Gửi tiếng lòng</p>
                <h3>Gửi lại tiếng lòng của bạn qua sông</h3>
                <p className="lede">
                  Nhấn giữ trên khung sông nước cho tới khi đường của bạn chạm tới người hò. Lên cao hay xuống thấp là tuỳ lòng bạn, như giọng hò lúc cao lúc thấp.
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
                    Giữ để gửi
                  </button>
                </div>
                {responded && (
                  <div className="feedback">
                    Tiếng lòng của bạn đã tới. Hò Đồng Tháp được hò một mình, không có lối hò đối đáp. Người nghe không hò lại, mà đáp bằng sự lắng nghe, và tiếng hò nối người bờ này với người bờ kia.
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
                    <b>Hò Đồng Tháp</b> = một giọng hò + sông nước Tháp Mười + người lắng nghe
                  </p>
                  <p style={{ color: 'var(--ink-2)' }}>
                    Bạn vừa nghe một tiếng gọi {place ? `${place.title.toLowerCase()}` : ''}, đoán ý người hò và gửi lại tiếng lòng. Hơn hai trăm năm trước, những người khai hoang Đồng
                    Tháp Mười cũng nghe nhau qua sông như thế.
                  </p>
                </div>
                <div className="step-actions">
                  <Link to="/nghe-ho" className="btn btn-primary">
                    Nghe giọng hò thật <IconArrow />
                  </Link>
                  <Link to="/cau-chuyen" className="btn btn-ghost">
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
