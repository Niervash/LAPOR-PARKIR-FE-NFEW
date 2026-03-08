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
import {
  BarChart,
  Filter,
  Map,
  PieChartIcon,
  Search,
  Download,
} from "lucide-react";
import type { Report, ReportStatus } from "../../types/map.types.interface";
import {
  GetDataPetugas, // <-- ditambahkan
  ApprovePetugas,
  DeleteLaporanPetugas,
  RejectPetugas,
} from "../../services/admin.service";

const AdminDashboard: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const isAdmin = true;

  // Fetch data dari API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await GetDataPetugas();
        // 👇 pastikan data berupa array
        const data = Array.isArray(res) ? res : res?.data || [];
        setReports(data);
      } catch (error) {
        console.error("Gagal mengambil data laporan:", error);
        setReports([]); // agar tidak error map
        alert("Gagal memuat data. Silakan refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Filter laporan berdasarkan search dan status
  useEffect(() => {
    let filtered = reports;
    // Filter status
    if (statusFilter !== "all") {
      const statusMap: Record<string, ReportStatus> = {
        pending: "pending",
        approved: "approve",
        rejected: "reject",
      };
      filtered = filtered.filter(
        (r) => r.statusPost === statusMap[statusFilter],
      );
    }
    // Filter pencarian
    if (search.trim() !== "") {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.namaPetugas?.toLowerCase().includes(term) ||
          r.location?.toLowerCase().includes(term) ||
          r.identitasPetugas?.toLowerCase().includes(term),
      );
    }
    setFilteredReports(filtered);
  }, [reports, search, statusFilter]);

  // Handler functions
  const handleView = (report: Report) => setSelectedReport(report);

  const handleDelete = (id: string) => setDeleteId(id);

  const handleViewPhoto = (url: string) => window.open(url, "_blank");

  const handleApprove = async (id: string) => {
    try {
      await ApprovePetugas(id);
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statusPost: "approve" } : r)),
      );
      alert("Laporan berhasil disetujui.");
    } catch (error) {
      alert("Gagal menyetujui laporan.");
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await RejectPetugas(id);
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statusPost: "reject" } : r)),
      );
      alert("Laporan berhasil ditolak.");
    } catch (error) {
      alert("Gagal menolak laporan.");
      console.error(error);
    }
  };

  const handleUpdateStatus = async (id: string, status: ReportStatus) => {
    try {
      if (status === "approve") {
        await ApprovePetugas(id);
      } else if (status === "reject") {
        await RejectPetugas(id);
      }
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statusPost: status } : r)),
      );
    } catch (error) {
      alert("Gagal mengubah status.");
      console.error(error);
    }
  };

  const deleteReport = async (id: string) => {
    try {
      await DeleteLaporanPetugas(id);
      setReports((prev) => prev.filter((r) => r.id !== id));
      alert("Laporan berhasil dihapus.");
    } catch (error) {
      alert("Gagal menghapus laporan.");
      console.error(error);
    }
  };

  const handleExportCSV = () => {
    // Buat CSV dari filteredReports
    const headers = ["ID", "Petugas", "Lokasi", "Tanggal", "Status"];
    const rows = filteredReports.map((r) => [
      r.id,
      r.namaPetugas,
      r.location,
      r.createdAt,
      r.statusPost,
    ]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "laporan.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Memuat data...</p>
        </div>
      </AdminLayout>
    );
  }

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
              reports={filteredReports}
              onMarkerClick={(report) => setSelectedReport(report)}
              height="500px"
            />
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari laporan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-black focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none text-sm transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-black text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-all"
            >
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        </div>

        {/* Table section */}
        <AdminReportTable
          reports={filteredReports}
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
