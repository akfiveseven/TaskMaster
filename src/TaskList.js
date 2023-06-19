import React from 'react';

export default function TaskList({ tasks }) {
    

    
    return(
        <>
            {tasks.map((task, index) => (
            <div key={index}>
                <p>Task Name: {task.taskName}</p>
                <p>Task Priority: {task.taskPriority}</p>
                <p>Task Due Date: {task.taskDueDate}</p>
                <hr />
            </div>
            ))}
        </>
    );
}