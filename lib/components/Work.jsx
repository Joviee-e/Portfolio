import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';

const FALLBACK_HIGHLIGHTS = [
  {
    idx: '01',
    title: 'AI Network Analyzer',
    tag: 'Machine Learning',
    year: '2025',
    large: true,
    desc: 'ML-based anomaly detection engine built on Wireshark datasets. Real-time packet classification with a custom neural pipeline and interactive monitoring dashboards.',
    stack: ['Python', 'TensorFlow', 'Wireshark', 'Flask', 'D3.js'],
    link: '#',
  },
  {
    idx: '02',
    title: 'Hydra',
    tag: 'Health Tech',
    year: '2025',
    large: false,
    desc: 'Smart hydration tracking with push reminders, streak analytics, and a waveform-based dashboard. Built for real habit formation, not feature bloat.',
    stack: ['React Native', 'Node.js', 'Firebase'],
    link: '#',
  },
  {
    idx: '03',
    title: 'ContentSync',
    tag: 'AI Platform',
    year: '2024',
    large: false,
    desc: 'Upload, transcribe, and semantically search your entire knowledge base. AI-powered notes and video summarization at your fingertips.',
    stack: ['Next.js', 'OpenAI', 'Supabase', 'Whisper'],
    link: '#',
  },
];

function repoToProject(repo, index) {
  const topics = Array.isArray(repo.topics) ? repo.topics : [];
  return {
    idx: String(index + 1).padStart(2, '0'),
    title: repo.name,
    tag: repo.language || topics[0] || 'Repository',
    year: repo.updated_at ? new Date(repo.updated_at).getFullYear().toString() : 'Live',
    large: index === 0,
    desc: repo.description || 'Public GitHub repository, refined through steady iteration and practical engineering.',
    stack: [repo.language, ...topics].filter(Boolean).slice(0, 5),
    link: repo.html_url,
  };
}

function ProjectCard({ idx, title, tag, year, large, desc, stack, link }) {
  const [hov, setHov] = useState(false);
  const [ref, vis] = useReveal(0.1);

  return (
    <motion.a
      ref={ref}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, y: 22 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        background: hov ? 'var(--ink-soft)' : 'var(--ink)',
        border: `1px solid ${hov ? 'var(--gold-dim)' : 'var(--line-dark)'}`,
        borderRadius: 3,
        padding: large ? '2.5rem' : '2rem',
        transition: 'background .45s, border-color .45s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: hov ? 68 : 0, height: 1, background: 'var(--gold)', transition: 'width .45s cubic-bezier(0.16,1,0.3,1)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, height: hov ? 68 : 0, width: 1, background: 'var(--gold)', transition: 'height .45s cubic-bezier(0.16,1,0.3,1) .05s' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: large ? '1.75rem' : '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: large ? 52 : 40, fontWeight: 300, color: hov ? 'var(--gold)' : 'var(--gold-dim)', lineHeight: 1, transition: 'color .3s' }}>{idx}</span>
          <span className="lbl" style={{ color: hov ? 'var(--gold)' : 'var(--on-dark-dim)', fontSize: 9, transition: 'color .3s' }}>{tag}</span>
        </div>
        <span className="lbl" style={{ color: 'var(--on-dark-dim)', fontSize: 9 }}>{year}</span>
      </div>

      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: large ? 'clamp(26px,3vw,38px)' : 'clamp(22px,2.5vw,30px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.5px', color: 'var(--ivory)', marginBottom: '1rem' }}>
        {title}
      </h3>

      <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 16, lineHeight: 1.8, color: 'var(--on-dark-mid)', marginBottom: '1.5rem', maxWidth: 500 }}>{desc}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.5rem' }}>
        {(stack?.length ? stack : ['Code']).map((t) => (
          <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '5px 11px', border: '1px solid var(--line-dark)', borderRadius: 2, color: 'var(--on-dark-dim)' }}>{t}</span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>
        <span>View Repository</span>
        <div style={{ width: hov ? 38 : 12, height: 1, background: 'var(--gold)', transition: 'width .4s cubic-bezier(0.16,1,0.3,1)' }} />
        <span style={{ fontSize: 10 }}>→</span>
      </div>
    </motion.a>
  );
}

function RepoCard({ repo, delay }) {
  const [hov, setHov] = useState(false);
  const [ref, vis] = useReveal(0.1);
  const updated = repo.updated_at ? new Date(repo.updated_at).getFullYear() : null;

  return (
    <motion.a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, y: 18 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        background: hov ? 'var(--ink-soft)' : 'var(--ink)',
        border: `1px solid ${hov ? 'var(--gold-dim)' : 'var(--line-dark)'}`,
        borderRadius: 3,
        padding: '1.5rem',
        transition: 'background .4s, border-color .4s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="lbl" style={{ color: 'var(--gold)', fontSize: 8 }}>{repo.language || 'Code'}</span>
        <span className="lbl" style={{ color: 'var(--on-dark-dim)', fontSize: 8 }}>
          {repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : updated || ''}
        </span>
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 600, color: 'var(--ivory)', marginBottom: 8, lineHeight: 1.2 }}>{repo.name}</div>
      <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 13, lineHeight: 1.65, color: 'var(--on-dark-mid)' }}>{repo.description || 'No description provided.'}</div>
    </motion.a>
  );
}

export default function Work({ settings, repos = [] }) {
  const [headerRef, headerVis] = useReveal(0.1);
  const username = settings?.githubUsername || 'Joviee-e';

  const projects = useMemo(() => {
    const visibleRepos = Array.isArray(repos) ? repos.filter((repo) => repo?.html_url) : [];
    if (visibleRepos.length >= 3) return visibleRepos.slice(0, 3).map(repoToProject);
    return FALLBACK_HIGHLIGHTS;
  }, [repos]);

  const openSourceRepos = Array.isArray(repos) ? repos.slice(3, 7) : [];

  return (
    <section id="work" style={{ background: 'var(--ink)', padding: '7rem clamp(1.5rem,5.5vw,5rem)' }}>
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 22 }}
        animate={headerVis ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: '3.5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
          <div className="gr" />
          <span className="lbl" style={{ color: 'var(--gold)', fontSize: 9 }}>{settings?.sectionLabels?.work || 'Selected Work'}</span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(38px,5vw,64px)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--ivory)' }}>
          Projects that<br /><em style={{ fontStyle: 'italic', fontWeight: 600 }}>define craft.</em>
        </h2>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 1 }}>
        <ProjectCard {...projects[0]} />
        <div className="proj-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          {projects.slice(1).map((p) => <ProjectCard key={p.idx} {...p} />)}
        </div>
      </div>

      <div style={{ marginTop: '5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <span className="lbl" style={{ color: 'var(--on-dark-dim)', fontSize: 8 }}>Open Source</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line-dark)' }} />
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="lbl" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: 8 }}>View All →</a>
        </div>

        {openSourceRepos.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 1 }}>
            {openSourceRepos.map((r, i) => <RepoCard key={r.id || r.name} repo={r} delay={i * 0.06} />)}
          </div>
        ) : (
          <p className="lbl" style={{ color: 'var(--on-dark-dim)', fontSize: 10 }}>
            GitHub repositories will appear here when available.
          </p>
        )}
      </div>
    </section>
  );
}
