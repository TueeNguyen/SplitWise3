import { makeStyles } from '@mui/styles';
import React from 'react';
import { Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ImgTable from './expenseForms/ImgTable';
import SplitTable from './expenseForms/SplitTable';
import ReceiptTable from './expenseForms/ReceiptTable';
import { Form, Formik, FieldArray } from 'formik';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em'
  },

  expenseForm: {
    width: '100vw'
  },
  resetBtn: {
    display: 'flex',
    alignSelf: 'end',
    margin: '0px 40px 20px 0px'


  imgTable: {
    width: 'calc(100vw - 100px)'

  }
});

const Expense = () => {
  const classes = useStyles();
  const initialValues = {
    receipt: [{ item: '', price: 0, desc: '' }],
    total: 0,
    splitForm: [
      { user: '', owned: 0, fixed: false, note: '' },
      { user: '', owned: 0, fixed: false, note: '' },
      { user: '', owned: 0, fixed: false, note: '' }
    ]
  };
  return (
    <div className={classes.container}>
      <div className={classes.imgTable}>
        <ImgTable />
      </div>
      <Formik initialValues={initialValues}>
        {({ values, resetForm, handleChange, setFieldValue }) => (
          <Form className={classes.expenseForm}>
            <FieldArray name="receipt">
              {({ push, remove }) => {
                const props = {
                  values,
                  push,
                  remove,
                  handleChange,
                  setFieldValue
                };
                return <ReceiptTable {...props} />;
              }}
            </FieldArray>
            <FieldArray name="splitForm">
              {({ push, remove }) => {
                const props = {
                  values,
                  handleChange,
                  setFieldValue
                };
                return <SplitTable {...props} />;
              }}
            </FieldArray>
            <div className={classes.container}>
              <Button
                type="button"
                startIcon={<RestartAltIcon fontSize="large" />}
                variant="contained"
                color="error"
                className={classes.resetBtn}
                onClick={() => {
                  resetForm();
                }}
              >
                Reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Expense;
