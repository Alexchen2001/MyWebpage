import { useEffect, RefObject } from 'react';

interface UsePageEffectsArgs {
  mainRef: RefObject<HTMLElement | null>;
  themeMode: 'light' | 'dark';
}

export function usePageEffects({ mainRef, themeMode }: UsePageEffectsArgs): void {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

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
  }, [mainRef]);
}
