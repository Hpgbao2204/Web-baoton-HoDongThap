import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './styles/global.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Listen from './pages/Listen'
import Keepers from './pages/Keepers'
import Research from './pages/Research'
import Library from './pages/Library'
import TryHo from './pages/TryHo'
import Campaign from './pages/Campaign'
import Team from './pages/Team'
import NotFound from './pages/NotFound'

// HashRouter để web chạy được trên mọi hosting tĩnh (GitHub Pages, mở file trực tiếp…)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="kham-pha" element={<Explore />} />
          <Route path="nghe-ho" element={<Listen />} />
          <Route path="nguoi-giu-tieng-ho" element={<Keepers />} />
          <Route path="nghien-cuu" element={<Research />} />
          <Route path="thu-vien" element={<Library />} />
          <Route path="thu-ho" element={<TryHo />} />
          <Route path="hen-ho" element={<Campaign />} />
          <Route path="nam-am" element={<Team />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
