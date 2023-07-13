import * as React from 'react';
import './style.css'
import { Button, TextField, RadioGroup, FormControl, FormLabel, Checkbox, FormControlLabel, FormGroup, Radio, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';

export default function GoalTask(props) {

    return (
        <FormGroup>
            <FormControlLabel control={<Checkbox checked={props.checked.includes(props.taskID)} 
                    onChange={props.handleToggle(props.taskID)} />} label={props.taskName} />
        </FormGroup>
    );
}