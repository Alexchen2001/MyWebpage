import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useGsapTilt } from '../hooks/useGsapTilt';

interface OutlinedCardProps {
  title: string; // Title of the card
  subtitle: string; // Subtitle of the card
  subsubtitle: string; // Subsubtitle of the card
  description: string; // Main description content
  buttonText: string; // Text for the button
  highlights?: string[];
}

const OutlinedCard: React.FC<OutlinedCardProps> = ({
  title,
  subtitle,
  subsubtitle,
  description,
  buttonText,
  highlights,
}) => {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const tilt = useGsapTilt(cardRef, { rotate: 6, lift: 4 });

  return (
    <Box sx={{
      width: '100%',
      maxWidth: 520,
      margin: 'auto',
      py: 1,
    }}>
      <Card
        ref={cardRef}
        variant="outlined"
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        sx={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 1.5,
          borderColor: 'rgba(231, 176, 82, 0.18)',
          background: 'var(--panel-bg)',
          boxShadow: '0 18px 40px rgba(1, 4, 12, 0.5)',
          transformStyle: 'preserve-3d',
          '&:hover': {
            boxShadow: '0 24px 52px rgba(0, 0, 0, 0.36)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(190px circle at var(--px, 50%) var(--py, 50%), rgba(255, 218, 143, 0.22), transparent 66%)',
          },
        }}
      >
        <CardContent>
          {/* Subtitle */}
          <Typography gutterBottom sx={{ color: 'var(--teal-500)', fontSize: 13, fontWeight: 700 }}>
            {subtitle}
          </Typography>

          {/* Title */}
          <Typography variant="h5" component="div" sx={{ fontWeight: 800, color: 'var(--ink-900)' }}>
            {title}
          </Typography>

          {/* Description */}
          <Typography sx={{ color: 'var(--ink-700)', mb: 1.5 }}>
            {subsubtitle}
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--ink-700)', mb: 1 }}>
            {description}
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--accent-800)', fontWeight: 700 }}>
            {buttonText}
          </Typography>
          {highlights && highlights.length > 0 && (
            <Box component="ul" sx={{ mt: 1.2, mb: 0, pl: 2, color: 'var(--ink-700)', textAlign: 'left' }}>
              {highlights.map((point) => (
                <Typography
                  key={point}
                  component="li"
                  variant="body2"
                  sx={{ mb: 0.7, lineHeight: 1.6 }}
                >
                  {point}
                </Typography>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OutlinedCard;
