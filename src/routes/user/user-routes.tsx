import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminDashboard, CreateReport, UserPage } from "../../pages";
import DashboardPage from "../../pages/user-pages/dashboard";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/home" replace />} />
      {/* Render UserPage at /home */}
      <Route path="home" element={<UserPage />} />
      {/* <Route path="dashboard" element={<DashboardPage />} />
      <Route path="dashboard/report" element={<CreateReport />} />
      <Route path="dashboard/reports" element={<AdminDashboard />} /> */}
    </Routes>
  );
};

export default UserRoutes;
