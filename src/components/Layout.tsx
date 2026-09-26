import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { nav, site } from '../data/site'
import { team } from '../data/people'
import { useTheme } from '../hooks/useTheme'
import { BrandMark, IconClose, IconMenu, IconMoon, IconSun } from './icons'

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <>
      <a className="skip" href="#noi-dung">
        Bỏ qua, tới nội dung
      </a>
      <header className="site-header">
        <div className="wrap">
          <Link to="/" className="brand" aria-label={`${site.brand} — Trang chủ`}>
            <BrandMark />
            <span className="brand-text">
              <b>Hẹn Hò</b>
              <small>Đồng Tháp</small>
            </span>
          </Link>
          <nav className={`main-nav ${open ? 'open' : ''}`} aria-label="Điều hướng chính">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-tools">
            <button
              type="button"
              className="icon-btn"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Chuyển sang ban ngày' : 'Chuyển sang đêm trăng'}
              title={theme === 'dark' ? 'Ban ngày' : 'Đêm trăng'}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? 'Đóng menu' : 'Mở menu'}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      <main id="noi-dung" key={pathname} className="page-enter">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="stack">
              <p className="footer-tag">{site.tagline}</p>
              <p className="muted" style={{ maxWidth: '46ch', fontSize: '0.9rem' }}>
                Dự án truyền thông của nhóm {site.team}, góp phần giúp người trẻ nghe, hiểu và có thêm cơ hội tham gia cùng Hò Đồng Tháp.
              </p>
            </div>
            <div>
              <h4>Khám phá</h4>
              <ul>
                {nav.slice(0, 6).map((n) => (
                  <li key={n.to}>
                    <Link to={n.to}>{n.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Nhóm {site.team}</h4>
              <ul>
                {team.map((m) => (
                  <li key={m.id}>
                    <Link to="/nam-am">{m.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © 2026 {site.team} · {site.brand}
            </span>
            <span>Nội dung văn hoá đang được cố vấn chuyên môn rà soát. Mục gắn nhãn "cần xác minh" chưa phải thông tin chính thức.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
