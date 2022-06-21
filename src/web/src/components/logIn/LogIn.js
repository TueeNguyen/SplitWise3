import { Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { SWContext } from '../../contexts/SWContext';
import { auth } from '../../firebase/firebase';

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
  const { setLoggedInUser } = useContext(SWContext);
  const handleLogin = (values, setSubmitting) => {
    console.log(values);
    setSubmitting(false);
    (async () => {
      try {
        const { user } = await signInWithEmailAndPassword(auth, values.email, values.password);
        setLoggedInUser(user);
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
              <Typography>Login</Typography>
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

export default LogIn;