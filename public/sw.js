importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBVrZ7W4qBxiEbggPC0NA3FV_VnvWV36hk",
  authDomain: "pushapp-1764e.firebaseapp.com",
  projectId: "pushapp-1764e",
  storageBucket: "pushapp-1764e.firebasestorage.app",
  messagingSenderId: "383122287976",
  appId: "1:383122287976:web:2c4ffd02d16a121a90fadd",
  measurementId: "G-Z6SDE5YJCK",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background FCM:", payload);

  const notificationTitle = payload.notification?.title || "Notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/vite.svg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
