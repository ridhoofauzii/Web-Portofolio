# Web Portofolio

Web portofolio pribadi satu halaman (single-page) yang dibangun dengan **Vite + Tailwind CSS + JavaScript vanilla**.

Fitur:
- Responsive (mobile, tablet, desktop)
- Dark / light mode (tersimpan di `localStorage` + baca preferensi sistem)
- Smooth scroll antar section
- Animasi fade-in saat scroll
- Projects data-driven (edit di satu file)
- Menu hamburger di mobile

## Menjalankan

```bash
npm install      # sekali saja
npm run dev      # mode development (buka URL yang muncul di terminal)
npm run build    # build produksi ke folder dist/
npm run preview  # preview hasil build
```

## Cara Mengganti Konten

### 1. Teks (nama, tagline, about, lokasi, sosial media)
Buka `index.html`. Cari komentar berawalan `GANTI:` — di situ lokasi teks yang perlu kamu ubah:
- Nama & tagline di section Hero
- Paragraf & highlight di section About
- Link GitHub / LinkedIn / Email di section Contact & Footer
- Judul & meta SEO di bagian `<head>`

### 2. Skill
Buka `src/main.js`, edit array `skills` di bagian atas.
Nama ikon bisa dicari di https://fonts.google.com/icons

### 3. Projects
Buka `src/data/projects.js`. Tambah / edit / hapus objek project.
Setiap project otomatis jadi kartu di halaman. Format:

```js
{
  title: 'Judul Project',
  description: 'Deskripsi singkat.',
  image: '/images/project-1.svg', // taruh gambar di public/images/
  tags: ['React', 'Node.js'],
  demo: 'https://link-demo.com',  // kosongkan '' kalau belum ada
  github: 'https://github.com/...' // kosongkan '' kalau belum ada
}
```

### 4. Gambar
Taruh file gambar di `public/images/`, lalu rujuk dengan path `/images/namafile.png`.
- Foto profil: ganti `public/images/profile.svg` (atau ubah `src` di `index.html`)
- Screenshot project: ganti file di `public/images/` sesuai referensi di `projects.js`

### 5. CV / Resume
Taruh file CV kamu di `public/resume.pdf`. Tombol "Download CV" di Hero sudah mengarah ke sana.

### 6. Mengaktifkan Form Kontak (Formspree)
Form saat ini hanya tampilan (belum kirim email). Untuk mengaktifkan:
1. Daftar gratis di https://formspree.io dan buat form baru
2. Salin endpoint (mis. `https://formspree.io/f/xxxxxxx`)
3. Buka `index.html`, cari `<form id="contact-form" ...>` dan ubah jadi:
   ```html
   <form id="contact-form" action="https://formspree.io/f/xxxxxxx" method="POST">
   ```
   (hapus atribut `data-disabled="true"`)

## Deploy Gratis

### Netlify / Vercel (paling gampang)
1. Push project ini ke GitHub.
2. Import repo di https://app.netlify.com atau https://vercel.com
3. Build command: `npm run build` — Publish directory: `dist`
4. Selesai. Otomatis dapat URL.

### GitHub Pages
1. Push ke GitHub.
2. Jalankan `npm run build`.
3. Deploy isi folder `dist/` ke branch `gh-pages` (mis. pakai paket `gh-pages` atau GitHub Actions).
4. `base: './'` di `vite.config.js` sudah disetel agar aman untuk subfolder.

## Struktur

```
index.html            # struktur halaman + konten teks
vite.config.js        # konfigurasi Vite
tailwind.config.js    # tema warna, font, spacing
postcss.config.js
src/
  main.js             # logika: tema, menu, animasi, render skills & projects
  style.css           # entry Tailwind + custom CSS
  data/projects.js    # data project (edit di sini)
public/
  images/             # gambar (profil + project)
  resume.pdf          # CV kamu (tambahkan sendiri)
```
