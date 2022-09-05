import { useContext } from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Divider,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon
} from '@mui/material';

// workspace imports

import { AppContext } from '../../../../../providers';

const ExpenseSideBar = ({ expense }) => {
  const { showExpenseSidebar, setShowExpenseSidebar } = useContext(AppContext);
  const sideBarElems = [
    { name: 'Copy expense id', data: expense.id, shortText: 'Id' },
    { name: 'Copy password', data: expense.password, shortText: 'Password' }
  ];
  const getUser = (uid) => expense.users.find((elem) => elem.uid === uid);

  return (
    <>
      <Drawer
        anchor="right"
        open={showExpenseSidebar}
        onClose={() => {
          setShowExpenseSidebar(false);
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
            <Divider />
            {expense.userRoles.map((userRole) => {
              const user = getUser(userRole.uid);
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={user.avatar} alt={`${user.username}'s avatar`} />
                  </ListItemAvatar>
                  <ListItemText>{user.username}</ListItemText>
                  {userRole.role === 'Owner' && (
                    <Tooltip title="Owner" placement="left">
                      <ListItemIcon>
                        <svg
                          width="18"
                          height="16"
                          viewBox="0 0 18 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 12L0 1L5.5 6L9 0L12.5 6L18 1L16 12H2ZM16 15C16 15.6 15.6 16 15 16H3C2.4 16 2 15.6 2 15V14H16V15Z"
                            fill="#FFA800"
                          />
                        </svg>
                      </ListItemIcon>
                    </Tooltip>
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export { ExpenseSideBar };
