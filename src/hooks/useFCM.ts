import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
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

  useEffect(() => {
    const requestPermissionAndToken = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.log("Permission not granted for notifications");
          return;
        }

        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });

        if (token) {
          console.log("FCM Token:", token);
          setToken(token);
        } else {
          console.log("Token generation failed.");
        }
      } catch (err) {
        console.error("Error getting FCM token", err);
      }
    };

    requestPermissionAndToken();

    // Foreground listener
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message:", payload);
      new Notification(payload.notification?.title ?? "Notification", {
        body: payload.notification?.body,
      });
    });

    return () => unsubscribe();
  }, []);

  return token;
}
