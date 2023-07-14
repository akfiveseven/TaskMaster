import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CardActions, Button, Typography, FormGroup, FormControlLabel, Checkbox, Chip, Grid, Paper} from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardTask from './DashboardTask';

export default function Dashboard({ newTaskData, checked, handleToggle, taskID }) {

  const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


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
                        <Chip sx={{ mr: "5px"}} label={node.taskType} />
                        <Chip label={node.taskCategory} />
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={6}>
              <Item>2</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>3</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>4</Item>
            </Grid>
          </Grid>
          </>
        );
      };













