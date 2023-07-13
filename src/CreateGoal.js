import React from 'react';
import Draggable from 'react-draggable';
import { Button, Paper, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const CreateGoal = ({ openGoal, handleSaveGoal, handleChangeGoal, handleClose, handleChange, goalName, handleDescription, handleRadioButton, handleTypeRadioButton,  handleStartDate, handleEndDate, handleCategory, handleClick, taskName, taskDesc, taskPriority, taskStartDate, taskEndDate, taskCategory, taskID, taskType }) => {
  
  return (
    <Dialog open={openGoal} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Create a Goal</DialogTitle>
    <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Goal" 
          variant="outlined"
          value={goalName}
          onChange={handleChangeGoal}
        />
    
        <Button 
          fullWidth
          variant="contained" 
          color="primary" 
          style={{ marginTop: '1em' }} 
          onClick={handleSaveGoal}
        >
          Add Goal
        </Button>
      </DialogContent>
    </Dialog>
  );
  
};

export default CreateGoal;
