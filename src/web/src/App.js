import './App.css';
import Router from './components/router/Router';
import { makeStyles } from '@mui/styles';
import NavBar from './components/navBar/NavBar';
import UtilBar from './components/utilBar/UtilBar';
import { SWContext } from './contexts/SWContext';
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
const App = () => {
  useEffect(() => {
    (async () => {
      try {
        const { user } = await signInWithEmailAndPassword(auth, '1234@gmail.com', 'tuechinhlatue1');
        console.log(user.accessToken);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <SWContext.Provider>
      <Router />
    </SWContext.Provider>
  );
};

export default App;
