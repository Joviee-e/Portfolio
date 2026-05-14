import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';
import Constellation from './Constellation';

function Icon({ type }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (type === 'github') {
    return (
      <svg {...common}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-6.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5a10.4 10.4 0 0 0-6 0C8 1 7 1 7 1c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 6 8c0 4.5 3 6.5 6 6.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.22-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    );
  }
  if (type === 'linkedin') {
    return (
      <svg {...common}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  if (type === 'instagram') {
    return (
      <svg {...common}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <path d="M17.5 6.5h.01" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

export default function Contact({ onCvClick, socialLinks = {}, currentStatus = {} }) {
  const [ref, vis] = useReveal(0.1);
  const [sent, setSent] = useState(false);

  const availability = (currentStatus?.availability === 'Custom' && currentStatus?.customStatus)
    ? currentStatus.customStatus
    : (currentStatus?.availability || 'Available for Hire');
  const email = socialLinks.email || 'johnjoviyal@gmail.com';
  const github = socialLinks.github || 'https://github.com/Joviee-e';
  const linkedin = socialLinks.linkedin || 'https://www.linkedin.com/in/joviyaljohns/';
  const instagram = socialLinks.instagram || 'https://www.instagram.com/jov.iee_e/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 2px',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--line-dark)',
    outline: 'none',
    color: 'var(--ivory)',
    fontFamily: "'Crimson Pro',serif",
    fontSize: 17,
    transition: 'border-color .3s',
    marginBottom: '0.25rem',
  };

  const socialItems = [
    { l: 'GitHub', h: github, icon: 'github' },
    { l: 'LinkedIn', h: linkedin, icon: 'linkedin' },
    { l: 'Instagram', h: instagram, icon: 'instagram' },
  ].filter((s) => s.h && s.h !== '#');

  return (
    <section id="contact" style={{ background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
      <Constellation dark count={50} />

      <div style={{ position: 'relative', zIndex: 1, padding: '7rem clamp(1.5rem,5.5vw,5rem) 5rem' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 22 }}
          animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
            <div className="gr" />
            <span className="lbl" style={{ color: 'var(--gold)', fontSize: 9 }}>Contact</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(38px,5vw,64px)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--ivory)' }}>
            Start a<br /><em style={{ fontStyle: 'italic', fontWeight: 600 }}>conversation.</em>
          </h2>
        </motion.div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 17, lineHeight: 1.85, color: 'var(--on-dark-mid)', marginBottom: '2.5rem', maxWidth: 380 }}>
              Open to full-time roles, freelance engagements, and interesting collaborations.
              Response within 24 hours, always.
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <div className="lbl" style={{ color: 'var(--gold)', fontSize: 8, marginBottom: 6 }}>Email</div>
              <a
                href={`mailto:${email}`}
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 22,
                  fontWeight: 600,
                  color: 'var(--ivory)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--line-dark)',
                  paddingBottom: 2,
                  transition: 'border-color .3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold-dim)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-dark)'; }}
              >
                {email}
              </a>
            </div>

            <div style={{ height: 1, background: 'var(--line-dark)', marginBottom: '2rem' }}>
              <div style={{ width: 28, height: 1, background: 'var(--gold)' }} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {socialItems.map((s) => (
                <a
                  key={s.l}
                  href={s.h}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.l}
                  style={{
                    width: 40,
                    height: 40,
                    border: '1px solid var(--line-dark)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--on-dark-dim)',
                    textDecoration: 'none',
                    transition: 'color .3s, border-color .3s, transform .3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--gold)';
                    e.currentTarget.style.borderColor = 'var(--gold)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--on-dark-dim)';
                    e.currentTarget.style.borderColor = 'var(--line-dark)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon type={s.icon} />
                </a>
              ))}
            </div>

            <div style={{ padding: '1.25rem 1.5rem', border: '1px solid var(--line-dark)', borderLeft: '2px solid var(--gold)', borderRadius: 2, marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5cb87a' }} />
                <span className="lbl" style={{ color: '#5cb87a', fontSize: 8 }}>{availability}</span>
              </div>
              <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 14, lineHeight: 1.7, color: 'var(--on-dark-mid)' }}>
                Currently accepting new projects and open to full-time positions.
              </p>
            </div>

            <button
              onClick={onCvClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                border: '1px solid var(--gold-dim)',
                background: 'var(--gold-faint)',
                padding: '11px 22px',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all .3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold-faint)'; e.currentTarget.style.color = 'var(--gold)'; }}
            >
              <span>↓</span> Download Resume
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            {sent ? (
              <div style={{ padding: '3rem', border: '1px solid var(--gold-dim)', borderRadius: 3, textAlign: 'center' }}>
                <div className="gr" style={{ margin: '0 auto 1.5rem' }} />
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 600, color: 'var(--ivory)', marginBottom: 8 }}>Message Sent</div>
                <p className="lbl" style={{ color: 'var(--on-dark-mid)', fontSize: 9 }}>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { p: 'Full Name', t: 'text', r: true },
                  { p: 'Email Address', t: 'email', r: true },
                  { p: 'Subject', t: 'text', r: false },
                ].map((f) => (
                  <input
                    key={f.p}
                    type={f.t}
                    placeholder={f.p}
                    required={f.r}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold-dim)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line-dark)'; }}
                  />
                ))}
                <textarea
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  style={{ ...inputStyle, marginTop: '1.25rem', marginBottom: '2rem', resize: 'vertical', lineHeight: 1.7, borderBottom: '1px solid var(--line-dark)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold-dim)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line-dark)'; }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--gold)',
                    color: 'var(--ink)',
                    padding: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    borderRadius: 2,
                    transition: 'opacity .3s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.82'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
