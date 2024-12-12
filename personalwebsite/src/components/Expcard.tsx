import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface OutlinedCardProps {
  title: string; // Title of the card
  subtitle: string; // Subtitle of the card
  description: string; // Main description content
  buttonText: string; // Text for the button
  onButtonClick: () => void; // Callback for the button click event
}

const OutlinedCard: React.FC<OutlinedCardProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          {/* Subtitle */}
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {subtitle}
          </Typography>

          {/* Title */}
          <Typography variant="h5" component="div">
            {title}
          </Typography>

          {/* Description */}
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            adjective
          </Typography>
          <Typography variant="body2">
            {description}
          </Typography>
        </CardContent>

        {/* Button Section */}
        <CardActions>
          <Button size="small" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default OutlinedCard;
