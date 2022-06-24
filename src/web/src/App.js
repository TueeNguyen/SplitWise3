import './App.css';
import Router from './components/router/Router';
import { SWContext } from './contexts/SWContext';
import { useEffect, useState } from 'react';
import axiosInstance from './axios/axios';
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const value = { loggedInUser, setLoggedInUser };

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
          console.error(err.response);
        }
        setLoading(true);
      })();
    }
  }, []);
  return <SWContext.Provider value={value}>{loading ? <Router /> : null}</SWContext.Provider>;
};

export default App;
