const ITEMS = ['Full-Stack Development','Machine Learning','React & Next.js','UI / UX Design','API Architecture','Open Source','Hackathon Driven','Always Iterating'];

export default function Marquee() {
  const set = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(13,11,9,0.1)', borderBottom: '1px solid rgba(13,11,9,0.1)', padding: '15px 0', background: 'var(--ivory-mid)' }}>
      <div className="mq-track">
        {set.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '2.5rem', fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(13,11,9,0.38)', whiteSpace: 'nowrap' }}>
            {item}
            <span style={{ color: 'var(--gold)', fontSize: 6 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
