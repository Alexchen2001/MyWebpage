import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
  const handleTilt = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * 100;
    const py = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((px - 50) / 50) * 6;
    const rotateX = ((50 - py) / 50) * 6;

    target.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
    target.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    target.style.setProperty('--px', `${px.toFixed(1)}%`);
    target.style.setProperty('--py', `${py.toFixed(1)}%`);
  };

  const resetTilt = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    target.style.setProperty('--tilt-x', '0deg');
    target.style.setProperty('--tilt-y', '0deg');
    target.style.setProperty('--px', '50%');
    target.style.setProperty('--py', '50%');
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: 520,
      margin: 'auto',
      py: 1,
    }}>
      <Card
        variant="outlined"
        onMouseMove={handleTilt}
        onMouseLeave={resetTilt}
        sx={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          borderColor: 'rgba(99, 102, 241, 0.18)',
          background: 'var(--panel-bg)',
          boxShadow: '0 18px 40px rgba(1, 4, 12, 0.5)',
          transform:
            'perspective(860px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(0)',
          transition: 'transform 240ms ease, box-shadow 240ms ease',
          '&:hover': {
            transform:
              'perspective(860px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateY(-4px)',
            boxShadow: '0 24px 52px rgba(15, 33, 55, 0.18)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(190px circle at var(--px, 50%) var(--py, 50%), rgba(255, 255, 255, 0.32), transparent 66%)',
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
