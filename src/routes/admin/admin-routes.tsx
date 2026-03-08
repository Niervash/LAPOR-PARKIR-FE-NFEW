import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../../pages";

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        {/* <Route path="dashbaord" element={<AdminDashboard />} /> */}
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
