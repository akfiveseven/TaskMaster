import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CardActions, Button, Typography, FormGroup, FormControlLabel, Checkbox, Chip, Grid, Paper} from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardTask from './DashboardTask';
import GoalTask from './GoalTask';
import LinearProgress from '@mui/material/LinearProgress';

export default function Dashboard({ newTaskData, checked, handleToggle, taskID, rewardData, handleRewardClaim, goalData }) {
//export default function Goals({ goalData, newTaskData, checked, handleToggle, taskID }) {

  const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

  const [goalDataState, setGoalData] = React.useState(goalData);

  React.useEffect(() => {
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

    const currentDate = new Date();
    currentDate.setHours(0,0,0,0); // Reset time of currentDate to 00:00:00.
    const offsetInMilliseconds = new Date().getTimezoneOffset() * 60000; // gets the offset in minutes and converts it to milliseconds


    const todayTasks = newTaskData.filter(task => {
    if (task.taskStartDate) {
      let taskDate = new Date(new Date(task.taskStartDate).getTime() + offsetInMilliseconds);
      taskDate.setHours(0,0,0,0);
      return taskDate.getTime() === currentDate.getTime();
    }
    return false;
  });



    const uncheckedTasks = newTaskData.filter(task => {
      if (!checked.includes(task.taskID)) {
        return true;
      }
      return false;
    });

    const noDateTasks = newTaskData.filter(task => {
      if (task.taskStartDate == "") {
        return true;
      }
      return false;
    });

  return (
    <>
     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom>Today's Tasks</Typography>
              {todayTasks.map(node => {
                let color = "";

                if (node.taskPriority == "Medium") {
                  color = "warning";
                }
                else if (node.taskPriority == "Low") {
                  color = "success";
                }
                else if (node.taskPriority == "High") {
                  color = "error";
                }

                return (
                  <Grid item xs={12}>
                    <Card variant="outlined" sx={{ mb: "10px"}}>
                      <CardContent>
                        <FormGroup>
                          <FormControlLabel 
                            control={
                              <Checkbox 
                                checked={checked.includes(node.taskID)} 
                                onChange={handleToggle(node.taskID)}
                              />
                            }
                            label={node.taskName} 
                          />
                        </FormGroup>
                        <Typography color="text.secondary">
                          {node.taskDesc}
                        </Typography>
                        <br />
                        <Chip sx={{ mr: "5px"}} color={color} label={node.taskPriority} />
                        {/* <Chip sx={{ mr: "5px"}} label={node.taskType} /> */}
                        <Chip label={node.taskCategory} />
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" gutterBottom>Rewards</Typography>
              {rewardData.map(node => {
                return (
                  <Grid item xs={12}>
                    <Card variant="outlined" sx={{ mb: "10px"}}>
                      <CardContent>
                        <Typography>
                          {node.rewardName}
                        </Typography>
                        {/* <br /> */}
                        <Typography color="text.secondary">
                          {"Cost: " + node.rewardCost}
                        </Typography>
                        {/* <Chip sx={{ mr: "5px"}} color={color} label={node.taskPriority} />
                        <Chip sx={{ mr: "5px"}} label={node.taskType} />
                        <Chip label={node.taskCategory} /> */}
                        <Button variant="outlined" onClick={() => handleRewardClaim(node.rewardID)}>Claim Reward</Button>
                      </CardContent>
                    </Card>
                  </Grid>

                );
              })}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" gutterBottom>Unchecked Tasks</Typography>

              {uncheckedTasks.map(node => {
                let color = "";

                if (node.taskPriority == "Medium") {
                  color = "warning";
                }
                else if (node.taskPriority == "Low") {
                  color = "success";
                }
                else if (node.taskPriority == "High") {
                  color = "error";
                }

                return (
                  <Grid item xs={12}>
                    <Card variant="outlined" sx={{ mb: "10px"}}>
                      <CardContent>
                        <FormGroup>
                          <FormControlLabel 
                            control={
                              <Checkbox 
                                checked={checked.includes(node.taskID)} 
                                onChange={handleToggle(node.taskID)}
                              />
                            }
                            label={node.taskName} 
                          />
                        </FormGroup>
                        <Typography color="text.secondary">
                          {node.taskDesc}
                        </Typography>
                        <br />
                        <Chip sx={{ mr: "5px"}} color={color} label={node.taskPriority} />
                        {/* <Chip sx={{ mr: "5px"}} label={node.taskType} /> */}
                        <Chip label={node.taskCategory} />
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>Goals</Typography>

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
  
            </Grid>
          </Grid>
          </>
        );
      };













