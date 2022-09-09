import { useState, createContext, useEffect } from 'react';

const PopupFormContext = createContext();

const PopupFormProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState({});

  return (
    <PopupFormContext.Provider
      value={{
        data,
        setData,
        error,
        setError
      }}
    >
      {children}
    </PopupFormContext.Provider>
  );
};

export { PopupFormProvider, PopupFormContext };
