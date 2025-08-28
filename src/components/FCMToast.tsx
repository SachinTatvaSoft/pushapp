import React from "react";

interface FCMToastProps {
  title?: string;
  body?: string;
  icon?: string;
}

export const FCMToast: React.FC<FCMToastProps> = ({ title, body, icon }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "12px 16px",
        minWidth: "320px",
        maxWidth: "380px",
        background: "rgba(255,255,255,0)",
        borderRadius: "12px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
        fontFamily: "system-ui, sans-serif",
        borderLeft: "5px solid #007bff",
        position: "relative",
      }}
    >
      {icon && (
        <img
          src={icon}
          alt="icon"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      )}
      <div style={{ flex: 1, textAlign: "start", color: "#111" }}>
        <strong
          style={{ display: "block", fontSize: "1rem", marginBottom: "2px" }}
        >
          {title}
        </strong>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#555" }}>{body}</p>
      </div>
    </div>
  );
};
