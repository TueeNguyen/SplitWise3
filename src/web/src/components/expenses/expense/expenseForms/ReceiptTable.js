import React from 'react';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  item: {
    minWidth: '400px'
  },
  removeItemBtn: {
    visibility: 'hidden',
    color: 'red'
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: '250px',
    '&:hover': {
      '& $removeItemBtn': {
        visibility: 'visible'
      }
    }
  },
  description: {
    minWidth: '600px'
  },
  tableWrapper: {
    margin: '40px',
    [theme.breakpoints.down('md')]: {
      margin: '5px'
    }
  },
  tableContainer: {
    maxHeight: '70vh',
    border: 'solid 1px'
  },
  receiptUtil: {
    display: 'flex',
    alignItems: 'center'
  },
  addItemBtn: {
    marginLeft: 'auto'
  }
}));

const ReceiptTable = ({ values, push, remove, handleChange, setFieldValue }) => {
  const classes = useStyles();

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
      console.log("price of an item can't be null or < 0");
      return;
    }

    const newTotal = getNewTotal(targetValue, index);
    const fixedSum = getFixedSum();

    if (newTotal < fixedSum) {
      console.log('newTotal < fixedSum');
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
        // TODO: display error message
        console.log("can't remove this item because some users have fixed owned amount");
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
    <div className={classes.tableWrapper}>
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
                  />
                </TableCell>

                <TableCell className={classes.price}>
                  <TextField
                    value={values.receiptForm[index].price}
                    name={`receiptForm.${index}.price`}
                    onChange={(e) => handlePriceChange(e, index)}
                    type="number"
                  />
                  <IconButton
                    name="removeReceiptItem"
                    className={classes.removeItemBtn}
                    onClick={(e) => addRemoveReceiptItem(e, remove, index)}
                  >
                    {/* to preven clicking on the icon*/}
                    <CloseIcon sx={{ pointerEvents: 'none' }} />
                  </IconButton>
                </TableCell>

                <TableCell className={classes.description}>
                  <TextField
                    value={values.receiptForm[index].desc}
                    name={`receiptForm.${index}.desc`}
                    onChange={handleChange}
                    type="text"
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />

      <div className={classes.receiptUtil}>
        <Typography variant="h4">Total: {values.total}</Typography>
        <Button
          name="addReceiptItem"
          className={classes.addItemBtn}
          variant="outlined"
          onClick={(e) => addRemoveReceiptItem(e, push)}
        >
          Add receipt item
        </Button>
      </div>
    </div>
  );
};

export default ReceiptTable;
