import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

const UtilButton = ({
  tooltipTitle,
  tooltipPlacement = 'bottom-start',
  onclickCallback,
  children
}) => {
  return (
    <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
      <IconButton onClick={onclickCallback}>{children}</IconButton>
    </Tooltip>
  );
};

export { UtilButton };
