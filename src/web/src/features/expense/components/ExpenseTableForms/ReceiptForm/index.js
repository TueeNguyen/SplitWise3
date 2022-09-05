import React, { useContext } from 'react';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { ExpenseErrorContext } from '../../../../../providers/ExpenseErrorProvider';

const useStyles = makeStyles((theme) => ({
  item: {
    minWidth: '400px'
  },
  removeItemBtn: {
    color: 'red'
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: '250px'
  },
  description: {
    minWidth: '600px'
  },
  receiptForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.5rem',
    margin: '0 20px 20px 20px'
  },
  tableContainer: {
    maxHeight: '70vh',
    border: 'solid 1px'
  },
  receiptUtil: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem'
  },
  totalContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const ReceiptForm = ({ values, push, remove, handleChange, setFieldValue, role }) => {
  const classes = useStyles();
  const { appendErrors } = useContext(ExpenseErrorContext);
  const getNewTotal = (targetValue, index) =>
    values.receiptForm.reduce((prev, curr, i) => {
      if (i === index) {
        return prev + targetValue;
      }
      return prev + Number(curr.price);
    }, 0);

  const getFixedSum = () =>
    values.splitForm.reduce((prev, curr) => {
      if (curr.fixed) {
        return prev + Number(curr.owned);
      }
      return prev;
    }, 0);

  const getFixecCnt = () =>
    values.splitForm.reduce((prev, current) => {
      if (current.fixed) {
        return ++prev;
      }
      return prev;
    }, 0);

  const updateTotal = (targetValue, index) => {
    // handleChange is async so we need to replace the price of index
    const newTotal = getNewTotal(targetValue, index);
    setFieldValue('total', newTotal);

    const fixedSum = getFixedSum();
    const notFixedSum = newTotal - fixedSum;
    const fixedCnt = getFixecCnt();
    const newSplit = notFixedSum / (values.splitForm.length - fixedCnt);
    const newSplitForm = values.splitForm.map((data) =>
      data.fixed
        ? data
        : {
            ...data,
            owned: Number(newSplit).toFixed(2)
          }
    );
    setFieldValue('splitForm', newSplitForm);
  };

  // functions handling form events
  const handlePriceChange = (e, index) => {
    const targetValue = Number(e.target.value);

    if ((!targetValue && targetValue !== 0) || targetValue < 0) {
      appendErrors("Price of an item can't be empty or < 0");
      return;
    }

    const newTotal = getNewTotal(targetValue, index);
    const fixedSum = getFixedSum();

    if (newTotal < fixedSum) {
      appendErrors(
        'The new total would be < than a the fixed sum. Total must always be >= the fixed sum'
      );
      return;
    }
    handleChange(e);
    updateTotal(targetValue, index);
  };

  const addRemoveReceiptItem = (e, arrayHelper, index) => {
    const buttonName = e.target.name;

    if (buttonName === 'removeReceiptItem') {
      const newTotal = getNewTotal(0, index);
      const fixedSum = getFixedSum();

      if (newTotal < fixedSum) {
        appendErrors(
          `Can't remove item ${values.receiptForm[index].item} because removing would cause the new total to be < the fixed sum`
        );
        return;
      }
      arrayHelper(index);
      updateTotal(0, index);
    }
    if (buttonName === 'addReceiptItem') {
      arrayHelper({ item: '', price: 0, desc: '' });
    }
  };

  return (
    <div className={classes.receiptForm}>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Price (CAD)</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.receiptForm.map((data, index) => (
              <TableRow key={index}>
                <TableCell className={classes.item}>
                  <TextField
                    value={values.receiptForm[index].item}
                    name={`receiptForm.${index}.item`}
                    onChange={handleChange}
                    type="text"
                    fullWidth
                    InputProps={{
                      readOnly: role !== 'Owner'
                    }}
                  />
                </TableCell>

                <TableCell className={classes.price}>
                  <TextField
                    value={values.receiptForm[index].price}
                    name={`receiptForm.${index}.price`}
                    onChange={(e) => handlePriceChange(e, index)}
                    type="number"
                    InputProps={{
                      readOnly: role !== 'Owner'
                    }}
                  />
                </TableCell>

                <TableCell className={classes.description}>
                  <TextField
                    value={values.receiptForm[index].desc}
                    name={`receiptForm.${index}.desc`}
                    onChange={handleChange}
                    type="text"
                    fullWidth
                    InputProps={{
                      readOnly: role !== 'Owner'
                    }}
                  />
                </TableCell>
                {role === 'Owner' && (
                  <TableCell>
                    <IconButton
                      name="removeReceiptItem"
                      className={classes.removeItemBtn}
                      onClick={(e) => addRemoveReceiptItem(e, remove, index)}
                    >
                      {/* to preven clicking on the icon*/}
                      <CloseIcon sx={{ pointerEvents: 'none' }} />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.receiptUtil}>
        <Typography variant="h4">Total: {values.total}</Typography>
        {role === 'Owner' && (
          <Button
            name="addReceiptItem"
            className={classes.addItemBtn}
            variant="outlined"
            onClick={(e) => addRemoveReceiptItem(e, push)}
          >
            Add receipt item
          </Button>
        )}
      </div>
    </div>
  );
};

export { ReceiptForm };
