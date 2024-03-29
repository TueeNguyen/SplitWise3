import { Button, IconButton, Tooltip } from '@mui/material';
import React from 'react';

const UtilButton = ({
  tooltipTitle,
  tooltipPlacement = 'bottom-start',
  onclickCallback,
  children
}) => {
  return (
    <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
      <Button variant="outlined" onClick={onclickCallback}>
        {children}
      </Button>
    </Tooltip>
  );
};

export { UtilButton };
