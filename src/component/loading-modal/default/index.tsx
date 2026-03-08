import React from "react";

interface LoadingModalProps {
  visible: boolean;
  status: "loading" | "success" | "error";
  message: string;
  onClose?: () => void;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  visible,
  status,
  message,
  onClose,
}) => {
  if (!visible) return null;

  const isSuccess = status === "success";
  const isError = status === "error";
  const isLoading = status === "loading";

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex flex-col items-center text-center">
          {isLoading && (
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
          )}
          {isSuccess && (
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          {isError && (
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isLoading ? "Memproses..." : isSuccess ? "Berhasil!" : "Gagal!"}
          </h3>
          <p className="text-gray-600 mb-6">{message}</p>
          {!isLoading && onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Tutup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
