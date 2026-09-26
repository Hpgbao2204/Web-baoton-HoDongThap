import type { Person } from '../data/types'
import { useTilt } from '../hooks/useMotion'

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return parts.slice(-2).map((p) => p[0]).join('')
}

export default function PersonCard({ person, showCode = false }: { person: Person; showCode?: boolean }) {
  const tilt = useTilt<HTMLDivElement>(7)
  return (
    <article className="person" data-reveal>
      {person.photo ? (
        <div className="portrait" ref={tilt}>
          <img src={person.photo} alt={`Ảnh ${person.name}`} loading="lazy" />
        </div>
      ) : (
        <div className="portrait initials" ref={tilt} aria-hidden="true">
          <span>{initials(person.name)}</span>
          <svg viewBox="0 0 200 80" preserveAspectRatio="none">
            <path d="M0 40 C 30 20, 60 60, 100 40 S 170 20, 200 40" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0 58 C 30 40, 60 76, 100 58 S 170 40, 200 58" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          </svg>
        </div>
      )}
      <div className="stack" style={{ gap: 6 }}>
        <p className="role">{person.role}</p>
        <h3>{person.name}</h3>
        {showCode && person.code && <p className="code">{person.code}</p>}
        {person.relationship && <p>{person.relationship}</p>}
        {person.bio && <p>{person.bio}</p>}
        {person.verification && !person.relationship && <p className="muted" style={{ fontSize: '0.82rem' }}>{person.verification}</p>}
      </div>
    </article>
  )
}
