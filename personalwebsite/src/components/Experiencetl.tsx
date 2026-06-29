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
}

interface ExperienceWarpCanvasProps {
  active: boolean;
  direction: 'entering' | 'leaving';
}

interface BinaryColumn {
  x: number;
  y: number;
  speed: number;
  size: number;
  length: number;
  alpha: number;
  offset: number;
}

const ExperienceWarpCanvas: React.FC<ExperienceWarpCanvasProps> = ({ active, direction }) => {
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
      spin: 0,
    };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let binaryColumns: BinaryColumn[] = [];

    const createBinaryColumns = () => {
      const count = window.innerWidth < 720 ? 42 : 78;
      binaryColumns = Array.from({ length: count }, (_, index) => ({
        x: index / Math.max(1, count - 1),
        y: Math.random(),
        speed: 0.18 + Math.random() * 0.7,
        size: window.innerWidth < 720 ? 13 + Math.random() * 7 : 14 + Math.random() * 10,
        length: 8 + Math.floor(Math.random() * 18),
        alpha: 0.28 + Math.random() * 0.62,
        offset: Math.random() * 100,
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
      createBinaryColumns();
    };

    const render = () => {
      const progress = gsap.utils.clamp(0, 1, state.progress);
      const digitalPhase = gsap.utils.clamp(0, 1, (progress - 0.42) / 0.58);

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      ctx.fillStyle = `rgba(2, 7, 10, ${0.16 + digitalPhase * 0.24})`;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      const binaryFade = direction === 'entering' ? progress : 1 - progress;
      const codeAlpha = 0.18 + binaryFade * 0.72;
      ctx.font = `${window.innerWidth < 720 ? 15 : 19}px "SFMono-Regular", Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      binaryColumns.forEach((column, columnIndex) => {
        const x = column.x * width;
        const fall = ((column.y + state.spin * column.speed * 0.14 + progress * 0.55) % 1) * height;
        for (let row = 0; row < column.length; row += 1) {
          const y = (fall + row * column.size * 1.25) % height;
          const bit = (row + columnIndex + Math.floor(state.spin * 16 + column.offset)) % 2;
          const rowAlpha = codeAlpha * column.alpha * (1 - row / (column.length * 1.15));
          ctx.fillStyle =
            row === 0
              ? `rgba(185, 239, 235, ${rowAlpha * 0.46})`
              : `rgba(70, 198, 178, ${rowAlpha * 0.42})`;
          ctx.fillText(String(bit), x, y);
        }
      });

      const blockSize = window.innerWidth < 720 ? 34 : 46;
      const wipe = gsap.parseEase('power3.inOut')(progress);
      for (let x = 0; x < width; x += blockSize) {
        const columnProgress = gsap.utils.clamp(0, 1, wipe * 1.35 - x / width * 0.35);
        if (columnProgress <= 0) {
          continue;
        }
        for (let y = 0; y < height; y += blockSize) {
          const flicker = ((x * 17 + y * 31 + Math.floor(state.spin * 40)) % 9) / 9;
          if (flicker > columnProgress) {
            continue;
          }
          ctx.fillStyle = `rgba(70, 198, 178, ${0.026 + columnProgress * 0.052})`;
          ctx.fillRect(x, y, blockSize * 0.82, blockSize * 0.82);
        }
      }
      ctx.restore();

      if (digitalPhase > 0) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = `rgba(70, 198, 178, ${0.045 * digitalPhase})`;
        for (let lane = 0; lane < 18; lane += 1) {
          const x = ((lane / 18) * width + state.spin * 36) % width;
          const h = 18 + ((lane * 17) % 70);
          ctx.fillRect(x, (lane * 47 + state.spin * 90) % height, 2, h);
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    resize();
    const timeline = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    timeline.to(state, {
      progress: direction === 'entering' ? 1 : 0,
      spin: direction === 'entering' ? 2.75 : -0.9,
      duration: direction === 'entering' ? 1.65 : 1.05,
    });

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
  }, [active, direction, reduceMotion]);

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
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
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

  const bubbleLayout: Record<ExperienceTrack, { sizeDesktop: number; sizeMobile: string; delay: string }> = {
    'Software Engineering': { sizeDesktop: 236, sizeMobile: 'clamp(124px, 38vw, 150px)', delay: '0s' },
    'Marketing Operations': { sizeDesktop: 236, sizeMobile: 'clamp(124px, 38vw, 150px)', delay: '1.2s' },
    'Education Teaching': { sizeDesktop: 236, sizeMobile: 'clamp(124px, 38vw, 150px)', delay: '2.4s' },
  };

  const handleTrackClick = (track: ExperienceTrack) => {
    if (viewState !== 'bubbles') {
      return;
    }

    transitionTimerRef.current?.kill();

    setClickedTrack(track);
    setActiveTrack(track);
    setViewState('entering');
    transitionTimerRef.current = gsap.delayedCall(1.55, () => {
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
      transitionTimerRef.current = gsap.delayedCall(1.2, () => {
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
        '.experience-binary-texture',
        { autoAlpha: entering ? 0 : 0.62, y: entering ? -42 : 0 },
        {
          autoAlpha: entering ? 0.62 : 0,
          y: entering ? 54 : -36,
          duration: entering ? 1.18 : 0.74,
          ease: 'none',
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
            background:
              'linear-gradient(115deg, rgba(2, 7, 10, 0.98), rgba(5, 18, 23, 0.96) 48%, rgba(2, 4, 7, 0.98)), repeating-linear-gradient(90deg, rgba(70, 198, 178, 0.07) 0 1px, transparent 1px 7vw)',
            mixBlendMode: 'normal',
          }}
        >
          <ExperienceWarpCanvas active={isTransitioning} direction={viewState === 'leaving' ? 'leaving' : 'entering'} />
          <Box
            className="experience-binary-texture"
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              color: 'rgba(78, 218, 255, 0.1)',
              fontFamily: 'SFMono-Regular, Consolas, monospace',
              fontSize: { xs: '0.72rem', md: '0.95rem' },
              lineHeight: 1.65,
              letterSpacing: '0.45em',
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              mixBlendMode: 'normal',
              opacity: 0.8,
              transform: 'skewY(-4deg) scale(1.08)',
            }}
          >
            {Array.from({ length: 26 }, (_, row) =>
              Array.from({ length: 54 }, (_, col) => ((row * 7 + col * 5) % 3 === 0 ? '1' : '0')).join('')
            ).join('\n')}
          </Box>
          <Box
            className="experience-transition-layer"
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'repeating-linear-gradient(90deg, transparent 0 5%, rgba(78, 218, 255, 0.055) 5.2% 5.6%, transparent 5.8% 11%), repeating-linear-gradient(0deg, transparent 0 7%, rgba(231, 176, 82, 0.028) 7.2% 7.5%, transparent 7.8% 14%)',
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
          minHeight: { xs: 'auto', md: 500 },
          height: viewState === 'bubbles' || viewState === 'entering' ? { xs: 'auto', md: 500 } : 'auto',
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
              minHeight: { xs: 'auto', md: 500 },
              py: { xs: 1, md: 0 },
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
                    width: { xs: layout.sizeMobile, md: `${layout.sizeDesktop}px` },
                    height: { xs: layout.sizeMobile, md: `${layout.sizeDesktop}px` },
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 211, 142, 0.3)',
                  background:
                    'radial-gradient(circle at 34% 28%, rgba(255, 236, 184, 0.98), rgba(198, 133, 42, 0.96) 28%, rgba(92, 62, 35, 0.98) 57%, rgba(26, 25, 28, 0.98) 75%)',
                  color: '#fff6dc',
                  px: 1.2,
                  textAlign: 'center',
                  fontWeight: 800,
                  fontSize: { xs: '0.92rem', sm: '1rem', md: '1.16rem' },
                  lineHeight: 1.22,
                  cursor: viewState === 'bubbles' ? 'pointer' : 'default',
                  boxShadow:
                    '0 18px 48px rgba(1, 4, 12, 0.72), 0 0 34px rgba(255, 176, 65, 0.14), inset 0 0 0 10px rgba(18, 18, 22, 0.42), inset 0 0 0 18px rgba(245, 183, 79, 0.2), inset -18px -22px 30px rgba(0, 0, 0, 0.38), inset 18px 14px 22px rgba(255, 235, 182, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                  isolation: 'isolate',
                  transformStyle: 'preserve-3d',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '18%',
                    borderRadius: '50%',
                    background:
                      'repeating-conic-gradient(from 8deg, transparent 0deg 20deg, rgba(255, 232, 176, 0.28) 20deg 24deg), radial-gradient(circle, rgba(19, 18, 22, 0.82) 0 34%, rgba(230, 164, 66, 0.42) 35% 39%, rgba(31, 28, 30, 0.88) 40% 100%)',
                    border: '1px solid rgba(255, 226, 167, 0.24)',
                    boxShadow: 'inset 0 0 18px rgba(0,0,0,0.5), 0 0 0 7px rgba(22, 18, 17, 0.36)',
                    zIndex: 1,
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: '41%',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle at 35% 28%, rgba(255, 245, 204, 0.94), rgba(215, 151, 50, 0.68) 36%, rgba(20, 18, 20, 0.94) 72%)',
                    border: '1px solid rgba(255, 238, 190, 0.34)',
                    boxShadow: '0 0 18px rgba(255, 183, 72, 0.24), inset -8px -8px 12px rgba(0,0,0,0.4)',
                    zIndex: 1,
                  },
                  '&:hover':
                    viewState === 'bubbles'
                      ? {
                          filter: 'brightness(1.12)',
                          '& .gear-spin-layer': {
                            animationDuration: '12s',
                          },
                        }
                      : undefined,
                }}
              >
                <Box
                  className="gear-spin-layer"
                  component="span"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background:
                      'repeating-conic-gradient(from 0deg, rgba(231, 176, 82, 0.98) 0deg 7deg, rgba(116, 78, 34, 0.95) 7deg 12deg, transparent 12deg 17deg)',
                    animation: 'experienceGearSpin 28s linear infinite',
                    zIndex: 0,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '10%',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 224, 163, 0.18)',
                      boxShadow: 'inset 0 0 0 10px rgba(6, 5, 7, 0.18)',
                    },
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    maxWidth: '62%',
                    whiteSpace: 'normal',
                    overflowWrap: 'anywhere',
                    wordBreak: 'break-word',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.82), 0 0 14px rgba(255, 184, 86, 0.36)',
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
              background: 'linear-gradient(120deg, rgba(2, 7, 10, 0.08), rgba(70, 198, 178, 0.09), rgba(2, 7, 10, 0.08))',
              mixBlendMode: 'normal',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background:
                  'repeating-linear-gradient(90deg, transparent 0 5%, rgba(78, 218, 255, 0.06) 5.2% 5.6%, transparent 5.8% 11%)',
                transformOrigin: 'center',
                filter: 'blur(0.4px)',
              },
            }}
          />
        )}

        {isTransitioning && (
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
                border: '1px solid rgba(78, 218, 255, 0.2)',
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
                mixBlendMode: 'normal',
                background:
                  'repeating-linear-gradient(90deg, rgba(78, 218, 255, 0.055) 0 2px, transparent 2px 18px), repeating-linear-gradient(0deg, rgba(78, 218, 255, 0.04) 0 1px, transparent 1px 14px)',
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
                  'conic-gradient(from 0deg, rgba(78, 218, 255, 0.2) 0deg 6deg, transparent 6deg 45deg, rgba(231, 176, 82, 0.18) 45deg 51deg, transparent 51deg 90deg, rgba(78, 218, 255, 0.2) 90deg 96deg, transparent 96deg 135deg, rgba(231, 176, 82, 0.18) 135deg 141deg, transparent 141deg 180deg, rgba(78, 218, 255, 0.2) 180deg 186deg, transparent 186deg 225deg, rgba(231, 176, 82, 0.18) 225deg 231deg, transparent 231deg 270deg, rgba(78, 218, 255, 0.2) 270deg 276deg, transparent 276deg 315deg, rgba(231, 176, 82, 0.18) 315deg 321deg, transparent 321deg 360deg)',
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
