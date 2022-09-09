import React, { useContext, useEffect } from 'react';
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
import { AppContext } from '../../../../../providers';
import { PopupFormContext } from '../../../../../providers/PopupFormProvider';
import { popUpFormNames } from '../../../../../constants';

const useStyles = makeStyles({
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
  },
  carousel: {
    width: '100%',
    overflow: 'auto',
    whiteSpace: 'nowrap'
  },
  slide: {
    display: 'inline-block',
    margin: '10px'
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

const ReceiptImgForm = ({ values, role, setFieldValue }) => {
  const { popUpForm, setPopUpForm } = useContext(AppContext);
  const { data, setError } = useContext(PopupFormContext);
  const classes = useStyles();

  const removeReceiptImgElem = (receiptImgFormElem) => {
    const removeIndex = values.receiptImgForm.findIndex(
      (elem) => elem.name === receiptImgFormElem.name
    );
    const newReceiptImgElem = [...values.receiptImgForm];
    newReceiptImgElem.splice(removeIndex, 1);
    console.log(newReceiptImgElem);
    setFieldValue('receiptImgForm', newReceiptImgElem);
  };

  useEffect(() => {
    if (data && popUpForm === popUpFormNames.ADD_RECEIPT_IMG) {
      const nameExists = values.receiptImgForm.findIndex((elem) => elem.name === data.name);

      console.log(values.receiptImgForm, nameExists);
      if (nameExists !== -1) {
        setError({ target: 'name', message: `${data.name} already exists` });
        return;
      } else {
        setError({});
      }
      const imgUrl = URL.createObjectURL(data.receiptImg);
      const receiptImgFormData = { ...data, receiptImgUrl: imgUrl };
      console.log(receiptImgFormData);
      setFieldValue('receiptImgForm', [...values.receiptImgForm, receiptImgFormData]);
      setPopUpForm('');
    }
  }, [data]);

  return (
    <div className={classes.receiptImgForm}>
      <Paper className={classes.carousel}>
        {values.receiptImgForm.map((receiptImgFormElem, index) => (
          <div className={classes.slide}>
            <StyledCard>
              <IconButton
                name="removeReceiptItem"
                className={classes.removeImgBtn}
                onClick={() => removeReceiptImgElem(receiptImgFormElem)}
              >
                {/* to preven clicking on the icon*/}
                <CloseIcon sx={{ pointerEvents: 'none' }} />
              </IconButton>
              <CardMedia
                component="img"
                sx={{ objectFit: 'contain' }}
                image={receiptImgFormElem.receiptImgUrl}
                alt="Expense Img"
              />
              <CardContent sx={{ textAlign: 'center', fontFamily: 'Roboto' }}>
                <Typography variant="body">{receiptImgFormElem.name}</Typography>
              </CardContent>
            </StyledCard>
          </div>
        ))}
      </Paper>
      {role === 'Owner' && (
        <div className={classes.buttonContainer}>
          <AddReceiptImgButton className={classes.addReceiptButton} />
        </div>
      )}
    </div>
  );
};

export { ReceiptImgForm };
