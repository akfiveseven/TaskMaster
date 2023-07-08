import * as React from 'react';
import Box from '@mui/material/Box';

export default function Goals({ goalData }) {

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {goalData.map((goal) => (
        <h1 key={goal.id}>{goal.goalName}</h1> // if the goal object has an `id` property
      ))}
    </Box>
  );
}
