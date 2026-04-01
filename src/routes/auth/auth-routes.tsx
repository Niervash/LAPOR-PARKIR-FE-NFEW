import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage, NotFound } from "../../pages";
import RegisterPage from "../../pages/auth/register-page";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      {/* 404 */}
          <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default AuthRoutes;
