import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminDashboard, NotFound, Overview } from "../../pages";

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        {/* <Route path="dashbaord" element={<AdminDashboard />} /> */}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/report/:id" element={<Overview />} />
        {/* 404 */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
