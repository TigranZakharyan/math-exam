import React from 'react';
// @mui
import {
  Card, Typography, CardHeader, CardContent,
} from '@mui/material';
import {
  Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector,
} from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

function AppOrderTimeline({
  title, subheader, list,
}) {
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === list.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

function OrderItem({ item, isLast }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'order1' && 'primary')
            || (type === 'order2' && 'success')
            || (type === 'order3' && 'info')
            || (type === 'order4' && 'warning')
            || 'error'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default AppOrderTimeline;
