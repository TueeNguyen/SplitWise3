import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  menu: {
    width: '320px',
    maxWidth: '100%'
  },
  menuList: {
    padding: '10px'
  },
  menuItem: {
    borderRadius: '10px'
  }
});
export default function SortMenu() {
  const classes = useStyles();
  return (
    <Paper className={classes.menu}>
      <MenuList className={classes.menuList}>
        <MenuItem className={classes.menuItem}>
          <Typography variant="body1" color="text.primary">
            Sort by Date
          </Typography>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Typography variant="body1" color="text.primary">
            Sort by Alphabet
          </Typography>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Typography variant="body1" color="text.primary">
            Sort by Created
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
