import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// workspace imports

import { AddReceiptImgButton } from '../AddReceiptImgForm';

const useStyles = makeStyles({
  tableContainer: {
    border: 'solid 1px'
  },
  addReceiptButton: {
    justifySelf: 'flex-end'
  },
  receiptImgForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 20px 20px 20px',
    gap: '0.5rem'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  removeImgBtn: {
    position: 'absolute',
    color: 'red',
    background: 'white',
    top: -10,
    right: -10
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
    boxShadow: '0px 6px 12px #A2A2A2'
  },
  position: 'relative'
}));

const datas = [
  'https://discuss.poynt.net/uploads/default/original/2X/6/60c4199364474569561cba359d486e6c69ae8cba.jpeg'
];

const ReceiptImgForm = ({ role }) => {
  const classes = useStyles();
  return (
    <div className={classes.receiptImgForm}>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              {datas.map((data, index) => (
                <TableCell key={index}>
                  <StyledCard>
                    <IconButton name="removeReceiptItem" className={classes.removeImgBtn}>
                      {/* to preven clicking on the icon*/}
                      <CloseIcon sx={{ pointerEvents: 'none' }} />
                    </IconButton>
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
      {role === 'Owner' && (
        <div className={classes.buttonContainer}>
          <AddReceiptImgButton className={classes.addReceiptButton} />
        </div>
      )}
    </div>
  );
};

export { ReceiptImgForm };
