import { Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';

// workspace imports

import axiosInstance from '../../configs/axios';
import { AppContext } from '../../providers';

const useStyles = makeStyles({
  logInPaper: {
    width: '50vw',
    height: '120%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    margin: '0 auto'
  }
});

const LogIn = () => {
  const classes = useStyles();
  const { setLoggedInUser } = useContext(AppContext);
  const handleLogin = (values, setSubmitting) => {
    setSubmitting(false);
    (async () => {
      try {
        const {
          data: {
            data: { accessToken, uid }
          }
        } = await axiosInstance.post(
          `/user/login`,
          {
            email: values.email,
            password: values.password
          },
          {
            headers: {
              Content: 'application/json'
            }
          }
        );

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        const {
          data: { data }
        } = await axiosInstance.get(`/user/${uid}`);
        localStorage.setItem('SW_accessToken', accessToken);
        localStorage.setItem('SW_uid', uid);
        setLoggedInUser(data);
      } catch (err) {
        console.error(err);
      }
    })();
  };
  return (
    <>
      <Formik
        initialValues={{ email: '1234@gmail.com', password: 'tuechinhlatue1' }}
        onSubmit={(values, { setSubmitting }) => handleLogin(values, setSubmitting)}
      >
        {({ values, handleChange }) => (
          <Form>
            <Paper className={classes.logInPaper}>
              <Typography variant="h4">Login</Typography>
              <TextField
                name="email"
                value={values.email}
                type="email"
                onChange={handleChange}
              ></TextField>
              <TextField
                name="password"
                value={values.password}
                type="password"
                onChange={handleChange}
              ></TextField>
              <button type="submit">Login</button>
            </Paper>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { LogIn };
