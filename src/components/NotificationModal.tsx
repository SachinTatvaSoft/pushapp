import React from "react";

interface NotificationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "black" }}
        >
          Enable Notifications?
        </h2>
        <p
          style={{
            marginBottom: "1.5rem",
            fontSize: "0.95rem",
            color: "black",
          }}
        >
          We’d like to send you updates and alerts. Do you want to enable push
          notifications?
        </p>
        <button
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.6rem 1.2rem",
            marginRight: "0.5rem",
            cursor: "pointer",
          }}
          onClick={onConfirm}
        >
          Yes, Enable
        </button>
        <button
          style={{
            background: "#ddd",
            border: "none",
            borderRadius: "8px",
            padding: "0.6rem 1.2rem",
            cursor: "pointer",
          }}
          onClick={onCancel}
        >
          Not Now
        </button>
      </div>
    </div>
  );
};
