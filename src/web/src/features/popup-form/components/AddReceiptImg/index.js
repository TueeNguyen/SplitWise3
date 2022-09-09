import { TextField, IconButton, Button, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import { AppContext } from '../../../../providers';
import { PopupFormContext } from '../../../../providers/PopupFormProvider';

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
const AddReceiptImg = () => {
  const { setPopUpForm } = useContext(AppContext);
  const { error, setError, setData } = useContext(PopupFormContext);
  const classes = useStyles();
  const imgInput = useRef();
  const [fileName, setFileName] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Receipt name is required'),
    receiptImg: Yup.mixed().required('A receipt image is required')
  });

  const initialValues = {
    name: '',
    receiptImg: null
  };
  const handleSubmit = (values) => {
    console.log(values);
    setData(values);
  };

  return (
    <Paper className={classes.addReceiptImg} elevation={5}>
      <div className={classes.formWrapper}>
        <h2>Add a receipt image</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        >
          {({ values, touched, handleChange, setFieldValue }) => (
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
              {error && error.target === 'name' && touched.name ? (
                <div style={{ color: 'red' }}>{error.message}</div>
              ) : null}
              <div className={classes.addReceiptImgWrapper}>
                <Button onClick={() => imgInput.current.click()} size="small" variant="outlined">
                  <AddPhotoAlternateIcon />
                </Button>
                <p className={classes.fileName}>{fileName}</p>
              </div>
              <Field name="receiptImg">
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
                        setFieldValue('receiptImg', file);
                      }}
                    />
                  </>
                )}
              </Field>
              <ErrorMessage
                name="receiptImg"
                render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
              />
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

export { AddReceiptImg };
