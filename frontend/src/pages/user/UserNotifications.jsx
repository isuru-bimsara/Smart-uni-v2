// //frontend/src/pages/user/UserNotifications.jsx
// import { useEffect, useState } from 'react';
// import { notificationsApi } from '../../api/notifications';

// export default function UserNotifications() {
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


import { useEffect, useState, useRef } from 'react';
import { notificationsApi } from '../../api/notifications';

const POLL_MS = 3000; // 10 seconds

export default function UserNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const pollRef = useRef(null);

  const load = async () => {
    try {
      const res = await notificationsApi.getMyNotifications();
      setNotifications(res.data?.data || []);
    } catch (e) {
      console.error('Load notifications failed', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();                                  // initial
    pollRef.current = setInterval(load, POLL_MS); // start polling
    return () => clearInterval(pollRef.current);  // cleanup
  }, []);

  const unread = notifications.filter(n => !n.read).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="text-sm text-gray-500">
          {unread > 0 ? `${unread} unread` : 'All caught up'}
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-400">Loading…</div>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`p-3 rounded shadow bg-white border ${
                n.read ? 'border-gray-100' : 'border-blue-200 bg-blue-50'
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