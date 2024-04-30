import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import InterfaceDeConnexion from './Components/interfaceDeConnexion/InterfaceDeConnexion';
import ResetPassword from './Components/ResetPassword/resetPassword';
import Intranet from './Components/intranet/intranet';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<InterfaceDeConnexion />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/intranet" element={<Intranet />} />

    </Routes>
  );
}

export default AppRoutes;



