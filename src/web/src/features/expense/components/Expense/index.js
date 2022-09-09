import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Form, Formik, FieldArray, Field } from 'formik';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { useParams } from 'react-router-dom';

// workspace imports

import { AppContext } from '../../../../providers';
import axiosInstance from '../../../../configs/axios';
import { ExpenseSideBar } from './ExpenseSideBar';
import { SplitForm, ReceiptImgForm, ReceiptForm } from '../ExpenseTableForms';
import ExpenseError from '../ExpenseError';
import {
  ExpenseErrorContext,
  ExpenseErrorProvider
} from '../../../../providers/ExpenseErrorProvider';
import { SOCKET_EVENTS } from '../../../../constants';

const useStyles = makeStyles({
  expenseContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em',
    position: 'relative',
    margin: '20px 0'
  },
  bottomButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1em',
    justifyContent: 'space-between',
    margin: '40px'
  },
  expenseForm: {
    width: '100%'
  }
});

const Expense = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [expense, setExpense] = useState({});
  const [initialValues, setInitialValues] = useState(null);
  const { socket, toLogIn, loggedInUser } = useContext(AppContext);
  const { showError } = useContext(ExpenseErrorContext);
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
  const handleUpdate = async (values) => {
    const update = window.confirm('Do you want to update the form?');
    if (!update) {
      return;
    }
    const formData = new FormData();
    values.receiptImgForm.forEach((elem) => {
      if (elem.hasOwnProperty('receiptImg')) formData.append(elem.name, elem.receiptImg);
    });
    formData.append('receiptImgFormId', values.receiptImgFormId);
    const response = await axiosInstance.put('/expense/receiptImg/update', formData, {
      headers: { Content: 'multipart/form-data' }
    });
    const expenseObj = { ...values };
    if (response.status === 200) {
      const {
        data: { data: name_n_urls }
      } = response;
      console.log(name_n_urls);
      name_n_urls.forEach((elem) => {
        const pos_index = expenseObj.receiptImgForm.findIndex(
          (receiptImgFormElem) => receiptImgFormElem.name === elem.name
        );
        console.log(pos_index, elem.receiptImgUrl);
        if (pos_index > -1) {
          expenseObj.receiptImgForm[pos_index].receiptImgUrl = elem.receiptImgUrl;
        }
      });
    }
    console.log(expenseObj);
    await axiosInstance.put('expense/update', {
      id: expense.id,
      expenseObj: values
    });
  };
  const userJoinedHandler = (socketData) => {
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
  };

  const getUserRole = (uid) => expense.userRoles.find((elem) => elem.uid === uid);

  const getExpense = async (expenseId) => {
    try {
      const {
        data: { data }
      } = await axiosInstance.get(`/expense/${expenseId}`);
      setExpense(data);
    } catch (err) {
      if (err.response.status === 401) {
        toLogIn();
      }
      console.error(err);
    }
  };

  useEffect(() => {
    socket.once(SOCKET_EVENTS.USER_JOINED_EXPENSE, (socketData) => userJoinedHandler(socketData));
    socket.once(SOCKET_EVENTS.EXPENSE_UPDATED, () => getExpense(id));
    return () => {
      socket.off(SOCKET_EVENTS.USER_JOINED_EXPENSE, userJoinedHandler);
      socket.off(SOCKET_EVENTS.EXPENSE_UPDATED, getExpense);
    };
  }, [expense]);

  useEffect(() => {
    getExpense(id);
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
        <>
          <div className={classes.expenseContainer}>
            <Formik initialValues={initialValues} enableReinitialize>
              {({ values, resetForm, handleChange, setFieldValue }) => (
                <Form className={classes.expenseForm}>
                  <Field name="receiptImgForm">
                    {() => {
                      const props = {
                        values,
                        role: getUserRole(loggedInUser.uid).role,
                        setFieldValue
                      };
                      return (
                        <div className={classes.imgTable}>
                          <ReceiptImgForm {...props} />
                        </div>
                      );
                    }}
                  </Field>

                  <FieldArray name="receiptForm">
                    {({ push, remove }) => {
                      const props = {
                        values,
                        push,
                        remove,
                        handleChange,
                        setFieldValue,
                        role: getUserRole(loggedInUser.uid).role
                      };
                      return <ReceiptForm {...props} />;
                    }}
                  </FieldArray>
                  <FieldArray name="splitForm">
                    {() => {
                      const props = {
                        values,
                        handleChange,
                        setFieldValue,
                        role: getUserRole(loggedInUser.uid).role
                      };
                      return <SplitForm {...props} />;
                    }}
                  </FieldArray>

                  {getUserRole(loggedInUser.uid).role === 'Owner' && (
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
                        onClick={() => handleUpdate(values)}
                      >
                        Update
                      </Button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
            {showError ? <ExpenseError /> : null}
          </div>
          <ExpenseSideBar expense={expense} />
        </>
      ) : null}
    </>
  );
};

export { Expense };
