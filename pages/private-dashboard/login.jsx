import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Cursor = dynamic(() => import('../../lib/components/Cursor'), { ssr: false });

export default function DashboardLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      window.location.href = '/private-dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head><title>Private Studio Access</title></Head>
      <Cursor />
      <main style={{ minHeight: '100vh', background: 'var(--ink)', display: 'grid', placeItems: 'center', padding: '2rem' }}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div className="grain" />
        </div>

        <motion.form 
          onSubmit={onSubmit} 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            width: '100%', 
            maxWidth: 420, 
            border: '1px solid var(--line-dark)', 
            background: 'rgba(13,11,9,0.95)', 
            padding: '3rem', 
            borderRadius: 3,
            position: 'relative',
            zIndex: 10,
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="lbl" style={{ color: 'var(--gold)', marginBottom: 16, fontSize: 9 }}>Hidden Creative Studio</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, color: 'var(--ivory)', fontWeight: 300, marginBottom: 8, lineHeight: 1.1 }}>Control</h1>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, color: 'var(--gold)', fontWeight: 500, marginBottom: 24, lineHeight: 1.1 }}>Room</h1>
            <p style={{ fontFamily: "'Crimson Pro',serif", color: 'var(--on-dark-mid)', marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>Enter your admin passphrase to access the creative control center.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Passphrase"
                style={{ 
                  width: '100%', 
                  background: 'transparent', 
                  border: 'none', 
                  borderBottom: '1px solid var(--line-dark)', 
                  color: 'var(--ivory)', 
                  padding: '14px 0', 
                  fontFamily: "'Crimson Pro',serif",
                  fontSize: 16,
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--line-dark)'}
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#e8b4b4', fontSize: 13, marginBottom: 16, fontFamily: "'Crimson Pro',serif" }}>
                {error}
              </motion.p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', 
                background: loading ? 'var(--gold-dim)' : 'var(--gold)', 
                color: 'var(--ink)', 
                border: 'none', 
                padding: '13px 20px', 
                fontFamily: "'DM Mono',monospace", 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase', 
                fontSize: 10,
                fontWeight: 500,
                borderRadius: 2,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.background = 'var(--gold-lt)';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.background = 'var(--gold)';
              }}
            >
              {loading ? 'Verifying Passphrase...' : 'Enter Studio'}
            </button>
          </motion.div>
        </motion.form>
      </main>
    </>
  );
}
