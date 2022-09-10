import { useState, createContext, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

// workspace imports

import axiosInstance from '../../configs/axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [popUpForm, setPopUpForm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showExpenseSidebar, setShowExpenseSidebar] = useState(false);

  const socket = socketIOClient({ path: '/socket.io' });
  socket.on('error', (err) => console.log(err));
  socket.on('connect', () => console.log('connected'));

  const logout = () => {
    setPopUpForm('');
    setLoggedInUser(false);
  };
  useEffect(() => {
    const token = localStorage.getItem('SW_accessToken');
    const uid = localStorage.getItem('SW_uid');
    if (!token || !uid) {
      setLoading(true);
    } else {
      const logInUser = async () => {
        try {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axiosInstance.get(`/user/${uid}`);
          if (res.status === 200) {
            setLoggedInUser(res.data.data);
          }
        } catch (err) {
          if (err.response.status === 401) {
            logout();
          }
          console.error(err.response);
        }
        setLoading(true);
      };

      logInUser();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        loggedInUser,
        setLoggedInUser,
        popUpForm,
        setPopUpForm,
        socket,
        logout,
        showExpenseSidebar,
        setShowExpenseSidebar
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
