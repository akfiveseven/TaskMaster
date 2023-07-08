import * as React from 'react';
import Box from '@mui/material/Box';

export default function Goals({ goalData, newTaskData, checked }) {


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {goalData.map(goal =>  {

        const goalTasks = newTaskData.filter(task => {
          if (task.goalName == goal.goalName) {
            return true;
          }
          return false;
        })


        
        return (
          <>
            {/*  GOAL TITLE */}
            <h1 key={goal.id}>{goal.goalName}</h1>
            <h1>Size: {goalTasks.length}</h1>



            {goalTasks.map(GoalTask => {


              return (
                <>
                  <h1 key={GoalTask.id}>{GoalTask.taskName}</h1>
                </>
              );
            })}
          </>
        ); // if the goal object has an `id` property
      })}
    </Box>
  );
}
