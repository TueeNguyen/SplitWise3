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
import React from 'react';
import { makeStyles } from '@mui/styles';
import { AntSwitch } from '../../../styles/styles';

const useStyles = makeStyles((theme) => ({
  user: {
    minWidth: '150px'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  name: {
    marginLeft: '10px'
  },
  owned: {
    minWidth: '250px'
  },
  fixed: {
    minWidth: '50px'
  },
  note: {
    minWidth: '500px'
  },
  tableWrapper: {
    margin: '40px',
    [theme.breakpoints.down('md')]: {
      margin: '5px'
    }
  },
  tableContainer: {
    maxHeight: '80vh',
    border: 'solid 1px'
  }
}));

const SplitTable = ({ values, handleChange, setFieldValue }) => {
  const classes = useStyles();

  const getNewTotal = (targetValue, index) =>
    values.receipt.reduce((prev, curr, i) => {
      if (i === index) {
        return prev + targetValue;
      }
      return prev + Number(curr.price);
    }, 0);

  const getFixedSum = (targetValue, index) =>
    values.splitForm.reduce((prev, curr, i) => {
      console.log(prev);
      if (curr.fixed) {
        if (i === index) {
          return prev + targetValue;
        }
        return prev + Number(curr.owned);
      }
      return prev;
    }, 0);

  const getFixedCnt = () =>
    values.splitForm.reduce((prev, current) => {
      if (current.fixed) {
        return ++prev;
      }
      return prev;
    }, 0);

  const updateSplitForm = (targetValue, index) => {
    // handleChange is async so we need to replace the price of index

    const fixedSum = getFixedSum();
    const notFixedSum = values.total - fixedSum;
    const fixedCnt = getFixedCnt();
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

  const handleToggle = (e) => {
    const fixedCnt = getFixedCnt();
    if (!e.target.value && fixedCnt === values.splitForm.length - 1) {
      console.log('not all user can be fixed');
      return;
    }
    handleChange(e);
  };

  /**
   *
   * @param {*} e
   * @param {*} index
   * @returns
   */
  const handleOwnedChange = (e, index) => {
    const targetValue = Number(e.target.value);
    if (!values.splitForm[index].fixed) {
      // TODO: add a snack bar that says must be fixed to change
      console.log('must be fixed to change');
      return;
    }
    if (targetValue < 0 || !targetValue) {
      // TODO: add a snack bar saying "Invalid value can't be < 0 or null"
      console.log("Invalid value can't be < 0 or null");
      return;
    }
    const fixedSum = getFixedSum(targetValue, index);
    console.log({ fixedSum });
    if (fixedSum > values.total) {
      // TODO: "Fixed owned amount can't not exceed total - sum of fixed owned amount"
      console.log('fixedSum > values.total');
      return;
    }
    const fixedCnt = getFixedCnt();
    const notFixedSum = values.total - fixedSum;
    const newSplit = notFixedSum / (values.splitForm.length - fixedCnt);
    console.log({ fixedCnt });
    console.log({ notFixedSum });
    console.log({ newSplit });
    const newSplitForm = values.splitForm.map((data, i) => {
      if (data.fixed) {
        if (i === index) {
          return {
            ...data,
            owned: targetValue.toFixed(2)
          };
        }
        return data;
      }
      return {
        ...data,
        owned: newSplit.toFixed(2)
      };
    });
    setFieldValue('splitForm', newSplitForm);
  };

  return (
    <div className={classes.tableWrapper}>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Owned</TableCell>
              <TableCell>Fixed</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.splitForm.map((data, index) => (
              <TableRow>
                <TableCell className={classes.user}>
                  <div className={classes.userInfo}>
                    <Avatar src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d" />
                    <span className={classes.name}> Tue</span>
                  </div>
                </TableCell>
                <TableCell className={classes.owned}>
                  <TextField
                    value={values.splitForm[index].owned}
                    name={`splitForm.${index}.owned`}
                    onChange={(e) => handleOwnedChange(e, index)}
                    type="number"
                  />
                </TableCell>
                <TableCell className={classes.fixed}>
                  <AntSwitch
                    checked={values.splitForm[index].fixed}
                    value={values.splitForm[index].fixed}
                    name={`splitForm.${index}.fixed`}
                    onChange={(e) => handleToggle(e)}
                    type="checkbox"
                  />
                </TableCell>
                <TableCell className={classes.note}>
                  <TextField
                    value={values.splitForm[index].note}
                    name={`splitForm.${index}.note`}
                    type="text"
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SplitTable;
