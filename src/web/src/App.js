import './App.css';
import Router from './components/router/Router';
import { SWContext } from './contexts/SWContext';
import { useEffect, useState } from 'react';
import axiosInstance from './axios/axios';
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const value = { loggedInUser, setLoggedInUser };
  useEffect(() => {
    if (loggedInUser) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${loggedInUser.accessToken}`;
    }
  }, [loggedInUser]);
  return (
    <SWContext.Provider value={value}>
      <Router />
    </SWContext.Provider>
  );
};

export default App;
