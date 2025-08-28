import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  deleteToken,
  onMessage,
  type Messaging,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging: Messaging = getMessaging(app);

export function useFCM() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const generateToken = async () => {
    try {
      setLoading(true);
      const registration = await navigator.serviceWorker.ready;
      const newToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });
      if (newToken) {
        console.log("FCM Token generated:", newToken);
        setToken(newToken);
        localStorage.setItem("fcm_token", newToken);
      }
    } catch (err) {
      console.error("Error generating FCM token", err);
    } finally {
      setLoading(false);
    }
  };

  const removeToken = async () => {
    try {
      const existingToken = await getToken(messaging);
      if (existingToken) {
        await deleteToken(messaging);
        console.log("FCM Token removed due to permission change");
      }
      setToken(null);
      localStorage.removeItem("fcm_token");
    } catch (err) {
      console.error("Error removing token", err);
    }
  };

  useEffect(() => {
    const permission = Notification.permission;
    const alreadyAsked = localStorage.getItem("notification_ask");
    const storedToken = localStorage.getItem("fcm_token");

    if (permission === "default" && !alreadyAsked) {
      setShowDialog(true);
    } else if (permission === "granted") {
      if (storedToken) {
        setToken(storedToken);
      } else {
        generateToken();
      }
    } else if (permission === "denied") {
      removeToken();
    }
  }, []);

  const handleDialogConfirm = async () => {
    setShowDialog(false);
    localStorage.setItem("notification_ask", "true");

    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        generateToken();
      } else {
        removeToken();
      }
    } else if (Notification.permission === "granted") {
      generateToken();
    } else if (Notification.permission === "denied") {
      removeToken();
    }
  };

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message:", payload);
      const title = payload.notification?.title || payload.data?.title || "Notification";
      const body = payload.notification?.body || payload.data?.body || "";
      const icon = payload.notification?.icon || payload.data?.icon || "/vite.svg";
      new Notification(title, {
        body,
        icon,
      });
    });
    return () => unsubscribe();
  }, []);

  return { token, loading, showDialog, handleDialogConfirm, setShowDialog };
}
