import React from "react";

interface NotificationModalProps {
  visible: boolean;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  message,
  type = "info",
  onClose,
}) => {
  if (!visible) return null;

  const bgColor = {
    success: "bg-green-50 border-green-300",
    error: "bg-red-50 border-red-300",
    info: "bg-blue-50 border-blue-300",
  }[type];

  const iconColor = {
    success: "text-green-600",
    error: "text-red-600",
    info: "text-blue-600",
  }[type];

  const icon = {
    success: (
      <svg
        className="w-6 h-6"
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
    ),
    error: (
      <svg
        className="w-6 h-6"
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
    ),
    info: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  }[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className={`max-w-md w-full rounded-lg border p-6 shadow-xl ${bgColor}`}
      >
        <div className="flex items-start gap-4">
          <div className={`shrink-0 ${iconColor}`}>{icon}</div>
          <div className="flex-1">
            <p className="text-gray-800">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
