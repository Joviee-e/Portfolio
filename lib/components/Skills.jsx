import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';
import Constellation from './Constellation';

const SKILLS = [
  { name: 'React / Next.js',           pct: 88 },
  { name: 'Node.js / Express',         pct: 82 },
  { name: 'Python & Machine Learning', pct: 74 },
  { name: 'TypeScript',                pct: 80 },
  { name: 'UI Design & Systems',       pct: 78 },
  { name: 'DevOps & Cloud',            pct: 65 },
];

function Bar({ name, pct, i }) {
  const ref = useRef(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.35 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ padding: '18px 0', borderBottom: '1px solid var(--line-ivory)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr auto', alignItems: 'center', gap: '1.25rem' }}>
        <span className="lbl" style={{ color: 'var(--gold)', fontSize: 9 }}>{String(i + 1).padStart(2, '0')}</span>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>{name}</div>
          <div style={{ height: 2, background: 'rgba(13,11,9,0.09)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--gold), var(--gold-lt))',
              borderRadius: 2,
              width: go ? `${pct}%` : '0%',
              transition: `width 1.5s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`,
            }} />
          </div>
        </div>
        <span className="lbl" style={{ color: 'var(--gold)', fontSize: 10, minWidth: 32, textAlign: 'right' }}>{pct}%</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, vis] = useReveal(0.1);

  return (
    <section id="skills" style={{ background: 'var(--ivory)', position: 'relative', overflow: 'hidden' }}>
      <Constellation dark={false} count={50} />

      <div style={{ position: 'relative', zIndex: 1, padding: '7rem clamp(1.5rem,5.5vw,5rem)' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 22 }}
          animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
            <div className="gr" />
            <span className="lbl" style={{ color: 'var(--gold)', fontSize: 9 }}>Expertise</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(38px,5vw,64px)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            Tools of the<br /><em style={{ fontStyle: 'italic', fontWeight: 600 }}>trade.</em>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 5rem' }} className="skills-grid">
          <div>{SKILLS.slice(0, 3).map((s, i) => <Bar key={s.name} {...s} i={i} />)}</div>
          <div>{SKILLS.slice(3).map((s, i) => <Bar key={s.name} {...s} i={i + 3} />)}</div>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .skills-grid{ grid-template-columns:1fr!important; } }`}</style>
    </section>
  );
}
