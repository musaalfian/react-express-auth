import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <QueryClientProvider client={queryClient}>
               <React.Suspense fallback={<div>Loading...</div>}>
                  <App />
               </React.Suspense>
            </QueryClientProvider>
         </Provider>
         ,
      </BrowserRouter>
   </StrictMode>
);
