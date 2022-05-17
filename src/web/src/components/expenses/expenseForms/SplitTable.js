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
  console.log(values);
  const handleOwnedChange = (e, index) => {
    if (!values.splitForm[index].fixed) {
      // TODO: add a snack bar that says must be fixed to change
      return;
    }
    if (e.target.value < 0 || !e.target.value) {
      // TODO: add a snack bar saying "Invalid value can't be < 0 or null"
      return;
    }
    const fixedOwnedSum = values.splitForm.reduce((prev, curr) => {
      if (curr.fixed) {
        return prev + curr.owned;
      }
      return prev;
    }, 0);
    const newOwnedSum = values.splitForm.reduce((prev, curr, i) => {
      if (i === index) {
        return prev + e.target.value;
      }
    });
    if (e.target.value > values.total - fixedOwnedSum) {
      // TODO: "Fixed owned amount can't not exceed total - sum of fixed owned amount"
      return;
    }
    handleChange(e);
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
                    onChange={handleChange}
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
