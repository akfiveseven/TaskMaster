import React from 'react';
import { Button, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';

const CreateCategory = ({ openCategory, handleSaveGoal, handleCategorySelect, handleClose, handleChangeCategory, goalName, handleDescription, handleCategorySave, handleRadioButton, handleTypeRadioButton,  handleStartDate, handleEndDate, handleCategory, handleClick, taskName, taskDesc, taskPriority, taskStartDate, taskEndDate, taskCategory, taskID, taskType }) => {
  
  return (
    <Dialog open={openCategory} onClose={handleClose}>
    <DialogTitle id="form-dialog-title">Create a Category</DialogTitle>
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
