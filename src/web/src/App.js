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
  }
});

const App = () => {
  const classes = useStyles();
  return (
    <body>
      <NavBar />
      <Router />
    </body>
  );
};

export default App;
