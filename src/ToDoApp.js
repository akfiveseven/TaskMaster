import React, { useEffect, useState, useRef } from 'react';
import './style.css';

export default function ToDoApp() {

    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskID, setTaskID] = useState(0);
    const [taskObject, setTaskObject] = useState({});

    

    useEffect(() => {
        console.log(taskObject);
      }, [taskObject]);

    function handleClick() {
        const updatedTaskObject = {taskName, taskPriority, taskDueDate}; 
        setTaskObject(updatedTaskObject); 

        let newTaskData = [] //Create new Array to store created Task Objects
        newTaskData.push(updatedTaskObject) // Push taskObjects to new Array

        setTaskID(taskID + 1); // Increment the state variable taskID
        localStorage.setItem(taskID, JSON.stringify(newTaskData));  //Create item in localStorage with the taskID as its key and the array with object inside as value.



        // Tried to implement a taskID that is stored in localStorage and has its value read from localStorage so it doensn't lose data after refresh.

        //localStorage.setItem("ID", taskID)
        //localStorage.setItem(taskID, JSON.stringify(newTaskData));
        //console.log(taskID);
    }

    const handleChange = e => {
        setTaskName(e.target.value);
      };

    const handleRadioButton = e => {
        setTaskPriority(e.target.value);
    }

    const handleDueDate = e => {
        setTaskDueDate(e.target.value)
    }

    function handleClear() {
        localStorage.clear();
    }
    

    return(
        <div>
            <div className="taskstyle">
                    <input type="text" onChange={handleChange} placeholder="Enter a Task" required></input>
                    <button onClick={handleClick}>Add Task</button>
                    <div className="priority-levels" onChange={handleRadioButton}>
                        <h3>Priority Level of Task?</h3>
                        <input className="foo" type="radio" name="priority" value="Low" required></input> 
                        <label className="foo" for="todo1">Low</label>
                        <input className="foo" type="radio" name="priority" value="Medium" required></input> 
                        <label className="foo" for="todo1">Medium</label>
                        <input className="foo" type="radio" name="priority" value="High" required></input> 
                        <label className="foo" for="todo1">High</label>
                    </div>
                    <h3>Due Date?</h3>
                    <input type="date" id="start" name="trip-start" min="2010-01-01" max="2099-12-31" onChange={handleDueDate}></input>
                <button onClick={handleClear}>Handle Clear</button>
            </div>
        </div>
        
    );
}