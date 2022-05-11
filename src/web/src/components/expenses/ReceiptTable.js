import React from 'react';
import {
  Button,
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
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  item: {
    minWidth: '400px'
  },
  price: {
    minWidth: '150px'
  },
  description: {
    minWidth: '500px'
  },
  tableWrapper: {
    margin: '40px 0 0 0',
    width: 'calc(100vw - 100px)',
    [theme.breakpoints.down('md')]: {
      width: '100vw'
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
const ReceiptTable = () => {
  const classes = useStyles();
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
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.item}>
                <TextField fullWidth value="10 cups of starbuck" />
              </TableCell>
              <TableCell className={classes.price}>
                <TextField type="number" />
              </TableCell>
              <TableCell className={classes.description}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />

      <div className={classes.receiptUtil}>
        <Typography variant="h4">Total:</Typography>
        <Button className={classes.addItemBtn} variant="outlined">
          Add receipt item
        </Button>
      </div>
    </div>
  );
};

export default ReceiptTable;
