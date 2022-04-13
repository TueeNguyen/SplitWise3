import { IconButton, Tooltip, Popper, Box, Popover, Typography } from '@mui/material';
import React from 'react';
import SortIcon from '@mui/icons-material/Sort';
import { makeStyles } from '@mui/styles';
import SortMenu from './SortMenu';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '5px 10px'
  }
});

const SortButton = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  return (
    <div className={classes.container}>
      <Tooltip title="Sort" placement="right">
        <IconButton aria-describedby={id} type="button" onClick={handleClick}>
          <SortIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'end'
        }}
      >
        <SortMenu />
      </Popover>
    </div>
  );
};

export default SortButton;
