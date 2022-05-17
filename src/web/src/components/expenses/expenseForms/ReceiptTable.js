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
  Tooltip,
  Typography
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

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

  const updateTotal = (e, index) => {
    const newTotal = values.receipt.reduce((prev, curr, i) => {
      if (i === index) {
        return Number(prev + e.target.value);
      }
      return Number(prev + curr.price);
    }, 0);
    // handleChange is async so we need to replace the price of index
    setFieldValue('total', newTotal);
    const newSplitForm = values.splitForm.map((data, i) => ({
      ...data,
      owned: Number(Number(newTotal / values.splitForm.length).toFixed(2))
    }));
    setFieldValue('splitForm', newSplitForm);
  };

  const handlePriceChange = (e, index) => {
    if (!e.target.value || e.target.value < 0) {
      e.target.value = 0;
    }
    handleChange(e);
    updateTotal(e, index);
  };

  const addRemoveReceiptItem = (e, arrayHelper, index) => {
    const buttonName = e.target.name;
    if (buttonName === 'removeReceiptItem') {
      arrayHelper(index);
      updateTotal(e, index);
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
            {values.receipt.map((data, index) => (
              <TableRow key={index}>
                <TableCell className={classes.item}>
                  <TextField
                    value={values.receipt[index].item}
                    name={`receipt.${index}.item`}
                    onChange={handleChange}
                    type="text"
                    fullWidth
                  />
                </TableCell>

                <TableCell className={classes.price}>
                  <TextField
                    value={values.receipt[index].price}
                    name={`receipt.${index}.price`}
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
                    value={values.receipt[index].desc}
                    name={`receipt.${index}.desc`}
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
