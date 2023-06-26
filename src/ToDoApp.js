import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import CreateField from './CreateField';
import EditField from './EditField';
import "./style.css";
import { Button, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { InputLabel, Select, MenuItem } from '@mui/material';

export default function ToDoApp() {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskID, setTaskID] = useState(0);
  const [taskEditID, setTaskEditID] = useState(null);

  const [newTaskData, setNewTaskData] = useState([]);

  const [selectedOption, setSelectedOption] = useState("original");

  const [originalArray, setOriginalArray] = useState([]);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  function handleClick() {
    if (taskPriority) {
      const newTask = { taskName, taskDesc, taskPriority, taskStartDate, taskEndDate, taskCategory, taskID };
      const nextTaskID = taskID + 1;
      
      setNewTaskData((prevData) => {
        const newData = [...prevData, newTask];
        
        // Update other states that depend on the new data
        setOriginalArray(newData);
        setSelectedOption("sort");
        setTaskID(nextTaskID);
        
        // Reset fields after the state updates are done
        setTaskName("");
        setTaskDesc("");
        setTaskPriority("");
        setTaskStartDate("");
        setTaskEndDate("");
        setTaskCategory("");
  
        return newData;  // Return new data as the new state
      });
    } else {
      alert("Please Enter Task Name & Priority Level");
    }
  }
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescription = (e) => {
    setTaskDesc(e.target.value);
  };

  const handleRadioButton = (e) => {
    setTaskPriority(e.target.value);
  };

  const handleStartDate = (e) => {
    setTaskStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setTaskEndDate(e.target.value);
  };

  const handleCategory = (e) => {
    setTaskCategory(e.target.value);
  }

  const handleSort = (e) => {
    let newOption = e.target.value;
    setSelectedOption(newOption);
  };

  function handleDelete(id) {
    const updatedTasks = newTaskData.filter((task) => task.taskID !== id);
    setNewTaskData([...updatedTasks]);
  
    const otherUpdatedTasks = originalArray.filter((task) => task.taskID !== id);
    setOriginalArray([...otherUpdatedTasks]);

    const nextTaskID = taskID - 1;
    setTaskID(nextTaskID);
  };

  function handleEdit(taskID) {
    // Find the task with the given taskID
    const taskToEdit = newTaskData.find((task) => task.taskID === taskID);
    setTaskEditID(taskID);
    
    if (taskToEdit) {
      // Set the state to the values of the task to be edited
      setTaskName(taskToEdit.taskName);
      setTaskDesc(taskToEdit.taskDesc);
      setTaskPriority(taskToEdit.taskPriority);
      setTaskStartDate(taskToEdit.taskStartDate);
      setTaskEndDate(taskToEdit.taskEndDate);
      setTaskCategory(taskToEdit.taskCategory);
      setTaskID(taskToEdit.taskID);
    }
    
    handleClickOpenEdit();
  }
  

  function handleEditSubmit(taskID) {
    const updatedTask = { taskName, taskDesc, taskPriority, taskStartDate, taskEndDate, taskCategory, taskID };
    
    // Find the index of the task with the given taskID
    const index = newTaskData.findIndex((task) => task.taskID === taskID);
    if (index !== -1) {
      // Copy the array
      const tempTasks = [...newTaskData];
      // Replace the task at the found index with the updated task
      tempTasks[index] = updatedTask;
      // Update the state
      setNewTaskData(tempTasks);
      setTaskEditID(null);
      setTaskName("");
      setTaskDesc("");
      setTaskPriority("");
      setTaskStartDate("");
      setTaskEndDate("");
      setTaskCategory("");
    }
    
    // Close the edit dialog
    handleCloseEdit();
  }
  
  
  function sortByPriority() {
    let temp = [...newTaskData]; // Create a new copy of the array
    //setOriginalArray([...temp]);

    const sortAlgo = (a, b) => {
      const priorityOrder = ["High", "Medium", "Low"];
      return (
        priorityOrder.indexOf(a.taskPriority) -
        priorityOrder.indexOf(b.taskPriority)
      );
    };

    const sortedPriorityData = temp.sort(sortAlgo); // Sort the tasks based on priority level

    setNewTaskData(sortedPriorityData); // Update the state with the sorted tasks
  }

  function sortByDate() {
    let temp = [...newTaskData];
    //setOriginalArray([...temp]);

    const sortDate = (a, b) => {
      if (a.taskStartDate < b.taskStartDate) {
        return -1; // No change, date is in correct spot
      } else {
        return 1; // Swaps the values to put them in the correct spot
      }
    };

    const sortedDateData = temp.sort(sortDate);
    setNewTaskData(sortedDateData);
    
  }

  useEffect(() => {
    if (selectedOption === "priority") {
      sortByPriority();
    } else if (selectedOption === "due-date") {
      sortByDate();
    } else if (selectedOption === "original") {
      setNewTaskData([...originalArray]);
    } else {
      setNewTaskData([...originalArray]);
    }
  }, [selectedOption]);

  return (
    <div>
      {/* RENDER NAVBAR */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-xl-2 px-sm-2 px-0 bg-dark position-fixed">
            <div className="sidebar-text d-flex flex-column align-items-center text-white min-vh-100">
              <a
                href="/"
                className="d-flex align-items-center text-white text-decoration-none"
              >
                <span className="fs-5 d-none d-sm-inline">
                  <p className="sidebar-text">Menu</p>
                </span>
              </a>
              <button className="sidebar-text" onClick={handleClickOpen}>
                Create
              </button>
              {/* Add Navbar Elements */}
            </div>
          </div>
          <div className="col-md-9 col-xl-10 offset-md-3 offset-xl-2 px-sm-2 px-0">
          <Button variant="contained" color="primary" sx={{mt: 3, ml: 2}} onClick={handleClickOpen}>
        Create Task
      </Button>
      <CreateField
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleDescription={handleDescription}
        handleRadioButton={handleRadioButton}
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate}
        handleCategory={handleCategory}
        handleClick={handleClick}
        taskName={taskName}
        taskDesc={taskDesc}
        taskPriority={taskPriority}
        taskStartDate={taskStartDate}
        taskEndDate={taskEndDate}
        taskCategory={taskCategory}
      />

      <EditField
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
        handleChange={handleChange}
        handleDescription={handleDescription}
        handleRadioButton={handleRadioButton}
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate}
        handleCategory={handleCategory}
        handleEditSubmit={handleEditSubmit}
        tasks={newTaskData}
        taskID={taskEditID}
        taskName={taskName}
        taskDesc={taskDesc}
        taskPriority={taskPriority}
        taskStartDate={taskStartDate}
        taskEndDate={taskEndDate}
        taskCategory={taskCategory}
      />
            {/* Other Content */}
            <div className="filter-style">
            <FormControl variant="outlined" style={{ minWidth: 120 }} sx={{ml: 2}}>
              <InputLabel id="sort-label">Sort by</InputLabel>
                <Select
                  labelId="sort-label"
                  id="Sort"
                  value={selectedOption}
                  onChange={handleSort}
                  label="Sort by"
                >
                  <MenuItem value="original">Original</MenuItem>
                  <MenuItem value="priority">Priority</MenuItem>
                  <MenuItem value="due-date">Due Date</MenuItem>
                </Select>
            </FormControl>
            </div>
            {/* DASHBOARD */}
            <TaskList tasks={newTaskData}
              handleDelete={handleDelete}
              handleEdit={handleEdit} />
          </div>
        </div>
      </div>
    </div>
  );
}


