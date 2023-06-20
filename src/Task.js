import React from 'react';

export default function Task(props) {
    return(
        <div>
            <input className="checkboxStyle" type="checkbox" id={props.id} name={props.key}></input>
            <label className="task-style" for={props.id}><p>{props.alias} | {props.priority} | {props.date}</p></label>
        </div>
    );
}