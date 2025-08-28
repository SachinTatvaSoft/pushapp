import "./App.css";
import { useFCM } from "./hooks/useFCM";
import { usePWAInstall } from "./hooks/usePWAInstall";
import { NotificationModal } from "./components/NotificationModal";
import { toast, ToastContainer, type Id as ToastId } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FCMToast } from "./components/FCMToast";
import { useEffect } from "react";

function App() {
  const { isInstallable, promptInstall } = usePWAInstall();
  const {
    token: fcm_token,
    loading,
    showDialog,
    handleDialogConfirm,
    setShowDialog,
  } = useFCM();

  useEffect(() => {
    const handler = (event: any) => {
      const payload = event.detail;

      let toastId: ToastId | undefined;
      toastId = toast(() => (
        <FCMToast
          title={payload.notification?.title}
          body={payload.notification?.body}
          icon="/vite.svg"
        />
      ));
    };

    window.addEventListener("fcm-message", handler);
    return () => window.removeEventListener("fcm-message", handler);
  }, []);

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

      <NotificationModal
        visible={showDialog}
        onConfirm={handleDialogConfirm}
        onCancel={() => setShowDialog(false)}
      />

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
        toastClassName={() => "transparent-toast"}
      />
    </div>
  );
}

export default App;
