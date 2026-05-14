import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';

const STATS = [
  { value: '2 Years',     label: 'Learning &\nBuilding'       },
  { value: '50k+',        label: 'Lines of\nCode Written'     },
  { value: 'Full Stack',  label: 'React · Next.js\n· AI Focus' },
  { value: 'Always',      label: 'Iterating &\nImproving'     },
];

const TAGS = ['Full-Stack Dev', 'React & Next.js', 'AI Enthusiast', 'Open Source Explorer', 'Hackathon Driven', 'Consistent Builder'];

function StatCard({ value, label, delay }) {
  const [ref, vis] = useReveal(0.2);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        background: 'var(--ivory)',
        border: '1px solid var(--line-ivory)',
        borderRadius: 3,
        padding: '1.75rem 1.5rem',
        boxShadow: '0 2px 16px rgba(13,11,9,0.05)',
        transition: 'box-shadow .4s, border-color .4s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(13,11,9,0.1)'; e.currentTarget.style.borderColor = 'var(--gold-dim)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(13,11,9,0.05)'; e.currentTarget.style.borderColor = 'var(--line-ivory)'; }}
    >
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 600, lineHeight: 1, color: 'var(--ink)', marginBottom: 10 }}>
        {value}
      </div>
      <div className="lbl" style={{ color: 'var(--gold)', fontSize: 8, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{label}</div>
    </motion.div>
  );
}

export default function About() {
  const [ref, vis] = useReveal(0.1);

  return (
    <section id="about" style={{ background: 'var(--ivory)', position: 'relative', overflow: 'hidden' }}>
      {/* Dark band top */}
      <div style={{ background: 'var(--ink)', padding: '5rem clamp(1.5rem,5.5vw,5rem)' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.75rem' }}
        >
          <div className="gr" />
          <span className="lbl" style={{ color: 'var(--gold)', fontSize: 9 }}>About</span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="about-grid">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16,1,0.3,1], delay: 0.1 }}
          >
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(38px,5vw,64px)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--ivory)', marginBottom: '1.75rem' }}>
              Precision in every<br /><em style={{ fontStyle: 'italic', fontWeight: 600 }}>line of code.</em>
            </h2>
            <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 18, lineHeight: 1.85, color: 'var(--on-dark)', marginBottom: '1.25rem' }}>
              Developer obsessed with the intersection of engineering rigour and
              design sensibility. I don't just build things that work — I build
              things worth admiring.
            </p>
            <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 18, lineHeight: 1.85, color: 'var(--on-dark-mid)', marginBottom: '2.5rem' }}>
              Currently deep in AI tooling, full-stack systems, and real-world platforms.
              Learning through building. Every commit is intentional.
            </p>

            <div style={{ height: 1, background: 'var(--line-dark)', display: 'flex' }}>
              <div style={{ width: 32, height: 1, background: 'var(--gold)' }} />
            </div>

            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              {[{ l: 'Based in', v: 'India' }, { l: 'Focus', v: 'Full-Stack & AI' }, { l: 'Status', v: 'Building Daily' }].map((item) => (
                <div key={item.l}>
                  <div className="lbl" style={{ color: 'var(--gold)', fontSize: 8, marginBottom: 5 }}>{item.l}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 600, color: 'var(--ivory)' }}>{item.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tags cloud */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16,1,0.3,1], delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.25rem' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {TAGS.map((t) => (
                <span key={t} style={{
                  fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--on-dark-mid)', border: '1px solid var(--line-dark)',
                  padding: '7px 14px', borderRadius: 2,
                  transition: 'border-color .3s, color .3s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold-dim)'; e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-dark)'; e.currentTarget.style.color = 'var(--on-dark-mid)'; }}
                >{t}</span>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', border: '1px solid var(--line-dark)', borderLeft: '2px solid var(--gold)', borderRadius: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5cb87a' }} />
                <span className="lbl" style={{ color: '#5cb87a', fontSize: 8 }}>Currently Building</span>
              </div>
              <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 14, lineHeight: 1.7, color: 'var(--on-dark-mid)' }}>
                Real-world systems — AI tools, hydration analytics, and full-stack platforms. Shipping, not just planning.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats on ivory */}
      <div style={{ padding: '4rem clamp(1.5rem,5.5vw,5rem)', background: 'var(--ivory-mid)' }}>
        <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {STATS.map((s, i) => <StatCard key={i} {...s} delay={i * 0.07} />)}
        </div>
      </div>
    </section>
  );
}
