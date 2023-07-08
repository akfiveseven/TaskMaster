import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function DashboardTask(props) {
    
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0); // Reset time of currentDate to 00:00:00.
    const offsetInMilliseconds = new Date().getTimezoneOffset() * 60000; // gets the offset in minutes and converts it to milliseconds


    const todayTasks = props.newTaskData.filter(task => {
    if (task.taskStartDate) {
      let taskDate = new Date(new Date(task.taskStartDate).getTime() + offsetInMilliseconds);
      taskDate.setHours(0,0,0,0);
      return taskDate.getTime() === currentDate.getTime();
    }
    return false;
  });

    const futureTasks = props.newTaskData.filter(task => {
    if (task.taskStartDate) {
      let taskDate = new Date(new Date(task.taskStartDate).getTime() + offsetInMilliseconds);
      taskDate.setHours(0,0,0,0);
      return taskDate.getTime() > currentDate.getTime();
    }
    return false;
  });

  return (
    <>
        <p>Select a sort option in Inbox</p>
        <br></br>
        <h1>Today</h1>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>COMPLETE</TableCell>
                <TableCell>TASK NAME</TableCell>
                <TableCell>PRIORITY</TableCell>
                <TableCell>DUE DATE</TableCell>
                <TableCell>CATEGORY</TableCell>
                <TableCell>TASK TYPE</TableCell>
                <TableCell>TASK DESC</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {todayTasks.map((InboxTask) => (
                <TableRow
                key={InboxTask.taskID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell>
                    <Checkbox 
                    checked={props.checked.includes(InboxTask.taskID)} 
                    onChange={props.handleToggle(InboxTask.taskID)}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    {InboxTask.taskName}
                </TableCell>
                <TableCell>{InboxTask.taskPriority}</TableCell>
                <TableCell>{InboxTask.taskStartDate}</TableCell>
                <TableCell>{InboxTask.taskCategory}</TableCell>
                <TableCell>{InboxTask.taskType}</TableCell>
                <TableCell>{InboxTask.taskDesc}</TableCell>
                <Button size="sm" variant="plain" color="neutral" onClick={() => props.handleEdit(InboxTask.taskID)}>
                        Edit
                </Button>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <br></br>
        <h1>Upcoming</h1>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>COMPLETE</TableCell>
                <TableCell>TASK NAME</TableCell>
                <TableCell>PRIORITY</TableCell>
                <TableCell>DUE DATE</TableCell>
                <TableCell>CATEGORY</TableCell>
                <TableCell>TASK TYPE</TableCell>
                <TableCell>TASK DESC</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {futureTasks.map((InboxTask) => (
                <TableRow
                key={InboxTask.taskID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell>
                    <Checkbox 
                    checked={props.checked.includes(InboxTask.taskID)} 
                    onChange={props.handleToggle(InboxTask.taskID)}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    {InboxTask.taskName}
                </TableCell>
                <TableCell>{InboxTask.taskPriority}</TableCell>
                <TableCell>{InboxTask.taskStartDate}</TableCell>
                <TableCell>{InboxTask.taskCategory}</TableCell>
                <TableCell>{InboxTask.taskType}</TableCell>
                <TableCell>{InboxTask.taskDesc}</TableCell>
                <Button size="sm" variant="plain" color="neutral" onClick={() => props.handleEdit(InboxTask.taskID)}>
                        Edit
                </Button>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}

/*
<IconButton
              color="primary"
              aria-label="edit task"
              onClick={() => props.handleEdit(props.id)}
            >
              <EditIcon />
            </IconButton>
*/


/*
<Table hoverRow>
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Column width (40%)</th>
          <th>Calories</th>
          <th>Fat&nbsp;(g)</th>
          <th>Carbs&nbsp;(g)</th>
          <th>Protein&nbsp;(g)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td>{row.name}</td>
            <td>{row.calories}</td>
            <td>{row.fat}</td>
            <td>{row.carbs}</td>
            <td>{row.protein}</td>
          </tr>
        ))}
      </tbody>
    </Table>


<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.newTaskData.map((InboxTask) => {
        const labelId = `checkbox-list-label-${InboxTask}`;

        return (
          <ListItem
            key={InboxTask}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(InboxTask)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(InboxTask) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={<Task />} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    
*/