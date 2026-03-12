import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { AdminLayout } from "../../layout";
import { GetDataPetugas } from "../../services/admin.service";
import { DetailReport, QuickNav, TopNav } from "../../component";

export interface ReportItem {
  identitas_petugas: string;
  nama: string;
  tanggaldanwaktu: string;
  latitude: number;
  longitude: number;
  lokasi: string;
  akurasi?: number;
  status: 'Liar' | 'Tidak Liar';
  status_post?: string;
  hari: string;
}

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmTarget, setConfirmTarget] = useState<"Liar" | "Tidak Liar" | null>(null);
  const isAdmin = true;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await GetDataPetugas();
        // Pastikan data berupa array
        let data: ReportItem[] = [];
        if (Array.isArray(res)) {
          data = res;
        } else if (res && typeof res === 'object' && 'data' in res && Array.isArray(res.data)) {
          data = res.data;
        }
        setReports(data);
      } catch (error) {
        console.error("Gagal mengambil data laporan:", error);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Cari index berdasarkan id (identitas_petugas)
  const currentIndex = reports.findIndex((r) => r.identitas_petugas === id);
  const report = currentIndex >= 0 ? reports[currentIndex] : null;
  const prevReport = currentIndex > 0 ? reports[currentIndex - 1] : null;
  const nextReport = currentIndex < reports.length - 1 ? reports[currentIndex + 1] : null;

  const handleStatusChange = (newStatus: "Liar" | "Tidak Liar") => {
    if (!report) return;
    setReports((prev) =>
      prev.map((r) =>
        r.identitas_petugas === report.identitas_petugas ? { ...r, status: newStatus } : r
      )
    );
    setConfirmTarget(null);
    // TODO: panggil API update jika ada
  };

  const handleDelete = () => {
    if (!report) return;
    // TODO: panggil API delete jika ada
    const newReports = reports.filter((r) => r.identitas_petugas !== report.identitas_petugas);
    setReports(newReports);
    if (newReports.length === 0) {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard/report/${newReports[0].identitas_petugas}`);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Memuat data...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!report) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-gray-500">
          Laporan tidak ditemukan
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <TopNav
          currentIndex={currentIndex}
          total={reports.length}
          prevReportId={prevReport?.identitas_petugas || null}
          nextReportId={nextReport?.identitas_petugas || null}
          onNavigate={(id) => navigate(`/dashboard/report/${id}`)}
          onBack={() => navigate("/admin/dashboard")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DetailReport report={report} />

          <div className="space-y-6">
            <QuickNav
              reports={reports}
              currentReportId={report.identitas_petugas}
              onSelect={(id) => navigate(`/dashboard/report/${id}`)}
            />

            {isAdmin && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h2 className="text-sm font-semibold text-foreground">Ubah Status</h2>
                </div>
                <div className="p-4 space-y-3">
                  {!confirmTarget ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setConfirmTarget("Liar")}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-all"
                      >
                        Liar
                      </button>
                      <button
                        onClick={() => setConfirmTarget("Tidak Liar")}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-all"
                      >
                        Tidak Liar
                      </button>
                    </div>
                  ) : (
                    <div className="bg-yellow-100/80 rounded-xl p-4 border border-yellow-100 space-y-3">
                      <p className="text-sm">Konfirmasi ubah status ke {confirmTarget}?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setConfirmTarget(null)}
                          className="flex-1 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => handleStatusChange(confirmTarget)}
                          className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold border ${
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

            <div className="bg-white rounded-2xl border border-red-200/20 overflow-hidden">
              <div className="p-4">
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-200 hover:bg-red-100 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-red-200/20 bg-destructive/5 text-red-900 hover:bg-destructive/10 transition-all shadow-lg"
                >
                  <Trash2 className="text-red-700" />
                  Hapus Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Overview;