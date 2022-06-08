import { useState } from 'react';
import { Drawer, Box, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const UserButton = () => {
  const [showMembers, setShowMembers] = useState(false);
  return (
    <>
      <IconButton
        type="button"
        onClick={() => {
          setShowMembers(true);
        }}
      >
        <PersonOutlineIcon></PersonOutlineIcon>
      </IconButton>
      <Drawer
        anchor="right"
        open={showMembers}
        onClose={() => {
          setShowMembers(false);
        }}
      >
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div"></Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default UserButton;
