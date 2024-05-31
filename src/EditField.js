import React from 'react';
import Button from '@mui/material/Button';
import Draggable from 'react-draggable';
import { InputLabel, Select, Checkbox, Paper, Box, MenuItem, TextField, RadioGroup, Divider, FormControl, FormLabel, FormControlLabel, Radio, Dialog, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-edit-form"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const EditField = ({ handleGold, openEdit, goalName, selectedCategoryOption, handleCategorySelect, handleDeleteGoal, handleDeleteCategory, categoryData, habitDays, handleRepeatDailyCheck, tasks, taskEditID, selectedGoalOption, goalData, handleGoalSelect, handleCloseEdit, handleDelete, handleChange, handleDescription, handleRadioButton, handleTypeRadioButton, taskType, handleStartDate, handleEndDate, handleCategory, handleEditSubmit, taskName, taskDesc, taskPriority, taskStartDate, taskEndDate, taskCategory, taskID }) => {

  return (
    <Dialog open={openEdit} onClose={handleCloseEdit} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-edit-form">
      <Button size="sm" variant="contained" 
        style={{ background: 'red', color: 'white' }}  onClick={() => handleDelete(taskID)}>
          Delete
      </Button>
      <Button size="sm" variant="contained" 
        style={{ background: 'green', color: 'white' }}  onClick={() => handleGold(taskID)}>
          Claim Points
      </Button>

    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-edit-form">Edit your Task</DialogTitle>
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
    
        {/* <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Task Type</FormLabel>
          <RadioGroup row name="task-type" value={taskType} onChange={handleTypeRadioButton}>
            <FormControlLabel value="Task" control={<Radio />} label="Task" />
            <FormControlLabel value="Habit" control={<Radio />} label="Habit" />
          </RadioGroup>
        </FormControl> */}

        {taskType === 'Habit' && 
      <FormControl variant="outlined" fullWidth margin="normal">
        <FormLabel>Repeat Every?</FormLabel>
        <Box display="flex" justifyContent="space-between">
          <FormControlLabel value="Mon" control={<Checkbox size="small" checked={habitDays.Mon} onChange={handleRepeatDailyCheck}/>} label="Mon" />
          <FormControlLabel value="Tue" control={<Checkbox size="small" checked={habitDays.Tue} onChange={handleRepeatDailyCheck}/>} label="Tue" />
          <FormControlLabel value="Wed" control={<Checkbox size="small" checked={habitDays.Wed} onChange={handleRepeatDailyCheck}/>} label="Wed" />
          <FormControlLabel value="Thu" control={<Checkbox size="small" checked={habitDays.Thu} onChange={handleRepeatDailyCheck}/>} label="Thu" />
          <FormControlLabel value="Fri" control={<Checkbox size="small" checked={habitDays.Fri} onChange={handleRepeatDailyCheck}/>} label="Fri" />
          <FormControlLabel value="Sat" control={<Checkbox size="small" checked={habitDays.Sat} onChange={handleRepeatDailyCheck}/>} label="Sat" />
          <FormControlLabel value="Sun" control={<Checkbox size="small" checked={habitDays.Sun} onChange={handleRepeatDailyCheck}/>} label="Sun" />
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
          onClick={() => handleEditSubmit(taskID)}
        >
          Save Task
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditField;


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
