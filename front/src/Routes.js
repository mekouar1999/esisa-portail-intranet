import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InterfaceDeConnexion from './Components/interfaceDeConnexion/InterfaceDeConnexion';
import ResetPassword from './Components/password/ResetPassword/resetPassword';
import Intranet from './Components/intranet/intranet';
import ChangePasswordPage from './Components/password/ChangePasswordPage/ChangePasswordPage';

function AppRoutes() {
  return (
    <Routes>
          <Route path="*" element={<InterfaceDeConnexion />} />
      <Route path="/login" element={<InterfaceDeConnexion />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/intranet" element={<Intranet />} />
      <Route path="/api/user/reset-password/:token" element={<ChangePasswordPage />} />
    </Routes>
  );
}

export default AppRoutes;
