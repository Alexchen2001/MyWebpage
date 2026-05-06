import * as React from 'react';
import gsap from 'gsap';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import OutlinedCard from './Expcard';
import { CardData, ExperienceTrack } from '../types';

interface AlternateTimelineProps {
  title: string;
  timelineItems: CardData[];
  themeMode: 'light' | 'dark';
}

interface ExperienceWarpCanvasProps {
  active: boolean;
  direction: 'entering' | 'leaving';
  isDark: boolean;
}

interface WarpParticle {
  angle: number;
  radius: number;
  depth: number;
  size: number;
  hue: number;
  saturation: number;
  lane: number;
  arm: number;
  planet: boolean;
}

const ExperienceWarpCanvas: React.FC<ExperienceWarpCanvasProps> = ({ active, direction, isDark }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  );

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!active || !canvas || !ctx || reduceMotion) {
      return undefined;
    }

    const state = {
      progress: direction === 'entering' ? 0 : 1,
      bloom: direction === 'entering' ? 0 : 1,
      spin: 0,
      tunnel: direction === 'entering' ? 0 : 1,
      flash: 0,
      collapse: direction === 'entering' ? 0 : 1,
      expansion: direction === 'entering' ? 0 : 1,
    };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: WarpParticle[] = [];

    const createParticles = () => {
      const count = window.innerWidth < 720 ? 190 : 360;
      const armCount = 5;
      const galaxyPalette = isDark ? [198, 220, 248, 274, 302, 326, 38] : [184, 204, 226, 262, 292, 318, 42];
      particles = Array.from({ length: count }, () => ({
        angle: (Math.floor(Math.random() * armCount) / armCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.46,
        radius: 18 + Math.pow(Math.random(), 0.72) * 500,
        depth: 0.28 + Math.random() * 1.9,
        size: 0.65 + Math.random() * 3.5,
        hue: galaxyPalette[Math.floor(Math.random() * galaxyPalette.length)] + Math.random() * 18 - 9,
        saturation: 84 + Math.random() * 16,
        lane: Math.random(),
        arm: Math.floor(Math.random() * armCount),
        planet: Math.random() > 0.9,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const render = () => {
      const cx = width / 2;
      const cy = height / 2;
      const aspect = width / Math.max(height, 1);
      const progress = gsap.utils.clamp(0, 1, state.progress);
      const collapse = gsap.utils.clamp(0, 1, state.collapse);
      const expansion = gsap.utils.clamp(0, 1, state.expansion);
      const burst = gsap.parseEase('power4.out')(expansion);
      const pull = gsap.parseEase('power3.inOut')(collapse);
      const singularityRadius = Math.max(width, height) * (0.035 + state.tunnel * 0.16);

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.68);
      bloom.addColorStop(0, isDark ? `rgba(244, 250, 255, ${0.28 + state.bloom * 0.42})` : `rgba(255, 255, 255, ${0.32 + state.bloom * 0.38})`);
      bloom.addColorStop(0.18, isDark ? `rgba(67, 214, 255, ${0.18 + state.bloom * 0.2})` : `rgba(34, 211, 238, ${0.18 + state.bloom * 0.18})`);
      bloom.addColorStop(0.42, isDark ? 'rgba(126, 87, 255, 0.2)' : 'rgba(14, 165, 164, 0.18)');
      bloom.addColorStop(0.68, isDark ? 'rgba(255, 56, 171, 0.12)' : 'rgba(99, 102, 241, 0.1)');
      bloom.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, width, height);

      const singularity = ctx.createRadialGradient(cx, cy, 0, cx, cy, singularityRadius * (1.5 + state.flash * 2.6));
      singularity.addColorStop(0, `rgba(255, 255, 255, ${0.58 + state.flash * 0.36})`);
      singularity.addColorStop(0.22, isDark ? `rgba(125, 211, 252, ${0.32 + state.bloom * 0.22})` : `rgba(236, 254, 255, ${0.34 + state.bloom * 0.18})`);
      singularity.addColorStop(0.48, isDark ? 'rgba(168, 85, 247, 0.26)' : 'rgba(59, 130, 246, 0.18)');
      singularity.addColorStop(0.74, isDark ? 'rgba(255, 56, 171, 0.18)' : 'rgba(14, 165, 164, 0.14)');
      singularity.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = singularity;
      ctx.beginPath();
      ctx.arc(cx, cy, singularityRadius * (1.8 + state.flash * 2.8), 0, Math.PI * 2);
      ctx.fill();

      for (let ring = 0; ring < 5; ring += 1) {
        const ringProgress = (progress * 1.55 + ring * 0.18) % 1;
        const radius = singularityRadius * (1.3 + ringProgress * (4.8 + burst * 4.2));
        ctx.strokeStyle = isDark
          ? `rgba(${ring % 2 ? '255, 56, 171' : '125, 211, 252'}, ${0.2 * (1 - ringProgress) * (0.55 + state.bloom)})`
          : `rgba(${ring % 2 ? '99, 102, 241' : '14, 165, 164'}, ${0.18 * (1 - ringProgress) * (0.55 + state.bloom)})`;
        ctx.lineWidth = 1.2 + ringProgress * 7;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * aspect * (1.25 + burst * 0.55), radius * (0.64 + burst * 0.42), state.spin * 0.62 + ring * 0.28, 0, Math.PI * 2);
        ctx.stroke();
      }

      particles.forEach((particle) => {
        const spiralCurl = particle.radius * 0.014;
        const orbit = state.spin * (0.42 + particle.depth * 0.2) + spiralCurl + particle.lane * 0.42;
        const armWave = Math.sin(particle.radius * 0.018 + progress * Math.PI * 2 + particle.arm) * 18;
        const galaxyRadius = particle.radius * (1.04 - pull * 0.72 + burst * (0.65 + particle.depth * 0.5)) + armWave;
        const angle = particle.angle + orbit + pull * 1.85 - burst * 0.28;
        const verticalFlatten = 0.46 + particle.lane * 0.2 + burst * 0.18;
        const x = cx + Math.cos(angle) * galaxyRadius * aspect;
        const y = cy + Math.sin(angle) * galaxyRadius * verticalFlatten;
        const trailAngle = angle - (0.18 + pull * 0.8 + burst * 0.22) * (particle.depth + 0.4);
        const trailRadius = Math.max(6, galaxyRadius * (1 - 0.08 - pull * 0.2));
        const tx = cx + Math.cos(trailAngle) * trailRadius * aspect;
        const ty = cy + Math.sin(trailAngle) * trailRadius * verticalFlatten;
        const alphaWindow = Math.max(0, Math.min(1, 0.42 + progress * 1.2));
        const alpha = alphaWindow * (0.3 + particle.depth * 0.26) * (0.75 + state.bloom * 0.44);

        const gradient = ctx.createLinearGradient(tx, ty, x, y);
        gradient.addColorStop(0, `hsla(${particle.hue}, ${particle.saturation}%, 70%, 0)`);
        gradient.addColorStop(0.38, `hsla(${particle.hue}, ${particle.saturation}%, 64%, ${alpha * 0.56})`);
        gradient.addColorStop(0.72, `hsla(${particle.hue + 24}, 100%, 76%, ${alpha * 0.86})`);
        gradient.addColorStop(1, `hsla(${particle.hue + 48}, 100%, 94%, ${alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = particle.size * (0.65 + pull * 1.15 + burst * 1.9);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();

        if (particle.planet || (particle.depth > 1.55 && progress > 0.35)) {
          const planetSize = particle.size * (particle.planet ? 3.4 : 1.9) * (0.8 + burst * 0.75);
          const planetGlow = ctx.createRadialGradient(x, y, 0, x, y, planetSize * 4);
          planetGlow.addColorStop(0, `hsla(${particle.hue + 30}, 100%, 88%, ${alpha * 0.7})`);
          planetGlow.addColorStop(0.36, `hsla(${particle.hue}, 95%, 62%, ${alpha * 0.28})`);
          planetGlow.addColorStop(1, `hsla(${particle.hue}, 95%, 62%, 0)`);
          ctx.fillStyle = planetGlow;
          ctx.beginPath();
          ctx.arc(x, y, planetSize * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `hsla(${particle.hue + 36}, 100%, 86%, ${alpha * 0.82})`;
          ctx.beginPath();
          ctx.arc(x, y, planetSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = `rgba(255, 255, 255, ${state.flash * 0.16})`;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over';
    };

    resize();
    const timeline = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    timeline.to(state, {
      progress: direction === 'entering' ? 1 : 0,
      bloom: direction === 'entering' ? 1 : 0.15,
      tunnel: direction === 'entering' ? 1 : 0.15,
      collapse: direction === 'entering' ? 1 : 0.1,
      expansion: direction === 'entering' ? 1 : 0,
      spin: direction === 'entering' ? 2.75 : -0.9,
      duration: direction === 'entering' ? 1.65 : 1.05,
    });
    timeline
      .to(state, { flash: 1, duration: 0.18, ease: 'power2.out' }, direction === 'entering' ? 0.82 : 0.42)
      .to(state, { flash: 0, duration: 0.38, ease: 'power2.in' }, direction === 'entering' ? 1 : 0.56);

    gsap.set(canvas, { autoAlpha: 0 });
    gsap.to(canvas, {
      autoAlpha: direction === 'entering' ? 1 : 0.86,
      duration: 0.18,
      ease: 'power2.out',
    });
    gsap.to(canvas, {
      autoAlpha: 0,
      delay: direction === 'entering' ? 1.24 : 0.78,
      duration: 0.34,
      ease: 'power2.in',
    });

    gsap.ticker.add(render);
    window.addEventListener('resize', resize);

    return () => {
      timeline.kill();
      gsap.killTweensOf(canvas);
      gsap.ticker.remove(render);
      window.removeEventListener('resize', resize);
    };
  }, [active, direction, isDark, reduceMotion]);

  if (!active || reduceMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
};

const AlternateTimeline: React.FC<AlternateTimelineProps> = ({
  title,
  timelineItems,
  themeMode,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isDark = themeMode === 'dark';
  const tracks: ExperienceTrack[] = ['Software Engineering', 'Marketing Operations', 'Education Teaching'];

  const [activeTrack, setActiveTrack] = React.useState<ExperienceTrack | null>(null);
  const [viewState, setViewState] = React.useState<'bubbles' | 'entering' | 'timeline' | 'leaving'>('bubbles');
  const [clickedTrack, setClickedTrack] = React.useState<ExperienceTrack | null>(null);
  const transitionTimerRef = React.useRef<gsap.core.Animation | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const timelineRef = React.useRef<HTMLDivElement | null>(null);
  const isTransitioning = viewState === 'entering' || viewState === 'leaving';

  const normalizeTrack = (track: string | undefined): ExperienceTrack => {
    if (track === 'Marketing/Operations') {
      return 'Marketing Operations';
    }
    if (track === 'Education/Teaching') {
      return 'Education Teaching';
    }
    if (track === 'Marketing Operations' || track === 'Education Teaching' || track === 'Software Engineering') {
      return track;
    }
    return 'Software Engineering';
  };

  const visibleItems = activeTrack
    ? timelineItems.filter((item) => normalizeTrack(item.track) === activeTrack)
    : [];

  const bubbleLayout: Record<ExperienceTrack, { sizeDesktop: number; sizeMobile: number; delay: string }> = {
    'Software Engineering': { sizeDesktop: 236, sizeMobile: 150, delay: '0s' },
    'Marketing Operations': { sizeDesktop: 236, sizeMobile: 150, delay: '1.2s' },
    'Education Teaching': { sizeDesktop: 236, sizeMobile: 150, delay: '2.4s' },
  };

  const handleTrackClick = (track: ExperienceTrack) => {
    if (viewState !== 'bubbles') {
      return;
    }

    transitionTimerRef.current?.kill();

    setClickedTrack(track);
    setActiveTrack(track);
    setViewState('entering');
    transitionTimerRef.current = gsap.delayedCall(isDark ? 1.55 : 1.2, () => {
      setViewState('timeline');
    });
  };

  const handleBackToBubbles = () => {
    if (viewState !== 'timeline') {
      return;
    }

    transitionTimerRef.current?.kill();

    const timelineEl = timelineRef.current;
    const cards = timelineEl?.querySelectorAll('.experience-card-pop');

    const startGalaxyReturn = () => {
      setViewState('leaving');
      transitionTimerRef.current = gsap.delayedCall(isDark ? 1.2 : 0.95, () => {
        setActiveTrack(null);
        setClickedTrack(null);
        setViewState('bubbles');
      });
    };

    if (!timelineEl || !cards?.length) {
      startGalaxyReturn();
      return;
    }

    transitionTimerRef.current = gsap
      .timeline({ onComplete: startGalaxyReturn })
      .to(cards, {
        autoAlpha: 0,
        y: -30,
        scale: 0.94,
        filter: 'blur(8px)',
        duration: 0.58,
        stagger: {
          each: 0.11,
          from: 'end',
        },
        ease: 'power3.in',
      })
      .to(
        timelineEl,
        {
          autoAlpha: 0,
          y: -18,
          filter: 'blur(6px)',
          duration: 0.36,
          ease: 'power2.in',
        },
        '-=0.12'
      );
  };

  React.useEffect(() => {
    return () => {
      transitionTimerRef.current?.kill();
    };
  }, []);

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (viewState === 'bubbles') {
        gsap.fromTo(
          '.track-bubble',
          { autoAlpha: 0, y: 22, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.08, ease: 'back.out(1.45)' }
        );
        gsap.to('.track-bubble', {
          y: -12,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          stagger: 0.18,
          ease: 'sine.inOut',
        });
      }

      if (viewState === 'entering') {
        gsap.to('.track-bubble', {
          autoAlpha: 0,
          scale: 0.72,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power2.in',
        });
      }
    }, stageRef);

    return () => ctx.revert();
  }, [viewState]);

  React.useLayoutEffect(() => {
    const target = timelineRef.current;
    if (!target || viewState !== 'timeline') {
      return undefined;
    }

    const animation = gsap.timeline();
    animation
      .fromTo(
        target,
        { autoAlpha: 0, y: 26, scale: 0.98, filter: 'blur(8px)' },
        { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.72, ease: 'power3.out' }
      )
      .fromTo(
        target.querySelectorAll('.experience-card-pop'),
        { autoAlpha: 0, y: 42, scale: 0.92, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.95,
          stagger: 0.18,
          ease: 'back.out(1.35)',
        },
        0.18
      );

    return () => animation.kill();
  }, [viewState, activeTrack]);

  React.useLayoutEffect(() => {
    if (!isTransitioning) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const entering = viewState === 'entering';

      gsap.fromTo(
        '.experience-transition-layer',
        {
          autoAlpha: entering ? 0 : 0.9,
          scale: entering ? 0.55 : 1.35,
          filter: entering ? 'blur(3px)' : 'blur(0px)',
        },
        {
          autoAlpha: entering ? 0.95 : 0,
          scale: entering ? 1.65 : 0.72,
          filter: entering ? 'blur(0px)' : 'blur(5px)',
          duration: entering ? 1.15 : 0.78,
          stagger: 0.035,
          ease: entering ? 'power3.out' : 'power2.inOut',
        }
      );

      gsap.fromTo(
        '.experience-transition-streak',
        { autoAlpha: entering ? 0 : 0.72, scaleX: entering ? 0.22 : 1.8 },
        {
          autoAlpha: entering ? 0.72 : 0,
          scaleX: entering ? 1.8 : 0.4,
          duration: entering ? 1.1 : 0.72,
          ease: 'power3.inOut',
        }
      );
    }, stageRef);

    return () => ctx.revert();
  }, [isTransitioning, viewState]);

  return (
    <Box sx={{ py: { xs: 4, md: 7 }, px: 2, textAlign: 'center', maxWidth: 1100, mx: 'auto' }}>
      {isTransitioning && (
        <Box
          className="experience-transition-layer"
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1600,
            pointerEvents: 'none',
            overflow: 'hidden',
            background: isDark
              ? 'radial-gradient(circle at 50% 52%, rgba(185, 219, 255, 0.2), rgba(23, 46, 92, 0.7) 33%, rgba(3, 6, 14, 0.95) 72%)'
              : 'radial-gradient(circle at 50% 54%, rgba(220, 249, 255, 0.85), rgba(151, 226, 244, 0.68) 35%, rgba(80, 170, 202, 0.35) 72%)',
            mixBlendMode: 'screen',
          }}
        >
          <ExperienceWarpCanvas active={isTransitioning} direction={viewState === 'leaving' ? 'leaving' : 'entering'} isDark={isDark} />
          <Box
            className="experience-transition-layer"
            sx={{
              position: 'absolute',
              inset: 0,
              background: isDark
                ? 'repeating-linear-gradient(90deg, transparent 0 5%, rgba(223, 237, 255, 0.065) 5.2% 5.6%, transparent 5.8% 11%)'
                : 'repeating-linear-gradient(90deg, transparent 0 6%, rgba(231, 253, 255, 0.14) 6.2% 6.6%, transparent 6.8% 12%)',
              filter: 'blur(0.5px)',
            }}
          />
          <Box
            className="experience-transition-streak"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '52vw',
              height: '5px',
              transform: 'translate(-50%, -50%)',
              borderRadius: 999,
              background: isDark
                ? 'linear-gradient(90deg, rgba(80, 165, 255, 0) 0%, rgba(129, 201, 255, 0.88) 24%, rgba(211, 237, 255, 0.96) 50%, rgba(129, 201, 255, 0.88) 76%, rgba(80, 165, 255, 0) 100%)'
                : 'linear-gradient(90deg, rgba(111, 210, 236, 0) 0%, rgba(188, 243, 255, 0.9) 30%, rgba(236, 253, 255, 0.98) 50%, rgba(188, 243, 255, 0.9) 70%, rgba(111, 210, 236, 0) 100%)',
              boxShadow: isDark
                ? '0 0 18px rgba(126, 186, 255, 0.95), 0 0 42px rgba(95, 162, 255, 0.66)'
                : '0 0 18px rgba(141, 228, 255, 0.88), 0 0 42px rgba(115, 214, 240, 0.52)',
            }}
          />
        </Box>
      )}

      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          mb: 4,
          color: 'var(--ink-900)',
          textTransform: 'none',
          fontSize: { xs: '2rem', md: '3rem' },
          letterSpacing: '0.02em',
        }}
      >
        {title}
      </Typography>

      <Box
        ref={stageRef}
        sx={{
          position: 'relative',
          minHeight: { xs: 420, md: 500 },
          height: viewState === 'bubbles' || viewState === 'entering' ? { xs: 420, md: 500 } : 'auto',
          mb: 2.5,
          overflow: 'visible',
          borderRadius: 0,
          border: 'none',
          background: 'transparent',
          boxShadow: 'none',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {(viewState === 'bubbles' || viewState === 'entering') && (
          <Box
            sx={{
              width: '100%',
              minHeight: { xs: 420, md: 500 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2.5, md: 5 },
            }}
          >
            {tracks.map((track) => {
              const layout = bubbleLayout[track];
              return (
                <Box
                  key={track}
                  className="track-bubble"
                  component="button"
                  onClick={() => handleTrackClick(track)}
                  sx={{
                    width: { xs: `${layout.sizeMobile}px`, md: `${layout.sizeDesktop}px` },
                    height: { xs: `${layout.sizeMobile}px`, md: `${layout.sizeDesktop}px` },
                  borderRadius: '50%',
                  border: 'none',
                  background: isDark
                    ? 'radial-gradient(circle at 28% 26%, rgba(176, 227, 255, 0.95), rgba(54, 140, 214, 0.92) 32%, rgba(24, 86, 170, 0.95) 55%, rgba(8, 38, 95, 0.98) 75%, rgba(4, 18, 48, 0.99) 100%)'
                    : 'radial-gradient(circle at 32% 28%, rgba(252, 255, 255, 0.9), rgba(164, 229, 250, 0.68) 34%, rgba(98, 188, 225, 0.5) 65%, rgba(66, 145, 181, 0.44) 100%)',
                  color: isDark ? '#f1f6ff' : '#123448',
                  px: 1.2,
                  textAlign: 'center',
                  fontWeight: 800,
                  fontSize: { xs: '1rem', md: '1.16rem' },
                  lineHeight: 1.22,
                  cursor: viewState === 'bubbles' ? 'pointer' : 'default',
                  boxShadow: isDark
                    ? '0 10px 36px rgba(8, 20, 44, 0.82), inset 0 0 28px rgba(147, 197, 253, 0.16), inset 0 0 0 1px rgba(202, 231, 255, 0.08)'
                    : '0 12px 28px rgba(76, 146, 170, 0.34), inset 0 0 0 1px rgba(255, 255, 255, 0.45), inset 0 -20px 30px rgba(82, 161, 190, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: isDark ? '16% 18% auto auto' : '12% 15% auto auto',
                    width: isDark ? '24%' : '30%',
                    height: isDark ? '24%' : '30%',
                    borderRadius: '50%',
                    background: isDark ? 'rgba(219, 236, 255, 0.16)' : 'rgba(255, 255, 255, 0.55)',
                    filter: 'blur(0.4px)',
                    zIndex: 1,
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: '6%',
                    borderRadius: '50%',
                    background: isDark
                      ? 'radial-gradient(38% 24% at 30% 34%, rgba(96, 183, 97, 0.82), transparent 70%), radial-gradient(26% 17% at 43% 51%, rgba(85, 172, 92, 0.78), transparent 72%), radial-gradient(31% 19% at 61% 59%, rgba(79, 164, 88, 0.8), transparent 71%), radial-gradient(22% 14% at 73% 37%, rgba(121, 198, 111, 0.72), transparent 74%), radial-gradient(20% 12% at 66% 28%, rgba(76, 160, 82, 0.74), transparent 76%), radial-gradient(48% 13% at 50% 74%, rgba(233, 248, 255, 0.22), transparent 74%), radial-gradient(36% 9% at 54% 22%, rgba(231, 248, 255, 0.16), transparent 78%)'
                      : 'none',
                    opacity: isDark ? 0.82 : 0,
                    mixBlendMode: isDark ? 'screen' : 'normal',
                    filter: isDark ? 'blur(0.8px)' : 'none',
                    zIndex: 1,
                  },
                  '&:hover':
                    viewState === 'bubbles'
                      ? {
                          filter: 'brightness(1.08)',
                        }
                      : undefined,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    maxWidth: '76%',
                    whiteSpace: 'normal',
                    overflowWrap: 'anywhere',
                    wordBreak: 'break-word',
                    textShadow: isDark ? '0 1px 10px rgba(7, 18, 42, 0.5)' : '0 1px 8px rgba(231, 249, 255, 0.6)',
                    position: 'relative',
                    zIndex: 2,
                    fontWeight: 800,
                  }}
                >
                  {track}
                </Box>
              </Box>
              );
            })}
          </Box>
        )}

        {(viewState === 'entering' || viewState === 'leaving') && (
          <Box
            className="experience-transition-layer"
            sx={{
              position: 'absolute',
              inset: '-8%',
              pointerEvents: 'none',
              background: isDark
                ? 'radial-gradient(circle at 50% 50%, rgba(179, 209, 255, 0.25), rgba(34, 65, 123, 0.52) 32%, rgba(7, 14, 29, 0.94) 66%)'
                : 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.35), rgba(14, 26, 56, 0.82) 45%, rgba(2, 4, 10, 0.96) 70%)',
              mixBlendMode: 'screen',
              '&::before': isDark
                ? {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background:
                      'repeating-linear-gradient(90deg, transparent 0 5%, rgba(223, 237, 255, 0.05) 5.2% 5.6%, transparent 5.8% 11%)',
                    transformOrigin: 'center',
                    filter: 'blur(0.4px)',
                  }
                : undefined,
              '&::after': isDark
                ? {
                    content: '""',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '40%',
                    height: '4px',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: 999,
                    background:
                      'linear-gradient(90deg, rgba(80, 165, 255, 0) 0%, rgba(129, 201, 255, 0.85) 24%, rgba(211, 237, 255, 0.95) 50%, rgba(129, 201, 255, 0.85) 76%, rgba(80, 165, 255, 0) 100%)',
                    boxShadow: '0 0 14px rgba(126, 186, 255, 0.9), 0 0 32px rgba(95, 162, 255, 0.62)',
                  }
                : undefined,
            }}
          />
        )}

        {isDark && isTransitioning && (
          <>
            <Box
              className="experience-transition-layer"
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: { xs: '42%', md: '34%' },
                aspectRatio: '1',
                pointerEvents: 'none',
                borderRadius: '50%',
                border: '1px solid rgba(170, 206, 255, 0.42)',
                boxShadow: '0 0 24px rgba(131, 184, 255, 0.45), inset 0 0 24px rgba(123, 171, 242, 0.22)',
              }}
            />
            <Box
              className="experience-transition-layer"
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: { xs: '70%', md: '62%' },
                aspectRatio: '1',
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                mixBlendMode: 'screen',
                background:
                  'radial-gradient(circle at 52% 48%, rgba(255, 224, 188, 0.24), rgba(255, 159, 109, 0.18) 20%, rgba(255, 104, 66, 0.12) 34%, rgba(94, 142, 230, 0.08) 56%, rgba(0,0,0,0) 72%)',
              }}
            />
            <Box
              className="experience-transition-layer"
              sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: { xs: '66%', md: '52%' },
                aspectRatio: '1',
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                background:
                  'conic-gradient(from 0deg, rgba(185, 222, 255, 0.18) 0deg 6deg, transparent 6deg 45deg, rgba(185, 222, 255, 0.18) 45deg 51deg, transparent 51deg 90deg, rgba(185, 222, 255, 0.18) 90deg 96deg, transparent 96deg 135deg, rgba(185, 222, 255, 0.18) 135deg 141deg, transparent 141deg 180deg, rgba(185, 222, 255, 0.18) 180deg 186deg, transparent 186deg 225deg, rgba(185, 222, 255, 0.18) 225deg 231deg, transparent 231deg 270deg, rgba(185, 222, 255, 0.18) 270deg 276deg, transparent 276deg 315deg, rgba(185, 222, 255, 0.18) 315deg 321deg, transparent 321deg 360deg)',
                filter: 'blur(0.5px)',
              }}
            />
          </>
        )}

        {(viewState === 'timeline' || viewState === 'leaving') && (
          <Box
            ref={timelineRef}
            sx={{
              width: '100%',
              height: 'auto',
              px: { xs: 1, md: 2 },
              py: { xs: 1.2, md: 1.6 },
              overflow: 'visible',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, px: { xs: 0.5, md: 1 } }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'var(--ink-900)',
                  fontWeight: 800,
                  textAlign: 'left',
                }}
              >
                {activeTrack}
              </Typography>
              <Box
                component="button"
                onClick={handleBackToBubbles}
                sx={{
                  border: 'none',
                  borderRadius: 999,
                  px: 1.4,
                  py: 0.55,
                  background: 'var(--panel-bg)',
                  color: 'var(--ink-900)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'var(--panel-bg-soft)',
                  },
                }}
              >
                Back to Bubbles
              </Box>
            </Box>

            {visibleItems.length > 0 ? (
              <Timeline
                position={isDesktop ? 'alternate' : 'right'}
                sx={{
                  px: { xs: 0, md: 1 },
                  '& .MuiTimelineItem-root:before': { flex: isDesktop ? 0 : 0.02 },
                }}
              >
                {visibleItems.map((item, index) => (
                  <TimelineItem key={`${item.jobname}-${index}`}>
                    <TimelineSeparator>
                      <TimelineDot sx={{ bgcolor: 'var(--accent-700)', boxShadow: '0 0 0 6px rgba(201,108,27,0.2)' }} />
                      {index < visibleItems.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: 0.5, px: { xs: 1, md: 2 } }}>
                      <div className="cards-container experience-card-pop">
                        <OutlinedCard
                          title={item.jobname}
                          subtitle={item.exptype}
                          subsubtitle={item.employmentlocation}
                          description={item.employmentdate}
                          buttonText={item.buttonText}
                          highlights={item.highlights}
                        />
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            ) : (
              <Paper
                elevation={0}
                sx={{
                  mx: 'auto',
                  maxWidth: 580,
                  p: 3,
                  borderRadius: 3,
                  border: 'none',
                  background: 'var(--panel-bg)',
                  boxShadow: 'var(--panel-shadow)',
                }}
              >
                <Typography variant="h6" sx={{ color: 'var(--ink-900)', mb: 1 }}>
                  {activeTrack}
                </Typography>
                <Typography sx={{ color: 'var(--ink-700)' }}>
                  Timeline entries for this track are coming soon.
                </Typography>
              </Paper>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AlternateTimeline;
