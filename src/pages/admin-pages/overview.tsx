import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { AdminLayout } from "../../layout";
import { GetDataPetugas, GetDetailPetugas } from "../../services/admin.service";
import {
  DetailReport,
  ModalMap,
  PhotoModal,
  QuickNav,
  TopNav,
} from "../../component";
import type {
  ReportItem,
  ReportStatus,
} from "../../types/admin.types.interface";
import { getAuth, setLogout } from "../../utils/cookies.storage";

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailReport, setDetailReport] = useState<ReportItem | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState<
    "Liar" | "Tidak Liar" | null
  >(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; role?: string } | null>(
    null,
  );
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

  const handleLogout = () => {
    setLogout();
    navigate("/auth/login");
  };

  const normalizeStatusPost = (status: any): ReportStatus => {
    if (status === "approve" || status === "reject" || status === "pending") {
      return status;
    }
    return "pending";
  };

  // FETCH ALL REPORTS
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await GetDataPetugas();
        let data: ReportItem[] = [];
        if (Array.isArray(res)) {
          data = res.map((item: any) => ({
            id: String(item.id || item._id || item.ID || ""),
            identitas_petugas:
              item.identitas_petugas || item.petugas || item.nama_petugas || "",
            nama: item.nama || "",
            tanggaldanwaktu:
              item.tanggaldanwaktu ||
              item.tanggal ||
              item.date ||
              item.waktu ||
              "",
            latitude: item.latitude || item.lat || 0,
            longitude: item.longitude || item.lng || 0,
            lokasi: item.lokasi || item.alamat || item.location || "",
            akurasi: item.akurasi,
            status: item.status || "Tidak Liar",
            status_post: normalizeStatusPost(item.status_post),
            hari: item.hari || item.day || "",
            bukti: item.bukti || item.foto || item.image || undefined,
          }));
        } else if (
          res &&
          typeof res === "object" &&
          "data" in res &&
          Array.isArray(res.data)
        ) {
          data = res.data.map((item: any) => ({
            id: String(item.id || item._id || item.ID || ""),
            identitas_petugas:
              item.identitas_petugas || item.petugas || item.nama_petugas || "",
            nama: item.nama || "",
            tanggaldanwaktu:
              item.tanggaldanwaktu ||
              item.tanggal ||
              item.date ||
              item.waktu ||
              "",
            latitude: item.latitude || item.lat || 0,
            longitude: item.longitude || item.lng || 0,
            lokasi: item.lokasi || item.alamat || item.location || "",
            akurasi: item.akurasi,
            status: item.status || "Tidak Liar",
            status_post: normalizeStatusPost(item.status_post),
            hari: item.hari || item.day || "",
            bukti: item.bukti || item.foto || item.image || undefined,
          }));
        }
        setReports(data);
        console.log("✅ Reports loaded:", data.length, "items");
      } catch (error) {
        console.error("Gagal mengambil data laporan:", error);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // FETCH DETAIL REPORT WHEN ID CHANGES - IMPROVED WITH CACHE FIRST
  useEffect(() => {
    console.log("🔍 Current ID from params:", id);

    if (!id) {
      console.log("⚠️ No valid ID in URL params");
      setDetailReport(null);
      setLoadingDetail(false);
      return;
    }

    // PERBAIKAN #1: Check apakah data sudah ada di reports array
    const foundInReports = reports.find((r) => r.id === id);

    if (foundInReports) {
      console.log("✅ Data ditemukan di reports cache, menggunakan data lokal");
      setDetailReport(foundInReports);
      setLoadingDetail(false);
      return;
    }

    // Jika tidak ada di reports, baru fetch dari API
    const fetchDetail = async () => {
      setLoadingDetail(true);
      console.log("🎯 Fetching detail dari API untuk ID:", id);

      try {
        const res = await GetDetailPetugas(id);
        console.log("📦 Detail API Response:", res);

        // Handle different response formats
        const item = res?.data || res;

        if (!item || (typeof item === "object" && Object.keys(item).length === 0)) {
          console.warn("❌ No item data in response");
          setDetailReport(null);
          return;
        }

        const detail: ReportItem = {
          id: String(item.id || item._id || item.ID || id),
          identitas_petugas:
            item.identitas_petugas || item.petugas || item.nama_petugas || "",
          nama: item.nama || "",
          tanggaldanwaktu:
            item.tanggaldanwaktu ||
            item.tanggal ||
            item.date ||
            item.waktu ||
            "",
          latitude: item.latitude || item.lat || 0,
          longitude: item.longitude || item.lng || 0,
          lokasi: item.lokasi || item.alamat || item.location || "",
          akurasi: item.akurasi,
          status: item.status || "Tidak Liar",
          status_post: normalizeStatusPost(item.status_post),
          hari: item.hari || item.day || "",
          bukti: item.bukti || item.foto || item.image || undefined,
        };

        setDetailReport(detail);
        console.log("✅ Detail report set successfully:", detail.id);
      } catch (error) {
        console.error(`❌ Failed to fetch detail for ID ${id}:`, error);
        
        // PERBAIKAN #2: Fallback ke data dari reports array jika ada
        if (foundInReports) {
          console.log("⚠️ API gagal, menggunakan fallback dari reports cache");
          setDetailReport(foundInReports);
        } else {
          setDetailReport(null);
        }
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchDetail();
  }, [id, reports]);

  // CALCULATE NAVIGATION
  const currentIndex = reports.findIndex((r) => r.id === id);
  const prevReport = currentIndex > 0 ? reports[currentIndex - 1] : null;
  const nextReport =
    currentIndex < reports.length - 1 ? reports[currentIndex + 1] : null;

  // Prioritize detailReport from API, fallback to reports array
  const reportToShow = detailReport || (currentIndex >= 0 ? reports[currentIndex] : null);

  const mapReport = reportToShow
    ? {
        id: reportToShow.id,
        latitude: reportToShow.latitude,
        longitude: reportToShow.longitude,
      }
    : null;

  const handleStatusChange = (newStatus: "Liar" | "Tidak Liar") => {
    if (!reportToShow) return;
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportToShow.id ? { ...r, status: newStatus } : r,
      ),
    );
    if (detailReport) {
      setDetailReport({ ...detailReport, status: newStatus });
    }
    setConfirmTarget(null);
    // TODO: panggil API update
  };

  const handleDelete = () => {
    if (!reportToShow) return;
    const newReports = reports.filter((r) => r.id !== reportToShow.id);
    setReports(newReports);
    if (newReports.length === 0) {
      navigate("/admin/dashboard");
    } else {
      navigate(`report/${newReports[0].id}`);
    }
  };

  const handleOpenPhoto = (url: string) => {
    setPhotoUrl(url);
    setShowPhoto(true);
  };

  const handleClosePhoto = () => {
    setShowPhoto(false);
    setPhotoUrl(null);
  };

  if (loading) {
    return (
      <AdminLayout user={user} onLogout={handleLogout}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Memuat data...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!reportToShow) {
    return (
      <AdminLayout user={user} onLogout={handleLogout}>
        <div className="p-8 text-center text-gray-500">
          Laporan tidak ditemukan. ID: {id}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout user={user} onLogout={handleLogout}>
      <div className="max-w-5xl mx-auto space-y-6">
        <TopNav
          currentIndex={currentIndex}
          total={reports.length}
          prevReportId={prevReport?.id || null}
          nextReportId={nextReport?.id || null}
          onNavigate={(id) => navigate(`../report/${id}`)}
          onBack={() => navigate("../")}
        />

        {mapReport && <ModalMap report={mapReport} height="400px" />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {loadingDetail ? (
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-center">
              <div className="text-gray-500">Memuat detail laporan...</div>
            </div>
          ) : (
            <DetailReport
              report={reportToShow}
              onPhotoClick={handleOpenPhoto}
            />
          )}

          <div className="space-y-6">
            <QuickNav
              reports={reports}
              currentReportId={reportToShow.id}
              onSelect={(id) => navigate(`../report/${id}`)}
            />

            {isAdmin && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Ubah Status
                  </h2>
                </div>
                <div className="p-4 space-y-3">
                  {!confirmTarget ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setConfirmTarget("Liar")}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                      >
                        Liar
                      </button>
                      <button
                        onClick={() => setConfirmTarget("Tidak Liar")}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                      >
                        Tidak Liar
                      </button>
                    </div>
                  ) : (
                    <div className="bg-yellow-100/80 rounded-xl p-4 border border-yellow-100 space-y-3">
                      <p className="text-sm">
                        Konfirmasi ubah status ke {confirmTarget}?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setConfirmTarget(null)}
                          className="flex-1 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs transition-colors"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => handleStatusChange(confirmTarget)}
                          className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                            confirmTarget === "Liar"
                              ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                              : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                          }`}
                        >
                          Ya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4">
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-50 hover:bg-red-100 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-red-200 text-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Hapus Laporan
                </button>
              </div>
            </div>
          </div>
        </div>

        <PhotoModal
          open={showPhoto}
          photoUrl={photoUrl}
          onClose={handleClosePhoto}
        />
      </div>
    </AdminLayout>
  );
};

export default Overview;
