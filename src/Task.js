import React from "react";

export default function Task(props) {
  return (
    // <div>
    //   <input
    //     className="checkboxStyle"
    //     type="checkbox"
    //     id={props.id}
    //     name={props.key}
    //   ></input>
    //   <label className="task-style" for={props.id}>
    //     <p>
    //       {props.alias} | {props.priority} | {props.date}
    //     </p>
    //   </label>
    // </div>
    <div className="card">
      <div className="card-body">
       <input
         className="checkboxStyle"
         type="checkbox"
         id={props.id}
         name={props.key}
       ></input>
        <h5 className="card-title">{props.alias}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {props.priority}
        </h6>
        <p className="card-text">{props.date}</p>
        <a href="#" className="card-link">
          EDIT
        </a>
        <a href="#" className="card-link">
          Delete
        </a>
      </div>
    </div>
  );
}
/*
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>  
*/
