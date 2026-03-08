import React from "react";
import { AdminLayout } from "../../layout";
import { Breadcrumb, Card } from "antd";
import {
  CardWrapper,
  LokasiTerbanyak,
  StatsCard,
  StatusDistribusi,
} from "../../component";
import { BarChart, Car, PieChartIcon } from "lucide-react";
import { MapPage } from "../../component/main-map";

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      {/* Your dashboard content goes here */}
      <div className="space-y-4 p-4">
        <Breadcrumb items={[{ title: "Dashboard" }, { title: "Beranda" }]} />
        <div className="flex justify-between items-center mb-5" />
        {/* welcome speech */}

        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Admin Overview
        </h1>
        <p className="text-sm text-muted-foreground/60 mt-1">
          Kelola semua laporan dari pengguna
        </p>

        <div className="flex justify-between items-center mb-5" />
        {/* chart section */}
        <div className="space-y-4  grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardWrapper title="Distribusi Status" icon={PieChartIcon}>
            <StatusDistribusi />
          </CardWrapper>
          <CardWrapper title="Lokasi Terbanyak" icon={BarChart}>
            <LokasiTerbanyak />
          </CardWrapper>
        </div>
        {/* maps section */}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
