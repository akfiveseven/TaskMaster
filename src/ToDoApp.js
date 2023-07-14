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
import { Button, FormControl, FormLabel, IconButton, MenuItem, Select, TextField, InputLabel, Box } from '@mui/material';
import { Alert, AlertTitle } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import CreateGoal from "./CreateGoal";
import { CollectionsBookmark } from "@mui/icons-material";
import CreateCategory from "./CreateCategory";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';

const actions = [
  { icon: <FileCopyIcon />, name: 'Set New Goal' },
  { icon: <SaveIcon />, name: 'Add New Task' },
];

// Section 2 - ToDoApp Function
export default function ToDoApp() {
  // Section 2.1 - Use States
  // TASK DATA
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskID, setTaskID] = useState(0);
  const [taskType, setTaskType] = useState("");

  const [newTaskData, setNewTaskData] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);

  const [goalName, setGoalName] = useState("");
  const [goalData, setGoalData] = useState([]);

  const [taskCategory, setTaskCategory] = useState("");         // CATEGORY
  const [categoryData, setCategoryData] = useState([]);         // CATEGORY

    // HABIT REPEAT DAY SELECTOR
    const [habitDays, setHabitDays] = useState({
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false
    });

  // OTHER USE STATES
  const [taskEditID, setTaskEditID] = useState(null);
  
  //const [taskComplete, setTaskComplete] = useState(false);
  const [checked, setChecked] = useState([]);

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

  // Use another piece of state to track the filtered tasks
  const [filteredTasks, setFilteredTasks] = useState([]);

  // GOAL SELECTION VARIABLE USED IN CREATE/EDIT FIELDS
  const [selectedGoalOption, setSelectedGoalOption] = useState("");
  const [selectedCategoryOption, setSelectedCategoryOption] = useState("");      // CATEGORY
  
  // CREATE AND EDIT TASK TOGGLER
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openGoal, setOpenGoal] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  // DELETED USE STATES
  const [deletedTask, setDeletedTask] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);




  // Section 2.2 - Functions 
  function handleClick() {
    if (taskPriority && taskName) {
      const taskHabitDays = { ...habitDays };
      const newTask = { taskName, taskDesc, taskPriority, taskStartDate, taskCategory: selectedCategoryOption, taskID, taskType, goalName: selectedGoalOption, habitDays: taskHabitDays};
      const nextTaskID = taskID + 1;
      setTaskID(nextTaskID);
      setOpen(false)
      setNewTaskData((prevData) => {
        const newData = [...prevData, newTask];
        setOriginalArray(newData);
        setSelectedOption("sort");
        setSelectedGoalOption("None");
        setSelectedCategoryOption("None");
        setTaskID(nextTaskID);
        setTaskType("");
        setTaskName("");
        setTaskDesc("");
        setTaskPriority("");
        setTaskStartDate("");
        setTaskCategory("");

        setHabitDays({ // Reset the checkboxes after creating a task
          Mon: false,
          Tue: false,
          Wed: false,
          Thu: false,
          Fri: false,
          Sat: false,
          Sun: false
        });

        return newData;
      });
    } else {
      alert("Please Enter Task Name & Priority Level");
    }
    //console.log(selectedGoalOption);
  }

  // HANDLES CREATING GOALS
  function handleSaveGoal() {
    const newGoal = {goalName, progress: 0};

    console.log(newGoal);
    setGoalData((prevData) => {
      const newGoalData = [...prevData, newGoal]
      return newGoalData;
    });
    setOpenGoal(false);
    setSelectedGoalOption(goalName);
  }

  function handleRepeatDailyCheck(e) {
    setHabitDays({
      ...habitDays,
      [e.target.value]: e.target.checked
    });
    console.log("Checked or Not: " + e.target.checked)
  };

  function handleClickOpen() {
    setTaskID(taskID + 1);
    //setTaskType("Task");
    setTaskName("");
    setTaskDesc("");
    setTaskPriority("");
    setTaskStartDate("");
    setTaskCategory("");
    setSelectedGoalOption("None");
    setSelectedCategoryOption("None");
    setTaskType("");
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
    setOpenGoal(false);
  };

  function handleClickOpenEdit() {
    setOpenEdit(true);
  };

  function handleCloseEdit() {
    setHabitDays({
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false
    });
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

  function handleCategorySelect(e) {
    let newCategoryOption = e.target.value;
    //console.log(newCategoryOption);
    if (newCategoryOption === "New") {
      setOpenCategory(true);
    }
    setSelectedCategoryOption(newCategoryOption);
  };

  function handleCategorySave() {
    const newCategory = taskCategory;

    setCategoryData((prevData) => {
      const newCategoryData = [...prevData, newCategory]
      return newCategoryData;
    });
    setOpenCategory(false);
    setSelectedCategoryOption(taskCategory);
    console.log(categoryData);
  }

  function handleChangeCategory(e) {
    setTaskCategory(e.target.value)
  }

  function handleSort(e) {
    let newOption = e.target.value;
    setSelectedOption(newOption);
  };

  function handleGoalSelect(e) {
    let newGoalOption = e.target.value;
    console.log(newGoalOption);
    if (newGoalOption === "New") {
      setOpenGoal(true);
    }
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

    if (taskToEdit) {
      setTaskName(taskToEdit.taskName);
      setTaskDesc(taskToEdit.taskDesc);
      setTaskPriority(taskToEdit.taskPriority);
      setTaskStartDate(taskToEdit.taskStartDate);
      setTaskCategory(taskToEdit.taskCategory);
      setTaskID(taskToEdit.taskID);
      setTaskType(taskToEdit.taskType);
      setSelectedGoalOption(taskToEdit.goalName);
      setSelectedCategoryOption(taskToEdit.taskCategory);
      setHabitDays(prevHabitDays => ({ ...prevHabitDays, ...taskToEdit.habitDays }));
      setTaskEditID(taskID);
    }

    handleClickOpenEdit();
  }

  function handleEditSubmit(taskID) {
    if (!taskName.trim()) {
      alert('Task name cannot be blank');
      return;
    }
  
    const updatedTask = { taskName, taskDesc, taskPriority, taskStartDate, taskCategory: selectedCategoryOption, taskID, taskType, goalName: selectedGoalOption, habitDays: { ...habitDays }};
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

      setHabitDays({ // Reset the checkboxes after editing a task
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false
      });
    }
  
    handleCloseEdit();
  }

  const handleCreate = (actionName) => {
    console.log(`You clicked on ${actionName}`);
      if (actionName === 'Add New Task') {
        handleClickOpen()
      }
      else if (actionName === 'Set New Goal') {
        handleGoalClick()
      }
  }
  
  function sortByCategory() {
    let temp = [...newTaskData]
    const sortCategory = (a, b) => {
      const categoryA = a.taskCategory.toLowerCase()
      const categoryB = b.taskCategory.toLowerCase();
      if (categoryA < categoryB) {
        return -1;
      }
      if (categoryA > categoryB) {
        return 1;
      }
      return 0;
    }
    const sortedCategoryData = temp.sort(sortCategory);
    setNewTaskData(sortedCategoryData);
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

  function sortByTaskType() {
    let temp = [...newTaskData];
    const sortTaskType = (a, b) => {
      if (a.taskType < b.taskType) {
        return -1;
      } 
      else if (a.taskType > b.taskType) {
        return 1;
      }
      else {
        return 0;
      }
    };
    const sortedTaskTypeData = temp.sort(sortTaskType);
    setNewTaskData(sortedTaskTypeData);
  }

  useEffect(() => {
    // Create a copy of newTaskData to work with
    let tasksToDisplay = [...newTaskData];
    
    // Filter tasks by selected category, unless 'None' is selected
    if (selectedCategoryOption !== 'None' && selectedCategoryOption !== 'All') {
      tasksToDisplay = tasksToDisplay.filter(task => task.taskCategory.toLowerCase() === selectedCategoryOption.toLowerCase());
    }
  
    // Create another copy of tasksToDisplay before sorting
    let tasksToSort = [...tasksToDisplay];
    
    // Then sort the copied tasks
    switch (selectedOption) {
      case 'priority':
        tasksToSort.sort(sortByPriority);
        break;
      case 'due-date':
        tasksToSort.sort(sortByDate);
        break;
      case 'category':
        tasksToSort.sort(sortByCategory);
        break;
      case 'task-type':
        tasksToSort.sort(sortByTaskType);
        break;
      default:
        // If no sort option is selected, tasksToSort will have the original order
    }
  
    // Finally, update the state with the filtered and sorted tasks
    setFilteredTasks(tasksToSort);
  }, [newTaskData, originalArray, selectedOption, selectedCategoryOption]);
  
  

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
              handleCategorySelect={handleCategorySelect}
              handleClick={handleClick}
              handleGoalSelect={handleGoalSelect}
              handleRepeatDailyCheck={handleRepeatDailyCheck}
              selectedGoalOption={selectedGoalOption}
              selectedCategoryOption={selectedCategoryOption}
              taskName={taskName}
              taskDesc={taskDesc}
              taskPriority={taskPriority}
              taskStartDate={taskStartDate}
              taskCategory={taskCategory}
              categoryData={categoryData}
              taskType={taskType}
              goalData={goalData}
              goalName={goalName}
              habitDays={habitDays}
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
              handleCategorySelect={handleCategorySelect}
              handleEditSubmit={handleEditSubmit}
              handleGoalSelect={handleGoalSelect}
              handleRepeatDailyCheck={handleRepeatDailyCheck}
              selectedGoalOption={selectedGoalOption}
              selectedCategoryOption={selectedCategoryOption}
              tasks={newTaskData}
              taskID={taskEditID}
              taskName={taskName}
              taskDesc={taskDesc}
              taskPriority={taskPriority}
              taskStartDate={taskStartDate}
              taskCategory={taskCategory}
              categoryData={categoryData}
              taskType={taskType}
              goalData={goalData}
              goalName={goalName}
              habitDays={habitDays}
            />

            <CreateGoal 
              openGoal={openGoal}
              handleSaveGoal={handleSaveGoal}
              handleChangeGoal={handleChangeGoal}
              handleClose={handleClose}
              tasks={newTaskData}
              taskID={taskEditID}
              taskName={taskName}
              taskDesc={taskDesc}
              taskPriority={taskPriority}
              taskStartDate={taskStartDate}
              taskCategory={taskCategory}
              taskType={taskType}
            />

            <CreateCategory
              openCategory={openCategory}
              handleClose={handleClose}
              handleCategorySelect={handleCategorySelect}
              handleCategorySave={handleCategorySave}
              handleChangeCategory={handleChangeCategory}
              tasks={newTaskData}
              taskID={taskEditID}
              taskName={taskName}
              taskDesc={taskDesc}
              taskPriority={taskPriority}
              taskStartDate={taskStartDate}
              taskCategory={taskCategory}
              categoryData={categoryData}
              taskType={taskType}
            />

            <Sidebar tasks={filteredTasks} checked={checked} sortByCategory={sortByCategory} handleCategorySelect={handleCategorySelect} selectedCategoryOption={selectedCategoryOption} categoryData={categoryData} handleDelete={handleDelete} handleEdit={handleEdit} handleClickOpen={handleClickOpen} handleGoalClick={handleGoalClick} goalData={goalData} goalName={goalName} taskID={taskID} selectedOption={selectedOption} handleSort={handleSort} handleToggle={handleToggle}/>

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

            <SpeedDial
              ariaLabel="SpeedDial controlled open example"
              sx={{ position: 'fixed', bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
              //onClose={handleClose}
              //onOpen={handleClickOpen}
              //open={open}
            >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleCreate(action.name)}
              />
            ))}
            </SpeedDial>
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