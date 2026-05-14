import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Nav      from '../lib/components/Nav';
import Hero     from '../lib/components/Hero';
import Marquee  from '../lib/components/Marquee';
import About    from '../lib/components/About';
import Work     from '../lib/components/Work';
import Skills   from '../lib/components/Skills';
import Contact  from '../lib/components/Contact';
import Footer   from '../lib/components/Footer';
import CvModal  from '../lib/components/CvModal';

// Client-only cursor
const Cursor = dynamic(() => import('../lib/components/Cursor'), { ssr: false });

const SECTIONS = ['about', 'work', 'skills', 'contact'];

export default function Index() {
  const [active,  setActive]  = useState('');
  const [cvOpen,  setCvOpen]  = useState(false);

  // Active nav section tracking
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Joviee · Full-Stack Developer</title>
      </Head>

      <div className="grain" />
      <Cursor />

      <Nav active={active} onCvClick={() => setCvOpen(true)} />
      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />

      <main>
        <Hero     onCvClick={() => setCvOpen(true)} />
        <Marquee />
        <About />
        <Work />
        <Skills />
        <Contact  onCvClick={() => setCvOpen(true)} />
      </main>

      <Footer />
    </>
  );
}
