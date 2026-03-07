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
import IntroOverlay from './components/common/IntroOverlay';
import { usePageEffects } from './hooks/usePageEffects';
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
    const introTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 5200);

    return () => window.clearTimeout(introTimer);
  }, []);

  usePageEffects({ mainRef, themeMode });

  return (
    <div className={`site-shell ${showIntro ? 'intro-active' : ''}`}>
      <IntroOverlay visible={showIntro} />
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
