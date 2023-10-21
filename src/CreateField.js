//import React from 'react';
import * as React from 'react';
import Draggable from 'react-draggable';
import { Button, Box, Paper, InputLabel, Checkbox, Select, MenuItem, IconButton, OutlinedInput, Chip, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import { Category } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";



function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-create-form"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}


const CreateField = ({ open, goalData, categoryData, selectedCategoryOption, handleDeleteGoal, handleDeleteCategory, goalName, habitDays, handleRepeatDailyCheck, selectedGoalOption, handleClose, handleGoalSelect, handleChange, handleDescription, handleRadioButton, handleTypeRadioButton,  handleStartDate, handleEndDate, handleCategorySelect, handleClick, taskName, taskDesc, taskPriority, taskStartDate, taskEndDate, taskCategory, taskID, taskType }) => {
 const [value, setValue] = React.useState(new Date()); 
    const [selectedMinutes, setSelectedMinutes] = React.useState(30);


    const renderSelectedMinutesLabel = () => {
    if (selectedMinutes > 60) {
      return "More than 1 hr";
    }
    return `${selectedMinutes} min(s)`;
  };
const handleSliderChange = (event, newValue) => {
    setSelectedMinutes(newValue);
  }; return ( <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-create-form"> <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-create-form">Create a Task</DialogTitle>
    <DialogContent>

        <TextField fullWidth margin="normal" label="Task"  variant="outlined" value={taskName} onChange={handleChange} />
    
        <TextField fullWidth margin="normal" label="Description"  variant="outlined"  multiline  rows={4} value={taskDesc} onChange={handleDescription} placeholder="Give your task some detail"/>

    


        <Divider />
        
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Priority</FormLabel>
          <RadioGroup row name="priority" value={taskPriority} onChange={handleRadioButton}>
            <FormControlLabel value="Low" control={<Radio />} label="Low" />
            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="High" control={<Radio />} label="High" />
          </RadioGroup>
        </FormControl>
        
        <TextField  fullWidth margin="normal" label="Due Date:"  type="date"  variant="outlined"  InputLabelProps={{ shrink: true }}  value={taskStartDate} onChange={handleStartDate} />
    
        <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="category-label">Select Category</InputLabel>
          <Select labelId="category-label" id="categoryName"
            value={selectedCategoryOption}// Change this if you have another state for selected category
            onChange={handleCategorySelect}
            renderValue={(selected) => selected}
          >
            <MenuItem value="New">Create New Category</MenuItem>
            {categoryData.map((category) => (
            <MenuItem value={category}>
              <Box display="flex" justifyContent="space-between" width="100%">
                {category}
                <DeleteIcon
                onClick={(event) => {
                  event.stopPropagation(); // Prevents the selection of the item when clicking the delete button
                  handleDeleteCategory(category);
                  console.log("You Tried to Delete the Category");
                }} 
                aria-label="delete"
                />
              </Box>
            </MenuItem>
          ))}
            <MenuItem value="None">None</MenuItem>
          </Select>
        </FormControl>

        <TextField  fullWidth margin="normal" label="Due Date:"  type="date"  variant="outlined"  InputLabelProps={{ shrink: true }}  value={taskStartDate} onChange={handleStartDate} />
      <div>
          <TimePicker fullWidth margin="normal" label="Start Time" variant="outlined"/>
      </div>
      <div>
          <TimePicker fullWidth margin="normal" variant="outlined" label="Due Time" />
      </div>


      <div>
      <Typography id="minutes-slider" gutterBottom>
        Completion time estimate: {renderSelectedMinutesLabel()}
      </Typography>
      <Slider
        value={selectedMinutes}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={1}
        max={61} // Set max to 100 or any value greater than 60
        aria-labelledby="minutes-slider"
      />
      {/* The rest of your to-do form */}
    </div>

    
        <Button  fullWidth variant="contained"  color="primary"  style={{ marginTop: '1em' }}  onClick={handleClick}>Add Task</Button>
      </DialogContent>
    </Dialog>
  );
  
};

export default CreateField;


