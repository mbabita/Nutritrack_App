import React, { useEffect } from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationManager = ({ reminders, onRequestPermission }) => {
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            onRequestPermission();
        }
    }, [onRequestPermission]);

    const sendNotification = (title, body) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body });
        }
    };

    const handleSetReminder = (reminder) => {
        // Simple timeout for demo; in real app, use a scheduling library
        setTimeout(() => {
            sendNotification('Reminder', reminder.name);
        }, 5000); // 5 seconds for demo
    };

    return (
        <div className="notification-card">
            <h2><FaBell /> Notifications</h2>
            <p>Manage your reminders.</p>
            <button onClick={onRequestPermission}>Enable Notifications</button>
            <div className="reminders">
                {reminders.map(r => (
                    <div key={r.id} className="reminder">
                        <span>{r.name} at {r.time}</span>
                        <button onClick={() => handleSetReminder(r)}>Set Reminder</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationManager;
