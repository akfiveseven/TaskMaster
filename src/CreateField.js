import React from 'react';
import { Button, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Dialog, DialogContent, DialogTitle } from '@mui/material';

const CreateField = ({ open, handleClose, handleChange, handleDescription, handleRadioButton, handleStartDate, handleEndDate, handleCategory, handleClick, taskName, taskDesc, taskPriority, taskStartDate, taskEndDate, taskCategory, taskID }) => {
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
