import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles({
  navBar: {
    height: '2rem',
    backgroundColor: '#FFFFFF',
    color: '#000000'
  },
  avatar: {
    width: '48px',
    height: '48px'
  }
});

const NavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.navBar}>
      <AppBar position="fixed">
        <Toolbar className={classes.navBar}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton>
            <Avatar
              alt="Remy Sharp"
              src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d"
              className={classes.avatar}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
