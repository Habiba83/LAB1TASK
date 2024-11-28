import React, { useState, useEffect } from 'react';
import { setupNotifications, subscribeToTopic, unsubscribeFromTopic } from './firebase';
import './App.css'; 

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
    <div className="app-container">
      <h1 className="title">Notification Channels</h1>
      <div className="button-group">
        {/* Buttons for Sports Topic */}
        <div className="topic-group">
          <button className="subscribe-btn" onClick={() => handleSubscribe('sports')}>Subscribe to Sports</button>
          <button className="unsubscribe-btn" onClick={() => handleUnsubscribe('sports')}>Unsubscribe from Sports</button>
        </div>

        {/* Buttons for Fashion Topic */}
        <div className="topic-group">
          <button className="subscribe-btn" onClick={() => handleSubscribe('Fashion')}>Subscribe to Fashion</button>
          <button className="unsubscribe-btn" onClick={() => handleUnsubscribe('Fashion')}>Unsubscribe from Fashion</button>
        </div>

        {/* Buttons for Cooking Topic */}
        <div className="topic-group">
          <button className="subscribe-btn" onClick={() => handleSubscribe('cooking')}>Subscribe to Cooking</button>
          <button className="unsubscribe-btn" onClick={() => handleUnsubscribe('cooking')}>Unsubscribe from Cooking</button>
        </div>
      </div>
    </div>
  );
}

export default App;
