import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages";
import RegisterPage from "../../pages/auth/register-page";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AuthRoutes;
