import React from 'react';
import Draggable from 'react-draggable';
import { Button, Box, Paper, InputLabel, Checkbox, Select, MenuItem, IconButton, OutlinedInput, Chip, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import { Category } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

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
  
  return (
    <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-create-form">
    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-create-form">Create a Task</DialogTitle>
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
          </RadioGroup>
        </FormControl>

        {taskType === 'Habit' && 
      <FormControl variant="outlined" fullWidth margin="normal">
        <FormLabel>Repeat Every?</FormLabel>
        <Box display="flex" justifyContent="space-between">
          <FormControlLabel value="Mon" control={<Checkbox size="small" onChange={handleRepeatDailyCheck}/>} label="Mon" />
          <FormControlLabel value="Tue" control={<Checkbox size="small" onChange={handleRepeatDailyCheck}/>} label="Tue" />
          <FormControlLabel value="Wed" control={<Checkbox size="small" onChange={handleRepeatDailyCheck}/>} label="Wed" />
          <FormControlLabel value="Thu" control={<Checkbox size="small" onChange={handleRepeatDailyCheck}/>} label="Thu" />
          <FormControlLabel value="Fri" control={<Checkbox size="small" onChange={handleRepeatDailyCheck}/>} label="Fri" />
          <FormControlLabel value="Sat" control={<Checkbox size="small" onChange={handleRepeatDailyCheck}/>} label="Sat" />
          <FormControlLabel value="Sun" control={<Checkbox size="small" onChange={handleRepeatDailyCheck}/>} label="Sun" />
        </Box>
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
    
        <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="category-label">Select Category</InputLabel>
          <Select
            labelId="category-label"
            id="categoryName"
            value={selectedCategoryOption} // Change this if you have another state for selected category
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
                  handleDeleteCategory(category.taskCategory);
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

        <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="goal-label">Select Goal</InputLabel>
        <Select
          labelId="goal-label"
          id="goalName"
          value={selectedGoalOption} // Change this if you have another state for selected goal
          onChange={handleGoalSelect}
          renderValue={(selected) => selected}
        >
          <MenuItem value="New">Create New Goal</MenuItem>
          {goalData.map((goal) => (
            <MenuItem value={goal.goalName}>
              <Box display="flex" justifyContent="space-between" width="100%">
              {goal.goalName}
              <DeleteIcon
                onClick={(event) => {
                  event.stopPropagation(); // Prevents the selection of the item when clicking the delete button
                  handleDeleteGoal(goal.goalName);
                  console.log("You Tried to Delete the Goal");
                }} 
                aria-label="delete"
              />
              </Box>
            </MenuItem>
          ))}
          <MenuItem value="None">None</MenuItem>
        </Select>
      </FormControl>
    
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


/*


        <TextField 
          fullWidth
          margin="normal"
          label="Category" 
          variant="outlined" 
          value={taskCategory}
          onChange={handleCategory} 
        />


*/


/*



{taskType === 'Goal' && 
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="goal-label">Select Goal</InputLabel>
        <Select
          labelId="goal-label"
          id="goalName"
          value={selectedGoalOption} // Change this if you have another state for selected goal
          onChange={handleGoalSelect}
          renderValue={(selected) => selected}
        >
          <MenuItem value="New">Create New Goal</MenuItem>
          {goalData.map((goal) => (
            <MenuItem value={goal.goalName}>
              <Box display="flex" justifyContent="space-between" width="100%">
              {goal.goalName}
              <DeleteIcon
                onClick={(event) => {
                  event.stopPropagation(); // Prevents the selection of the item when clicking the delete button
                  handleDeleteGoal(goal.goalName);
                  console.log("You Tried to Delete the Goal");
                }} 
                aria-label="delete"
              />
              </Box>
            </MenuItem>
          ))}
          <MenuItem value="None">None</MenuItem>
        </Select>
      </FormControl>
      }




*/