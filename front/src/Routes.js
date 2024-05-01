import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import InterfaceDeConnexion from './Components/interfaceDeConnexion/InterfaceDeConnexion';
import ResetPassword from './Components/password/ResetPassword/resetPassword';
import Intranet from './Components/intranet/intranet';
import ChangePasswordPage from './Components/password/ChangePasswordPage/ChangePasswordPage';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Définition de l'état isLoggedIn et de sa fonction de mise à jour

  return (
    <Routes>
      <Route
        path="*"
        element={<InterfaceDeConnexion setIsLoggedIn={setIsLoggedIn} />} // Passer setIsLoggedIn à InterfaceDeConnexion
      />
      <Route path="/login" element={<InterfaceDeConnexion setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/intranet" element={<Intranet />} />
      <Route path="/api/user/reset-password/:token" element={<ChangePasswordPage />} />
    </Routes>
  );
}

export default AppRoutes;
