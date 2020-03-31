import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: '',
    duration: '',
    activity: '',
    customer: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleInputChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value, customer: props.customer.links[0].href});
    console.log(training);
  };

  const addTraining = () => {
    props.saveTraining(training);
    handleClose();
  };

  return(
    <div>
      <IconButton
        onClick={handleClickOpen}
        color="primary"
      >
        <AddCircleIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            onChange={e => handleInputChange(e)}
            label="Date and time"
            type="datetime-local"
            fullWidth
          />
          <TextField
            margin="dense"
            name="duration"
            onChange={e => handleInputChange(e)}
            label="Duration (minutes)"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            onChange={e => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}

