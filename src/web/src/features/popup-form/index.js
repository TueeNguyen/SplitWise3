import React from 'react';
import { popUpFormNames } from '../../constants';
import { AddReceiptImg } from './components/AddReceiptImg';
import { JoinExpense } from './components/JoinExpense';

const PopUpForm = ({ formName }) => {
  switch (formName) {
    case popUpFormNames.JOIN_EXPENSE:
      return <JoinExpense />;
    case popUpFormNames.ADD_RECEIPT_IMG:
      return <AddReceiptImg />;
    default:
      return null;
  }
};

export { PopUpForm };
