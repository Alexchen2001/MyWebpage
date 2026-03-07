import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import NavigationBar from './components/Navbar';
import ProfileAvatar from './components/Profilepic';
import ProfileSection from './components/Aboutme';
import AlternateTimeline from './components/Experiencetl';
import Footer from './components/Footer';
import cardData from './components/assets/experience.json';
import FullWidthTabs from './components/Projecttab';
import BlogSection from './components/BlogSection';
import { CardData } from './types'; 
function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const [showIntro, setShowIntro] = useState(true);
  const data: CardData[] = cardData as CardData[]; // // Cast the JSON data to the interface
  const mainRef = useRef<HTMLElement | null>(null);

  const handleNavigate = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 5200);

    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    const mainEl = mainRef.current;
    const revealTargets = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    let observer: IntersectionObserver | null = null;

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        {
          threshold: 0.3,
          root: mainEl,
        }
      );

      revealTargets.forEach((el) => observer?.observe(el));
    } else {
      revealTargets.forEach((el) => el.classList.add('in-view'));
    }

    const updateScroll = () => {
      const scrollY = mainEl?.scrollTop || 0;
      document.documentElement.style.setProperty('--scroll-y', `${scrollY}`);
    };

    const updatePointer = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty('--pointer-x', x.toFixed(3));
      document.documentElement.style.setProperty('--pointer-y', y.toFixed(3));
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
    };

    updateScroll();
    mainEl?.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('mousemove', updatePointer);

    return () => {
      revealTargets.forEach((el) => observer?.unobserve(el));
      observer?.disconnect();
      mainEl?.removeEventListener('scroll', updateScroll);
      window.removeEventListener('mousemove', updatePointer);
    };
  }, []);

  return (
    <div className={`site-shell ${showIntro ? 'intro-active' : ''}`}>
      <div className={`intro-overlay ${showIntro ? 'intro-visible' : 'intro-hidden'}`}>
        <div className="intro-stars" />
        <div className="intro-ring" />
        <h1 className="intro-title">Welcome to Alexander Chen&apos;s Homepage</h1>
        <p className="intro-subtitle">You will be navigating his academic and engineering journey</p>
      </div>
      <div className="bg-stars" />
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <div className="bg-grid" />
      <div className="cursor-glow" />
      <NavigationBar 
      navBarColor="var(--accent-700)"
      onNavigate={handleNavigate}
      themeMode={themeMode}
      onToggleTheme={() => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      />
      <main className="site-main" ref={mainRef}>
        <section id="home" className="page-section hero-section reveal-on-scroll">
          <ProfileAvatar />
        </section>

        <section id="about" className="page-section reveal-on-scroll">
          <ProfileSection
            primaryColor="var(--accent-700)"
            buttonColor="var(--accent-800)"
          />
        </section>

        <section id="experience" className="page-section reveal-on-scroll">
          <AlternateTimeline 
            title="Professional Experience"
            timelineItems={data}
          />
        </section>

        <section id="projects" className="page-section reveal-on-scroll">
          <FullWidthTabs />
        </section>

        <section id="blog" className="page-section reveal-on-scroll">
          <BlogSection />
        </section>

        <section id="contact" className="page-section reveal-on-scroll">
          <Footer />
        </section>
      </main>
    </div>
      
  );
}

export default App;
