import React, { useEffect, useState } from 'react';
import { Routes, Router, Route, BrowserRouter } from 'react-router-dom';
import authService from '../app/services/auth/AuthService.js';
import HomePage from '../pages/Home/HomePage.jsx';
import Navbar from './Navbar/Navbar.jsx';
import LoginModal from './LoginModal/LoginModal.jsx';
import RegisterModal from './RegisterModal/RegisterModal.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.hasBeenAuthenticated());
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authService.hasBeenAuthenticated())
  }, []);

  return (
    <>
      <LoginModal open={openLoginModal}
                  handleClose={() => setOpenLoginModal(false)}/>

      <RegisterModal open={openRegisterModal}
                     handleOpenLogin={() => setOpenLoginModal(true)}
                     handleClose={() => setOpenRegisterModal(false)}/>

      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
          <Route element={<h1>404 Not Found!</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
