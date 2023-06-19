import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import './style.css';

export default function ToDoApp() {
    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [newTaskData, setNewTaskData] = useState([]);
    const [showTasks, setShowTasks] = useState(false);

    const [selectedOption, setSelectedOption] = useState('')

  
    function handleClick() {
      const newTask = { taskName, taskPriority, taskDueDate };
      setNewTaskData(prevData => [...prevData, newTask]);
    }
  
    const handleChange = e => {
      setTaskName(e.target.value);
    };
  
    const handleRadioButton = e => {
      setTaskPriority(e.target.value);
    };
  
    const handleDueDate = e => {
      setTaskDueDate(e.target.value);
    };

    const handleSort = (e) => {
        let newOption = e.target.value;
        setSelectedOption(newOption);
    }


    
    function sortByPriority() {
        let temp = [...newTaskData]; // Create a new copy of the array
      
        const sortAlgo = (a, b) => {
          const priorityOrder = ["High", "Medium", "Low"];
          return priorityOrder.indexOf(a.taskPriority) - priorityOrder.indexOf(b.taskPriority);
        };
      
        temp.sort(sortAlgo); // Sort the tasks based on priority level
      
        setNewTaskData(temp); // Update the state with the sorted tasks
    }

    function sortByDate() {
        let temp = [...newTaskData];


        // if (temp[0].taskDueDate < temp[1].taskDueDate) {
        //   console.log("first is earlier date");
        // }

        const sortDate = (a, b) => {
            if (a.taskDueDate < b.taskDueDate) {
              return -1; // No change, date is in correct spot
            }
            else {
              return 1; // Swaps the values to put them in the correct spot
            } 
        }

        temp.sort(sortDate);
        setNewTaskData(temp); // Update the state with the sorted tasks
    }
      





    // WHENEVER SORT BY VALUE CHANGES, THIS USE EFFECT IS EXECUTED
    useEffect(() => {
        //console.log(selectedOption);
        if (selectedOption === "priority") {
            sortByPriority();
        }
        else if (selectedOption === "due-date") {
          sortByDate();
        }
        else if (selectedOption === "sort") {
          setNewTaskData([]);
        }
        

        // TESTING
        // let g = [1, 3, 5, 4, 2];
        // selectionSort(g, g.length);
        // printArr(g);


    }, [selectedOption]);
  
    return (
      <div>
        <div className="taskstyle">
          <input type="text" onChange={handleChange} placeholder="Enter a Task" />
          <button onClick={handleClick}>Add Task</button>
          <div className="priority-levels" onChange={handleRadioButton}>
            <h3>Priority Level of Task?</h3>
            <input className="foo" type="radio" name="priority" value="Low" /> 
            <label className="foo" htmlFor="todo1">Low</label>
            <input className="foo" type="radio" name="priority" value="Medium" /> 
            <label className="foo" htmlFor="todo1">Medium</label>
            <input className="foo" type="radio" name="priority" value="High" /> 
            <label className="foo" htmlFor="todo1">High</label>
          </div>
          <h3>Due Date?</h3>
          <input type="date" id="start" name="trip-start" min="2010-01-01" max="2099-12-31" onChange={handleDueDate} />
        </div>
  
        <div>
          {/* <button onClick={handleShowTasks}>Show Tasks</button> */}
            <>
              <h3>Task Data:</h3>
              <select name="sort" id="Sort" onChange={handleSort}>
                <option value="sort">Sort By</option>
                <option value="priority">Priority</option>
                <option value="due-date">Due Date</option>
              </select>
              <TaskList tasks={newTaskData} />
            </>
        </div>
      </div>
    );
  }
  
    // function selectionSort(tempArray, size) {
    //   // THIS SELECTION SORT ONLY SORTS THE TASKS BY PRIORITY
    //   var i, j, min_index;

    //   for (let i = 0; i < size-1; i++) {
    //     min_index = i;
    //     for (j = i + 1; j < size; j++) {
    //       if (tempArray[j].taskPriority > tempArray[min_index].taskPriority) {
    //         min_index = j
    //       }
    //     }
    //     swap(tempArray, min_index, i);
    //   }
    // }

    // function printArr(array) {
    //   for (let i = 0; i < array.length; i++) {
    //     console.log(array[i]);
    //   }
    // }

    // function swap(tempArray, a, b) {
    //   var temp = tempArray[a];
    //   tempArray[a] = tempArray[b];
    //   tempArray[b] = temp;
    // }

    // function sortByPriority() {
    //   // let priorityArr = [];
    //   // let temp = newTaskData;        

    //   // selectionSort(temp, temp.length);
    //   // printArr(temp);
    //   // setNewTaskData([...temp]);
      
        
    // } 