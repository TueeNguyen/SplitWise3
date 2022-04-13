import { Card, CardContent, CardMedia, Divider } from '@mui/material';
import React from 'react';
import Expense from './Expense';
import { makeStyles } from '@mui/styles';

const testDatas = [
  {
    img: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_167167350_9706479704500183_94071.jpg',
    name: 'Vacation',
    date: '29-11-2001'
  },
  {
    img: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_167167350_9706479704500183_94071.jpg',
    name: 'Vacation',
    date: '29-11-2001'
  },
  {
    img: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_167167350_9706479704500183_94071.jpg',
    name: 'Vacation',
    date: '29-11-2001'
  },
  {
    img: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_167167350_9706479704500183_94071.jpg',
    name: 'Vacation',
    date: '29-11-2001'
  },
  {
    img: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_167167350_9706479704500183_94071.jpg',
    name: 'Vacation',
    date: '29-11-2001'
  },
  {
    img: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_167167350_9706479704500183_94071.jpg',
    name: 'Vacation',
    date: '29-11-2001'
  }
];
const useStyles = makeStyles({
  expenseContainer: {
    margin: '10px 10px',
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  }
});

const Expenses = () => {
  const classes = useStyles();
  return (
    <div className={classes.expenseContainer}>
      {testDatas.map((testData) => (
        <Expense data={testData} />
      ))}
    </div>
  );
};
export default Expenses;
