import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OutlinedCard from './Expcard';
import { CardData } from '../types';

interface AlternateTimelineProps {
  title: string; // Title for the timeline
  timelineItems: CardData[]; // Array of timeline items
}

const AlternateTimeline: React.FC<AlternateTimelineProps> = ({
  title,
  timelineItems,
}) => {
  return (
    <Box sx={{ py: { xs: 5, md: 8 }, px: 2, textAlign: 'center', maxWidth: 1240, mx: 'auto' }}>
      {/* Dynamic Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          mb: 4,
          color: 'var(--ink-900)',
          textTransform: 'uppercase',
          fontSize: { xs: '2rem', md: '3rem' },
          letterSpacing: '0.04em',
        }}
      >
        {title}
      </Typography>

      {/* Dynamic Timeline */}
      <Timeline position="alternate" sx={{ '& .MuiTimelineItem-root:before': { flex: 0 } }}>
        {timelineItems.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: 'var(--accent-700)', boxShadow: '0 0 0 6px rgba(201,108,27,0.2)' }} />
              {index < timelineItems.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
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
    </Box>
  );
};

export default AlternateTimeline;
