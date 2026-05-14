import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Cursor = dynamic(() => import('../../lib/components/Cursor'), { ssr: false });

const STATUS_OPTIONS = ['Available', 'Busy', 'Learning', 'Open to Collaborations', 'Custom'];

const Toast = ({ message, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'var(--gold)',
            color: 'var(--ink)',
            padding: '12px 20px',
            borderRadius: 2,
            fontFamily: "'DM Mono',monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            zIndex: 10000,
            boxShadow: '0 10px 28px rgba(13,11,9,0.12)',
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function PrivateDashboard() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [activeTab, setActiveTab] = useState('status');

  useEffect(() => {
    fetch('/api/dashboard/settings').then((r) => r.json()).then(setData);
  }, []);

  const repoMap = useMemo(() => {
    if (!data?.repoPreferences) return new Map();
    return new Map(data.repoPreferences.map((r) => [r.name, r]));
  }, [data]);

  if (!data) {
    return (
      <>
        <Cursor />
        <main style={{ minHeight: '100vh', background: 'var(--ivory)', color: 'var(--ink)', display: 'grid', placeItems: 'center', padding: '2rem' }}>
          <div className="grain" style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <p className="lbl" style={{ color: 'var(--gold)', marginBottom: 12, fontSize: 9 }}>Loading</p>
            <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 16, color: 'var(--on-ivory)' }}>Initializing your studio...</p>
          </motion.div>
        </main>
      </>
    );
  }

  async function saveAll() {
    setSaving(true);
    setNotice('');
    try {
      const res = await fetch('/api/dashboard/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: data.settings,
          currentStatus: data.currentStatus,
          socialLinks: data.socialLinks,
          repoPreferences: data.repoPreferences,
        }),
      });
      const out = await res.json();
      if (res.ok) {
        setData(out.data);
        setNotice('Studio synced');
        setTimeout(() => setNotice(''), 1600);
      } else {
        setNotice('Save failed');
        setTimeout(() => setNotice(''), 1600);
      }
    } finally {
      setSaving(false);
    }
  }

  async function uploadResume(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('resume', file);
    const res = await fetch('/api/dashboard/resume', { method: 'POST', body: fd });
    if (res.ok) {
      const latest = await fetch('/api/dashboard/settings').then((r) => r.json());
      setData(latest);
      setNotice('Resume uploaded');
    } else {
      setNotice('Resume upload failed');
    }
    setTimeout(() => setNotice(''), 1800);
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/private-dashboard/login';
  }

  const TabButton = ({ name, label }) => (
    <motion.button
      onClick={() => setActiveTab(name)}
      style={{
        background: activeTab === name ? 'var(--gold)' : 'transparent',
        color: activeTab === name ? 'var(--ink)' : 'var(--on-ivory)',
        border: '1px solid ' + (activeTab === name ? 'var(--gold)' : 'var(--line-ivory)'),
        padding: '10px 16px',
        borderRadius: 2,
        fontFamily: "'DM Mono',monospace",
        fontSize: 10,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
      whileHover={{ background: activeTab === name ? 'var(--gold-lt)' : 'rgba(13,11,9,0.05)' }}
    >
      {label}
    </motion.button>
  );

  const InputField = ({ label, value, onChange, type = 'text', placeholder = '' }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' }}>{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'rgba(13,11,9,0.025)',
          border: '1px solid var(--line-ivory)',
          borderRadius: 2,
          color: 'var(--ink)',
          padding: '12px 14px',
          fontFamily: "'Crimson Pro',serif",
          fontSize: 15,
          outline: 'none',
          transition: 'all 0.3s',
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--line-ivory)'}
      />
    </motion.div>
  );

  const TextAreaField = ({ label, value, onChange, rows = 4 }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' }}>{label}</label>
      <textarea
        value={value || ''}
        onChange={onChange}
        rows={rows}
        style={{
          width: '100%',
          background: 'rgba(13,11,9,0.025)',
          border: '1px solid var(--line-ivory)',
          borderRadius: 2,
          color: 'var(--ink)',
          padding: '12px 14px',
          fontFamily: "'Crimson Pro',serif",
          fontSize: 15,
          outline: 'none',
          transition: 'all 0.3s',
          resize: 'vertical',
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--line-ivory)'}
      />
    </motion.div>
  );

  return (
    <>
      <Head><title>Private Studio</title></Head>
      <Cursor />
      <main style={{ minHeight: '100vh', background: 'var(--ivory)', color: 'var(--ink)' }}>
        <div className="grain" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: 'clamp(2rem, 6vw, 3.5rem)' }}>
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'clamp(2rem, 8vw, 4rem)', borderBottom: '1px solid var(--line-ivory)', paddingBottom: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
            <div>
              <p className="lbl" style={{ color: 'var(--gold)', fontSize: 9, marginBottom: 10 }}>Creative Control Center</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(36px, 6vw, 52px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.2 }}>Your Studio</h1>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <motion.button
                onClick={saveAll}
                disabled={saving}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: saving ? 'var(--gold-dim)' : 'var(--gold)',
                  color: 'var(--ink)',
                  border: 'none',
                  padding: '11px 18px',
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: 2,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                {saving ? 'Syncing...' : 'Sync Studio'}
              </motion.button>
              <motion.button
                onClick={logout}
                whileHover={{ background: 'rgba(13,11,9,0.06)' }}
                style={{
                  border: '1px solid var(--line-ivory)',
                  background: 'transparent',
                  color: 'var(--on-ivory)',
                  padding: '11px 18px',
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                Exit
              </motion.button>
            </div>
          </motion.div>

          <Toast message={notice} show={!!notice} />

          {/* Tabs */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: 'flex', gap: 8, marginBottom: 'clamp(2rem, 6vw, 3rem)', flexWrap: 'wrap' }}>
            <TabButton name="status" label="Status" />
            <TabButton name="content" label="Content" />
            <TabButton name="repos" label="Repositories" />
            <TabButton name="socials" label="Socials" />
            <TabButton name="resume" label="Resume" />
          </motion.div>

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {/* STATUS TAB */}
            {activeTab === 'status' && (
              <motion.div key="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.4 }}>
                <div style={{ border: '1px solid var(--line-ivory)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: 2, marginBottom: 20 }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: 'var(--ink)', marginBottom: 24, fontWeight: 400 }}>Availability Status</h2>
                  
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' }}>Your Status</label>
                    <select
                      value={data.currentStatus.availability}
                      onChange={(e) => setData((d) => ({ ...d, currentStatus: { ...d.currentStatus, availability: e.target.value } }))}
                      style={{
                        width: '100%',
                        background: 'rgba(13,11,9,0.025)',
                        border: '1px solid var(--line-ivory)',
                        borderRadius: 2,
                        color: 'var(--ink)',
                        padding: '12px 14px',
                        fontFamily: "'Crimson Pro',serif",
                        fontSize: 15,
                        outline: 'none',
                        cursor: 'pointer',
                        marginBottom: 20,
                        transition: 'all 0.3s',
                      }}
                    >
                      {STATUS_OPTIONS.map((opt) => <option key={opt} value={opt} style={{ background: 'var(--ivory)' }}>{opt}</option>)}
                    </select>
                  </motion.div>

                  {data.currentStatus.availability === 'Custom' && (
                    <InputField
                      label="Custom Status"
                      value={data.currentStatus.customStatus}
                      onChange={(e) => setData((d) => ({ ...d, currentStatus: { ...d.currentStatus, customStatus: e.target.value } }))}
                      placeholder="e.g., Taking on select projects"
                    />
                  )}

                  <TextAreaField
                    label="Current Focus"
                    value={data.settings.currentFocus}
                    onChange={(e) => setData((d) => ({ ...d, settings: { ...d.settings, currentFocus: e.target.value } }))}
                    rows={3}
                  />

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <h3 style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 12, textTransform: 'uppercase', marginTop: 20 }}>Currently</h3>
                    {['building', 'learning', 'exploring'].map((k, idx) => (
                      <motion.div key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.1 }} style={{ marginBottom: 14 }}>
                        <label style={{ display: 'block', fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'var(--on-ivory)', letterSpacing: '0.05em', marginBottom: 6, textTransform: 'capitalize' }}>Currently {k}</label>
                        <input
                          value={(data.settings.currently?.[k] || []).join(' | ')}
                          onChange={(e) => setData((d) => ({ ...d, settings: { ...d.settings, currently: { ...d.settings.currently, [k]: e.target.value.split('|').map((x) => x.trim()).filter(Boolean) } } }))}
                          placeholder="Separate with | for multiple items"
                          style={{
                            width: '100%',
                            background: 'rgba(13,11,9,0.018)',
                            border: '1px solid var(--line-ivory)',
                            borderRadius: 2,
                            color: 'var(--ink)',
                            padding: '10px 12px',
                            fontFamily: "'Crimson Pro',serif",
                            fontSize: 14,
                            outline: 'none',
                            transition: 'all 0.3s',
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                          onBlur={(e) => e.target.style.borderColor = 'var(--line-ivory)'}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* CONTENT TAB */}
            {activeTab === 'content' && (
              <motion.div key="content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.4 }}>
                <div style={{ border: '1px solid var(--line-ivory)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: 2 }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: 'var(--ink)', marginBottom: 24, fontWeight: 400 }}>Portfolio Content</h2>
                  
                  <TextAreaField
                    label="Hero Subtitle"
                    value={data.settings.heroSubtitle}
                    onChange={(e) => setData((d) => ({ ...d, settings: { ...d.settings, heroSubtitle: e.target.value } }))}
                    rows={3}
                  />

                  <TextAreaField
                    label="About Snippet"
                    value={data.settings.aboutSnippet}
                    onChange={(e) => setData((d) => ({ ...d, settings: { ...d.settings, aboutSnippet: e.target.value } }))}
                    rows={3}
                  />
                </div>
              </motion.div>
            )}

            {/* REPOS TAB */}
            {activeTab === 'repos' && (
              <motion.div key="repos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.4 }}>
                <div style={{ border: '1px solid var(--line-ivory)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: 2 }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: 'var(--ink)', marginBottom: 24, fontWeight: 400 }}>GitHub Repositories</h2>
                  
                  <InputField
                    label="GitHub Username"
                    value={data.settings.githubUsername}
                    onChange={(e) => setData((d) => ({ ...d, settings: { ...d.settings, githubUsername: e.target.value } }))}
                    placeholder="e.g., username"
                  />

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'var(--on-ivory)', letterSpacing: '0.1em', marginBottom: 16, textTransform: 'uppercase' }}>Repositories ({(data.githubRepos || []).length})</p>
                    <div style={{ display: 'grid', gap: 12 }}>
                      {(data.githubRepos || []).length === 0 ? (
                        <p style={{ color: 'var(--on-ivory-mid)', fontFamily: "'Crimson Pro',serif", fontSize: 14 }}>No repositories found. Add your GitHub username above.</p>
                      ) : (
                        (data.githubRepos || []).map((repo, idx) => {
                          const pref = repoMap.get(repo.name) || { preferred: false, hidden: false, order: idx };
                          return (
                            <motion.div
                              key={repo.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              style={{
                                border: '1px solid var(--line-ivory)',
                                padding: 14,
                                borderRadius: 2,
                                background: pref.hidden ? 'rgba(232, 180, 180, 0.04)' : 'rgba(13,11,9,0.018)',
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <h3 style={{ fontFamily: "'Crimson Pro',serif", fontSize: 16, color: pref.hidden ? 'var(--on-ivory-mid)' : 'var(--ivory)' }}>{repo.name}</h3>
                                {repo.stargazers_count > 0 && (
                                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'var(--gold)', letterSpacing: '0.05em' }}>⭐ {repo.stargazers_count}</span>
                                )}
                              </div>
                              {repo.description && (
                                <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 13, color: 'var(--on-ivory)', marginBottom: 12 }}>{repo.description}</p>
                              )}
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: "'Crimson Pro',serif", fontSize: 13, color: 'var(--on-ivory)' }}>
                                  <input
                                    type="checkbox"
                                    checked={pref.preferred}
                                    onChange={(e) => {
                                      const next = [...data.repoPreferences.filter((r) => r.name !== repo.name), { ...pref, name: repo.name, preferred: e.target.checked }];
                                      setData((d) => ({ ...d, repoPreferences: next }));
                                    }}
                                    style={{ cursor: 'pointer', accentColor: 'var(--gold)' }}
                                  />
                                  Featured
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: "'Crimson Pro',serif", fontSize: 13, color: 'var(--on-ivory)' }}>
                                  <input
                                    type="checkbox"
                                    checked={pref.hidden}
                                    onChange={(e) => {
                                      const next = [...data.repoPreferences.filter((r) => r.name !== repo.name), { ...pref, name: repo.name, hidden: e.target.checked }];
                                      setData((d) => ({ ...d, repoPreferences: next }));
                                    }}
                                    style={{ cursor: 'pointer', accentColor: 'var(--gold)' }}
                                  />
                                  Hidden
                                </label>
                                <input
                                  type="number"
                                  value={pref.order}
                                  onChange={(e) => {
                                    const next = [...data.repoPreferences.filter((r) => r.name !== repo.name), { ...pref, name: repo.name, order: Number(e.target.value) }];
                                    setData((d) => ({ ...d, repoPreferences: next }));
                                  }}
                                  placeholder="Order"
                                  style={{
                                    background: 'transparent',
                                    border: '1px solid var(--line-ivory)',
                                    borderRadius: 2,
                                    color: 'var(--ink)',
                                    padding: '6px 8px',
                                    fontFamily: "'DM Mono',monospace",
                                    fontSize: 11,
                                    outline: 'none',
                                    transition: 'all 0.3s',
                                  }}
                                />
                              </div>
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* SOCIALS TAB */}
            {activeTab === 'socials' && (
              <motion.div key="socials" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.4 }}>
                <div style={{ border: '1px solid var(--line-ivory)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: 2 }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: 'var(--ink)', marginBottom: 24, fontWeight: 400 }}>Social Links</h2>
                  
                  {['github', 'linkedin', 'email', 'instagram', 'twitter'].map((k, idx) => (
                    <motion.div key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                      <InputField
                        label={k.charAt(0).toUpperCase() + k.slice(1)}
                        value={data.socialLinks[k]}
                        onChange={(e) => setData((d) => ({ ...d, socialLinks: { ...d.socialLinks, [k]: e.target.value } }))}
                        placeholder={`Your ${k} profile URL or email`}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RESUME TAB */}
            {activeTab === 'resume' && (
              <motion.div key="resume" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.4 }}>
                <div style={{ border: '1px solid var(--line-ivory)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: 2 }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: 'var(--ink)', marginBottom: 24, fontWeight: 400 }}>Resume</h2>
                  
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 14, color: 'var(--on-ivory)', marginBottom: 16, lineHeight: 1.6 }}>Upload a single PDF resume. Only one resume is active at a time — uploading a new one automatically replaces the previous one.</p>
                    
                    <label style={{ display: 'inline-block', border: '2px dashed var(--line-ivory)', borderRadius: 2, padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', width: '100%' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line-ivory)'}>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={uploadResume}
                        style={{ display: 'none' }}
                      />
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' }}>Select Resume</p>
                      <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 14, color: 'var(--on-ivory)' }}>Click to upload PDF</p>
                    </label>

                    {data.resumeMeta && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginTop: 20, padding: 14, background: 'rgba(196,135,64,0.08)', border: '1px solid var(--gold-dim)', borderRadius: 2 }}>
                        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 6, textTransform: 'uppercase' }}>Active Resume</p>
                        <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 15, color: 'var(--ink)' }}>{data.resumeMeta.filename}</p>
                        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: 'var(--on-ivory)', marginTop: 8, letterSpacing: '0.05em' }}>Uploaded: {new Date(data.resumeMeta.uploadedAt).toLocaleDateString()}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </>
  );
}

