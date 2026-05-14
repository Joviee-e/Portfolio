# Joviee Portfolio — Elite Edition 🏛️✦

Premium editorial portfolio. Next.js + Framer Motion + Live GitHub API.

## Aesthetic
- **Palette** — Warm ivory `#f4ead8` base · Near-black `#0d0b09` ink · Gold `#c48740` accent
- **Type** — Cormorant Garamond (display) · Crimson Pro (body) · DM Mono (UI labels)  
- **Effects** — Grain overlay · Constellation canvas · Mouse-follow ambient glow · Custom crosshair cursor
- **Motion** — Framer Motion throughout: staggered hero reveals, scroll-triggered animations, cinematic page feel

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Before Deploying — 5 Things to Change

### 1. Your Name
Search `Joviee` in all files → replace with your name.

### 2. GitHub Username
`components/Work.jsx` line 5:
```js
const GITHUB_USERNAME = 'your-github-username';
```
Also update in `components/Contact.jsx` line 5.

### 3. Your Email
Search `yourmail@example.com` → replace everywhere.

### 4. Your CV/Resume
Drop your PDF into `/public/cv.pdf`
The Resume button and modal will automatically link to it.

### 5. Your Projects
Edit `HIGHLIGHTS` array in `components/Work.jsx`:
- title, tag, year, desc, stack[], link

## Social Links
Edit the socials array in `components/Contact.jsx`:
```js
{ l: 'LinkedIn', h: 'https://linkedin.com/in/yourhandle' },
```

## Sections Order
`pages/index.jsx` controls the page layout.
Reorder or remove sections as needed.

## Deploy to Vercel

```bash
npx vercel
```
Or connect your GitHub repo to vercel.com — zero config needed.

## Customization

| Token | Value | Use |
|-------|-------|-----|
| `--ivory` | `#f4ead8` | Page background |
| `--ink` | `#0d0b09` | Dark sections, text |
| `--gold` | `#c48740` | All accents |

To change accent color: replace `#c48740` and `#d9a968` across globals.css.

## File Structure

```
pages/
  index.jsx        ← Main page
  _app.jsx         ← CSS import
  _document.jsx    ← HTML head
components/
  Cursor.jsx       ← Custom cursor
  Nav.jsx          ← Navigation + CV button
  Hero.jsx         ← Cinematic hero + photo
  About.jsx        ← About + stats
  Work.jsx         ← Projects + GitHub repos
  Skills.jsx       ← Animated skill bars
  Contact.jsx      ← Contact form + socials
  CvModal.jsx      ← Resume download modal
  Constellation.jsx← Star canvas background
  Marquee.jsx      ← Scrolling strip
  Footer.jsx       ← Footer
hooks/
  useReveal.js     ← Scroll intersection hook
styles/
  globals.css      ← All design tokens + animations
public/
  photo.jpg        ← Your photo (already set)
  cv.pdf           ← Add your CV here
  favicon.svg      ← J favicon
```
