import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Constellation from './Constellation';

const WORDS = ['Excellence', 'Precision', 'Craft', 'Vision', 'Depth'];

function useTyping(words) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    let t;

    if (!del && text.length < word.length) {
      t = setTimeout(() => setText(word.slice(0, text.length + 1)), 82);
    } else if (!del && text.length === word.length) {
      t = setTimeout(() => setDel(true), 2200);
    } else if (del && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 44);
    } else {
      setDel(false);
      setIdx((i) => i + 1);
    }

    return () => clearTimeout(t);
  }, [text, del, idx, words]);

  return text;
}

export default function Hero({ onCvClick, settings, currentStatus }) {
  const typed = useTyping(WORDS);
  const availability = (currentStatus?.availability === 'Custom' && currentStatus?.customStatus)
    ? currentStatus.customStatus
    : (currentStatus?.availability || 'Open to Work');

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const fn = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', fn, { passive: true });
    return () => window.removeEventListener('mousemove', fn);
  }, [mx, my]);

  return (
    <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--ivory)' }}>
      <Constellation dark={false} count={60} />

      <motion.div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,135,64,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      <div
        className="hero-grid"
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'center',
          padding: '6rem clamp(1.5rem,5.5vw,5rem) 4rem',
        }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '2.75rem' }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#5cb87a', boxShadow: '0 0 6px #5cb87a88' }} />
            <span className="lbl" style={{ color: 'var(--on-ivory-mid)', fontSize: 9 }}>{availability}</span>
          </motion.div>

          {['Crafting', 'Digital'].map((word, i) => (
            <div key={word} style={{ overflow: 'hidden', marginBottom: '0.15em' }}>
              <motion.h1
                className="disp"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i === 0 ? 0.6 : 0.72 }}
                style={{
                  fontSize: 'clamp(62px,9vw,130px)',
                  fontWeight: i === 0 ? 300 : 600,
                  fontStyle: i === 0 ? 'normal' : 'italic',
                  color: 'var(--ink)',
                }}
              >
                {word}
              </motion.h1>
            </div>
          ))}

          <div style={{ overflow: 'hidden', marginBottom: '2.5rem' }}>
            <motion.h1
              className="disp"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.84 }}
              style={{ fontSize: 'clamp(62px,9vw,130px)', fontWeight: 300, color: 'var(--ink)', display: 'flex', alignItems: 'baseline', gap: '0.2em' }}
            >
              <span style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-lt) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {typed}
                <span style={{ display: 'inline-block', width: 3, height: '0.75em', background: 'var(--gold)', marginLeft: 3, verticalAlign: 'middle', animation: 'blink 0.9s step-end infinite' }} />
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
            style={{ fontFamily: "'Crimson Pro',serif", fontSize: 'clamp(16px,1.7vw,19px)', lineHeight: 1.8, color: 'var(--on-ivory)', maxWidth: 420, marginBottom: '2.75rem' }}
          >
            {settings?.heroSubtitle || 'Full-stack developer building aesthetic, precise, and impactful web systems where engineering rigour meets design sensibility.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a
              href="#work"
              style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ivory)', background: 'var(--ink)', padding: '13px 30px', borderRadius: 2, textDecoration: 'none', transition: 'background .3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; }}
            >
              View Work
            </a>

            <button
              onClick={onCvClick}
              style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--gold-dim)', background: 'var(--gold-faint)', padding: '13px 24px', borderRadius: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, transition: 'all .3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ivory)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold-faint)'; e.currentTarget.style.color = 'var(--gold)'; }}
            >
              <span style={{ fontSize: 9 }}>↓</span> Resume
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
            <div style={{ position: 'absolute', inset: '-10px', border: '1px solid var(--gold-dim)', borderRadius: 4, zIndex: 0 }} />
            <div style={{ position: 'absolute', top: -2, right: -2, width: 48, height: 1, background: 'var(--gold)', zIndex: 3 }} />
            <div style={{ position: 'absolute', top: -2, right: -2, width: 1, height: 48, background: 'var(--gold)', zIndex: 3 }} />

            <div style={{ position: 'relative', borderRadius: 3, overflow: 'hidden', aspectRatio: '3/4', zIndex: 1 }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(244,234,216,0.06) 0%, rgba(196,135,64,0.08) 100%)', mixBlendMode: 'multiply' }} />
              <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(160deg, transparent 40%, rgba(196,135,64,0.12) 100%)' }} />
              <Image
                src="/profile.jpeg"
                alt="Joviee"
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'sepia(8%) contrast(1.04) brightness(1.02)' }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', bottom: 18, left: -24, background: 'var(--ink)', padding: '12px 20px', borderRadius: 2, zIndex: 4 }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 600, color: 'var(--ivory)', letterSpacing: '-0.3px' }}>Joviee</div>
              <div className="lbl" style={{ color: 'var(--gold)', fontSize: 8, marginTop: 2 }}>Full-Stack Developer</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
      >
        <div style={{ width: 1, height: 50, background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        <span className="lbl" style={{ color: 'var(--on-ivory-mid)', fontSize: 8 }}>Scroll</span>
      </motion.div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}
