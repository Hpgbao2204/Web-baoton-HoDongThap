import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './styles/global.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Story from './pages/Story'
import Artists from './pages/Artists'
import ArtistDetail from './pages/ArtistDetail'
import Listen from './pages/Listen'
import Press from './pages/Press'
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
          <Route path="cau-chuyen" element={<Story />} />
          <Route path="nghe-si" element={<Artists />} />
          <Route path="nghe-si/:id" element={<ArtistDetail />} />
          <Route path="nghe-ho" element={<Listen />} />
          <Route path="sach-bao" element={<Press />} />
          <Route path="thu-ho" element={<TryHo />} />
          <Route path="hoat-dong" element={<Campaign />} />
          <Route path="ve-nam-am" element={<Team />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
