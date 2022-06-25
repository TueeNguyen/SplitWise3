import { Pagination } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ExpenseCard from './expense/ExpenseCard';
import { makeStyles } from '@mui/styles';
import axiosInstance from '../../axios/axios';
import socketIOClient from 'socket.io-client';
import { SWContext } from '../../contexts/SWContext';

const useStyles = makeStyles({
  expenseContainer: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  }
});

const Expenses = () => {
  const classes = useStyles();
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(expenses.slice(page - 1, page * 10 - 1));
  const { socket, toLogIn } = useContext(SWContext);
  useEffect(() => {
    socket.on('EXPENSE_CREATED', () => {
      (async () => {
        try {
          const {
            data: { data }
          } = await axiosInstance.get('/expense/');
          setExpenses(data);
        } catch (err) {
          if (err.response.status === 401) {
            toLogIn();
          }
          console.error(err);
        }
      })();
    });
    return () => {
      socket.off('EXPENSE_CREATED');
    };
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    setPaginatedData(expenses.slice((value - 1) * 10, value * 10 - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data }
        } = await axiosInstance.get('/expense/');
        setExpenses(data);
      } catch (err) {
        if (err.response.status === 401) {
          toLogIn();
        }
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    setPaginatedData(expenses.slice(page - 1, page * 10 - 1));
  }, [expenses, page]);

  return (
    <>
      {expenses.length > 0 ? (
        <div>
          <div className={classes.expenseContainer}>
            {paginatedData.map((elem) => (
              <ExpenseCard data={elem} />
            ))}
          </div>
          <Pagination
            count={Math.floor(expenses.length / 10) + 1}
            page={page}
            onChange={handleChange}
            shape="rounded"
          />
        </div>
      ) : null}
    </>
  );
};
export default Expenses;
