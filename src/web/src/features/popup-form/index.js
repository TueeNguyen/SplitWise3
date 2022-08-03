import React from 'react';
import { popUpFormNames } from '../../constants';
import { JoinExpense } from './components/JoinExpense';

const PopUpForm = ({ formName }) => {
  switch (formName) {
    case popUpFormNames.JOIN_EXPENSE:
      return (
        <>
          <JoinExpense />
        </>
      );
    default:
      return null;
  }
};

export { PopUpForm };
