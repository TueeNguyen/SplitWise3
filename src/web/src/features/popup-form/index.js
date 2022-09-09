import React from 'react';
import { popUpFormNames } from '../../constants';
import { AddExpense } from './components/AddExpense';
import { AddReceiptImg } from './components/AddReceiptImg';
import { JoinExpense } from './components/JoinExpense';

const PopUpForm = ({ formName }) => {
  switch (formName) {
    case popUpFormNames.JOIN_EXPENSE:
      return <JoinExpense />;
    case popUpFormNames.ADD_RECEIPT_IMG:
      return <AddReceiptImg />;
    case popUpFormNames.ADD_EXPENSE:
      return <AddExpense />;
    default:
      return null;
  }
};

export { PopUpForm };
