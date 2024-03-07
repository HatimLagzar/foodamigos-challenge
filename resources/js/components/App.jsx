import React, { useEffect } from 'react';
import { Routes, Router, Route, BrowserRouter } from 'react-router-dom';
import authService from '../app/services/auth/AuthService.js';
import HomePage from '../pages/Home/HomePage.jsx';

function App() {
  useEffect(() => {
    if (authService.isExpired() === false) {
      const token = authService.getToken();
      authService.refreshToken(token).then((response) => {
        if (response.status !== 200 || !response) {
          authService.logout();

          return;
        }

        authService.saveToken(response.data.token);
      });
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomePage/>}/>
        <Route element={<h1>404 Not Found!</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
