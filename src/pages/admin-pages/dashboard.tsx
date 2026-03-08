import React from "react";
import { AdminLayout } from "../../layout";
import { Card } from "antd";
import AdminReport from "../../component/admin-report-view/default";

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      {/* Your dashboard content goes here */}
      <Card className=" rounded-2xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Welcome, !</h2>
          {/* Add more dashboard widgets, charts, etc. */}
          <AdminReport />
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;
