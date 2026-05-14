import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Nav from '../lib/components/Nav';
import Hero from '../lib/components/Hero';
import Marquee from '../lib/components/Marquee';
import About from '../lib/components/About';
import Work from '../lib/components/Work';
import Skills from '../lib/components/Skills';
import Contact from '../lib/components/Contact';
import Footer from '../lib/components/Footer';
import CvModal from '../lib/components/CvModal';
import { getPublicPortfolioData } from '../lib/server/portfolioData';

const Cursor = dynamic(() => import('../lib/components/Cursor'), { ssr: false });
const SECTIONS = ['about', 'work', 'skills', 'contact'];

export default function Index({ portfolioData }) {
  const [active, setActive] = useState('');
  const [cvOpen, setCvOpen] = useState(false);

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

  const sectionMap = {
    about: <About key="about" settings={portfolioData.settings} currentStatus={portfolioData.currentStatus} />,
    work: <Work key="work" settings={portfolioData.settings} repos={portfolioData.featuredRepositories} />,
    skills: <Skills key="skills" />,
    contact: <Contact key="contact" onCvClick={() => setCvOpen(true)} socialLinks={portfolioData.socialLinks} currentStatus={portfolioData.currentStatus} />,
  };

  const ordered = (portfolioData.settings.sectionOrder || SECTIONS)
    .filter((id) => sectionMap[id])
    .map((id) => sectionMap[id]);

  return (
    <>
      <Head>
        <title>Joviee - Full-Stack Developer</title>
      </Head>

      <div className="grain" />
      <Cursor />

      <Nav active={active} onCvClick={() => setCvOpen(true)} socialLinks={portfolioData.socialLinks} />
      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} settings={portfolioData.settings} />

      <main>
        <Hero onCvClick={() => setCvOpen(true)} settings={portfolioData.settings} currentStatus={portfolioData.currentStatus} />
        <Marquee />
        {ordered}
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const portfolioData = await getPublicPortfolioData();
  return { props: {
    portfolioData: JSON.parse(JSON.stringify(portfolioData))
  } };
}
