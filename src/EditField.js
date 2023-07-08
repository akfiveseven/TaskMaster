import React from 'react';
import Button from '@mui/material/Button';
import { InputLabel, Select, MenuItem, TextField, RadioGroup, Divider, FormControl, FormLabel, FormControlLabel, Radio, Dialog, DialogContent, DialogTitle } from '@mui/material';

const EditField = ({ openEdit, goalName, tasks, taskEditID, selectedGoalOption, goalData, handleGoalSelect, handleCloseEdit, handleDelete, handleChange, handleDescription, handleRadioButton, handleTypeRadioButton, taskType, handleStartDate, handleEndDate, handleCategory, handleEditSubmit, taskName, taskDesc, taskPriority, taskStartDate, taskEndDate, taskCategory, taskID }) => {
  
  const taskBeingEdited = tasks.find((task) => task.taskID === taskEditID);
  const associatedGoal = taskBeingEdited ? taskBeingEdited.goalName : "None";

  return (
    <Dialog open={openEdit} onClose={handleCloseEdit}>
      <Button size="sm" variant="contained" 
        style={{ background: 'red', color: 'white' }}  onClick={() => handleDelete(taskID)}>
          Delete
      </Button>
    <DialogTitle id="form-dialog-title">Edit your Task</DialogTitle>
    <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Task" 
          variant="outlined"
          value={taskName}
          onChange={handleChange}
        />
    
        <TextField 
          fullWidth
          margin="normal"
          label="Description" 
          variant="outlined" 
          multiline 
          rows={4}
          value={taskDesc}
          onChange={handleDescription}
          placeholder="Give your task some detail"
        />
    
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Task Type</FormLabel>
          <RadioGroup row name="task-type" value={taskType} onChange={handleTypeRadioButton}>
            <FormControlLabel value="Task" control={<Radio />} label="Task" />
            <FormControlLabel value="Habit" control={<Radio />} label="Habit" />
            <FormControlLabel value="Goal" control={<Radio />} label="Goal" />
          </RadioGroup>
        </FormControl>

        {taskType === 'Goal' && 
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="goal-label">Select Goal</InputLabel>
        <Select
          labelId="goal-label"
          id="goal-select"
          value={selectedGoalOption} // Change this if you have another state for selected goal
          onChange={handleGoalSelect}
        >
          <MenuItem value="None">None</MenuItem>
          {goalData.map((goal) => (
            <MenuItem value={goal.goalName}>{goal.goalName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    }

        <Divider />
        
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Priority</FormLabel>
          <RadioGroup row name="priority" value={taskPriority} onChange={handleRadioButton}>
            <FormControlLabel value="Low" control={<Radio />} label="Low" />
            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="High" control={<Radio />} label="High" />
          </RadioGroup>
        </FormControl>
    
        <TextField 
          fullWidth
          margin="normal"
          label="Due Date:" 
          type="date" 
          variant="outlined" 
          InputLabelProps={{ shrink: true }}
          value={taskStartDate}
          onChange={handleStartDate} 
        />
    
        <TextField 
          fullWidth
          margin="normal"
          label="Category" 
          variant="outlined"
          value={taskCategory}
          onChange={handleCategory} 
        />
    
        <Button 
          fullWidth
          variant="contained" 
          color="primary" 
          style={{ marginTop: '1em' }} 
          onClick={() => handleEditSubmit(taskID)}
        >
          Save Task
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditField;
