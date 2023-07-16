import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import GoalTask from './GoalTask'
import "./style.css"

export default function Goals({ goalData, newTaskData, checked, handleToggle, taskID }) {
  const [goalDataState, setGoalData] = useState(goalData);

  useEffect(() => {
    const updatedGoalData = goalData.map(goal => {
      const goalTasks = newTaskData.filter(task => task.goalName === goal.goalName);

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
            {/* <h1 key={goal.id}>Goal: {goal.goalName}</h1> */}
            {/* <h1>Progress: {goal.progress}%</h1> */}
            {/* <Box sx={{ width: '100%' }}>
              <LinearProgress className="chosen" variant="determinate" value={goal.progress}/>
            </Box> */}
              <Card variant="outlined">
                  <React.Fragment>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Goal
                      </Typography>
                      <Typography variant="h5" component="div">
                        {goal.goalName}
                      </Typography>
                      <br></br>
                      <Box sx={{ width: '100%' }}>
                        <LinearProgress className="chosen" variant="determinate" value={goal.progress}/>
                      </Box>
                      <h1>{Math.floor(goal.progress)}%</h1>
                      <br></br>
                      {goalTasks.map(goalNode => (
                      <ul>  <GoalTask taskName={goalNode.taskName} checked={checked} handleToggle={handleToggle} taskID={goalNode.taskID}/> </ul>
                      ))}
                      {/* <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                      </Typography> */}
                    </CardContent>
                    {/* <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions> */}
                  </React.Fragment>
              </Card>
          </>
        ); // if the goal object has an `id` property
      })}
    </Box>
  );
}
               //<GoalTask key={goalNode.id} taskName={goalNode.taskName}/> 
