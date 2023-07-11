import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Goals({ goalData, newTaskData, checked }) {
  const [goalDataState, setGoalData] = useState(goalData);

  useEffect(() => {
    const updatedGoalData = goalData.map(goal => {
      const goalTasks = newTaskData.filter(task => task.goalName === goal.goalName && task.taskType === "Goal");

      let numChecked = goalTasks.filter(task => checked.includes(task.taskID)).length;
      let newProgress = 0;
      if (goalTasks.length > 0) {
        newProgress = (numChecked / goalTasks.length) * 100;
      }
      // Clone goal object and update progress
      return {...goal, progress: newProgress};
    });

    setGoalData(updatedGoalData);

  }, [goalData, newTaskData, checked]);  // dependencies

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {goalDataState.map(goal =>  {
        const goalTasks = newTaskData.filter(task => task.goalName === goal.goalName);
        
        return (
          <>
            <h1 key={goal.id}>Goal: {goal.goalName}</h1>
            <h1>Progress: {goal.progress}%</h1>
            <Box sx={{ width: '100%' }}>
              <LinearProgress variant="determinate" value={goal.progress}/>
            </Box>
            {goalTasks.map(GoalTask => (
              <ul>
                <li key={GoalTask.id}>{GoalTask.taskName}</li>
              </ul>
            ))}
          </>
        ); // if the goal object has an `id` property
      })}
    </Box>
  );
}
