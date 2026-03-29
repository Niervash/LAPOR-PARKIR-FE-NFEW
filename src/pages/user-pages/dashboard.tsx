import React, { useEffect, useState, Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Select,
  Input,
  Button,
  Modal,
  Pagination,
} from "antd";
import {
  MapPinCheck,
  MapPin,
  Download,
  Maximize2,
  Minimize2,
} from "lucide-react";
import DashboardLayout from "../../layout/user/dashboard-user";
import { getAuth, setLogout } from "../../utils/cookies.storage";
import toast from "react-hot-toast";
import type { Report } from "../../types/map.types.interface";
import { ReportMap, ReportTable, StatsCard } from "../../component";
import { GetDataPetugas } from "../../services/report.petugas.service";
import DetailModalUser from "../../component/detail-modal-user/default";

const { Option } = Select;
const { Search } = Input;

class MapErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Map error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-87.5 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
          <div className="text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Peta tidak dapat dimuat</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    role?: string;
  } | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [mapExpanded, setMapExpanded] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

    const fetchParkirData = async () => {
      setLoading(true);
      if (!currentUser.id) {
        setLoading(false);
        return;
      }

      try {
        const result = await GetDataPetugas(currentUser.id);
        const rows = result?.data?.rows || [];

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

        const transformedReports: Report[] = rows.map((item: any) => ({
          id: String(item.id || ""),
          userId: String(item.idPengguna || currentUser.id),
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
          description: "",
        }));

        const sorted = transformedReports.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setReports(sorted);
      } catch (error: any) {
        console.error("[Dashboard] Gagal mengambil data:", error);
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Gagal mengambil data parkir",
        );
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchParkirData();
  }, [navigate]);

  const handleLogout = () => {
    setLogout();
    navigate("/");
  };

  const isAdmin = user?.role === "admin";

  const filteredReports = reports
    .filter((r) => isAdmin || r.userId === user?.id)
    .filter((r) => statusFilter === "all" || r.statusPost === statusFilter)
    .filter(
      (r) =>
        r.location.toLowerCase().includes(search.toLowerCase()) ||
        r.namaPetugas.toLowerCase().includes(search.toLowerCase()) ||
        r.identitasPetugas.toLowerCase().includes(search.toLowerCase()) ||
        r.statusLiar.toLowerCase().includes(search.toLowerCase()),
    );

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const updateStatus = async (id: string, statusPost: "approve" | "reject") => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, statusPost: statusPost } : r)),
    );
    toast.success(
      statusPost === "approve" ? "Laporan disetujui!" : "Laporan ditolak.",
    );
  };

  const handleDelete = async (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    toast.success("Laporan berhasil dihapus");
    setDeleteId(null);
  };

  const handleExportCSV = () => {
    const headers = [
      "No,Pelapor,Petugas,Identitas,Tanggal,Hari,Lokasi,Akurasi,Status Liar,Status Post,Deskripsi",
    ];
    const rows = filteredReports.map(
      (r, i) =>
        `${i + 1},${r.userId},${r.namaPetugas},${r.identitasPetugas},${new Date(r.createdAt).toLocaleDateString("id-ID")},${r.hari},${r.location},${r.akurasi},${r.statusLiar},${r.statusPost},"${r.description}"`,
    );
    const csv = [...headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "laporan-parkir.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Export berhasil! File CSV telah diunduh.");
  };

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <div className="space-y-4">
        <Breadcrumb items={[{ title: "Dashboard" }, { title: "Beranda" }]} />
        <div className="flex justify-between items-center mb-5" />
        {/* Stats Card */}
        <Card className="shadow-sm border-gray-200">
          {loading ? (
            <div className="p-6 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600"></div>
            </div>
          ) : (
            <StatsCard reports={filteredReports} />
          )}
        </Card>
        <div className=" mb-5" />
        {/* Main Card with Map and Controls */}
        <Card className="shadow-sm border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Selamat datang, {user.name}!
              </h2>
              <Button
                type="primary"
                icon={<Download className="h-4 w-4" />}
                onClick={handleExportCSV}
                className="bg-blue-600 hover:bg-blue-700 border-none shadow-md"
                disabled={loading || filteredReports.length === 0}
              >
                Export CSV
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <Select
                defaultValue="all"
                style={{ width: 180 }}
                onChange={(val) => {
                  setStatusFilter(val);
                  setCurrentPage(1);
                }}
                disabled={loading}
                className="shadow-sm"
              >
                <Option value="all">Semua Status</Option>
                <Option value="pending">Pending</Option>
                <Option value="approve">Disetujui</Option>
                <Option value="reject">Ditolak</Option>
              </Select>
              <Search
                placeholder="Cari lokasi, petugas, identitas, status liar..."
                allowClear
                onSearch={(val) => {
                  setSearch(val);
                  setCurrentPage(1);
                }}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ width: 300 }}
                disabled={loading}
                className="shadow-sm"
              />
            </div>

            {/* Map Section with Expand/Collapse */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-base font-semibold flex items-center gap-2 text-gray-900">
                  <MapPinCheck className="h-4 w-4 text-blue-600" />
                  Peta Pelaporan ({loading ? "..." : filteredReports.length})
                </h2>
                <button
                  onClick={() => setMapExpanded(!mapExpanded)}
                  className="inline-flex items-center gap-1.5 text-sm bg-white border border-gray-200 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition shadow-sm"
                >
                  {mapExpanded ? (
                    <>
                      <Minimize2 className="h-4 w-4" />
                      Kecilkan
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4" />
                      Perbesar
                    </>
                  )}
                </button>
              </div>
              <MapErrorBoundary>
                {loading ? (
                  <div
                    className={`flex items-center justify-center ${
                      mapExpanded ? "h-[70vh]" : "h-87.5"
                    }`}
                  >
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600"></div>
                  </div>
                ) : (
                  <ReportMap
                    reports={filteredReports}
                    onMarkerClick={setSelectedReport}
                    height={mapExpanded ? "70vh" : "350px"}
                  />
                )}
              </MapErrorBoundary>
            </div>

            {/* Selected Report Detail */}
          </div>
        </Card>
        <div className=" mb-5" />
        {/* Table Card */}
        <Card className="shadow-sm border-gray-200">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Memuat data...</p>
            </div>
          ) : (
            <>
              <ReportTable
                reports={paginatedReports}
                isAdmin={isAdmin}
                onViewPhoto={(url) => setPhotoPreview(url)}
                onView={setSelectedReport}
                onApprove={(id) => updateStatus(id, "approve")}
                onReject={(id) => updateStatus(id, "reject")}
              />
              {filteredReports.length > 0 && (
                <div className="mt-4 flex justify-end overflow-x-auto px-5">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredReports.length}
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
        {/* Modals */}
        <Modal
          title="Hapus Laporan"
          open={!!deleteId}
          onOk={() => deleteId && handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
          okText="Hapus"
          cancelText="Batal"
          okButtonProps={{ danger: true }}
        >
          <p>
            Apakah Anda yakin ingin menghapus laporan ini? Tindakan ini tidak
            dapat dibatalkan.
          </p>
        </Modal>
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

        {/* Modal Detail Laporan */}
        <DetailModalUser
          visible={!!selectedReport}
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onViewPhoto={setPhotoPreview}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
