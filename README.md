# Joviee Portfolio — Editorial Edition ✦

A cinematic full-stack developer portfolio crafted with editorial luxury aesthetics, modern motion design, and dynamic real-time integrations.

Built using Next.js, Framer Motion, MongoDB, GitHub API integration, and a fully dynamic content architecture.

---

## Experience

This portfolio blends:

* editorial typography,
* cinematic interactions,
* atmospheric depth,
* and modern engineering systems

to create a premium digital experience that feels both artistic and technically refined.

Designed with:

* intentional whitespace,
* restrained motion,
* elegant transitions,
* and a subtle celestial-inspired visual language.

---

## Aesthetic System

### Palette

* **Warm Ivory** — `#f4ead8`
* **Near Black / Ink** — `#0d0b09`
* **Muted Gold Accent** — `#c48740`

### Typography

* **Cormorant Garamond** — Display / Editorial Headlines
* **Crimson Pro** — Body Copy
* **DM Mono** — UI Labels & System Elements

### Visual Effects

* Grain texture overlays
* Constellation particle system
* Mouse-follow ambient lighting
* Cinematic gradients
* Custom luxury cursor
* Atmospheric layered depth

### Motion Design

Built with Framer Motion throughout:

* staggered hero reveals
* cinematic section transitions
* smooth hover interactions
* scroll-triggered animations
* refined parallax movement

---

# Tech Stack

* Next.js
* React
* Tailwind CSS
* Framer Motion
* MongoDB Atlas
* GitHub API
* Resend Email API

---

# Features

## Dynamic GitHub Integration

* Fetches live public repositories
* Featured repository system
* Dynamic project rendering
* Repository prioritization support

## Dynamic Resume System

* Real-time resume management
* Latest uploaded CV always served automatically
* MongoDB-backed resume storage

## Live Contact System

* Fully functional contact form
* Real email delivery integration
* Elegant success states
* Production-ready form handling

## Cinematic UI System

* Editorial luxury aesthetic
* Responsive cinematic layout
* Atmospheric interactions
* Smooth premium animations

---

# Quick Start

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# Environment Variables

Create:

```txt
.env.local
```

Add:

```env
MONGODB_URI=your_mongodb_uri

ADMIN_PASSWORD=your_dashboard_password

JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key

CONTACT_EMAIL=your_email_address
```

---

# Before Deploying

## 1. Update Personal Information

Search and replace:

* name
* email
* social links
* descriptions
* metadata

---

## 2. GitHub Username

Update GitHub username inside:

* `components/Work.jsx`
* `components/Contact.jsx`

Example:

```js
const GITHUB_USERNAME = 'your-github-username';
```

---

## 3. Profile Image

Place your image inside:

```txt
/public/profile.jpeg
```

---

## 4. Resume / CV

Upload your resume directly through the portfolio system
or place fallback resume inside:

```txt
/public/resume.pdf
```

---

## 5. Social Links

Update:

* GitHub
* LinkedIn
* Instagram
* Email
* other links

inside:

```txt
components/Contact.jsx
```

---

# Contact System Setup

The contact form uses:

* Resend API
* backend API routes
* secure email delivery

Messages submitted through the portfolio are delivered directly to your configured email address.

---

# File Structure

```txt
pages/
  index.jsx
  _app.jsx
  _document.jsx
  api/
    contact.js
    resume.js

components/
  Cursor.jsx
  Nav.jsx
  Hero.jsx
  About.jsx
  Work.jsx
  Skills.jsx
  Contact.jsx
  CvModal.jsx
  Constellation.jsx
  Marquee.jsx
  Footer.jsx

hooks/
  useReveal.js

lib/
  server/
    mongodb.js
    portfolioData.js

styles/
  globals.css

public/
  profile.jpeg
  favicon.svg
```

---

# Customization

## Design Tokens

| Token     | Value     | Usage         |
| --------- | --------- | ------------- |
| `--ivory` | `#f4ead8` | Backgrounds   |
| `--ink`   | `#0d0b09` | Dark sections |
| `--gold`  | `#c48740` | Accent color  |

---

# Deployment

Deploy easily using:

```bash
npx vercel
```

or connect the repository directly to Vercel for automatic deployment.

---

# Final Vision

This portfolio was designed to feel like:

> a cinematic editorial experience crafted by a thoughtful engineer.

A blend of:

* engineering,
* design,
* motion,
* atmosphere,
* and authenticity.
