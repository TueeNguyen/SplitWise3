import './App.css';
import Router from './components/router/Router';
import { SWContext } from './contexts/SWContext';
import { useEffect, useState } from 'react';
import axiosInstance from './axios/axios';
import socketIOClient from 'socket.io-client';
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [appBlurring, setAppBlurring] = useState(false);
  const [joinExpenseForm, setJoinExpenseForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const socket = socketIOClient('ws://localhost:6060');

  const toLogIn = () => {
    setAppBlurring(false);
    setJoinExpenseForm(false);
    setLoggedInUser(false);
  };

  const providerValue = {
    loggedInUser,
    setLoggedInUser,
    appBlurring,
    setAppBlurring,
    joinExpenseForm,
    setJoinExpenseForm,
    socket,
    toLogIn
  };

  useEffect(() => {
    const token = localStorage.getItem('SW_accessToken');
    const uid = localStorage.getItem('SW_uid');
    if (!token || !uid) {
      setLoading(true);
    } else {
      (async () => {
        try {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axiosInstance.get(`/user/${uid}`);
          if (res.status === 200) {
            setLoggedInUser(res.data.data);
          }
        } catch (err) {
          if (err.response.status === 401) {
            toLogIn();
          }
          console.error(err.response);
        }
        setLoading(true);
      })();
    }
  }, []);
  return (
    <SWContext.Provider value={providerValue}>{loading ? <Router /> : null}</SWContext.Provider>
  );
};

export default App;
