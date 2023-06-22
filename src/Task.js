import React from "react";
import { Card, CardContent, Typography, Checkbox, IconButton, Grid, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Task(props) {

  return (
    <Card variant="outlined" style={{margin: '10px 0'}}>
  <Grid container>
    <Grid item xs={1}>
      <Checkbox id={props.taskID} style={{padding: '10px'}}/>
    </Grid>
    <Grid item xs={9}>
      <Typography variant="h5" style={{paddingLeft: '30px', paddingTop: '5px'}}>{props.alias}</Typography>
    </Grid>
    <Grid item xs={2} style={{textAlign: 'right'}}>
      <IconButton color="primary" aria-label="edit task">
        <EditIcon />
      </IconButton>
    </Grid>
  </Grid>
  <CardContent>
      <Typography variant="subtitle1">{props.details}</Typography>
      <Typography color="textSecondary">{props.priority}</Typography>
      <Typography>{props.startDate}</Typography>
      <Typography>{props.endDate}</Typography>
      <Typography>{"Category: " + props.category}</Typography>
  </CardContent>
  <Box textAlign="center" mt={2}>
    <IconButton color="secondary" aria-label="delete task" onClick={() => props.handleDelete(props.taskID)}>
      <DeleteIcon />
    </IconButton>
  </Box>
</Card>




  );
}
