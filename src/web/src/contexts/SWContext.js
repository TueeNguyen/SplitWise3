import { createContext } from 'react';

export const SWContext = createContext({
  loggedInUser: null,
  setLoggedInUser: () => {}
});
