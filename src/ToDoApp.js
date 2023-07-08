/*
TOC
Section 1 - Imports
Section 2 - ToDoApp function
  2.1 - Use States
  2.2 - Functions
  2.3 - Return

*/

// Section 1 - Imports
import React, { useEffect, useState } from "react";
// import TaskList from "./TaskList";
import CreateField from './CreateField';
import EditField from './EditField';
import "./style.css";
import { Button, FormControl, FormLabel, IconButton, MenuItem, Select, TextField, InputLabel } from '@mui/material';
import { Alert, AlertTitle } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import CreateGoal from "./CreateGoal";
import { CollectionsBookmark } from "@mui/icons-material";

// Section 2 - ToDoApp Function
export default function ToDoApp() {
  // Section 2.1 - Use States
  // TASK DATA
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskID, setTaskID] = useState(0);
  const [taskType, setTaskType] = useState("");

  const [newTaskData, setNewTaskData] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);

  const [goalName, setGoalName] = useState("");
  const [goalData, setGoalData] = useState([]);

  // OTHER USE STATES
  const [taskEditID, setTaskEditID] = useState(null);
  
  //const [taskComplete, setTaskComplete] = useState(false);
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (InboxTaskID) => () => {
    console.log(InboxTaskID);
    const currentIndex = checked.indexOf(InboxTaskID);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(InboxTaskID);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // SORTING
  const [selectedOption, setSelectedOption] = useState("original"); 

  const [selectedGoalOption, setSelectedGoalOption] = useState("");

  // CREATE AND EDIT TASK TOGGLER
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openGoal, setOpenGoal] = useState(false);
  
  // DELETED USE STATES
  const [deletedTask, setDeletedTask] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);




  // Section 2.2 - Functions 
  function handleClick() {
    if (taskPriority && taskName) {
      const newTask = { taskName, taskDesc, taskPriority, taskStartDate, taskCategory, taskID, taskType, goalName: selectedGoalOption};
      const nextTaskID = taskID + 1;
      setTaskID(nextTaskID);
      setOpen(false)
      setNewTaskData((prevData) => {
        const newData = [...prevData, newTask];
        setOriginalArray(newData);
        setSelectedOption("sort");
        setTaskID(nextTaskID);
        setTaskType("");

        setTaskName("");
        setTaskDesc("");
        setTaskPriority("");
        setTaskStartDate("");
        setTaskCategory("");

        return newData;
      });
    } else {
      alert("Please Enter Task Name & Priority Level");
    }
    console.log(selectedGoalOption);
  }

  // HANDLES CREATING GOALS
  function handleSaveGoal() {
    const newGoal = {goalName};
    console.log(newGoal);
    setGoalData((prevData) => {
      const newGoalData = [...prevData, newGoal]
      return newGoalData;
    });
    setOpenGoal(false);
  }

  function handleSaveGoalSelection() {
    
  }

  function handleClickOpen() {
    setTaskID(taskID + 1);
    // setTaskType("Task");
    setTaskName("");
    setTaskDesc("");
    setTaskPriority("");
    setTaskStartDate("");
    setTaskCategory("");
    setTaskType("");
    setOpen(true);
  };

  // function handleDailyOpen() {
  //   setTaskType("Daily");
  //   setTaskName("");
  //   setTaskDesc("");
  //   setTaskPriority("");
  //   setTaskStartDate("");
  //   setTaskCategory("");
  //   setOpen(true);
  // }

  function handleClose() {
    setOpen(false);
    setOpenGoal(false);
  };

  function handleClickOpenEdit() {
    setOpenEdit(true);
  };

  function handleCloseEdit() {
    setOpenEdit(false);
  };

  function handleGoalClick() {
    setOpenGoal(true);
  }

  function handleChange(e) {
    setTaskName(e.target.value);
  };

  function handleChangeGoal(e) {
    setGoalName(e.target.value)
    
  }

  function handleDescription(e) {
    setTaskDesc(e.target.value);
  };

  function handleRadioButton(e) {
    setTaskPriority(e.target.value);
  };

  function handleTypeRadioButton(e) {
    if (e.target.value === "Task") {
      //console.log("TASK");
      
    }
    else if (e.target.value === "Habit") {
      //console.log("HABIT");

    }
    else if (e.target.value === "Goal") {
      //console.log("GOAL");
      //SHOW LIST OF CURRENT GOALS
    }
    setTaskType(e.target.value);
  };

  function handleStartDate(e) {
    setTaskStartDate(e.target.value);
  };

  function handleCategory(e) {
    setTaskCategory(e.target.value);
  };

  function handleSort(e) {
    let newOption = e.target.value;
    setSelectedOption(newOption);
  };

  function handleGoalSelect(e) {
    let newGoalOption = e.target.value;
    setSelectedGoalOption(newGoalOption);
  }

  function handleDelete(id) {
    let result = window.confirm("Are you sure you want to delete this task?");
    if (result) {
      const updatedTasks = newTaskData.filter((task) => task.taskID !== id);
      const deleted = newTaskData.find((task) => task.taskID === id);
      setDeletedTask(deleted);
      setNewTaskData([...updatedTasks]);

      const otherUpdatedTasks = originalArray.filter((task) => task.taskID !== id);
      setOriginalArray([...otherUpdatedTasks]);

      setShowDeleteAlert(true);
      setOpenEdit(false);

      setTimeout(() => {
        setShowDeleteAlert(false);
      }, 3000);
    }
  };

  function undoDelete() {
    if (deletedTask) {
      setNewTaskData((prevData) => [...prevData, deletedTask]);
      setOriginalArray((prevData) => [...prevData, deletedTask]);
      setDeletedTask(null);
    } else {
      alert("No task to undo");
    }
  }

  function handleEdit(taskID) {
    const taskToEdit = newTaskData.find((task) => task.taskID === taskID);
    setTaskEditID(taskID);

    if (taskToEdit) {
      setTaskName(taskToEdit.taskName);
      setTaskDesc(taskToEdit.taskDesc);
      setTaskPriority(taskToEdit.taskPriority);
      setTaskStartDate(taskToEdit.taskStartDate);
      setTaskCategory(taskToEdit.taskCategory);
      setTaskID(taskToEdit.taskID);
      setTaskType(taskToEdit.taskType);
      setSelectedGoalOption(taskToEdit.goalName);
    }

    handleClickOpenEdit();
  }

  function handleEditSubmit(taskID) {
    if (!taskName.trim()) {
      alert('Task name cannot be blank');
      return;
    }
  
    const updatedTask = { taskName, taskDesc, taskPriority, taskStartDate, taskCategory, taskID, taskType, goalName: selectedGoalOption};
    const index = newTaskData.findIndex((task) => task.taskID === taskID);
    
    if (index !== -1) {
      const tempTasks = [...newTaskData];
      const tempOriginal = [...originalArray];
      
      tempTasks[index] = updatedTask;
      tempOriginal[index] = updatedTask;
      
      setNewTaskData(tempTasks);
      setOriginalArray(tempOriginal);
      
      setTaskEditID(null);
      setTaskName("");
      setTaskDesc("");
      setTaskPriority("");
      setTaskStartDate("");
      setTaskCategory("");
      setTaskType("");
      setGoalName("");
    }
  
    handleCloseEdit();
  }
  

  function sortByPriority() {
    let temp = [...newTaskData];
    const sortAlgo = (a, b) => {
      const priorityOrder = ["High", "Medium", "Low"];
      return priorityOrder.indexOf(a.taskPriority) - priorityOrder.indexOf(b.taskPriority);
    };
    const sortedPriorityData = temp.sort(sortAlgo);
    setNewTaskData(sortedPriorityData);
  }

  function sortByDate() {
    let temp = [...newTaskData];
    const sortDate = (a, b) => {
      if (a.taskStartDate < b.taskStartDate) {
        return -1;
      } else {
        return 1;
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

  // Section 2.3 - return
  return (
        <>
        <TopNav 
        handleClickOpen={handleClickOpen}
        undoDelete={undoDelete}
        />
            <CreateField
              open={open}
              handleClose={handleClose}
              handleChange={handleChange}
              handleDescription={handleDescription}
              handleRadioButton={handleRadioButton}
              handleTypeRadioButton={handleTypeRadioButton}
              handleStartDate={handleStartDate}
              handleCategory={handleCategory}
              handleClick={handleClick}
              handleGoalSelect={handleGoalSelect}
              selectedGoalOption={selectedGoalOption}
              taskName={taskName}
              taskDesc={taskDesc}
              taskPriority={taskPriority}
              taskStartDate={taskStartDate}
              taskCategory={taskCategory}
              taskType={taskType}
              goalData={goalData}
              goalName={goalName}
            />

            <EditField
              openEdit={openEdit}
              handleCloseEdit={handleCloseEdit}
              handleDelete={handleDelete}
              handleChange={handleChange}
              handleDescription={handleDescription}
              handleRadioButton={handleRadioButton}
              handleTypeRadioButton={handleTypeRadioButton}
              handleStartDate={handleStartDate}
              handleCategory={handleCategory}
              handleEditSubmit={handleEditSubmit}
              handleGoalSelect={handleGoalSelect}
              selectedGoalOption={selectedGoalOption}
              tasks={newTaskData}
              taskID={taskEditID}
              taskName={taskName}
              taskDesc={taskDesc}
              taskPriority={taskPriority}
              taskStartDate={taskStartDate}
              taskCategory={taskCategory}
              taskType={taskType}
              goalData={goalData}
              goalName={goalName}
            />

            <CreateGoal 
              openGoal={openGoal}
              handleSaveGoal={handleSaveGoal}
              handleChangeGoal={handleChangeGoal}
              tasks={newTaskData}
              taskID={taskEditID}
              taskName={taskName}
              taskDesc={taskDesc}
              taskPriority={taskPriority}
              taskStartDate={taskStartDate}
              taskCategory={taskCategory}
              taskType={taskType}
            />

            <Sidebar tasks={newTaskData} checked={checked} handleDelete={handleDelete} handleEdit={handleEdit} handleClickOpen={handleClickOpen} handleGoalClick={handleGoalClick} goalData={goalData} goalName={goalName} taskID={taskID} selectedOption={selectedOption} handleSort={handleSort} handleToggle={handleToggle}/>

            {/* Success Alert */}
            <Snackbar
              open={showDeleteAlert}
              autoHideDuration={3000}
              TransitionComponent={Slide}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Task successfully deleted!
              </Alert>
            </Snackbar>
            </>
  );
}

// BOTTOM COMMENTS

/*

            <div className="filter-style">
              <FormControl variant="outlined" style={{ minWidth: 120 }}>
                <FormLabel id="sort-label">Sort by</FormLabel>
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
*/

/*
<div>
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
            </div>
          </div>
          <div className="col-md-9 col-xl-10 offset-md-3 offset-xl-2 px-sm-2 px-0">
*/