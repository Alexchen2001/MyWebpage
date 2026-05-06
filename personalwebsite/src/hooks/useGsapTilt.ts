import { MouseEvent, RefObject, useCallback, useEffect, useMemo } from 'react';
import gsap from 'gsap';

interface UseGsapTiltOptions {
  rotate?: number;
  lift?: number;
  duration?: number;
}

export function useGsapTilt<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { rotate = 6, lift = 0, duration = 0.32 }: UseGsapTiltOptions = {}
) {
  const setters = useMemo(
    () => ({
      rotationX: null as gsap.QuickToFunc | null,
      rotationY: null as gsap.QuickToFunc | null,
      y: null as gsap.QuickToFunc | null,
    }),
    []
  );

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return undefined;
    }

    gsap.set(target, {
      '--px': '50%',
      '--py': '50%',
      transformPerspective: 900,
      transformStyle: 'preserve-3d',
      rotationX: 0,
      rotationY: 0,
      y: 0,
    });

    setters.rotationX = gsap.quickTo(target, 'rotationX', { duration, ease: 'power3.out' });
    setters.rotationY = gsap.quickTo(target, 'rotationY', { duration, ease: 'power3.out' });
    setters.y = gsap.quickTo(target, 'y', { duration, ease: 'power3.out' });

    return () => {
      gsap.killTweensOf(target);
    };
  }, [duration, ref, setters]);

  const onMouseMove = useCallback(
    (event: MouseEvent<T>) => {
      const target = ref.current;
      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const px = ((event.clientX - rect.left) / rect.width) * 100;
      const py = ((event.clientY - rect.top) / rect.height) * 100;

      setters.rotationX?.(((50 - py) / 50) * rotate);
      setters.rotationY?.(((px - 50) / 50) * rotate);
      setters.y?.(-lift);
      gsap.to(target, {
        '--px': `${px.toFixed(1)}%`,
        '--py': `${py.toFixed(1)}%`,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    },
    [lift, ref, rotate, setters]
  );

  const onMouseLeave = useCallback(() => {
    const target = ref.current;
    setters.rotationX?.(0);
    setters.rotationY?.(0);
    setters.y?.(0);

    if (target) {
      gsap.to(target, {
        '--px': '50%',
        '--py': '50%',
        duration: 0.24,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, [ref, setters]);

  return { onMouseMove, onMouseLeave };
}
