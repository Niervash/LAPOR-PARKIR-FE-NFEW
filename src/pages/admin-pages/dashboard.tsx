import React, { useState, useEffect } from "react";
import { AdminLayout } from "../../layout";
import { Breadcrumb } from "antd";
import {
  AdminReportMap,
  AdminReportTable,
  CardWrapper,
  ConfirmModal,
  DetailModal,
  LokasiTerbanyak,
  StatusDistribusi,
} from "../../component";
import { BarChart, Map, PieChartIcon } from "lucide-react";
import type { Report, ReportStatus } from "../../types/map.types.interface";
import { MapPage } from "../../component/main-map";

// Jika pakai toast, import dari library toast (misal react-hot-toast)
// import toast from "react-hot-toast";

const AdminDashboard: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null); // <-- state untuk konfirmasi hapus
  const isAdmin = true; // atau berdasarkan auth

  // Simulate fetching reports (replace with actual API call)
  useEffect(() => {
    const dummyReports: Report[] = [
      {
        id: "1",
        userId: "user1",
        namaPetugas: "John Doe",
        identitasPetugas: "ID001",
        akurasi: "Tinggi",
        hari: "Senin",
        statusLiar: "Liar",
        statusPost: "approve",
        location: "Jakarta",
        latitude: -6.2088,
        longitude: 106.8456,
        photoUrl: "https://example.com/photo1.jpg",
        createdAt: "2024-01-15T10:30:00Z",
        zoom: 13,
        description: "Laporan kendaraan liar di area ini.",
      },
      {
        id: "2",
        userId: "user2",
        namaPetugas: "Jane Smith",
        identitasPetugas: "ID002",
        akurasi: "Sedang",
        hari: "Selasa",
        statusLiar: "Tidak Liar",
        statusPost: "pending",
        location: "Bandung",
        latitude: -6.9147,
        longitude: 107.6098,
        photoUrl: "https://example.com/photo2.jpg",
        createdAt: "2024-01-16T14:20:00Z",
        zoom: 13,
        description: "Tidak ditemukan pelanggaran.",
      },
    ];
    setReports(dummyReports);
  }, []);

  // Handler functions
  const handleView = (report: Report) => {
    setSelectedReport(report);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id); // <-- tampilkan modal konfirmasi
  };

  const handleViewPhoto = (url: string) => {
    console.log("View photo:", url);
    window.open(url, "_blank");
  };

  const handleApprove = (id: string) => {
    console.log("Approve report with id:", id);
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, statusPost: "approve" } : r)),
    );
    // TODO: call API
  };

  const handleReject = (id: string) => {
    console.log("Reject report with id:", id);
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, statusPost: "reject" } : r)),
    );
    // TODO: call API
  };

  const handleUpdateStatus = (id: string, status: ReportStatus) => {
    console.log(`Update status report ${id} to ${status}`);
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, statusPost: status } : r)),
    );
  };

  const deleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    // TODO: panggil API delete
    console.log("Laporan dihapus:", id);
  };

  return (
    <AdminLayout>
      <div className="space-y-4 p-4">
        <h1 className="text-2xl font-bold text-black tracking-tight">
          Admin Overview
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Kelola semua laporan dari pengguna
        </p>
      </div>
      <div className="space-y-7 p-4">
        <Breadcrumb
          className="font-bold"
          items={[{ title: "Dashboard" }, { title: "Beranda" }]}
        />
        <div className=" mb-5" />
        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardWrapper title="Distribusi Status" icon={PieChartIcon}>
            <StatusDistribusi />
          </CardWrapper>
          <CardWrapper title="Lokasi Terbanyak" icon={BarChart}>
            <LokasiTerbanyak />
          </CardWrapper>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden z-0">
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-sky-100">
                <Map className="h-3.5 w-3.5 text-sky-600" />
              </div>
              <h2 className="text-sm font-semibold text-black">Peta Laporan</h2>
            </div>
          </div>
          <div className="z-auto">
            <AdminReportMap
              reports={reports}
              onMarkerClick={(report) => setSelectedReport(report)}
              height="500px"
            />
          </div>
        </div>

        {/* Table section */}
        <AdminReportTable
          reports={reports}
          isAdmin={isAdmin}
          onView={handleView}
          onDelete={handleDelete}
          onViewPhoto={handleViewPhoto}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        {/* Detail Modal */}
        <DetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          isAdmin={isAdmin}
          onUpdateStatus={handleUpdateStatus}
        />

        {/* Confirm Delete Modal */}
        <ConfirmModal
          open={!!deleteId}
          title="Hapus Laporan"
          message="Apakah Anda yakin ingin menghapus laporan ini? Tindakan ini tidak dapat dibatalkan."
          onConfirm={() => {
            if (deleteId) {
              deleteReport(deleteId);
              setDeleteId(null);
              alert("Laporan berhasil dihapus."); // Ganti dengan toast jika ada
            }
          }}
          onCancel={() => setDeleteId(null)}
          variant="red"
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
