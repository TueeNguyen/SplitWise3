import React, { useContext } from 'react';
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AppContext } from '../../../../providers';
import LogoutIcon from '@mui/icons-material/Logout';

const useStyles = makeStyles((theme) => ({
  profilePopover: {
    width: '425px',
    [theme.breakpoints.down('sm')]: {
      width: '300px'
    },
    display: 'flex',
    flexDirection: 'column'
  },
  profilePopoverItem: {
    padding: '20px'
  }
}));
const ProfilePopover = () => {
  const classes = useStyles();
  const { loggedInUser } = useContext(AppContext);
  return (
    <List className={classes.profilePopover} elevation={5}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar src={loggedInUser.avatar} />
          </ListItemAvatar>
          <ListItemText> {loggedInUser.username} </ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon sx={{ paddingLeft: '10px' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export { ProfilePopover };
