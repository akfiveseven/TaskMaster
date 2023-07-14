import React from 'react';
import Draggable from 'react-draggable';
import { Button, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel, Paper, Radio, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-categoryCreate-form"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const CreateCategory = ({ openCategory, handleSaveGoal, handleCategorySelect, handleClose, handleChangeCategory, goalName, handleDescription, handleCategorySave, handleRadioButton, handleTypeRadioButton,  handleStartDate, handleEndDate, handleCategory, handleClick, taskName, taskDesc, taskPriority, taskStartDate, taskEndDate, taskCategory, taskID, taskType }) => {
  
  return (
    <Dialog open={openCategory} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-categoryCreate-form">
    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-categoryCreate-form">Create a Category</DialogTitle>
    <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Category" 
          variant="outlined"
          value={taskCategory}
          onChange={handleChangeCategory}
        />
    
        <Button 
          fullWidth
          variant="contained" 
          color="primary" 
          style={{ marginTop: '1em' }} 
          onClick={handleCategorySave}
        >
          Add Category
        </Button>
      </DialogContent>
    </Dialog>
  );
  
};

export default CreateCategory;
