import React from "react";
import { List, ListItem, Grid, Container } from '@mui/material';
import Task from './Task'; // Ensure this path is correct

export default function TaskList(props) {
  return (
    <Container>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {props.tasks.map((task, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Task
            id={index}
            alias={task.taskName}
            details={task.taskDesc}
            priority={task.taskPriority}
            startDate={task.taskStartDate}
            endDate={task.taskEndDate}
            category={task.taskCategory}
          />
        </Grid>
      ))}
    </Grid>
  </Container>  
  );
}
