import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import AddReceiptButton from '../../expenses/addReceiptImg/AddReceiptButton';

const useStyles = makeStyles({
  tableContainer: {
    width: 'calc(100vw - 100px)',
    border: 'solid 1px',
    margin: '20px 0'
  },
  addReceiptButton: {
    display: 'flex',
    width: 'calc(100vw - 100px)',
    justifyContent: 'flex-end'
  }
});

const StyledCard = styled(Card)(({ theme }) => ({
  maxHeight: '600px',
  minWidth: '250px',
  maxWidth: '350px',
  border: 'solid 1px',
  boxShadow: '0px 3px 6px #C0C0C0',
  transition: 'transform 0.4s',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0px 3px 6px #A2A2A2'
  }
}));
const datas = [
  'https://discuss.poynt.net/uploads/default/original/2X/6/60c4199364474569561cba359d486e6c69ae8cba.jpeg'
];
const ImgTable = () => {
  const classes = useStyles();
  return (
    <>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              {datas.map((data, index) => (
                <TableCell key={index}>
                  <StyledCard>
                    <CardMedia
                      component="img"
                      sx={{ objectFit: 'cover' }}
                      image={data}
                      alt="Expense Img"
                    />
                    <CardContent sx={{ textAlign: 'center', fontFamily: 'Roboto' }}>
                      <Typography variant="body">Receipt</Typography>
                    </CardContent>
                  </StyledCard>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.addReceiptButton}>
        <AddReceiptButton />
      </div>
    </>
  );
};

export default ImgTable;
