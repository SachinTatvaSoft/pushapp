import "./App.css";
import { useFCM } from "./hooks/useFCM";
import { usePWAInstall } from "./hooks/usePWAInstall";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isInstallable, promptInstall } = usePWAInstall();
  const {
    token: fcm_token,
    loading,
    showDialog,
    handleDialogConfirm,
    setShowDialog,
  } = useFCM();

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
        <h2
          style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "black" }}
        >
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
          {loading ? "Generating token..." : fcm_token ?? "Not yet generated"}
        </p>

        <button
          style={{
            marginTop: "0.5rem",
            padding: "6px 16px",
            fontSize: "0.95rem",
            borderRadius: "6px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: fcm_token ? "pointer" : "not-allowed",
            opacity: fcm_token ? 1 : 0.6,
          }}
          disabled={!fcm_token}
          onClick={() => {
            if (fcm_token) {
              navigator.clipboard.writeText(fcm_token);
              toast.success("FCM Token copied to clipboard!");
            }
          }}
        >
          Copy FCM Token
        </button>
      </div>

      {isInstallable && (
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
            background: "#16a34a",
            color: "#fff",
          }}
          onClick={promptInstall}
        >
          Install App
        </button>
      )}

      {showDialog && (
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
              style={{
                fontSize: "1.3rem",
                marginBottom: "1rem",
                color: "black",
              }}
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
              We’d like to send you updates and alerts. Do you want to enable
              push notifications?
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
              onClick={handleDialogConfirm}
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
              onClick={() => setShowDialog(false)}
            >
              Not Now
            </button>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default App;
