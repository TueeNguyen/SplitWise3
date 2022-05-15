import { makeStyles } from '@mui/styles';
import React from 'react';
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
      <ImgTable />
      <Formik initialValues={initialValues}>
        {({ values, handleChange, setFieldValue }) => (
          <Form>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Expense;
