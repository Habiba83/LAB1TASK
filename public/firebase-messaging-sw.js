// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCtReJa1Scqz5RKIV1cBgLQZNH2f85Z2iM",
    authDomain: "labtask-78e04.firebaseapp.com",
    projectId: "labtask-78e04",
    storageBucket: "labtask-78e04.firebasestorage.app",
    messagingSenderId: "429182132324",
    appId: "1:429182132324:web:6fea3d1addc2e197ea7f71",
    measurementId: "G-1Z6BLSPG88"
  };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background Message:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
