import { useContext } from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemButton, Tooltip } from '@mui/material';

// workspace imports

import { AppContext } from '../../../../../providers';

const ExpenseSideBar = ({ expenseId, password }) => {
  const { showExpenseSetting, setShowExpenseSetting } = useContext(AppContext);
  const sideBarElems = [
    { name: 'Copy expense id', data: expenseId, shortText: 'Id' },
    { name: 'Copy password', data: password, shortText: 'Password' }
  ];
  return (
    <>
      <Drawer
        anchor="right"
        open={showExpenseSetting}
        onClose={() => {
          setShowExpenseSetting(false);
        }}
      >
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            Settings
          </Typography>
          <List>
            {sideBarElems.map((elem, index) => (
              <ListItem key={elem.name} disablePadding>
                <Tooltip title={elem.name} placement="top">
                  <ListItemButton onClick={() => window.navigator.clipboard.writeText(elem.data)}>
                    {elem.shortText}: {elem.data}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export { ExpenseSideBar };
