import React, { useContext, useState } from 'react';
import { ExpenseErrorContext } from '../../../../providers/ExpenseErrorProvider';
import { makeStyles } from '@mui/styles';
import { Button, Popover, Tooltip } from '@mui/material';

const useStyles = makeStyles({
  expenseErrorContainer: {
    position: 'absolute',
    bottom: 100,
    right: 100
  },
  expenseErrorItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ff3333',
    color: '#f2f2f2',
    minWidth: '500px',
    fontSize: '1.25rem'
  },
  expenseErrorItem: {
    padding: '0.5rem 1rem',
    borderBottom: 'solid 1px'
  },
  errorIcon: {
    '&:hover': {
      transform: 'scale(1.5)',
      transition: 'linear 0.1s'
    }
  },
  dismissButtonContainer: {
    background: 'white',
    color: 'black',
    textAlign: 'right'
  },
  dismissButton: {
    background: 'white',
    color: 'black',
    margin: '0.5rem'
  }
});

const ExpenseError = () => {
  const { errors, setShowError } = useContext(ExpenseErrorContext);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'error-popover' : undefined;

  const renderExpenseError = () => (
    <div className={classes.expenseErrorItemContainer}>
      {errors.map((error, index) => (
        <div className={classes.expenseErrorItem}>{error}</div>
      ))}
      {renderDismissButton()}
    </div>
  );

  const renderDismissButton = () => (
    <div className={classes.dismissButtonContainer}>
      <Tooltip title="To make the error pop up go away">
        <Button
          variant="outlined"
          className={classes.dismissButton}
          onClick={() => setShowError(false)}
        >
          Dismiss
        </Button>
      </Tooltip>
    </div>
  );

  return (
    <div className={classes.expenseErrorContainer}>
      <svg
        width="31"
        height="28"
        viewBox="0 0 31 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classes.errorIcon}
        onClick={handleClick}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 28L15.5 0L31 28H0ZM26.1105 25.0526L15.5 5.89474L4.88953 25.0526H26.1105ZM17 12H14V18.7222H17V12ZM14 20.5555V23H17V20.5555H14Z"
          fill="#FF0000"
          fillOpacity="0.75"
        />
      </svg>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        {renderExpenseError()}
      </Popover>
    </div>
  );
};

export default ExpenseError;
