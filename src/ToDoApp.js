import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import CreateField from './CreateField';
import EditField from './EditField';
import "./style.css";
import { Button, FormControl, FormLabel, IconButton, MenuItem, Select, TextField } from '@mui/material';
import { Alert, AlertTitle } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

export default function ToDoApp() {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskID, setTaskID] = useState(0);
  const [taskEditID, setTaskEditID] = useState(null);

  const [newTaskData, setNewTaskData] = useState([]);

  const [selectedOption, setSelectedOption] = useState("original");

  const [originalArray, setOriginalArray] = useState([]);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [deletedTask, setDeletedTask] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  function handleClick() {
    if (taskPriority) {
      const newTask = { taskName, taskDesc, taskPriority, taskStartDate, taskCategory, taskID };
      const nextTaskID = taskID + 1;
      setTaskID(nextTaskID);

      setNewTaskData((prevData) => {
        const newData = [...prevData, newTask];
        setOriginalArray(newData);
        setSelectedOption("sort");
        setTaskID(nextTaskID);

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

  const handleCategory = (e) => {
    setTaskCategory(e.target.value);
  };

  const handleSort = (e) => {
    let newOption = e.target.value;
    setSelectedOption(newOption);
  };

  const handleDelete = (id) => {
    let result = window.confirm("Are you sure you want to delete this task?");
    if (result) {
      const updatedTasks = newTaskData.filter((task) => task.taskID !== id);
      const deleted = newTaskData.find((task) => task.taskID === id);
      setDeletedTask(deleted);
      setNewTaskData([...updatedTasks]);

      const otherUpdatedTasks = originalArray.filter((task) => task.taskID !== id);
      setOriginalArray([...otherUpdatedTasks]);

      setShowDeleteAlert(true);

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
    }

    handleClickOpenEdit();
  }

  function handleEditSubmit(taskID) {
    if (!taskName.trim()) {
      alert('Task name cannot be blank');
      return;
    }
  
    const updatedTask = { taskName, taskDesc, taskPriority, taskStartDate, taskCategory, taskID };
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
              handleStartDate={handleStartDate}
              handleCategory={handleCategory}
              handleClick={handleClick}
              taskName={taskName}
              taskDesc={taskDesc}
              taskPriority={taskPriority}
              taskStartDate={taskStartDate}
              taskCategory={taskCategory}
            />

            <EditField
              openEdit={openEdit}
              handleCloseEdit={handleCloseEdit}
              handleChange={handleChange}
              handleDescription={handleDescription}
              handleRadioButton={handleRadioButton}
              handleStartDate={handleStartDate}
              handleCategory={handleCategory}
              handleEditSubmit={handleEditSubmit}
              tasks={newTaskData}
              taskID={taskEditID}
              taskName={taskName}
              taskDesc={taskDesc}
              taskPriority={taskPriority}
              taskStartDate={taskStartDate}
              taskCategory={taskCategory}
            />

            <Sidebar tasks={newTaskData} handleDelete={handleDelete} handleEdit={handleEdit} handleClickOpen={handleClickOpen} taskID={taskID} selectedOption={selectedOption} handleSort={handleSort} />

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