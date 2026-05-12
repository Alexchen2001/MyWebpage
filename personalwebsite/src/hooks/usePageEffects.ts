import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface UsePageEffectsArgs {
  mainRef: RefObject<HTMLElement | null>;
}

export function usePageEffects({ mainRef }: UsePageEffectsArgs): void {
  useEffect(() => {
    const mainEl = mainRef.current;
    const revealTargets = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    const canUseScrollTrigger = typeof window.matchMedia === 'function';

    if (canUseScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      gsap.set(revealTargets, { autoAlpha: 0, y: 30, scale: 0.985 });

      revealTargets.forEach((el) => {
        if (!canUseScrollTrigger) {
          gsap.to(el, { autoAlpha: 1, y: 0, scale: 1, duration: 0.01 });
          return;
        }

        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            scroller: mainEl || undefined,
            start: 'top 72%',
            once: true,
          },
        });
      });

      gsap.to('.bg-stars', {
        opacity: 0.76,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.orb-a', {
        x: 22,
        y: 18,
        scale: 1.05,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.orb-b', {
        x: -26,
        y: -16,
        scale: 1.06,
        duration: 9.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    const pointerXTo = gsap.quickTo(document.documentElement, '--pointer-x', {
      duration: 0.5,
      ease: 'power3.out',
    });
    const pointerYTo = gsap.quickTo(document.documentElement, '--pointer-y', {
      duration: 0.5,
      ease: 'power3.out',
    });

    const updateScroll = () => {
      const scrollY = mainEl?.scrollTop || 0;
      gsap.to(document.documentElement, {
        '--scroll-y': `${scrollY}px`,
        duration: 0.36,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const updatePointer = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      pointerXTo(Number(x.toFixed(3)));
      pointerYTo(Number(y.toFixed(3)));
      gsap.to('.cursor-glow', {
        left: event.clientX,
        top: event.clientY,
        duration: 0.26,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    updateScroll();
    mainEl?.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('mousemove', updatePointer);

    return () => {
      ctx.revert();
      mainEl?.removeEventListener('scroll', updateScroll);
      window.removeEventListener('mousemove', updatePointer);
      if (canUseScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, [mainRef]);
}
