import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import InterfaceDeConnexion from "./Components/interfaceDeConnexion/InterfaceDeConnexion";
import ResetPassword from "./Components/password/ResetPassword/resetPassword";
import Intranet from "./Components/intranet/intranet";
import ChangePasswordPage from "./Components/password/ChangePasswordPage/ChangePasswordPage";

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("token")
  ); // Vérifie si un jeton est présent dans le sessionStorage

  return (
    <Routes>
      <Route
        path="*"
        element={<InterfaceDeConnexion setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/login"
        element={<InterfaceDeConnexion setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* Vérifie si l'utilisateur est authentifié avant d'accéder à /intranet */}
      <Route
        path="/intranet"
        element={isLoggedIn ? <Intranet /> : <Navigate to="/login" />}
      />
      <Route
        path="/api/user/reset-password/:token"
        element={<ChangePasswordPage />}
      />
    </Routes>
  );
}

export default AppRoutes;
