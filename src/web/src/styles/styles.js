import { Switch } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/styles';

const theme = createTheme({
  expenseCard: {
    lightBg: '#FFFFFF',
    darkBg: '#424242'
  },
  app: {
    lightBg: '##ECECEC',
    fontSize: '1em'
  }
});

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 44,
  height: 22,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 22
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(22px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 18,
    height: 18,
    borderRadius: 10,
    transition: 'width 0.2s'
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box'
  }
}));

export { AntSwitch };

export default theme;
