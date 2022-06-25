import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ImgTable from './expenseForms/ImgTable';
import SplitTable from './expenseForms/SplitTable';
import ReceiptTable from './expenseForms/ReceiptTable';
import { Form, Formik, FieldArray, Field } from 'formik';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import axiosInstance from '../../../axios/axios';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { SWContext } from '../../../contexts/SWContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em'
  },
  bottomButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1em',
    justifyContent: 'space-between',
    margin: '40px'
  },
  expenseForm: {
    width: '100vw'
  },
  imgTable: {
    width: 'calc(100vw - 100px)'
  }
});

const Expense = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [expense, setExpense] = useState({});
  const [initialValues, setInitialValues] = useState(null);
  const { socket, toLogIn } = useContext(SWContext);
  // {
  //   userRoles: [],
  //   userIds: [],
  //   users: [],

  //   receiptImgFormId: '',
  //   receiptFormId: '',
  //   splitFormId: '',
  //   receiptImgForm: [],
  //   receiptForm: [],
  //   splitForm: [],
  //   total: 0,

  //   avatar: '',
  //   name: '',
  //   date: '',
  //   id: '',
  //   password: ''
  // }
  useEffect(() => {
    socket.once('USER_JOINED', (socketData) => {
      if (socketData.expenseId === id) {
        const { uid } = socketData;
        (async () => {
          try {
            const {
              data: { data }
            } = await axiosInstance.get(`/expense/${id}`);

            const newExpense = {
              ...expense,
              splitForm: {
                data: [
                  ...expense.splitForm.data,
                  data.splitForm.data.find((elem) => elem.userId === uid)
                ]
              },
              userIds: [...expense.userIds, uid],
              userRoles: [...expense.userRoles, data.userRoles.find((elem) => elem.uid === uid)],
              users: [...expense.users, data.users.find((elem) => elem.uid === uid)]
            };
            setExpense(newExpense);
          } catch (err) {
            if (err.response.status === 401) {
              toLogIn();
            }
            console.error(err);
          }
        })();
      }
    });
    return () => {
      socket.off('USER_JOINED');
    };
  }, [expense]);

  useEffect(() => {
    (async () => {
      // our backend returns {data: jsonObject} so we need to destructure data once more
      try {
        const {
          data: { data }
        } = await axiosInstance.get(`/expense/${id}`);
        setExpense(data);
      } catch (err) {
        if (err.response.status === 401) {
          toLogIn();
        }
        console.error(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (Object.keys(expense).length > 0) {
      const restructuredExpense = {
        ...expense,
        receiptForm: expense.receiptForm.data,
        receiptImgForm: expense.receiptImgForm.data,
        splitForm: expense.splitForm.data
      };
      setInitialValues(restructuredExpense);
    }
  }, [expense]);

  return (
    <>
      {initialValues ? (
        <div className={classes.container}>
          <Formik initialValues={initialValues} enableReinitialize>
            {({ values, resetForm, handleChange, setFieldValue }) => (
              <Form className={classes.expenseForm}>
                <Field name="receiptImgForm">
                  {({ form: { values, handleChange } }) => (
                    <div className={classes.imgTable}>
                      <ImgTable />
                    </div>
                  )}
                </Field>

                <FieldArray name="receiptForm">
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

                <div className={classes.bottomButtonsContainer}>
                  <Button
                    type="button"
                    startIcon={<RestartAltIcon fontSize="large" />}
                    variant="contained"
                    color="error"
                    id="resetBtn"
                    onClick={() => {
                      const reset = window.confirm('Do you want to reset the form?');
                      if (reset) {
                        resetForm();
                      }
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="button"
                    startIcon={<SyncAltIcon fontSize="large" />}
                    variant="contained"
                    color="success"
                    id="updateBtn"
                    onClick={() => {
                      // axios.put('/expense/:id')
                      // io.on('formUpdated', call axios.get('expense/:id'))
                    }}
                  >
                    Update
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
