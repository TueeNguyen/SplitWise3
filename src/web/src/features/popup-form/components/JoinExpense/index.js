import { Button, IconButton, Paper, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';

// workspace imports

import { AppContext } from '../../../../providers';
import axiosInstance from '../../../../configs/axios';

const useStyles = makeStyles({
  joinExpenseContainer: {
    pointerEvents: 'auto',
    filter: 'blur(0)',
    position: 'absolute',
    width: '50vw',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '999',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  innerContainer: {
    position: 'relative',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'red',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'rotate(90deg)'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }
});

const JoinExpense = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setPopUpForm, toLogIn } = useContext(AppContext);

  const validationSchema = Yup.object().shape({
    id: Yup.string().required("id is required to find an expense, 99% it's 15 characters"),
    password: Yup.string().required("id is required to join an expense, 99% it's 8 characters")
  });

  const initialValues = {
    id: '',
    password: ''
  };

  const handleSubmit = async (values, setSubmitting) => {
    setSubmitting(false);
    try {
      await axiosInstance.put(`/expense/join/${values.id.replace(/\s/g, '')}`, {
        password: values.password.replace(/\s/g, '')
      });

      setPopUpForm('');

      history.push(`/expense/${values.id}`);
    } catch (err) {
      if (err.response.status === 401) {
        toLogIn();
      }
      console.error(err);
    }
  };

  return (
    <Paper className={classes.joinExpenseContainer} elevation={5}>
      <div className={classes.innerContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        >
          {() => (
            <Form className={classes.form}>
              <Field name="id">
                {({ field, meta }) => (
                  <>
                    <TextField label="Expense id" type="text" {...field}></TextField>
                    {meta.touched && meta.error && console.log(meta.error)}
                  </>
                )}
              </Field>
              <Field name="password">
                {({ field, meta }) => (
                  <>
                    <TextField label="Password" type="text" {...field}></TextField>
                    {meta.touched && meta.error && console.log(meta.error)}
                  </>
                )}
              </Field>
              <Button color="success" variant="contained" type="submit">
                Join
              </Button>
            </Form>
          )}
        </Formik>
        <IconButton className={classes.closeBtn} onClick={setPopUpForm('')}>
          <CloseIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export { JoinExpense };
