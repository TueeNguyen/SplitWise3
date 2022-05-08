import React from 'react';
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
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
    </div>
  );
};

export default ReceiptTable;
