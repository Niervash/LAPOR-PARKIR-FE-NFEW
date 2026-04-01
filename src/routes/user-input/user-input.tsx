import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../../pages/user-pages/dashboard";
import { CreateReport, NotFound } from "../../pages";

const UserInputRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Reports */}
      <Route
        path="/dashboard/reports/petugas-liar"
        element={<CreateReport />}
      />
      {/* <Route
        path="/dashboard/reports/parkir-liar"
        element={<CreateReportParkir />}
      /> */}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserInputRoutes;
