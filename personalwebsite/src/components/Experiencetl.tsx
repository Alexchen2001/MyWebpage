import * as React from 'react';
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
  const transitionTimerRef = React.useRef<number | null>(null);
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

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    setClickedTrack(track);
    setActiveTrack(track);
    setViewState('entering');
    transitionTimerRef.current = window.setTimeout(() => {
      setViewState('timeline');
    }, isDark ? 5000 : 2100);
  };

  const handleBackToBubbles = () => {
    if (viewState !== 'timeline') {
      return;
    }

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    setViewState('leaving');
    transitionTimerRef.current = window.setTimeout(() => {
      setActiveTrack(null);
      setClickedTrack(null);
      setViewState('bubbles');
    }, isDark ? 5000 : 1800);
  };

  React.useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ py: { xs: 4, md: 7 }, px: 2, textAlign: 'center', maxWidth: 1100, mx: 'auto' }}>
      {isTransitioning && (
        <Box
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
            '@keyframes fullWarpIn': {
              '0%': { opacity: 0, transform: 'scale(0.35)', filter: 'blur(2px)' },
              '40%': { opacity: 0.9, transform: 'scale(1.1)', filter: 'blur(0.4px)' },
              '100%': { opacity: 1, transform: 'scale(1.9)', filter: 'blur(0px)' },
            },
            '@keyframes fullWarpOut': {
              '0%': { opacity: 1, transform: 'scale(1.4)' },
              '100%': { opacity: 0, transform: 'scale(0.65)' },
            },
            '@keyframes fullStreaks': {
              '0%': { opacity: 0, transform: 'translateY(35%) scaleY(0.35)' },
              '25%': { opacity: 0.75 },
              '100%': { opacity: 1, transform: 'translateY(-30%) scaleY(1.7)' },
            },
            '@keyframes fullAnamorphic': {
              '0%': { opacity: 0, transform: 'translate(-50%, -50%) scaleX(0.2)' },
              '40%': { opacity: 0.8, transform: 'translate(-50%, -50%) scaleX(1)' },
              '100%': { opacity: 0.45, transform: 'translate(-50%, -50%) scaleX(2.1)' },
            },
            animation: viewState === 'entering'
              ? (isDark ? 'fullWarpIn 5s cubic-bezier(0.17, 0.82, 0.31, 1) forwards' : 'fullWarpIn 2.1s ease forwards')
              : (isDark ? 'fullWarpIn 5s cubic-bezier(0.17, 0.82, 0.31, 1) reverse both' : 'fullWarpOut 1.8s ease forwards'),
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: isDark
                ? 'repeating-linear-gradient(90deg, transparent 0 5%, rgba(223, 237, 255, 0.065) 5.2% 5.6%, transparent 5.8% 11%)'
                : 'repeating-linear-gradient(90deg, transparent 0 6%, rgba(231, 253, 255, 0.14) 6.2% 6.6%, transparent 6.8% 12%)',
              filter: 'blur(0.5px)',
              animation: viewState === 'entering'
                ? (isDark ? 'fullStreaks 5s cubic-bezier(0.2, 0.76, 0.28, 1) forwards' : 'fullStreaks 2.1s ease forwards')
                : (isDark ? 'fullStreaks 5s cubic-bezier(0.2, 0.76, 0.28, 1) reverse both' : 'none'),
            }}
          />
          <Box
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
              animation: viewState === 'entering'
                ? (isDark ? 'fullAnamorphic 5s cubic-bezier(0.2, 0.78, 0.32, 1) forwards' : 'fullAnamorphic 2.1s ease forwards')
                : (isDark ? 'fullAnamorphic 5s cubic-bezier(0.2, 0.78, 0.32, 1) reverse both' : 'none'),
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
          '@keyframes bubbleFloat': {
            '0%, 100%': { transform: 'translateY(0px) scale(1)' },
            '50%': { transform: 'translateY(-14px) scale(1.03)' },
          },
          '@keyframes planetFloat': {
            '0%, 100%': { transform: 'translateY(0px) scale(1) rotate(0deg)' },
            '50%': { transform: 'translateY(-10px) scale(1.02) rotate(2.5deg)' },
          },
          '@keyframes planetCollapse': {
            '0%': { opacity: 1, transform: 'scale(1)' },
            '45%': { opacity: 1, transform: 'scale(0.7)' },
            '75%': { opacity: 0.85, transform: 'scale(0.35)' },
            '100%': { opacity: 0, transform: 'scale(0.08)' },
          },
          '@keyframes bubbleBurst': {
            '0%': { opacity: 1, transform: 'scale(1)' },
            '65%': { opacity: 1, transform: 'scale(1.28)' },
            '100%': { opacity: 0, transform: 'scale(0.2)' },
          },
          '@keyframes bubbleFadeAway': {
            '0%': { opacity: 1, transform: 'scale(1)' },
            '100%': { opacity: 0, transform: 'scale(0.7)' },
          },
          '@keyframes warpTunnelIn': {
            '0%': { opacity: 0, transform: 'scale(0.5)' },
            '100%': { opacity: 1, transform: 'scale(1.6)' },
          },
          '@keyframes warpTunnelOut': {
            '0%': { opacity: 0, transform: 'scale(1.6)' },
            '100%': { opacity: 1, transform: 'scale(0.55)' },
          },
          '@keyframes lightyearTunnel': {
            '0%': { opacity: 0, transform: 'scale(0.45)', filter: 'blur(2px) brightness(1)' },
            '40%': { opacity: 0.95, transform: 'scale(1.2)', filter: 'blur(0px) brightness(1.3)' },
            '100%': { opacity: 0.92, transform: 'scale(1.75)', filter: 'blur(0px) brightness(1.55)' },
          },
          '@keyframes lightyearStreak': {
            '0%': { transform: 'translateY(30%) scaleY(0.3)', opacity: 0 },
            '25%': { opacity: 0.55 },
            '100%': { transform: 'translateY(-35%) scaleY(1.5)', opacity: 0.95 },
          },
          '@keyframes anamorphicBlueStreak': {
            '0%': { opacity: 0, transform: 'scaleX(0.3) translateY(0px)' },
            '30%': { opacity: 0.75, transform: 'scaleX(1.15) translateY(-2px)' },
            '100%': { opacity: 0.55, transform: 'scaleX(1.75) translateY(0px)' },
          },
          '@keyframes lensGhostOrbit': {
            '0%': { opacity: 0, transform: 'translate(-50%, -50%) scale(0.4) rotate(0deg)' },
            '45%': { opacity: 0.6, transform: 'translate(-50%, -50%) scale(1.05) rotate(18deg)' },
            '100%': { opacity: 0.4, transform: 'translate(-50%, -50%) scale(1.45) rotate(42deg)' },
          },
          '@keyframes halationBloom': {
            '0%': { opacity: 0, filter: 'blur(2px) saturate(1)' },
            '50%': { opacity: 0.48, filter: 'blur(6px) saturate(1.12)' },
            '100%': { opacity: 0.36, filter: 'blur(11px) saturate(1.2)' },
          },
          '@keyframes starburstEight': {
            '0%': { opacity: 0, transform: 'translate(-50%, -50%) scale(0.4) rotate(0deg)' },
            '55%': { opacity: 0.52, transform: 'translate(-50%, -50%) scale(1) rotate(6deg)' },
            '100%': { opacity: 0.22, transform: 'translate(-50%, -50%) scale(1.25) rotate(12deg)' },
          },
          '@keyframes volumetricSweep': {
            '0%': { opacity: 0, transform: 'translateY(28%) scaleY(0.45)' },
            '30%': { opacity: 0.42 },
            '100%': { opacity: 0.18, transform: 'translateY(-18%) scaleY(1.4)' },
          },
          '@keyframes timelineIn': {
            '0%': { opacity: 0, transform: 'translateY(18px) scale(0.94)', filter: 'blur(6px)' },
            '100%': { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)' },
          },
          '@keyframes timelineOut': {
            '0%': { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)' },
            '100%': { opacity: 0, transform: 'translateY(-14px) scale(1.06)', filter: 'blur(5px)' },
          },
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
              const isClicked = clickedTrack === track;
              return (
                <Box
                  key={track}
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
                  animation:
                    viewState === 'entering'
                      ? isClicked
                        ? isDark
                          ? 'planetCollapse 1200ms cubic-bezier(0.16, 0.84, 0.32, 1) forwards'
                          : 'bubbleBurst 1300ms ease forwards'
                        : isDark
                          ? 'bubbleFadeAway 1200ms cubic-bezier(0.18, 0.7, 0.32, 1) forwards'
                          : 'bubbleFadeAway 1100ms ease forwards'
                      : `${isDark ? 'planetFloat' : 'bubbleFloat'} 9.6s ease-in-out infinite ${layout.delay}`,
                  transition: 'transform 220ms ease',
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
                          transform: 'translateY(-6px) scale(1.04)',
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
            sx={{
              position: 'absolute',
              inset: '-8%',
              pointerEvents: 'none',
              background: isDark
                ? 'radial-gradient(circle at 50% 50%, rgba(179, 209, 255, 0.25), rgba(34, 65, 123, 0.52) 32%, rgba(7, 14, 29, 0.94) 66%)'
                : 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.35), rgba(14, 26, 56, 0.82) 45%, rgba(2, 4, 10, 0.96) 70%)',
              mixBlendMode: 'screen',
              animation: viewState === 'entering'
                ? (isDark ? 'lightyearTunnel 5s cubic-bezier(0.17, 0.82, 0.31, 1) forwards' : 'warpTunnelIn 1.6s ease forwards')
                : (isDark ? 'lightyearTunnel 5s cubic-bezier(0.17, 0.82, 0.31, 1) reverse both' : 'warpTunnelOut 1.4s ease forwards'),
              '&::before': isDark
                ? {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background:
                      'repeating-linear-gradient(90deg, transparent 0 5%, rgba(223, 237, 255, 0.05) 5.2% 5.6%, transparent 5.8% 11%)',
                    transformOrigin: 'center',
                    filter: 'blur(0.4px)',
                    animation: viewState === 'entering'
                      ? 'lightyearStreak 5s cubic-bezier(0.2, 0.76, 0.28, 1) forwards, volumetricSweep 5s ease-out forwards'
                      : 'lightyearStreak 5s cubic-bezier(0.2, 0.76, 0.28, 1) reverse both, volumetricSweep 5s ease-out reverse both',
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
                    animation: viewState === 'entering'
                      ? 'anamorphicBlueStreak 5s cubic-bezier(0.2, 0.78, 0.32, 1) forwards'
                      : 'anamorphicBlueStreak 5s cubic-bezier(0.2, 0.78, 0.32, 1) reverse both',
                  }
                : undefined,
            }}
          />
        )}

        {isDark && isTransitioning && (
          <>
            <Box
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
                animation: viewState === 'entering'
                  ? 'lensGhostOrbit 5s cubic-bezier(0.19, 0.76, 0.33, 1) forwards'
                  : 'lensGhostOrbit 5s cubic-bezier(0.19, 0.76, 0.33, 1) reverse both',
              }}
            />
            <Box
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
                animation: viewState === 'entering'
                  ? 'halationBloom 5s cubic-bezier(0.2, 0.74, 0.3, 1) forwards'
                  : 'halationBloom 5s cubic-bezier(0.2, 0.74, 0.3, 1) reverse both',
              }}
            />
            <Box
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
                animation: viewState === 'entering'
                  ? 'starburstEight 5s cubic-bezier(0.2, 0.78, 0.31, 1) forwards'
                  : 'starburstEight 5s cubic-bezier(0.2, 0.78, 0.31, 1) reverse both',
              }}
            />
          </>
        )}

        {(viewState === 'timeline' || viewState === 'leaving') && (
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              px: { xs: 1, md: 2 },
              py: { xs: 1.2, md: 1.6 },
              overflow: 'visible',
              animation: viewState === 'timeline'
                ? (isDark ? 'timelineIn 1.35s cubic-bezier(0.2, 0.78, 0.3, 1)' : 'timelineIn 1s ease')
                : (isDark ? 'timelineOut 1.45s cubic-bezier(0.23, 0.73, 0.35, 1) forwards' : 'timelineOut 1.05s ease forwards'),
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
                      <div className="cards-container">
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
