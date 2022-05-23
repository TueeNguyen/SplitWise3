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
import { padding } from '@mui/system';

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
  // console.log(values);

  const handleToggle = (e) => {
    const fixedCnt = values.splitForm.reduce((prev, current) => {
      if (current.fixed) {
        return ++prev;
      }
      return prev;
    }, 0);
    if (fixedCnt === values.splitForm.length - 1) {
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
    console.log({ targetValue: e.target.value });
    if (!values.splitForm[index].fixed) {
      // TODO: add a snack bar that says must be fixed to change
      console.log('must be fixed to change');
      return;
    }
    if (e.target.value < 0 || !e.target.value) {
      // TODO: add a snack bar saying "Invalid value can't be < 0 or null"
      console.log("Invalid value can't be < 0 or null");
      return;
    }
    const fixedSum = values.splitForm.reduce((prev, curr, i) => {
      if (curr.fixed) {
        if (i === index) {
          return prev + e.target.value;
        }
        return prev + curr.owned;
      }
      return prev;
    }, 0);
    const newSum = values.splitForm.reduce((prev, curr, i) => {
      console.log(prev);
      if (i === index) {
        return Number(Number(prev) + Number(e.target.value));
      }
      return Number(Number(prev) + Number(curr.owned));
    }, 0);
    console.log({ newSum });
    if (fixedSum > values.total) {
      // TODO: "Fixed owned amount can't not exceed total - sum of fixed owned amount"
      console.log('fixedSum > values.total');
      return;
    }
    const fixedCnt = values.splitForm.reduce((prev, current) => {
      if (current.fixed) {
        return ++prev;
      }
      return prev;
    }, 0);
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
            owned: Number(e.target.value).toFixed(2)
          };
        }
        return { ...data };
      }
      return {
        ...data,
        owned: Number(newSplit).toFixed(2)
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
                    value={values.splitForm[index].fixed}
                    name={`splitForm.${index}.fixed`}
                    onChange={handleToggle}
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
