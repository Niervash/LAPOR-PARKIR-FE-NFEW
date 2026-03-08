// DetaillModalUser.tsx (update)
import React from "react";
import { Modal } from "antd";
import type { Report } from "../../../types/map.types.interface";

interface DetailModalUserProps {
  visible: boolean;
  report: Report | null;
  onClose: () => void;
  onViewPhoto: (url: string) => void;
}

const DetailModalUser: React.FC<DetailModalUserProps> = ({
  visible,
  report,
  onClose,
  onViewPhoto,
}) => {
  if (!report) return null;

  const statusPost = report.statusPost;
  const statusBadgeColor =
    statusPost === "approve"
      ? "bg-green-100 text-green-700"
      : statusPost === "reject"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700";

  const statusText =
    statusPost === "approve"
      ? "Disetujui"
      : statusPost === "reject"
        ? "Ditolak"
        : "Pending";

  return (
    <Modal
      title="Detail Laporan Parkir"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <span className="text-gray-500 font-medium">Petugas:</span>
          <span className="col-span-2 text-gray-900">{report.namaPetugas}</span>

          <span className="text-gray-500 font-medium">Identitas:</span>
          <span className="col-span-2 text-gray-900">
            {report.identitasPetugas}
          </span>

          <span className="text-gray-500 font-medium">Lokasi:</span>
          <span className="col-span-2 text-gray-900">{report.location}</span>

          <span className="text-gray-500 font-medium">Hari:</span>
          <span className="col-span-2 text-gray-900">{report.hari}</span>

          <span className="text-gray-500 font-medium">Akurasi:</span>
          <span className="col-span-2 text-gray-900">{report.akurasi}</span>

          <span className="text-gray-500 font-medium">Status Liar:</span>
          <span className="col-span-2 text-gray-900">{report.statusLiar}</span>

          <span className="text-gray-500 font-medium">Status Post:</span>
          <span className="col-span-2">
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${statusBadgeColor}`}
            >
              {statusText}
            </span>
          </span>

          <span className="text-gray-500 font-medium">Tanggal:</span>
          <span className="col-span-2 text-gray-900">
            {new Date(report.createdAt).toLocaleString("id-ID")}
          </span>

          {report.description && (
            <>
              <span className="text-gray-500 font-medium">Deskripsi:</span>
              <span className="col-span-2 text-gray-900">
                {report.description}
              </span>
            </>
          )}
        </div>

        {report.photoUrl && (
          <div className="mt-4">
            <button
              onClick={() => onViewPhoto(report.photoUrl)}
              className="text-blue-600 hover:text-blue-700 underline text-sm"
            >
              Lihat Foto
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DetailModalUser;
