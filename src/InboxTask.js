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

export default function InboxTask(props) {
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (InboxTaskID) => () => {
    console.log(InboxTaskID);
    const currentIndex = checked.indexOf(InboxTaskID);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(InboxTaskID);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Checked</TableCell>
            <TableCell>Task Name</TableCell>
            <TableCell>Task Desc</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Due Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.newTaskData.map((InboxTask) => (
            <TableRow
              key={InboxTask.taskID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Checkbox 
                  checked={checked.includes(InboxTask.taskID)} 
                  onChange={handleToggle(InboxTask.taskID)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {InboxTask.taskName}
              </TableCell>
              <TableCell>{InboxTask.taskDesc}</TableCell>
              <TableCell>{InboxTask.taskPriority}</TableCell>
              <TableCell>{InboxTask.taskStartDate}</TableCell>
              <TableCell>{InboxTask.taskCategory}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



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