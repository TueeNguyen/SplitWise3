import React from 'react';
import { Card, CardContent, CardMedia, Divider } from '@mui/material';

const Expense = (data) => {
  return (
    <Card sx={{ height: '350px' }}>
      <CardMedia
        component="img"
        sx={{ objectFit: 'contain' }}
        height="70%"
        image={data.data.img}
        alt="Expense Img"
      />
      <Divider />
      <CardContent sx={{ textAlign: 'left' }}>
        {data.data.name} <br /> {data.data.date}
      </CardContent>
    </Card>
  );
};

export default Expense;
