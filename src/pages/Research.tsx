import { PageHead, SectionHead } from '../components/ui'
import { awareness, barriers, constructs, entryPoints, paths, postExposure, priorKnowledge, process, rSquared, sample } from '../data/research'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useReveal } from '../hooks/useMotion'

/** Sơ đồ S–O–R: độ dày đường nối tỉ lệ với hệ số β. */
function SorDiagram() {
  const w = (b: number) => 1.5 + b * 9
  const pv = Object.fromEntries(paths.map((p) => [p.id, p.beta]))
  const node = (x: number, y: number, wd: number, title: string, sub: string, cls = '') => (
    <g className={`node ${cls}`} transform={`translate(${x} ${y})`}>
      <rect width={wd} height="64" rx="16" strokeWidth="1.2" />
      <text x={wd / 2} y="28" textAnchor="middle" fontSize="15" fontWeight="600">
        {title}
      </text>
      <text x={wd / 2} y="47" textAnchor="middle" className="sub">
        {sub}
      </text>
    </g>
  )
  return (
    <div className="sor-wrap">
      <svg className="sor" viewBox="0 0 900 300" role="img" aria-label="Mô hình S–O–R: S1 tới O β 0,260; S2 tới O β 0,505; O tới R1 β 0,729">
        <path className="edge" d="M250 72 C 310 72, 310 138, 370 138" strokeWidth={w(pv.H1)} />
        <path className="edge" d="M250 228 C 310 228, 310 162, 370 162" strokeWidth={w(pv.H2)} />
        <path className="edge" d="M590 150 L 660 150" strokeWidth={w(pv.H3)} />
        <text className="beta" x="300" y="92">β = .260</text>
        <text className="beta" x="300" y="218">β = .505</text>
        <text className="beta" x="594" y="132">β = .729</text>
        {node(1, 40, 249, 'S1 · Kể chuyện & trình bày', 'Narrative & Media Presentation')}
        {node(1, 196, 249, 'S2 · Tương tác có hướng dẫn', 'Interactive & Guided Participation')}
        <g className="node o" transform="translate(370 70)">
          <rect width="220" height="160" rx="20" strokeWidth="1.2" />
          <text x="110" y="30" textAnchor="middle" fontSize="15" fontWeight="600">
            O · Phản hồi bên trong
          </text>
          <text x="110" y="48" textAnchor="middle" className="sub">
            R² = {rSquared.O.toFixed(3)}
          </text>
          <rect x="18" y="64" width="184" height="36" rx="10" fill="var(--surface)" stroke="var(--line-2)" />
          <text x="110" y="87" textAnchor="middle" fontSize="13">O1 · Thấy liên quan</text>
          <rect x="18" y="108" width="184" height="36" rx="10" fill="var(--surface)" stroke="var(--line-2)" />
          <text x="110" y="131" textAnchor="middle" fontSize="13">O2 · Cộng hưởng cảm xúc</text>
        </g>
        {node(660, 118, 236, 'R1 · Ý định tham gia', `R² = ${rSquared.R1.toFixed(3)}`, 'r')}
      </svg>
    </div>
  )
}

export default function Research() {
  const { theme } = useTheme()
  const root = useReveal<HTMLDivElement>()
  return (
    <div ref={root}>
      <PageHead
        mood={themeMood(theme, 'day')}
        crumb="Nghiên cứu"
        eyebrow="Bằng chứng từ người trẻ"
        title={
          <>
            Người trẻ hôm nay nhìn <i>Hò Đồng Tháp</i> thế nào?
          </>
        }
        lede={`${sample.n} bạn ${sample.age} tuổi đang sống, học tập hoặc làm việc tại ${sample.place}, cùng phỏng vấn chuyên gia và phỏng vấn sâu người trẻ.`}
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <SectionHead eyebrow="Quy trình" title={<>Từ tài liệu tới <i>chiến lược</i></>} />
          <ol className="process" data-reveal>
            {process.map((p) => (
              <li key={p.title}>
                <b>{p.title}</b>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap stat-story">
          <div className="stack" data-reveal>
            <p className="eyebrow">Trước khi nghe</p>
            <h2>Nhận biết còn <i style={{ color: 'var(--lotus-ink)', fontWeight: 500 }}>mờ nhạt</i></h2>
            <div className="hbars">
              {awareness.map((a) => (
                <div className="hbar" key={a.key}>
                  <div className="hbar-top">
                    <span>{a.label}</span>
                    <b>{a.value}%</b>
                  </div>
                  <div className="hbar-track">
                    <div className="hbar-fill" style={{ width: `${a.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="note">
              Trong {priorKnowledge.n} bạn đã nghe hoặc không chắc, {priorKnowledge.value}% {priorKnowledge.label}.
            </p>
          </div>
          <div className="stack" data-reveal>
            <p className="eyebrow">Ngay sau trải nghiệm ngắn</p>
            <h2>Có bối cảnh, <i style={{ color: 'var(--lotus-ink)', fontWeight: 500 }}>nhận ra rõ hơn</i></h2>
            <div className="hbars">
              {postExposure.map((p) => (
                <div className="hbar" key={p.label}>
                  <div className="hbar-top">
                    <span>{p.label}</span>
                    <b>{p.value}%</b>
                  </div>
                  <div className="hbar-track">
                    <div className="hbar-fill" style={{ width: `${p.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="note">Đây là mức hiểu và nhận biết ngay sau trải nghiệm, không phải bằng chứng ghi nhớ lâu dài.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Mô hình S–O–R"
            title={
              <>
                Điều gì liên quan tới <i>ý định tiếp tục?</i>
              </>
            }
            lede="Đường nối càng dày, mối liên hệ trong mô hình càng mạnh. Các con số cho thấy sự liên hệ trong nhóm được khảo sát, không phải quan hệ nhân quả tuyệt đối."
          />
          <div data-reveal>
            <SorDiagram />
          </div>
          <div className="path-list">
            {paths.map((p) => (
              <div className="path-card" key={p.id} data-reveal>
                <span className="h">
                  {p.id} · {p.from} → {p.to} · f² {p.f2} ({p.size})
                </span>
                <span className="b">β {p.beta.toFixed(3).replace(/^0/, '')}</span>
                <p>{p.plain}</p>
              </div>
            ))}
          </div>
          <p className="note" style={{ marginTop: 24 }}>
            Mức hiểu biết ban đầu và các thang đo S1, S2 được đo sau trải nghiệm chuẩn hoá. O1 ({constructs.O1.en}) và O2 ({constructs.O2.en}) khác nhau về khái niệm nhưng
            khá gần nhau về mặt thống kê, nên nhóm dùng thêm phỏng vấn định tính để phân biệt.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap two-col">
          <div className="stack" data-reveal>
            <p className="eyebrow">Rào cản</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)' }}>Vì sao Hò còn xa?</h2>
            <ul className="plain-list">
              {barriers.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="stack" data-reveal>
            <p className="eyebrow">Điểm chạm</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)' }}>Điều người trẻ nhớ</h2>
            <ul className="plain-list">
              {entryPoints.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 48 }}>
          <p className="lede" data-reveal>
            Kết luận cho thiết kế: khả năng tiếp cận một phần là bài toán thiết kế truyền thông. Người trẻ cần mở đầu cuốn hút, đủ bối cảnh, và một cơ hội được đáp lời.
          </p>
        </div>
      </section>
    </div>
  )
}
