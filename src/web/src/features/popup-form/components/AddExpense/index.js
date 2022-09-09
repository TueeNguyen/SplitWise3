import { TextField, IconButton, Button, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useRef, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import { AppContext } from '../../../../providers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import axiosInstance from '../../../../configs/axios';

const useStyles = makeStyles((theme) => ({
  addReceiptImg: {
    pointerEvents: 'auto',
    filter: 'blur(0)',
    position: 'absolute',
    width: '95%',
    maxWidth: '1024px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '999',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    border: 'solid 2px'
  },
  formWrapper: {
    position: 'relative',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
      padding: '50px 10px'
    }
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
  fileName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }
}));
const AddExpense = () => {
  const { setPopUpForm } = useContext(AppContext);
  const classes = useStyles();
  const imgInput = useRef();
  const [fileName, setFileName] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Receipt name is required'),
    date: Yup.date().required('Date is required')
  });

  const initialValues = {
    name: '',
    avatar: null,
    date: ''
  };
  const handleSubmit = async (values, setSubmitting) => {
    const formData = new FormData();
    formData.append('expenseAvatar', values.avatar);
    formData.append('name', values.name);
    const date = `${values.date.$d.getUTCDate()}-${
      values.date.$d.getUTCMonth() + 1
    }-${values.date.$d.getUTCFullYear()}`;
    console.log(date);
    formData.append('date', date);
    await axiosInstance.post('/expense/create', formData, {
      headers: {
        Content: 'multipart/form-data'
      }
    });
  };
  return (
    <Paper className={classes.addReceiptImg} elevation={5}>
      <div className={classes.formWrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form className={classes.form}>
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
              ></TextField>
              <ErrorMessage
                name="name"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />
              <div className={classes.addReceiptImgWrapper}>
                <Button onClick={() => imgInput.current.click()} size="small" variant="outlined">
                  <AddPhotoAlternateIcon />
                </Button>
                <p className={classes.fileName}>{fileName}</p>
              </div>
              <Field name="avatar">
                {() => (
                  <>
                    <input
                      ref={imgInput}
                      type="file"
                      accept="image/jpg, image/png, image/jpeg"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFileName(file.name);
                        setFieldValue('avatar', file);
                      }}
                    />
                  </>
                )}
              </Field>
              <ErrorMessage
                name="avatar"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />
              <Field name="date">
                {() => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      inputFormat="DD-MM-YYYY"
                      label="Date"
                      value={values.date}
                      onChange={(newDate) => {
                        console.log(newDate);
                        console.log(newDate.$d.getDate());
                        setFieldValue('date', newDate);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                )}
              </Field>
              <Button color="success" variant="contained" type="submit">
                Add
              </Button>
            </Form>
          )}
        </Formik>
        <IconButton className={classes.closeBtn} onClick={() => setPopUpForm('')}>
          <CloseIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export { AddExpense };
