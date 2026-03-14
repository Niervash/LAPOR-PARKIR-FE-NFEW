import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../../layout";
import { Input, Select, Button, Pagination, Space } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
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
import type { ReportAdmin } from "../../types/admin.types.interface";
import {
  GetDataPetugas,
  DeleteLaporanPetugas,
} from "../../services/admin.service";
import { getAuth, GetItem, setLogout } from "../../utils/cookies.storage";

const { Option } = Select;

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportAdmin[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportAdmin | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [user, setUser] = useState<{
    name: string;
    role?: string;
  } | null>(null);
  const pageSize = 10;
  const isAdmin = true;

  // Ambil data user dari cookie/storage
  useEffect(() => {
    const userData = getAuth();
    if (userData) {
      setUser({
        name: userData.role || "Admin",
        role: userData.role || "admin",
      });
    }
  }, []);

  // Fungsi fetch data
  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await GetDataPetugas();

      let rawData: any[] = [];
      if (res?.data?.data && Array.isArray(res.data.data)) {
        rawData = res.data.data;
      } else if (res?.data && Array.isArray(res.data)) {
        rawData = res.data;
      } else if (res?.data?.records && Array.isArray(res.data.records)) {
        rawData = res.data.records;
      } else if (res?.data && typeof res.data === "object") {
        const possibleArray = Object.values(res.data).find(Array.isArray);
        if (possibleArray) rawData = possibleArray as any[];
      }

      const mapped: ReportAdmin[] = rawData.map((item: any) => ({
        id: String(item.id || item._id || item.ID || ""),
        bukti: item.bukti || item.image || item.foto || "",
        hari: item.hari || item.day || "",
        identitas_petugas:
          item.identitas_petugas || item.petugas || item.nama_petugas || "",
        lokasi: item.lokasi || item.alamat || item.location || "",
        status: item.status || "Tidak Liar",
        tanggaldanwaktu:
          item.tanggaldanwaktu || item.tanggal || item.date || item.waktu || "",
        latitude: item.latitude || item.lat || null,
        longitude: item.longitude || item.lng || null,
      }));

      setReports(mapped);
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
      setReports([]);
      alert("Gagal memuat data. Silakan refresh.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch awal
  useEffect(() => {
    fetchReports();
  }, []);

  // Listener untuk event sync-data dari sidebar
  useEffect(() => {
    const handleSync = () => {
      fetchReports();
    };
    window.addEventListener("sync-data", handleSync);
    return () => window.removeEventListener("sync-data", handleSync);
  }, []);

  // Filter data
  const filteredReports = useMemo(() => {
    if (!reports.length) return [];

    return reports.filter((report) => {
      const matchesStatus =
        statusFilter === "all" || report.status === statusFilter;

      const searchTerm = search.toLowerCase().trim();
      const matchesSearch =
        searchTerm === "" ||
        report.lokasi?.toLowerCase().includes(searchTerm) ||
        report.identitas_petugas?.toLowerCase().includes(searchTerm) ||
        report.status?.toLowerCase().includes(searchTerm) ||
        report.hari?.toLowerCase().includes(searchTerm) ||
        report.tanggaldanwaktu?.toLowerCase().includes(searchTerm);

      return matchesStatus && matchesSearch;
    });
  }, [reports, search, statusFilter]);

  // Reset halaman saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // Pagination
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleView = (report: ReportAdmin) => setSelectedReport(report);
  const handleDelete = (id: string) => setDeleteId(id);

  const handleNavigateDetail = (id: string) => {
    navigate(`/admin/dashboard/report/${id}`);
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
    if (filteredReports.length === 0) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }
    const headers = ["ID", "Petugas", "Lokasi", "Tanggal", "Status Liar"];
    const rows = filteredReports.map((r) => [
      r.id,
      r.identitas_petugas,
      r.lokasi,
      r.tanggaldanwaktu,
      r.status,
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

  const handleLogout = () => {
    setLogout(); // hapus token dan data user
    navigate("/");
  };

  if (loading) {
    return (
      <AdminLayout user={user} onLogout={handleLogout}>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Memuat data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout user={user} onLogout={handleLogout}>
      <div className="space-y-4 p-4">
        <h1 className="text-2xl font-bold text-black tracking-tight">
          Admin Overview
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Kelola semua laporan dari pengguna
        </p>
      </div>

      <div className="space-y-7 p-4">
        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardWrapper title="Distribusi Status" icon={PieChartIcon}>
            <StatusDistribusi reports={filteredReports} />
          </CardWrapper>
          <CardWrapper title="Lokasi Terbanyak" icon={BarChart}>
            <LokasiTerbanyak reports={filteredReports} />
          </CardWrapper>
        </div>

        {/* Map Section */}
        {filteredReports.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden z-0">
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-sky-100">
                  <Map className="h-3.5 w-3.5 text-sky-600" />
                </div>
                <h2 className="text-sm font-semibold text-black">
                  Peta Laporan
                </h2>
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
        )}

        {/* Filter Section */}
        <div className="w-full">
          <Space wrap size="middle" className="w-full justify-between">
            <Input
              placeholder="Cari laporan (lokasi, petugas, status, hari)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-full sm:w-80"
              allowClear
            />
            <Space wrap>
              <Select
                value={statusFilter}
                onChange={(value) => setStatusFilter(value)}
                className="w-40"
                placeholder="Filter Status"
              >
                <Option value="all">Semua Status</Option>
                <Option value="Liar">Liar</Option>
                <Option value="Tidak Liar">Tidak Liar</Option>
              </Select>
              <Button
                icon={<DownloadOutlined />}
                onClick={handleExportCSV}
                className="flex items-center"
                disabled={filteredReports.length === 0}
              >
                Export CSV
              </Button>
            </Space>
          </Space>
        </div>

        {/* Table Section */}
        <AdminReportTable
          reports={paginatedReports}
          onView={handleView}
          onDelete={handleDelete}
          onNavigateDetail={handleNavigateDetail}
        />

        {/* Pagination */}
        {filteredReports.length > pageSize && (
          <div className="flex justify-end mt-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredReports.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} dari ${total} data`
              }
            />
          </div>
        )}

        {/* Modals */}
        <DetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          isAdmin={isAdmin}
        />
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
