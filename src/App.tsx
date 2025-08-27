import "./App.css";
import { useFCM } from "./hooks/useFCM";

function App() {
  const fcm_token = useFCM();

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        Push Notification App
      </h1>

      <div
        style={{
          background: "#f9f9f9",
          padding: "1rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "black" }}>
          FCM Token
        </h2>
        <p
          style={{
            wordBreak: "break-all",
            fontSize: "0.9rem",
            color: "#333",
            background: "#fff",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          {fcm_token ?? "Not yet generated"}
        </p>
      </div>
    </div>
  );
}

export default App;
