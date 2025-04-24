import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from './context/context';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

ReactDOM.render(
  <AuthProvider>
    <Provider>
      <App />
    </Provider>
  </AuthProvider>,
  document.getElementById('root'),
);
