import React from "react";
import Task from "./Task";

export default function TaskList(props) {
  return (
    <>
    <div>
      {props.tasks.map((task, index) => (
        <div key={index}>
          <Task
            key={index}
            id={index}
            alias={task.taskName}
            priority={task.taskPriority}
            date={task.taskDueDate}
          />
          {/* <p>Task Name: {task.taskName}</p>
                <p>Task Priority: {task.taskPriority}</p>
                <p>Task Due Date: {task.taskDueDate}</p>
            <hr /> */}
        </div>
      ))}
      </div>
    </>
  );
}
