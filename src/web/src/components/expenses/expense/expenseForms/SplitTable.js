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
import { AntSwitch } from '../../../../styles/styles';

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

  const getFixedSum = (targetValue, index, changedSplitForm) => {
    const splitForm = changedSplitForm ? changedSplitForm : values.splitForm;

    return splitForm.reduce((prev, curr, i) => {
      console.log(prev);
      if (curr.fixed) {
        if (i === index) {
          return prev + targetValue;
        }
        return prev + Number(curr.owned);
      }
      return prev;
    }, 0);
  };

  const getFixedCnt = (changedSplitForm) => {
    const splitForm = changedSplitForm ? changedSplitForm : values.splitForm;

    return splitForm.reduce((prev, current) => {
      if (current.fixed) {
        return ++prev;
      }
      return prev;
    }, 0);
  };

  const updateSplitForm = (index) => {
    const changedSplitForm = values.splitForm.map((elem, i) => {
      if (i === index) {
        return { ...elem, fixed: false };
      }
      return elem;
    });

    const fixedSum = getFixedSum(changedSplitForm);
    const notFixedSum = values.total - fixedSum;
    const fixedCnt = getFixedCnt(changedSplitForm);
    const newSplit = notFixedSum / (changedSplitForm.length - fixedCnt);
    const newSplitForm = changedSplitForm.map((data) =>
      data.fixed
        ? data
        : {
            ...data,
            owned: Number(newSplit).toFixed(2)
          }
    );
    setFieldValue('splitForm', newSplitForm);
  };

  const handleToggle = (e, index) => {
    const fixedCnt = getFixedCnt();
    if (e.target.checked && fixedCnt === values.splitForm.length - 1) {
      console.log('not all user can be fixed');
      return;
    }
    if (!e.target.checked) {
      updateSplitForm(index);
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
  const renderUserTableCell = (uid) => {
    const user = values.users.find((elem) => elem.userId === uid);
    return (
      <TableCell className={classes.user}>
        <div className={classes.userInfo}>
          <Avatar src={user.avatar} />
          <span className={classes.name}>{user.username}</span>
        </div>
      </TableCell>
    );
  };
  console.log(values.splitForm);
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
                {renderUserTableCell()}
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
                    onChange={(e) => handleToggle(e, index)}
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
