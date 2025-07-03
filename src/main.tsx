// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './contexts/AuthContext.tsx';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
      <GoogleOAuthProvider clientId="323883270092-ke6bscn6njau06ssposa02vtsto0rdv7.apps.googleusercontent.com">
        <AuthProvider>
          <App />
        </AuthProvider>
      </GoogleOAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <ToastContainer />
  </React.StrictMode>,
);