import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminDashboard, CreateReport, UserPage } from "../../pages";
import DashboardPage from "../../pages/user-pages/dashboard";

const UserInputRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="dashboard/report" element={<CreateReport />} />
      {/* <Route path="dashboard/reports" element={<AdminDashboard />} /> */}
    </Routes>
  );
};

export default UserInputRoutes;
