import React, { useEffect, useState, useRef } from 'react';
import './style.css';

export default function ToDoApp() {



    
    function handleClick() {
        console.log("hey");
    }
    
    return(
        <div>
            <div className="taskstyle">
                <input type="text" placeholder="Enter a Task"></input>
                <button onClick={handleClick}>Add Task</button>
                {/* <input className="foo" type="checkbox" id="todo1"></input> 
                <label className="foo" for="todo1">Todo 1</label> */}
            </div>
        </div>
        
    );
}