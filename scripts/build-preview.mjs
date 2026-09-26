// Tạo bản xem trước một file (dùng cho link xem nhanh): gom toàn bộ web vào preview/nam-am.html
import { execSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

execSync('npx vite build --mode single', { stdio: 'inherit' })
const html = readFileSync('dist-single/index.html', 'utf8')
const styles = [...html.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)].map((m) => m[0]).join('\n')
const scripts = [...html.matchAll(/<script[^>]*>[\s\S]*?<\/script>/g)].map((m) => m[0]).join('\n')
const fonts = html.match(/<link rel="stylesheet" href="https:\/\/fonts[^>]+>/)?.[0] ?? ''
const out = `<title>Nam Âm</title>\n${fonts}\n${styles}\n<div id="root"></div>\n${scripts}\n`
mkdirSync('preview', { recursive: true })
writeFileSync('preview/nam-am.html', out)
console.log(`preview/nam-am.html — ${(out.length / 1024).toFixed(0)} KB`)
