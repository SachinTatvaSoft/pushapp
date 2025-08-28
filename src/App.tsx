import "./App.css";
import { useFCM } from "./hooks/useFCM";
import { usePWAInstall } from "./hooks/usePWAInstall";

function App() {
  const { isInstallable, promptInstall } = usePWAInstall();

  const fcm_token = useFCM();

  return (
    <>
      <h2>FCM Token: {fcm_token ?? "Not yet generated"}</h2>
      {isInstallable && (
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginTop: "20px",
            cursor: "pointer",
          }}
          onClick={promptInstall}
        >
          Install App
        </button>
      )}
    </>
  );
}

export default App;
