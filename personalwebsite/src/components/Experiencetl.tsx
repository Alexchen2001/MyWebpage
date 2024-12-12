import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Define Props
interface TimelineData {
  label: string; // The content of each timeline item
}

interface AlternateTimelineProps {
  title: string; // Title for the timeline
  timelineItems: TimelineData[]; // Array of timeline items
}

const AlternateTimeline: React.FC<AlternateTimelineProps> = ({
  title,
  timelineItems,
}) => {
  return (
    <Box sx={{ py: 5, px: 2, textAlign: 'center' }}>
      {/* Dynamic Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          mb: 4,
          color: '#333',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>

      {/* Dynamic Timeline */}
      <Timeline position="alternate">
        {timelineItems.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot />
              {index < timelineItems.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{item.label}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default AlternateTimeline;
