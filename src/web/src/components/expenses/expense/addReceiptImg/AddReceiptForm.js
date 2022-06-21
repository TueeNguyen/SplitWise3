import { Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useRef, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const useStyles = makeStyles({
  addReceiptForm: {
    padding: '1em',
    background: '#E5E5E5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
    width: '300px'
  },
  addReceiptImgWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  fileName: {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

const AddReceiptForm = () => {
  const classes = useStyles();
  const imgInput = useRef();
  const [fileName, setFileName] = useState('');
  const handleImgChose = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
  };
  return (
    <form className={classes.addReceiptForm}>
      <TextField id="receipt-name" label="Receipt's name" fullWidth />

      <div className={classes.addReceiptImgWrapper}>
        <Button onClick={() => imgInput.current.click()} size="small" variant="outlined">
          <AddPhotoAlternateIcon />
        </Button>
        <span className={classes.fileName}>{fileName}</span>
      </div>

      <input
        ref={imgInput}
        type="file"
        accept="image/jpg, image/png, image/jpeg"
        style={{ display: 'none' }}
        onChange={(e) => handleImgChose(e)}
      />

      <Button size="small" variant="outlined" fullWidth>
        Add
      </Button>
    </form>
  );
};

export default AddReceiptForm;
