import React from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "default" | "red";
}

const ConfirmModal: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  variant = "red",
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-foreground/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white w-full max-w-sm rounded-2xl shadow-2xl   overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`p-2.5 rounded-xl shrink-0 ${
                variant === "red" ? "bg-red-100" : "bg-red-100"
              }`}
            >
              <AlertTriangle
                className={`h-5 w-5 ${
                  variant === "red" ? "text-red" : "text-black"
                }`}
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground/70 mt-1 leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-50 justify-end gap-2.5 px-6 py-4 border-t border-gray-200 bg-muted/20">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl  text-sm font-medium text-black hover:text-black hover:bg-white transition-all"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
              variant === "red"
                ? "bg-red-500 text-white hover:bg-red-400 shadow-lg"
                : "bg-red-500 text-white hover:bg-red-400 shadow-lg"
            }`}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
