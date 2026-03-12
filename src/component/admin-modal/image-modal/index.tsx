import React from "react";
import { X, ImageIcon } from "lucide-react";

interface PhotoModalProps {
  open: boolean;
  photoUrl: string | null;
  onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ open, photoUrl, onClose }) => {
  if (!open || !photoUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-foreground/70 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/5">
              <ImageIcon className="h-3.5 w-3.5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm text-black">Foto Bukti</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-muted rounded-xl transition text-black"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">
          <img
            src={photoUrl}
            alt="Bukti laporan"
            className="w-full rounded-xl object-contain max-h-[75vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
