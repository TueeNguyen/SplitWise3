import React, { useContext } from 'react';
import { PopUpForm } from '../features';

// workspace imports

import { AppContext } from '../providers';

const RootLayout = ({ children }) => {
  const { popUpForm } = useContext(AppContext);
  return (
    <>
      {popUpForm ? <PopUpForm formName={popUpForm} /> : null}
      {children}
    </>
  );
};

export { RootLayout };
