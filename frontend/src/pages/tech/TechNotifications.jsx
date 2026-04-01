// //frontend/src/pages/tech/TechNotifications.jsx
// import { useEffect, useState } from 'react';
// import { notificationsApi } from '../../api/notifications';

// export default function TechNotifications() {
//   const [notifications, setNotifications] = useState([]);
//   useEffect(() => {
//     notificationsApi.getMyNotifications().then(res => setNotifications(res.data.data)).catch(() => {});
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//       <ul className="space-y-2">
//         {notifications.map(n => (
//           <li key={n.id} className="p-2 bg-white shadow">{n.message}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }

import { useEffect, useState, useRef } from "react";
import { notificationsApi } from "../../api/notifications";

const POLL_MS = 3000;

export default function TechNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const pollRef = useRef(null);

  const load = async () => {
    try {
      const res = await notificationsApi.getMyNotifications();
      setNotifications(res.data?.data || []);
    } catch (e) {
      console.error("Load notifications failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    pollRef.current = setInterval(load, POLL_MS);
    return () => clearInterval(pollRef.current);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {loading ? (
        <div className="py-12 text-center text-gray-400">Loading…</div>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`p-3 rounded shadow bg-white border ${
                n.read ? "border-gray-100" : "border-blue-200 bg-blue-50"
              }`}
            >
              <div className="text-sm text-gray-800">{n.message}</div>
              <div className="text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
          {notifications.length === 0 && (
            <li className="p-6 text-center text-gray-400 bg-white rounded shadow">
              No notifications yet
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
