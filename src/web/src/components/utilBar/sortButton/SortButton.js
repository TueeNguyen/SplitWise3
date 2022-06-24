import { IconButton, Tooltip, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import SortIcon from '@mui/icons-material/Sort';
import { makeStyles } from '@mui/styles';
import SortMenu from './SortMenu';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  sortButton: ({ pathname }) => ({
    marginLeft: pathname === '/search' ? 'auto' : '0'
  })
});

const SortButton = () => {
  const { pathname } = useLocation();
  const classes = useStyles({ pathname });
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'menu-poper' : undefined;
  return (
    <div className={classes.sortButton}>
      <Tooltip title="Sort" placement="bottom-start">
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
