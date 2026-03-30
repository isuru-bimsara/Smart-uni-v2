//frontend/src/pages/tech/TechNotifications.jsx
import { useEffect, useState } from 'react';
import { notificationsApi } from '../../api/notifications';

export default function TechNotifications() {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    notificationsApi.getMyNotifications().then(res => setNotifications(res.data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul className="space-y-2">
        {notifications.map(n => (
          <li key={n.id} className="p-2 bg-white shadow">{n.message}</li>
        ))}
      </ul>
    </div>
  )
}