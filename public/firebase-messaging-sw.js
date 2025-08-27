importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBVrZ7W4qBxiEbggPC0NA3FV_VnvWV36hk",
  authDomain: "pushapp-1764e.firebaseapp.com",
  projectId: "pushapp-1764e",
  storageBucket: "pushapp-1764e.firebasestorage.app",
  messagingSenderId: "383122287976",
  appId: "1:383122287976:web:2c4ffd02d16a121a90fadd",
  measurementId: "G-Z6SDE5YJCK",
};

firebase.initializeApp(firebaseConfig);

let messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Background message in SW:", payload);

  const notificationTitle = payload?.notification?.title || "";
  const notificationOptions = {
    body: payload?.notification?.body || "",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
