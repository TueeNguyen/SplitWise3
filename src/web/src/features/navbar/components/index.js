import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, IconButton, Box, Avatar, Popover } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ProfilePopover } from './ProfilePopover';
import { useContext, useState } from 'react';
import { AppContext } from '../../../providers';

const useStyles = makeStyles({
  navBar: {
    top: 0,
    position: 'sticky',
    zIndex: '999'
  },
  toolBar: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    gap: '30px'
  },
  avatarButton: {
    padding: '0'
  },
  avatar: {
    width: '48px',
    height: '48px',
    border: 'solid 1px',
    pointerEvents: 'none'
  },
  navLink: {
    textDecoration: 'none'
  }
});

const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { loggedInUser } = useContext(AppContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'profile-popover' : undefined;
  return (
    <div className={classes.navBar}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <NavLink className={classes.navLink} to="/">
            Home
          </NavLink>
          <NavLink className={classes.navLink} to="/save">
            Saved
          </NavLink>
          <IconButton className={classes.avatarButton} onClick={handleClick}>
            <Avatar alt="Remy Sharp" src={loggedInUser.avatar} className={classes.avatar} />
          </IconButton>
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
            <ProfilePopover />
          </Popover>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { NavBar };
