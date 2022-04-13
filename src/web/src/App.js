import './App.css';
import Router from './components/router/Router';
import { makeStyles } from '@mui/styles';
import NavBar from './components/navBar/NavBar';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#EFEFEF'
  },
  navBar: {
    height: '2rem',
    backgroundColor: 'blue'
  },
  body: {
    height: '100%',
    backgroundColor: '#ECECEC'
  }
});

const App = () => {
  const classes = useStyles();
  return (
    <body className={classes.body}>
      <NavBar />
      <Router />
    </body>
  );
};

export default App;
