export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', borderTop: '1px solid var(--line-dark)', padding: '2rem clamp(1.5rem,5.5vw,5rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, fontWeight: 700, color: 'var(--ivory)' }}>
        Joviee<span style={{ color: 'var(--gold)' }}>.</span>
      </div>
      <div className="lbl" style={{ color: 'var(--on-dark-dim)', fontSize: 8 }}>
        © 2026 · Built with Next.js · Deployed on Vercel
      </div>
    </footer>
  );
}
