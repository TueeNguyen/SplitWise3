import { useContext } from 'react';

// workspace imports

import './App.css';
import Router from './pages/router';
import { RootLayout } from './layouts';
import { AppProvider, AppContext } from './providers';

const App = () => {
  const { loading } = useContext(AppContext);

  return (
    <AppProvider>
      {loading ? (
        <>
          <RootLayout>
            <Router />
          </RootLayout>
          <div></div>
        </>
      ) : null}
    </AppProvider>
  );
};

export default App;
