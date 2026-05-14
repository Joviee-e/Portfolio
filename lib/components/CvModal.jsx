import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function CvModal({ open, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else      document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-bg"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit   ={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--ivory)',
              borderRadius: 4,
              padding: '3.5rem',
              maxWidth: 480,
              width: '100%',
              position: 'relative',
            }}
          >
            {/* Close */}
            <button onClick={onClose} style={{
              position: 'absolute', top: 24, right: 24,
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'DM Mono',monospace", fontSize: 11,
              letterSpacing: '0.2em', color: 'var(--on-ivory-mid)',
            }}>ESC</button>

            {/* Accent line */}
            <div style={{ width: 32, height: 1, background: 'var(--gold)', marginBottom: '2rem' }} />

            <p className="lbl" style={{ color: 'var(--gold)', marginBottom: '1.25rem' }}>Curriculum Vitae</p>

            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 38, fontWeight: 300, letterSpacing: '-1px',
              color: 'var(--ink)', lineHeight: 1.05, marginBottom: '1.25rem',
            }}>
              Joviee's<br /><em style={{ fontStyle: 'italic', fontWeight: 600 }}>Resume</em>
            </h2>

            <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 16, lineHeight: 1.75, color: 'var(--on-ivory)', marginBottom: '2.5rem' }}>
              Full-stack developer focused on React, Next.js, and AI-powered systems.
              Actively building, learning, and shipping real-world projects.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {/* Download button — replace href with your actual CV file */}
              <a
                href="/cv.pdf"
                download="Joviee_CV.pdf"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: "'DM Mono',monospace", fontSize: 10,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'var(--ivory)', background: 'var(--ink)',
                  padding: '13px 28px', borderRadius: 2, textDecoration: 'none',
                  transition: 'background .3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gold)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--ink)'}
              >
                <span>↓</span> Download CV
              </a>
              <button onClick={onClose} style={{
                fontFamily: "'DM Mono',monospace", fontSize: 10,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--on-ivory-mid)', background: 'transparent',
                border: '1px solid var(--on-ivory-dim)', padding: '13px 24px',
                borderRadius: 2, cursor: 'pointer', transition: 'border-color .3s, color .3s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--on-ivory-dim)'; e.currentTarget.style.color = 'var(--on-ivory-mid)'; }}
              >
                Close
              </button>
            </div>

            <p style={{ marginTop: '1.75rem', fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '0.2em', color: 'var(--on-ivory-mid)', textTransform: 'uppercase' }}>
              Place your cv.pdf in the /public folder
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
