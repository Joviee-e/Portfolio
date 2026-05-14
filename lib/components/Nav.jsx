import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { href: '#about',   label: 'About'   },
  { href: '#work',    label: 'Work'    },
  { href: '#skills',  label: 'Skills'  },
  { href: '#contact', label: 'Contact' },
];

export default function Nav({ active, onCvClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const S = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 700,
      height: 66,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(1.5rem, 5.5vw, 5rem)',
      background: scrolled ? 'rgba(244,234,216,0.93)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(13,11,9,0.08)' : '1px solid transparent',
      transition: 'background .55s ease, border-color .55s ease, backdrop-filter .55s ease',
    },
  };

  return (
    <>
      <motion.nav
        style={S.nav}
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ textDecoration: 'none', lineHeight: 1 }}
        >
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 21, fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--ink)', lineHeight: 1 }}>
            Joviee<span style={{ color: 'var(--gold)' }}>.</span>
          </div>
          <div className="lbl" style={{ color: 'var(--on-ivory-mid)', fontSize: 8, marginTop: 2 }}>Developer</div>
        </a>

        {/* Desktop */}
        <div className="nav-d" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} style={{
              fontFamily: "'DM Mono',monospace", fontSize: 10,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: active === l.href.slice(1) ? 'var(--gold)' : 'var(--on-ivory-mid)',
              textDecoration: 'none', transition: 'color .3s', position: 'relative',
            }}>
              {l.label}
              <span style={{
                position: 'absolute', bottom: -5, left: 0, right: 0,
                height: 1, background: 'var(--gold)',
                transform: active === l.href.slice(1) ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left', transition: 'transform .4s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </a>
          ))}

          {/* CV button */}
          <button
            onClick={onCvClick}
            style={{
              fontFamily: "'DM Mono',monospace", fontSize: 10,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--gold)', border: '1px solid var(--gold-dim)',
              background: 'var(--gold-faint)',
              padding: '8px 18px', borderRadius: 2, cursor: 'pointer',
              transition: 'all .3s', display: 'flex', alignItems: 'center', gap: 7,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ivory)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold-faint)'; e.currentTarget.style.color = 'var(--gold)'; }}
          >
            <span style={{ fontSize: 9 }}>↓</span> Resume
          </button>

          <a href="mailto:yourmail@example.com" style={{
            fontFamily: "'DM Mono',monospace", fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--ivory)', background: 'var(--ink)',
            padding: '9px 22px', borderRadius: 2, textDecoration: 'none',
            transition: 'background .3s',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gold)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--ink)'}
          >
            Hire Me
          </a>
        </div>

        {/* Burger */}
        <button onClick={() => setOpen(!open)} className="nav-b"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: 22, height: 1,
              background: 'var(--ink)', borderRadius: 1,
              transform: open && i === 0 ? 'rotate(45deg) translate(5px,5px)' : open && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
              opacity: open && i === 1 ? 0 : 1, transition: 'all .3s',
            }} />
          ))}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 690, background: 'var(--ivory)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.5rem' }}
          >
            {LINKS.map((l, i) => (
              <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 52, fontWeight: 300, letterSpacing: '-1px', color: 'var(--ink)', textDecoration: 'none' }}
              >{l.label}</motion.a>
            ))}
            <motion.button onClick={onCvClick}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--gold-dim)', background: 'transparent', padding: '10px 28px', borderRadius: 2, cursor: 'pointer', marginTop: '1rem' }}
            >↓ Resume</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
