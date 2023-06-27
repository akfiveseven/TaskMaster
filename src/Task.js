import React, { useState } from "react";
import { Card, CardContent, Typography, Checkbox, IconButton, Grid, Box, Chip, Tooltip, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function Task(props) {
  const [isCompleted, setIsCompleted] = useState(false);
  const priorityColor = getPriorityColor(props.priority);

  function getPriorityColor(priority) {
    switch (priority) {
      case "Low":
        return "green";
      case "Medium":
        return "orange";
      case "High":
        return "red";
      default:
        return "gray";
    }
  }

  const handleCheck = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <Card variant="outlined" style={{ margin: "10px 0", maxWidth: '400px' }}>
      <Grid container>
        <Grid item xs={1}>
          <Checkbox
            id={props.id}
            style={{ padding: "10px" }}
            checked={isCompleted}
            onChange={handleCheck}
          />
        </Grid>
        <Grid item xs={11}>
          <Box display="flex" alignItems="center">
            <Tooltip title={props.priority} arrow>
              <FiberManualRecordIcon style={{ color: priorityColor }} />
            </Tooltip>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginRight: 'auto',
                textDecoration: isCompleted ? 'line-through' : 'none',
              }}
            >
              {props.alias}
            </Typography>
            <IconButton
              color="primary"
              aria-label="edit task"
              onClick={() => props.handleEdit(props.id)}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <CardContent>
        <Typography variant="subtitle1">{props.details}</Typography>
        <Typography variant="subtitle2">
          <DateRangeIcon style={{ verticalAlign: "middle" }} />
          {" Start Date: " + props.startDate}
        </Typography>
        <Typography variant="subtitle2">
          <DateRangeIcon style={{ verticalAlign: "middle" }} />
          {" End Date: " + props.endDate}
        </Typography>
        <Typography variant="subtitle2" sx={{ marginTop: '10px' }}>
          Category:
        </Typography>
        <Box>
          <Chip label={props.category} color="primary" />
        </Box>
      </CardContent>
      <Box position="relative" textAlign="right" mt={2} ml={1}>
        <IconButton
          color="secondary"
          aria-label="delete task"
          onClick={() => props.handleDelete(props.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
