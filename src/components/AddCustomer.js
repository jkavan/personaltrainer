import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export default function AddCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleInputChange = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  };

  const addCustomer = () => {
    props.saveCustomer(customer);
    handleClose();
  };

  return(
    <div>
      <Button
        style={{marginBottom: 10}}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<PersonAddIcon />}
      >
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={e => handleInputChange(e)}
            label="First name"
            fullWidth
          />
          <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={e => handleInputChange(e)}
            label="Last name"
            fullWidth
          />
          <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={e => handleInputChange(e)}
            label="Street address"
            fullWidth
          />
          <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={e => handleInputChange(e)}
            label="Post code"
            fullWidth
          />
          <TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={e => handleInputChange(e)}
            label="City"
            fullWidth
          />
          <TextField
            margin="dense"
            name="email"
            value={customer.email}
            onChange={e => handleInputChange(e)}
            label="Email address"
            fullWidth
          />
          <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={e => handleInputChange(e)}
            label="Phone number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={addCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}