import './style.css'

// =============================================================
//  Halaman detail: dark mode + bintang (versi ringkas dari main.js)
// =============================================================
const root = document.documentElement

function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
if (getInitialTheme() === 'dark') root.classList.add('dark')

const starsBox = document.getElementById('stars')
if (starsBox) {
  let html = ''
  for (let i = 0; i < 40; i++) {
    const top = Math.random() * 80
    const left = Math.random() * 100
    const delay = (Math.random() * 3).toFixed(2)
    const size = (Math.random() * 2 + 1.5).toFixed(1)
    html += `<span class="star" style="top:${top}%;left:${left}%;width:${size}px;height:${size}px;animation-delay:${delay}s"></span>`
  }
  starsBox.innerHTML = html
}

const themeToggle = document.getElementById('theme-toggle')
themeToggle?.addEventListener('click', (e) => {
  const goingDark = !root.classList.contains('dark')
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    root.classList.toggle('dark', goingDark)
    localStorage.setItem('theme', goingDark ? 'dark' : 'light')
    return
  }
  const overlay = document.createElement('div')
  overlay.id = 'theme-transition'
  overlay.classList.add(goingDark ? 'to-dark' : 'to-light')
  const x = e.clientX
  const y = e.clientY
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  overlay.style.left = x + 'px'
  overlay.style.top = y + 'px'
  overlay.style.width = r * 2 + 'px'
  overlay.style.height = r * 2 + 'px'
  document.body.appendChild(overlay)
  void overlay.offsetWidth
  overlay.classList.add('run')
  setTimeout(() => {
    root.classList.toggle('dark', goingDark)
    localStorage.setItem('theme', goingDark ? 'dark' : 'light')
  }, 300)
  setTimeout(() => overlay.remove(), 650)
})

const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear()
