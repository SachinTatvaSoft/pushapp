import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    console.log("New content available. Refresh!");
  },
  onOfflineReady() {
    console.log("App ready offline!");
  },
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registered: ", registration);
      })
      .catch((error) => {
        console.log("Service Worker registration failed: ", error);
      });
  });
}

navigator.serviceWorker.ready.then(function (_registration) {
  console.log("Service Worker is ready");
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
