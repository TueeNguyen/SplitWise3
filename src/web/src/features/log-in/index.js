import { Button, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';

// workspace imports

import axiosInstance from '../../configs/axios';
import { AppContext } from '../../providers';

const useStyles = makeStyles((theme) => ({
  logInPaper: {
    padding: '2rem 0',
    width: '90%',
    height: '120%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    margin: '0 auto',
    transform: 'translate(0, 50%)',
    border: 'solid 1px green'
  },
  textField: {
    width: '80%',
    [theme.breakpoints.down('md')]: {
      width: '95%'
    }
  }
}));

const LogInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(6, 'Password must have at least 6 characters')
});

const LogIn = () => {
  const classes = useStyles();
  const { setLoggedInUser } = useContext(AppContext);
  const [error, setError] = useState(null);

  const handleLogin = (values, setSubmitting) => {
    setSubmitting(false);
    (async () => {
      try {
        setError(null);
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
        setError(err);
        console.error(err);
      }
    })();
  };

  // TODO: Create a non-expiry token to use instead of having credentials here
  return (
    <>
      <Formik
        initialValues={{ email: 'public_user@gmail.com', password: '123456789' }}
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
                className={classes.textField}
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
                className={classes.textField}
              ></TextField>
              <ErrorMessage
                name="password"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />
              <Button type="submit" variant="contained">
                Login
              </Button>
              <span>* You can login as public user to see the site</span>
              {error && (
                <div style={{ color: 'red' }}>
                  {error?.response?.data?.message?.code && error.response.data.message.code}
                </div>
              )}
              <Typography variant="body1">
                Don't have an account? <NavLink to="/sign-up">Sign up</NavLink>
              </Typography>
            </Paper>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { LogIn };
