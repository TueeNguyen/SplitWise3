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
import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { AntSwitch } from '../../../../../styles';
import { ExpenseErrorContext } from '../../../../../providers/ExpenseErrorProvider';

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
  splitForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 20px',
    gap: '0.5rem'
  },
  tableContainer: {
    maxHeight: '80vh'
  }
}));

const SplitForm = ({ values, handleChange, setFieldValue, role }) => {
  const classes = useStyles();
  const { appendErrors } = useContext(ExpenseErrorContext);

  const getFixedSum = ({ targetValue, index, changedSplitForm }) => {
    const splitForm = values.splitForm;
    if (changedSplitForm) {
      return changedSplitForm.reduce((prev, curr, i) => {
        if (curr.fixed) {
          return prev + Number(curr.owned);
        }
        return prev;
      }, 0);
    }
    return splitForm.reduce((prev, curr, i) => {
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

    const fixedSum = getFixedSum({ changedSplitForm });
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
      appendErrors('Not all users can be fixed');
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
      const user = values.users.find((elem) => elem.uid === values.splitForm[index].userId);
      appendErrors(`User ${user.username} must be fixed to change owned amount`);
      return;
    }
    if (targetValue < 0 || !targetValue) {
      appendErrors("Invalid value, can't be < 0 or empty");
      return;
    }
    const fixedSum = getFixedSum({ targetValue, index });
    if (fixedSum > values.total) {
      appendErrors(`Fixed owned amount can't not exceed total - sum of fixed owned amount`);
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
    const user = values.users.find((elem) => elem.uid === uid);
    return (
      <TableCell className={classes.user}>
        <div className={classes.userInfo}>
          <Avatar src={user.avatar} />
          <span className={classes.name}>{user.username}</span>
        </div>
      </TableCell>
    );
  };
  return (
    <div className={classes.splitForm}>
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
                {renderUserTableCell(data.userId)}
                <TableCell className={classes.owned}>
                  <TextField
                    value={values.splitForm[index].owned}
                    name={`splitForm.${index}.owned`}
                    onChange={(e) => handleOwnedChange(e, index)}
                    type="number"
                    InputProps={{
                      readOnly: role !== 'Owner'
                    }}
                  />
                </TableCell>
                <TableCell className={classes.fixed}>
                  <AntSwitch
                    checked={values.splitForm[index].fixed}
                    value={values.splitForm[index].fixed}
                    name={`splitForm.${index}.fixed`}
                    onChange={(e) => handleToggle(e, index)}
                    type="checkbox"
                    disabled={role !== 'Owner'}
                  />
                </TableCell>
                <TableCell className={classes.note}>
                  <TextField
                    value={values.splitForm[index].note}
                    name={`splitForm.${index}.note`}
                    type="text"
                    fullWidth
                    InputProps={{
                      readOnly: role !== 'Owner'
                    }}
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

export { SplitForm };
