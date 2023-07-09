import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

export default function Goals({ goalData, newTaskData, checked }) {

  // const [progress, setProgress] = useState(0);
  const [progressArray, setProgressArray] = useState([]);

    useEffect(() => {



      goalData.forEach(goal => {
        const goalTasks = newTaskData.filter(task => {
          if (task.goalName == goal.goalName) {
            return true;
          }
          return false;
        })

        let numChecked = 0;

        for (let i = 0; i < goalTasks.length; i++) {
          if (checked.includes(goalTasks[i].taskID)) {
            numChecked++;
          }
        }

        console.log("Name: " + goal.goalName + " Progress: " + (Math.floor(numChecked / goalTasks.length) * 100));

        // console.log("name: " + goal.goalName + " numCheck: " + numChecked);
        // goal.progress = Math.floor((numChecked / goalTasks.length)) * 100;
        // console.log("avg: " + goal.progress);


      });


      // const progress = totalTasks > 0 ? (totalChecked / totalTasks) * 100 : 0;





    }, [goalData, newTaskData, checked]);  // dependencies


  return (
    <Box sx={{ height: 400, width: '100%' }}>

      {goalData.map(goal =>  {
        // const [progress, setProgress] = useState(0);



        
        const goalTasks = newTaskData.filter(task => {
          if (task.goalName == goal.goalName) {
            return true;
          }
          return false;
        })

        // let numChecked = 0;

        // for (let i = 0; i < goalTasks.length; i++) {
        //   if (checked.includes(goalTasks[i].taskID))
        //     numChecked++;
        // }
        

        // setProgress(100);

        // if (isNaN(progress)) {
        //   setProgress(0);
        // }

        
        return (
          <>
            {/*  GOAL TITLE */}
            <h1>Check console log for progress</h1>
            <h1 key={goal.id}>{goal.goalName}</h1>
            {/* <h1>Size: {goalTasks.length}</h1>
            <h1>Num Checked: {numChecked}</h1> */}
            <h1>Progress: {goal.progress}%</h1>
            <Box sx={{ width: '100%' }}>
              <LinearProgress variant="determinate" value={goal.progress}/>
            </Box>



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
