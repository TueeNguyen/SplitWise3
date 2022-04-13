import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
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
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList className={classes.menuList}>
        <MenuItem className={classes.menuItem}>
          <Typography variant="body1" color="text.primary">
            Sort by Date
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body1" color="text.primary">
            Sort by Alphabet
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body1" color="text.primary">
            Sort by Created
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
