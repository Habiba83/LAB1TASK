import { initializeApp } from '@firebase/app';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtReJa1Scqz5RKIV1cBgLQZNH2f85Z2iM",
  authDomain: "labtask-78e04.firebaseapp.com",
  projectId: "labtask-78e04",
  storageBucket: "labtask-78e04.appspot.com",
  messagingSenderId: "429182132324",
  appId: "1:429182132324:web:6fea3d1addc2e197ea7f71",
  measurementId: "G-1Z6BLSPG88",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Request permission and get FCM token
const setupNotifications = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const token = await getToken(messaging);
      console.log('FCM Token:', token);
      return token;
    } else {
      console.log('Notification permission denied.');
      return null;
    }
  } catch (error) {
    console.error('Error setting up notifications:', error);
    return null;
  }
};

// Subscribe to a topic
const subscribeToTopic = async (token, topic) => {
  try {
    const response = await fetch('http://localhost:5000/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, topic }),
    });

    if (response.ok) {
      console.log(`Successfully subscribed to topic: ${topic}`);
    } else {
      console.error(`Failed to subscribe to topic: ${topic}`);
    }
  } catch (error) {
    console.error('Error subscribing to topic:', error);
  }
};

// Unsubscribe from a topic
const unsubscribeFromTopic = async (token, topic) => {
  try {
    const response = await fetch('http://localhost:5000/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, topic }),
    });

    if (response.ok) {
      console.log(`Successfully unsubscribed from topic: ${topic}`);
    } else {
      console.error(`Failed to unsubscribe from topic: ${topic}`);
    }
  } catch (error) {
    console.error('Error unsubscribing from topic:', error);
  }
};

// Handle foreground notifications
onMessage(messaging, (payload) => {
  console.log('Foreground Message:', payload);
});

export { setupNotifications, subscribeToTopic, unsubscribeFromTopic };
