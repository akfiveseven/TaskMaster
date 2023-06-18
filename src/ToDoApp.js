import React, { useState } from 'react';
import './style.css';

export default function ToDoApp() {
    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [newTaskData, setNewTaskData] = useState([]);
    const [showTasks, setShowTasks] = useState(false);
  
    function handleClick() {
      const newTask = { taskName, taskPriority, taskDueDate };
      setNewTaskData(prevData => [...prevData, newTask]);
    }
  
    function handleShowTasks() {
      setShowTasks(true);
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
          <button onClick={handleShowTasks}>Show Tasks</button>
          {showTasks && (
            <>
              <h3>Task Data:</h3>
              {newTaskData.map((task, index) => (
                <div key={index}>
                  <p>Task Name: {task.taskName}</p>
                  <p>Task Priority: {task.taskPriority}</p>
                  <p>Task Due Date: {task.taskDueDate}</p>
                  <hr />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
  