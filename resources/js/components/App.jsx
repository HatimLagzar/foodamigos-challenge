import React, { useEffect, useState } from 'react';
import { Routes, Router, Route, BrowserRouter } from 'react-router-dom';
import authService from '../app/services/auth/AuthService.js';
import HomePage from '../pages/Home/HomePage.jsx';
import Navbar from './Navbar/Navbar.jsx';
import LoginModal from './LoginModal/LoginModal.jsx';
import RegisterModal from './RegisterModal/RegisterModal.jsx';
import Basket from './Basket/Basket.jsx';
import OrderPage from '../pages/Order/OrderPage.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    authService.hasBeenAuthenticated(),
  );

  const [itemsInBasket, setItemsInBasket] = useState([]);
  const [openBasket, setOpenBasket] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authService.hasBeenAuthenticated());
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('basket')) {
      return;
    }

    setItemsInBasket(JSON.parse(localStorage.getItem('basket')));
  }, []);

  return (
    <>
      <Basket open={openBasket} handleClose={() => setOpenBasket(false)}
              items={itemsInBasket} setItems={setItemsInBasket}/>

      <LoginModal open={openLoginModal}
                  setIsLoggedIn={setIsLoggedIn}
                  handleClose={() => setOpenLoginModal(false)}/>

      <RegisterModal open={openRegisterModal}
                     handleOpenLogin={() => setOpenLoginModal(true)}
                     handleClose={() => setOpenRegisterModal(false)}/>

      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
              setOpenRegisterModal={setOpenRegisterModal}
              items={itemsInBasket}
              setOpenBasket={setOpenBasket}
              setOpenLoginModal={setOpenLoginModal}/>

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<HomePage isLoggedIn={isLoggedIn}
                                               itemsInBasket={itemsInBasket}
                                               setItemsInBasket={setItemsInBasket}
                                               setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path={'/orders/:id'} element={<OrderPage isLoggedIn={isLoggedIn}
                                               itemsInBasket={itemsInBasket}
                                               setItemsInBasket={setItemsInBasket}
                                               setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route element={<h1>404 Not Found!</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
