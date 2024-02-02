import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'sweetalert2/src/sweetalert2.scss';

//mui
import { ThemeProvider } from '@mui/material';

//project imports
import App from './App';
import './styles/scrollBar.css';
import { persistor, store } from './store/store.ts';
import theme from './theme/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
