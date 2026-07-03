import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroOverlayProps {
  visible: boolean;
  onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ visible, onComplete }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!visible) {
      return undefined;
    }

    if (import.meta.env.MODE === 'test') {
      onComplete();
      return undefined;
    }

    const overlay = overlayRef.current;
    const copy = copyRef.current;

    if (!overlay || !copy) {
      onComplete();
      return undefined;
    }

    gsap.set(overlay, { autoAlpha: 1 });
    gsap.set(copy, { autoAlpha: 0, y: 18, scale: 0.98 });

    const timeline = gsap
      .timeline({ onComplete })
      .to(copy, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
      })
      .to(copy, {
        autoAlpha: 0,
        y: -10,
        duration: 0.45,
        ease: 'power2.in',
      }, '+=1.15')
      .to(overlay, {
        autoAlpha: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      }, '<');

    return () => {
      timeline.kill();
      gsap.killTweensOf([overlay, copy]);
    };
  }, [onComplete, visible]);

  return (
    <div ref={overlayRef} className={`intro-overlay ${visible ? 'intro-visible' : 'intro-hidden'}`}>
      <div className="intro-simple-backdrop" aria-hidden="true" />
      <div className="intro-spinning-wheel" aria-hidden="true">
        <span />
      </div>
      <div ref={copyRef} className="intro-simple-copy">
        <h1>Welcome to Alexander Chen&apos;s Journey</h1>
      </div>
    </div>
  );
};

export default IntroOverlay;
