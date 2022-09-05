import { useState, createContext, useEffect } from 'react';

const ExpenseErrorContext = createContext();

const ExpenseErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [showError, setShowError] = useState(false);

  const appendErrors = (error) => {
    if (errors.length === 10) {
      setErrors([error, ...errors.splice(0, 9)]);
    } else {
      setErrors([error, ...errors]);
    }
  };

  useEffect(() => {
    if (!showError) {
      setErrors([]);
    }
  }, [showError]);

  useEffect(() => {
    if (errors.length > 0 && !showError) {
      setShowError(true);
    }
  }, [errors]);

  return (
    <ExpenseErrorContext.Provider
      value={{
        appendErrors,
        errors,
        showError,
        setShowError
      }}
    >
      {children}
    </ExpenseErrorContext.Provider>
  );
};

export { ExpenseErrorContext, ExpenseErrorProvider };
