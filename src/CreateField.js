import React from 'react';
import { Button, InputLabel, Select, MenuItem, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';

const CreateField = ({ open, goalData, goalName, selectedGoalOption, handleClose, handleGoalSelect, handleChange, handleDescription, handleRadioButton, handleTypeRadioButton,  handleStartDate, handleEndDate, handleCategory, handleClick, taskName, taskDesc, taskPriority, taskStartDate, taskEndDate, taskCategory, taskID, taskType }) => {
  
  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle id="form-dialog-title">Create a Task</DialogTitle>
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
          <RadioGroup row name="taskType" value={taskType} onChange={handleTypeRadioButton}>
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
          id="goalName"
          value={selectedGoalOption} // Change this if you have another state for selected goal
          onChange={handleGoalSelect}
        >
          <MenuItem value="New">Add New Goal</MenuItem>
          {goalData.map((goal) => (
            <MenuItem value={goal.goalName}>{goal.goalName}</MenuItem>
          ))}
          <MenuItem value="None">None</MenuItem>
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
          onClick={handleClick}
        >
          Add Task
        </Button>
      </DialogContent>
    </Dialog>
  );
  
};

export default CreateField;
