import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layout/user/dashboard-user";
import { Breadcrumb, Card, Button, Pagination, Modal } from "antd";
import { ModalReport, ReportTable, StatsCard } from "../../component";
import { useNavigate } from "react-router-dom";
import { AddDataPetugas, GetDataPetugas } from "../../services/report.service";
import { getAuth, setLogout } from "../../utils/cookies.storage";
import type { Report } from "../../types/map.types.interface";
import { Download, Plus } from "lucide-react";
import DetailModalUser from "../../component/detail-modal-user/default";
import { LoadingModal } from "../../component/loading-modal";

// Fungsi untuk mengurutkan laporan dari yang terbaru
const sortReportsByDate = (reports: Report[]): Report[] => {
  return [...reports].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
};

const CreateReport: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // loading awal data
  const [reports, setReports] = useState<Report[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    role?: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // State untuk modal detail dan foto
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // State untuk loading modal (notifikasi)
  const [loadingModal, setLoadingModal] = useState<{
    visible: boolean;
    status: "loading" | "success" | "error";
    message: string;
  }>({
    visible: false,
    status: "loading",
    message: "",
  });

  useEffect(() => {
    const auth = getAuth();
    if (!auth.token) {
      navigate("/auth/login");
      return;
    }

    const currentUser = {
      id: auth.id || "",
      name: sessionStorage.getItem("userName") || "Pengguna",
      email: sessionStorage.getItem("userEmail") || "",
      role: auth.role || undefined,
    };
    setUser(currentUser);

    const fetchReports = async () => {
      if (!auth.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await GetDataPetugas(auth.id);
        const dataArray = result?.data?.rows || result?.data || [];

        const mapStatus = (
          status: string,
        ): "pending" | "approve" | "reject" => {
          if (!status) return "pending";
          const lower = status.toLowerCase();
          if (lower.includes("approve") || lower === "approved")
            return "approve";
          if (lower.includes("reject") || lower === "rejected") return "reject";
          return "pending";
        };

        const transformed: Report[] = dataArray.map((item: any) => ({
          id: String(item.id || ""),
          userId: String(item.idPengguna || auth.id),
          namaPetugas: item.nama || "",
          identitasPetugas: item.identitas_petugas || "",
          akurasi: item.akurasi || "",
          hari: item.hari || "",
          statusLiar: item.status || "",
          statusPost: mapStatus(item.status_post),
          location: item.lokasi || "",
          latitude: parseFloat(item.latitude) || 0,
          longitude: parseFloat(item.longitude) || 0,
          photoUrl: item.bukti || "",
          createdAt:
            item.tanggaldanwaktu || item.createdAt || new Date().toISOString(),
          description: item.deskripsi_masalah || "",
        }));

        const sorted = sortReportsByDate(transformed);
        setReports(sorted);
      } catch (error: any) {
        console.error("Gagal mengambil data:", error);
        setLoadingModal({
          visible: true,
          status: "error",
          message:
            error.response?.data?.message ||
            error.message ||
            "Gagal memuat laporan",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [navigate]);

  const handleLogout = () => {
    setLogout();
    navigate("/");
  };

  const handleAddClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleModalSubmit = async (formData: any) => {
    try {
      // Tampilkan loading modal
      setLoadingModal({
        visible: true,
        status: "loading",
        message: "Sedang mengirim data...",
      });

      const payload = {
        nama: formData.nama,
        lokasi: formData.location,
        latitude: formData.coords.lat,
        longitude: formData.coords.lng,
        identitas_petugas: formData.identitas_petugas,
        tanggaldanwaktu: formData.tanggaldanwaktu,
        hari: formData.hari,
        bukti: formData.bukti,
      };

      await AddDataPetugas(payload);

      // Refresh data
      const result = await GetDataPetugas(user?.id || "");
      const dataArray = result?.data?.rows || result?.data || [];
      const mapStatus = (status: string): "pending" | "approve" | "reject" => {
        if (!status) return "pending";
        const lower = status.toLowerCase();
        if (lower.includes("approve") || lower === "approved") return "approve";
        if (lower.includes("reject") || lower === "rejected") return "reject";
        return "pending";
      };
      const transformed: Report[] = dataArray.map((item: any) => ({
        id: String(item.id || ""),
        userId: String(item.idPengguna || user?.id),
        namaPetugas: item.nama || "",
        identitasPetugas: item.identitas_petugas || "",
        akurasi: item.akurasi || "",
        hari: item.hari || "",
        statusLiar: item.status || "",
        statusPost: mapStatus(item.status_post),
        location: item.lokasi || "",
        latitude: parseFloat(item.latitude) || 0,
        longitude: parseFloat(item.longitude) || 0,
        photoUrl: item.bukti || "",
        createdAt:
          item.tanggaldanwaktu || item.createdAt || new Date().toISOString(),
        description: item.deskripsi_masalah || "",
      }));

      const sorted = sortReportsByDate(transformed);
      setReports(sorted);

      // Tutup modal input
      setIsModalOpen(false);

      // Ubah menjadi sukses (loading modal akan tetap terbuka sampai user klik tutup)
      setLoadingModal({
        visible: true,
        status: "success",
        message: "Laporan berhasil ditambahkan!",
      });
    } catch (error: any) {
      console.error("Gagal menambah:", error);
      setLoadingModal({
        visible: true,
        status: "error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Gagal menambah laporan",
      });
    }
  };

  const handleExportCSV = () => {
    try {
      const headers = ["No,Pelapor,Tanggal,Lokasi,Kendaraan,Status,Deskripsi"];
      const rows = reports.map(
        (r, i) =>
          `${i + 1},${r.userId},${new Date(r.createdAt).toLocaleDateString(
            "id-ID",
          )},${r.location},${r.namaPetugas || "-"},${r.statusPost},"${
            r.description
          }"`,
      );
      const csv = [...headers, ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "laporan-parkir.csv";
      a.click();
      URL.revokeObjectURL(url);
      setLoadingModal({
        visible: true,
        status: "success",
        message: "Export CSV berhasil!",
      });
    } catch (error) {
      setLoadingModal({
        visible: true,
        status: "error",
        message: "Gagal mengexport CSV",
      });
    }
  };

  const paginatedReports = reports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <div className="flex justify-between items-center mb-5">
        <Breadcrumb
          items={[{ title: "Dashboard" }, { title: "Buat Laporan" }]}
        />
        <div className="flex gap-2">
          <Button
            icon={<Download className="h-4 w-4" />}
            onClick={handleExportCSV}
            disabled={loading || reports.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-md hover:shadow-lg"
          >
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="border-gray-200 shadow-sm">
        {loading ? (
          <div className="p-6 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600"></div>
          </div>
        ) : (
          <StatsCard reports={reports} />
        )}
      </Card>

      <div className="mb-5" />
      <button
        onClick={handleAddClick}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
      >
        <Plus className="h-4 w-4" /> Tambah Laporan
      </button>
      <div className="mb-5" />

      <Card className="border-gray-200 shadow-sm">
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Memuat data...</p>
          </div>
        ) : (
          <>
            <ReportTable
              reports={paginatedReports}
              isAdmin={false}
              onView={(report) => setSelectedReport(report)}
              onViewPhoto={(url) => setPhotoPreview(url)}
            />
            {reports.length > 0 && (
              <div className="mt-4 flex justify-end overflow-x-auto px-5">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={reports.length}
                  onChange={(page, size) => {
                    setCurrentPage(page);
                    if (size) setPageSize(size);
                  }}
                  showSizeChanger
                  pageSizeOptions={["5", "10", "20", "50"]}
                  locale={{ items_per_page: "/ halaman" }}
                />
              </div>
            )}
          </>
        )}
      </Card>

      {/* Modal Detail Laporan */}
      <DetailModalUser
        visible={!!selectedReport}
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        onViewPhoto={setPhotoPreview}
      />

      {/* Modal Foto */}
      <Modal
        title="Foto Laporan"
        open={!!photoPreview}
        onCancel={() => setPhotoPreview(null)}
        footer={null}
        width={600}
      >
        {photoPreview && (
          <img src={photoPreview} alt="Laporan" className="w-full h-auto" />
        )}
      </Modal>

      {/* Loading Modal (notifikasi) */}
      <LoadingModal
        visible={loadingModal.visible}
        status={loadingModal.status}
        message={loadingModal.message}
        onClose={() => setLoadingModal((prev) => ({ ...prev, visible: false }))}
      />

      {/* Modal Tambah Laporan */}
      <ModalReport
        visible={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </DashboardLayout>
  );
};

export default CreateReport;
