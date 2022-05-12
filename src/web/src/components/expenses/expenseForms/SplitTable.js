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
    margin: '40px 40px',
    width: 'calc(100vw - 100px)',
    [theme.breakpoints.down('md')]: {
      width: '100vw'
    }
  },
  tableContainer: {
    maxHeight: '80vh',
    border: 'solid 1px'
  }
}));

const SplitTable = () => {
  const classes = useStyles();
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
            <TableRow>
              <TableCell className={classes.user}>
                <div>
                  <Avatar src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d" />
                  Tue
                </div>
              </TableCell>
              <TableCell className={classes.owned}>
                <TextField value={123} />
              </TableCell>
              <TableCell className={classes.fixed}>
                <AntSwitch onChange={(e) => console.log(e.target.checked)} />
              </TableCell>
              <TableCell className={classes.note}>
                <TextField fullWidth />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SplitTable;
