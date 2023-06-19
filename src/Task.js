import React from 'react';

export default function Task(props) {
    return(
        <div>
            <input className="checkboxStyle" type="checkbox" id={props.id} name={props.key}></input>
            <label for={props.id}><p>{props.alias} | {props.priority} | {props.date}</p></label>
        </div>
    );
}