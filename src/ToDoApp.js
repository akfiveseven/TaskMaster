import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import "./style.css";
import Navbar from './Navbar'

export default function ToDoApp() {
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [newTaskData, setNewTaskData] = useState([]);

  const [selectedOption, setSelectedOption] = useState("original");

  const [originalArray, setOriginalArray] = useState([]);

  const [showResult, setShowResult] = useState(false);

  function handleClick() {
    if (taskPriority) {
      const newTask = { taskName, taskPriority, taskDueDate };
      setNewTaskData((prevData) => [...prevData, newTask]);
      setOriginalArray((prevData) => [...prevData, newTask]);
      setSelectedOption("sort");
    } else {
      alert("Please Enter Task Name & Priority Level");
    }
    /*
      const newTask = { taskName, taskPriority, taskDueDate };
      setNewTaskData(prevData => [...prevData, newTask]);
      setOriginalArray(prevData => [...prevData, newTask]);
      setSelectedOption("sort");
      */
  }

  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleRadioButton = (e) => {
    setTaskPriority(e.target.value);
  };

  const handleDueDate = (e) => {
    setTaskDueDate(e.target.value);
  };

  const handleSort = (e) => {
    let newOption = e.target.value;
    setSelectedOption(newOption);
  };

  const handleCreate = () => {
    setShowResult(!showResult);
  }

  const CreateField = () => {
    return(
      <>
        <div className="taskstyle">
          <input type="text" onChange={handleChange} placeholder="Enter a Task" />
          <button className="btn btn-dark" onClick={handleClick}>Add Task</button>
          <div className="priority-levels" onChange={handleRadioButton}>
            <input className="foo" type="radio" name="priority" value="Low" />
            <label className="foo" htmlFor="todo1">
              Low
            </label>
            <input className="foo" type="radio" name="priority" value="Medium" />
            <label className="foo" htmlFor="todo1">
              Medium
            </label>
            <input className="foo" type="radio" name="priority" value="High" />
            <label className="foo" htmlFor="todo1">
              High
            </label>
          </div>
          <input
            type="date"
            id="start"
            name="trip-start"
            min="2010-01-01"
            max="2099-12-31"
            onChange={handleDueDate}
          />
        </div>
      </>
    );
  }

  function sortByPriority() {
    let temp = [...newTaskData]; // Create a new copy of the array

    const sortAlgo = (a, b) => {
      const priorityOrder = ["High", "Medium", "Low"];
      return (
        priorityOrder.indexOf(a.taskPriority) -
        priorityOrder.indexOf(b.taskPriority)
      );
    };

    temp.sort(sortAlgo); // Sort the tasks based on priority level

    setNewTaskData(temp); // Update the state with the sorted tasks
  }

  function sortByDate() {
    let temp = [...newTaskData];

    const sortDate = (a, b) => {
      if (a.taskDueDate < b.taskDueDate) {
        return -1; // No change, date is in correct spot
      } else {
        return 1; // Swaps the values to put them in the correct spot
      }
    };

    temp.sort(sortDate);
    setNewTaskData(temp); // Update the state with the sorted tasks
  }

  useEffect(() => {
    if (selectedOption === "priority") {
      // setOriginalArray([...newTaskData]);
      sortByPriority();
    } else if (selectedOption === "due-date") {
      // setOriginalArray([...newTaskData]);
      sortByDate();
    } else if (selectedOption === "original") {
      setNewTaskData([...originalArray]);
    } else {
      setNewTaskData([...originalArray]);
    }
    // console.log("data: ")
    // console.log([...originalArray]);
  }, [selectedOption]);

  return (
    <div>
      {/* RENDER NAVBAR */}      
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-3 col-xl-2 px-sm-2 px-0 bg-dark position-fixed">
                <div className="sidebar-text d-flex flex-column align-items-center text-white min-vh-100">
                    <a href="/" className="d-flex align-items-center text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">
                            <p className="sidebar-text">Menu</p>
                        </span>
                    </a>
                    <button onClick={handleCreate}>Create</button>
                    {/* Add Navbar Elements */}
                </div>
            </div>
            <div className="col-md-9 col-xl-10 offset-md-3 offset-xl-2 px-sm-2 px-0">
              {/* Other Content */} 
              {showResult && CreateField()}
        </div>
      </div>
    </div>
  </div>



  );
}


/*
    <div className="content-container">
      <div className="taskstyle">
        <input type="text" onChange={handleChange} placeholder="Enter a Task" />
        <button onClick={handleClick}>Add Task</button>
        <div className="priority-levels" onChange={handleRadioButton}>
          <h3>Priority Level of Task?</h3>
          <input className="foo" type="radio" name="priority" value="Low" />
          <label className="foo" htmlFor="todo1">
            Low
          </label>
          <input className="foo" type="radio" name="priority" value="Medium" />
          <label className="foo" htmlFor="todo1">
            Medium
          </label>
          <input className="foo" type="radio" name="priority" value="High" />
          <label className="foo" htmlFor="todo1">
            High
          </label>
        </div>
        <h3>Due Date?</h3>
        <input
          type="date"
          id="start"
          name="trip-start"
          min="2010-01-01"
          max="2099-12-31"
          onChange={handleDueDate}
        />
      </div>
      <div className="task-container">
          <h3>Your Tasks</h3>
          <div className="sort-flex-container">
            <p className="sort-e">Sort by: </p>
            <select
              value={selectedOption}
              name="sort"
              id="Sort"
              onChange={handleSort}
            >
              <option value="original">Original</option>
              <option value="priority">Priority</option>
              <option value="due-date">Due Date</option>
            </select>
          </div>
          <TaskList tasks={newTaskData} />
      </div>
    </div>
*/