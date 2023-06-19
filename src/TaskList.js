import React from 'react';

export default function TaskList({ tasks }) {
    

    function handle(inp) {
        if (inp == 1) {
            return "Low";
        }
        else if (inp == 2) {
            return "Medium";
        }
        else if (inp == 3) {
            return "High";
        }
    }

    return(
        <>
            {tasks.map((task, index) => (
            <div key={index}>
                <p>Task Name: {task.taskName}</p>
                {/* <p>Task Priority: {handle(task.taskPriority)}</p> */}
                <p>Task Priority: {task.taskPriority}</p>

                <p>Task Due Date: {task.taskDueDate}</p>
                <hr />
            </div>
            ))}
        </>
    );
}