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
    receipt: [{ item: 'asd', price: 123, desc: 'asd' }],
    total: 0,
    split: [{ user: '', owned: '', note: '' }]
  };
  // const formik = useFormik({
  //   initialValues: initialValues
  // });
  const handleReceiptChange = (e, index) => {
    const inputName = e.target.name;
    if (inputName.includes('item')) {
      console.log('item');
    }
    if (inputName.includes('price')) {
    }
    if (inputName.includes('desc')) {
    }
  };
  return (
    <div className={classes.container}>
      <ImgTable />
      <Formik initialValues={initialValues}>
        {({ values, touched, errors, handleChange, handleBlur, isValid }) => (
          <Form>
            <FieldArray name="receipt">
              {({ push, remove }) => {
                const props = {
                  values,
                  push,
                  remove,
                  handleChange,
                  handleReceiptChange
                };
                return <ReceiptTable {...props} />;
              }}
            </FieldArray>
          </Form>
        )}
      </Formik>
      <SplitTable />
    </div>
  );
};

export default Expense;
