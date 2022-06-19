import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate,Outlet } from 'react-router-dom'
import App from './pages/layout';
import ErrorBoundary from './errorMonitor/ErrorBoundary';
import Info from './pages/info';
import { Sentry } from './errorMonitor/error';

Sentry()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to={'dashboard'}/>} />
      <Route path='/dashboard' element={<App />}>
        <Route index element={<Navigate to={'set'}/>} />
        <Route path='set' element={<Outlet />}>
          <Route path='infos' element={<Info />} />
        </Route>
        <Route path='video' element={'video'} />
      </Route>
      <Route path='*' element={'404'} />
    </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
