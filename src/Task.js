import React from "react";
import { Card, CardContent, Typography, Checkbox, IconButton, Grid, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Task(props) {
  return (
    <Card variant="outlined" style={{margin: '10px 0'}}>
  <CardContent>
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <Checkbox id={props.id} style={{padding: '10px'}}/>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h5">{props.alias}</Typography>
        <Typography variant="subtitle1">{props.details}</Typography>
        <Typography color="textSecondary">{props.priority}</Typography>
        <Typography>{props.startDate}</Typography>
        <Typography>{props.endDate}</Typography>
        <Typography>{props.category}</Typography>
      </Grid>
      <Grid item xs={1} style={{textAlign: 'right'}}>
        <IconButton color="primary" aria-label="edit task">
          <EditIcon />
        </IconButton>
      </Grid>
    </Grid>
  </CardContent>
  <Box textAlign="center" mt={2}>
    <IconButton color="secondary" aria-label="delete task">
      <DeleteIcon />
    </IconButton>
  </Box>
</Card>



  );
}
