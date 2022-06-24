import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ImgTable from './expenseForms/ImgTable';
import SplitTable from './expenseForms/SplitTable';
import ReceiptTable from './expenseForms/ReceiptTable';
import { Form, Formik, FieldArray, Field } from 'formik';
import axiosInstance from '../../../axios/axios';
import { useParams } from 'react-router-dom';
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
  },
  imgTable: {
    width: 'calc(100vw - 100px)'
  }
});

const Expense = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [expense, setExpense] = useState({});
  const [initialValues, setInitialValues] = useState({
    userRoles: [],
    userIds: [],
    users: [],

    receiptImgFormId: '',
    receiptFormId: '',
    splitFormId: '',
    receiptImgForm: [],
    receiptForm: [],
    splitForm: [],
    total: 0,

    avatar: '',
    name: '',
    date: '',
    id: '',
    password: ''
  });

  useEffect(() => {
    (async () => {
      // our backend returns {data: jsonObject} so we need to destructure data once more
      const {
        data: { data }
      } = await axiosInstance.get(`/expense/${id}`);
      console.log(data);
      // setExpense(data);
    })();
  }, [id]);

  useEffect(() => {
    if (Object.keys(expense).length > 0) {
      const tempExpense = {
        ...expense,
        receiptForm: expense.receiptForm.data,
        receiptImgForm: expense.receiptImgForm.data,
        splitForm: expense.splitForm.data
      };
      setInitialValues(tempExpense);
    }
  }, [expense]);
  useEffect(() => {
    console.log(initialValues);
  }, [initialValues]);
  return (
    <>
      {Object.keys(expense).length > 0 ? (
        <div className={classes.container}>
          <Formik initialValues={initialValues}>
            {({ values, resetForm, handleChange, setFieldValue }) => (
              <Form className={classes.expenseForm}>
                <Field name="receiptImgForm">
                  {({ form: { values, handleChange } }) => (
                    <div className={classes.imgTable}>
                      <ImgTable />
                    </div>
                  )}
                </Field>

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
      ) : null}
    </>
  );
};

export default Expense;
