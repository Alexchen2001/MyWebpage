import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroOverlayProps {
  visible: boolean;
  onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ visible, onComplete }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!visible) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete,
      });

      timeline
        .set(overlayRef.current, { autoAlpha: 1 })
        .fromTo('.intro-stars', { scale: 1, autoAlpha: 0.7 }, { scale: 1.55, autoAlpha: 1, duration: 3.1, ease: 'power2.out' }, 0)
        .fromTo('.intro-ring', { scale: 0.92, autoAlpha: 0.58 }, { scale: 1.08, autoAlpha: 0.9, duration: 1.25, repeat: 2, yoyo: true, ease: 'sine.inOut' }, 0)
        .fromTo('.intro-title', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.25)
        .fromTo('.intro-subtitle', { autoAlpha: 0, y: 64 }, { autoAlpha: 1, y: 56, duration: 0.7 }, 1.25)
        .to('.intro-title', { autoAlpha: 0.12, y: -8, duration: 0.55, ease: 'power2.in' }, 3.65)
        .to('.intro-subtitle', { autoAlpha: 0, y: 48, duration: 0.45, ease: 'power2.in' }, 3.75)
        .to(overlayRef.current, { autoAlpha: 0, duration: 0.7, ease: 'power2.inOut' }, 4.2);
    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete, visible]);

  return (
    <div ref={overlayRef} className={`intro-overlay ${visible ? 'intro-visible' : 'intro-hidden'}`}>
      <div className="intro-stars" />
      <div className="intro-ring" />
      <h1 className="intro-title">Welcome to Alexander Chen&apos;s Homepage</h1>
      <p className="intro-subtitle">You will be navigating his academic and engineering journey</p>
    </div>
  );
};

export default IntroOverlay;
