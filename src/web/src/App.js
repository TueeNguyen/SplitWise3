import './App.css';
import Router from './components/router/Router';
import { makeStyles } from '@mui/styles';
import NavBar from './components/navBar/NavBar';
import UtilBar from './components/utilBar/UtilBar';
import { SWContext } from './contexts/SWContext';
import { useEffect, useState } from 'react';
import { auth } from './firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const value = { loggedInUser, setLoggedInUser };

  return (
    <SWContext.Provider value={value}>
      <Router />
    </SWContext.Provider>
  );
};

export default App;
