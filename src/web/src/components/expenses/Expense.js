import React from 'react';
import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';

const ExpenseCard = styled(Card)(({ theme }) => ({
  height: '350px',
  [theme.breakpoints.up('xl')]: {
    flexBasis: 'calc(20% - 20px)'
  },
  [theme.breakpoints.down('xl')]: {
    flexBasis: 'calc(25% - 20px)'
  },
  [theme.breakpoints.down('lg')]: {
    flexBasis: 'calc(33.33% - 20px)'
  },
  [theme.breakpoints.down('md')]: {
    flexBasis: 'calc(50% - 20px)'
  },
  [theme.breakpoints.down('sm')]: {
    flexBasis: '100%'
  },
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

const Expense = (data) => {
  return (
    <ExpenseCard>
      <CardMedia
        component="img"
        sx={{ objectFit: 'contain' }}
        height="70%"
        image={data.data.img}
        alt="Expense Img"
      />
      <Divider />
      <CardContent sx={{ textAlign: 'left', fontFamily: 'Roboto' }}>
        <Typography variant="h5">{data.data.name}</Typography>
        {data.data.date}
      </CardContent>
    </ExpenseCard>
  );
};

export default Expense;
