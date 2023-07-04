import React from "react";
import { Box, Grid, Typography, Paper, Divider } from "@mui/material";
import Task from "./Task";
import { DateCalendar } from "@mui/x-date-pickers";
import './style.css'; 
import { red } from "@mui/material/colors";
import InboxTask from "./InboxTask";
import Inbox from "./Inbox";

export default function TaskList(props) {
  // Get the current date
  const currentDate = new Date();
  currentDate.setHours(0,0,0,0); // Reset time of currentDate to 00:00:00.

  const offsetInMilliseconds = new Date().getTimezoneOffset() * 60000; // gets the offset in minutes and converts it to milliseconds

  const todayTasks = props.tasks.filter(task => {
    if (task.taskStartDate) {
      let taskDate = new Date(new Date(task.taskStartDate).getTime() + offsetInMilliseconds);
      taskDate.setHours(0,0,0,0);
      return taskDate.getTime() === currentDate.getTime();
    }
    return false;
  });

  const futureTasks = props.tasks.filter(task => {
    if (task.taskStartDate) {
      let taskDate = new Date(new Date(task.taskStartDate).getTime() + offsetInMilliseconds);
      taskDate.setHours(0,0,0,0);
      return taskDate.getTime() > currentDate.getTime();
    }
    return false;
  });

  const paperStyle = {
    minHeight: "40vh",
    maxHeight: "40vh",
    overflow: "auto",
    padding: '10px',
    marginRight: '20px',
    marginBottom: '10px',
    border: '1px solid #3f51b5', // This line adds a more pronounced border.
    boxShadow: '5px 5px 10px #888888' // This line adds shadow.
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={8} lg={6} style={{ marginTop: '0px'}}>
      <Paper style={paperStyle}>
          <Typography variant="h6" color="primary">Today</Typography>
          <Divider />
          {todayTasks.map((task, index) => (
            <Task
            alias={task.taskName}
            details={task.taskDesc}
            priority={task.taskPriority}
            startDate={task.taskStartDate}
            category={task.taskCategory}
            handleDelete={() => {
              props.handleDelete(task.taskID);
            }}
            handleEdit={() => {
              props.handleEdit(task.taskID);
            }}
            id={task.taskID}
            key={index}
            />
          ))}
        </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
        <Paper style={{ ...paperStyle, marginTop: "0px" }}>
          <Typography variant="h6" color="primary">Upcoming</Typography>
          <Divider />
          {futureTasks.map((task, index) => (
            <Task
            alias={task.taskName}
            details={task.taskDesc}
            priority={task.taskPriority}
            startDate={task.taskStartDate}
            category={task.taskCategory}
            handleDelete={() => {
              props.handleDelete(task.taskID);
            }}
            handleEdit={() => {
              props.handleEdit(task.taskID);
            }}
            id={task.taskID}
            key={index}
            />
          ))}
        </Paper>
      </Grid>
      <Inbox newTaskData={props.tasks} taskID={props.taskID} handleDelete={props.handleDelete} handleEdit={props.handleEdit}/>
    </Grid>
  );
}
