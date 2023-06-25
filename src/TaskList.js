import React from "react";
import { List, ListItem, Grid, Container, Box } from '@mui/material';
import Task from './Task'; // Ensure this path is correct

export default function TaskList(props) {
  return (
    <Box style={{maxHeight: '80vh', overflow: 'auto'}}>
    <Container>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {props.tasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Task
              alias={task.taskName}
              details={task.taskDesc}
              priority={task.taskPriority}
              startDate={task.taskStartDate}
              endDate={task.taskEndDate}
              category={task.taskCategory}
              handleDelete={() => { props.handleDelete(task.taskID) }}
              handleEdit={() => { props.handleEdit(task.taskID) }}
              id={task.taskID}
            />
          </Grid>
        ))}
      </Grid>
    </Container>  
    </Box>
  );
}
