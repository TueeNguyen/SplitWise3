import React from 'react';
import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useHistory } from 'react-router-dom';

const StyledExpenseCard = styled(Card)(({ theme }) => ({
  height: '350px',
  boxShadow: '0px 3px 6px #C0C0C0',
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
  transition: 'transform 0.4s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 3px 6px #A2A2A2'
  }
}));

const ExpenseCard = ({ data }) => {
  const history = useHistory();
  return (
    <StyledExpenseCard onClick={() => history.push(`/expense/${data.id}`)}>
      <CardMedia
        component="img"
        sx={{ objectFit: 'cover' }}
        height="70%"
        src={data.avatar}
        alt="Expense Img"
      />
      <Divider />
      <CardContent sx={{ textAlign: 'left', fontFamily: 'Roboto' }}>
        <Typography variant="h5">{data.name}</Typography>
        {data.date}
      </CardContent>
    </StyledExpenseCard>
  );
};

export { ExpenseCard };
