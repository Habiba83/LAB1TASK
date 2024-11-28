import React, { useState, useEffect } from 'react';
import { setupNotifications, subscribeToTopic, unsubscribeFromTopic } from './firebase';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const initialize = async () => {
      const fcmToken = await setupNotifications();
      if (fcmToken) setToken(fcmToken);
    };
    initialize();
  }, []);

  const handleSubscribe = async (topic) => {
    if (!token) {
      console.error('FCM Token not available.');
      return;
    }
    console.log(`Subscribing to topic: ${topic}`);
    await subscribeToTopic(token, topic);
  };

  const handleUnsubscribe = async (topic) => {
    if (!token) {
      console.error('FCM Token not available.');
      return;
    }
    console.log(`Unsubscribing from topic: ${topic}`);
    await unsubscribeFromTopic(token, topic);
  };

  return (
    <div>
      <h1>Notification Channels</h1>

      {/* Buttons for Sports Topic */}
      <button onClick={() => handleSubscribe('sports')}>Subscribe to Sports</button>
      <button onClick={() => handleUnsubscribe('sports')}>Unsubscribe from Sports</button>

      <button onClick={() => handleSubscribe('Fashion')}>Subscribe to Fashion</button>
      <button onClick={() => handleUnsubscribe('Fashion')}>Unsubscribe from Fashion</button>

      
      <button onClick={() => handleSubscribe('cooking')}>Subscribe to cooking</button>
      <button onClick={() => handleUnsubscribe('cooking')}>Unsubscribe from cooking</button>
    </div>
  );
}

export default App;