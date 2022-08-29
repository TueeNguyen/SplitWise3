import { Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';

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
  },
  navLink: {
    textDecoration: 'none'
  }
});

const LogInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(6, 'Password must have at least 6 characters')
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

  // TODO: Create a non-expiry token to use instead of having credentials here
  return (
    <>
      <Formik
        initialValues={{ email: '1234@gmail.com', password: 'tuechinhlatue1' }}
        validationSchema={LogInSchema}
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
              <ErrorMessage
                name="email"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <TextField
                name="password"
                value={values.password}
                type="password"
                onChange={handleChange}
              ></TextField>
              <ErrorMessage
                name="password"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <button type="submit">Login</button>

              <Typography variant="body1">
                Don't have an account?{' '}
                <NavLink className={classes.navLink} to="/sign-up">
                  Sign up
                </NavLink>
              </Typography>
            </Paper>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { LogIn };
