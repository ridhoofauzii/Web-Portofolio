import './style.css'

// =============================================================
//  0. DARK MODE (langit siang <-> malam) + animasi transisi
// =============================================================
const root = document.documentElement

// Tema awal: localStorage -> preferensi sistem -> default terang
function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
if (getInitialTheme() === 'dark') root.classList.add('dark')

// Buat taburan bintang untuk tema malam
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

  // Overlay circular reveal dari posisi tombol
  const overlay = document.createElement('div')
  overlay.id = 'theme-transition'
  overlay.classList.add(goingDark ? 'to-dark' : 'to-light')
  const x = e.clientX
  const y = e.clientY
  // radius = jarak terjauh ke sudut layar
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  overlay.style.left = x + 'px'
  overlay.style.top = y + 'px'
  overlay.style.width = r * 2 + 'px'
  overlay.style.height = r * 2 + 'px'
  document.body.appendChild(overlay)

  // Paksa reflow lalu jalankan animasi
  void overlay.offsetWidth
  overlay.classList.add('run')

  // Ganti tema di tengah animasi supaya terasa mulus
  setTimeout(() => {
    root.classList.toggle('dark', goingDark)
    localStorage.setItem('theme', goingDark ? 'dark' : 'light')
  }, 300)

  // Hapus overlay setelah selesai
  setTimeout(() => overlay.remove(), 650)
})

// =============================================================
//  DAFTAR SKILL (tampil sebagai layang-layang, dikelompokkan)
//  logo = URL ikon Devicon. Tambah/edit/hapus sesukamu.
//  Cari ikon lain di: https://devicon.dev
// =============================================================
const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const skillGroups = [
  {
    title: 'Frontend',
    items: [
      { name: 'HTML', logo: `${CDN}/html5/html5-original.svg` },
      { name: 'CSS', logo: `${CDN}/css3/css3-original.svg` },
      { name: 'Tailwind', logo: `${CDN}/tailwindcss/tailwindcss-original.svg` },
      { name: 'JavaScript', logo: `${CDN}/javascript/javascript-original.svg` },
      { name: 'React', logo: `${CDN}/react/react-original.svg` },
      { name: 'Next.js', logo: `${CDN}/nextjs/nextjs-original.svg` },
      { name: 'TypeScript', logo: `${CDN}/typescript/typescript-original.svg` },
      { name: 'Figma', logo: `${CDN}/figma/figma-original.svg` },
    ],
  },
  {
    title: 'Backend & Database',
    items: [
      { name: 'PHP', logo: `${CDN}/php/php-original.svg` },
      { name: 'Node.js', logo: `${CDN}/nodejs/nodejs-original.svg` },
      { name: 'Express', logo: `${CDN}/express/express-original.svg` },
      { name: 'MySQL', logo: `${CDN}/mysql/mysql-original.svg` },
      { name: 'MongoDB', logo: `${CDN}/mongodb/mongodb-original.svg` },
      { name: 'Firebase', logo: `${CDN}/firebase/firebase-plain.svg` },
    ],
  },
]

// =============================================================
//  1. RENDER SKILLS (layang-layang, per grup)
// =============================================================
const skillsWrap = document.getElementById('skills-wrap')
if (skillsWrap) {
  skillsWrap.innerHTML = skillGroups
    .map(
      (group) => `
      <div class="skill-group">
        <h3 class="skill-group-title">${group.title}</h3>
        <div class="kite-row">
          ${group.items
            .map(
              (s) => `
            <div class="kite-item">
              <div class="kite"><img src="${s.logo}" alt="${s.name}" loading="lazy" /></div>
              <div class="kite-tail"></div>
              <div class="kite-label">${s.name}</div>
            </div>`
            )
            .join('')}
        </div>
      </div>`
    )
    .join('')
}

// =============================================================
//  2. FORM KONTAK
//  Belum kirim email. Lihat catatan di index.html untuk Formspree.
// =============================================================
const form = document.getElementById('contactForm')
const toast = document.getElementById('toast')

form?.addEventListener('submit', (e) => {
  e.preventDefault()
  toast?.classList.add('show')
  setTimeout(() => {
    form.reset()
    setTimeout(() => toast?.classList.remove('show'), 2600)
  }, 1400)
})

// =============================================================
//  3. PRATINJAU CV — tampilkan embed jika PDF tersedia
// =============================================================
const cvEmbed = document.getElementById('cvEmbed')
const cvPlaceholder = document.querySelector('.cv-placeholder')

if (cvEmbed && cvPlaceholder) {
  cvEmbed.addEventListener('load', () => {
    cvEmbed.style.display = 'block'
    cvPlaceholder.style.display = 'none'
  })
  cvEmbed.addEventListener('error', () => {
    cvPlaceholder.style.display = 'flex'
  })
}

// =============================================================
//  4. TAHUN OTOMATIS DI FOOTER
// =============================================================
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear()
