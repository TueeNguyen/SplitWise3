import { Button, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

// workspace imports

import axiosInstance from '../../configs/axios';
import { AppContext } from '../../providers';

const useStyles = makeStyles((theme) => ({
  signupPaper: {
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

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  username: Yup.string()
    .min(4, 'Username must have at least 4 characters')
    .required('Username required'),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters')
    .required('Password required'),
  confirmPassword: Yup.string()
    .required('Confirm password required')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
});

const SignUp = () => {
  const classes = useStyles();
  const { setLoggedInUser } = useContext(AppContext);

  const handleSignUp = (values, setSubmitting) => {
    setSubmitting(false);
    (async () => {
      try {
        const {
          data: { message }
        } = await axiosInstance.post(`/user/create`, {
          username: values.username,
          email: values.email,
          password: values.password
        });
        console.log(message);

        const {
          data: {
            data: { accessToken, uid }
          }
        } = await axiosInstance.post(`/user/login`, {
          email: values.email,
          password: values.password
        });

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
        initialValues={{
          email: '',
          username: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => handleSignUp(values, setSubmitting)}
      >
        {({ values, handleChange }) => (
          <Form>
            <Paper className={classes.signupPaper}>
              <Typography variant="h4">Sign up</Typography>

              <TextField
                name="email"
                value={values.email}
                type="email"
                label="Email"
                placeholder="jdoe@email.com"
                onChange={handleChange}
                className={classes.textField}
              ></TextField>
              <ErrorMessage
                name="email"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <TextField
                name="username"
                value={values.username}
                type="text"
                label="Username"
                placeholder="JohnDoe1"
                onChange={handleChange}
                className={classes.textField}
              ></TextField>
              <ErrorMessage
                name="username"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <TextField
                name="password"
                value={values.password}
                type="password"
                label="Password"
                placeholder="******"
                onChange={handleChange}
                className={classes.textField}
              ></TextField>
              <ErrorMessage
                name="password"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <TextField
                name="confirmPassword"
                value={values.confirmPassword}
                type="password"
                label="Confirm password"
                placeholder="******"
                onChange={handleChange}
                className={classes.textField}
              ></TextField>
              <ErrorMessage
                name="confirmPassword"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />

              <Button type="submit" variant="contained">
                Register
              </Button>
              <Typography variant="body1">
                Have an account?{' '}
                <NavLink className={classes.navLink} to="/login">
                  Log in
                </NavLink>
              </Typography>
            </Paper>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { SignUp };
