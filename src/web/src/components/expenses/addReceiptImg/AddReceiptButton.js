import { Popover, Button } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddReceiptForm from './AddReceiptForm';

const AddReceiptButton = () => {
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'add-receipt-img-form' : undefined;
  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick} variant="outlined">
        Add Receipt Image
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <AddReceiptForm />
      </Popover>
    </div>
  );
};

export default AddReceiptButton;
