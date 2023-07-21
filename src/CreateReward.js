import React from 'react';
import Draggable from 'react-draggable';
import { Button, Paper, TextField, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}


const CreateReward = ({ open, handleRewardChange, handleClickReward, handleClose, handleChange, rewardName, handleRewardRadio, rewardLevel  }) => {
  return (
    <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-create-form">
    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-create-form">Create a Reward</DialogTitle>
    <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Reward Name" 
          variant="outlined"
          value={rewardName}
          onChange={handleRewardChange}
        />
    
    

        <Divider />
        
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Level</FormLabel>
          <RadioGroup row name="priority" value={rewardLevel} onChange={handleRewardRadio}>
            <FormControlLabel value="Low" control={<Radio />} label="Low" />
            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="High" control={<Radio />} label="High" />
          </RadioGroup>
        </FormControl>
        
        <Button 
          fullWidth
          variant="contained" 
          color="primary" 
          style={{ marginTop: '1em' }} 
          onClick={handleClickReward}
        >
          Add Reward
        </Button>
    
    
      </DialogContent>
    </Dialog>
  );
  
};

export default CreateReward;