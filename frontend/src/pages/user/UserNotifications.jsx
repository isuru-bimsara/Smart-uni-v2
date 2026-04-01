// // //frontend/src/pages/user/UserNotifications.jsx
// // import { useEffect, useState } from 'react';
// // import { notificationsApi } from '../../api/notifications';

// // export default function UserNotifications() {
// //   const [notifications, setNotifications] = useState([]);
// //   useEffect(() => {
// //     notificationsApi.getMyNotifications().then(res => setNotifications(res.data.data)).catch(() => {});
// //   }, []);

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold mb-4">Notifications</h1>
// //       <ul className="space-y-2">
// //         {notifications.map(n => (
// //           <li key={n.id} className="p-2 bg-white shadow">{n.message}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   )
// // }


// import { useEffect, useState, useRef } from 'react';
// import { notificationsApi } from '../../api/notifications';

// const POLL_MS = 3000; // 10 seconds

// export default function UserNotifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const pollRef = useRef(null);

//   const load = async () => {
//     try {
//       const res = await notificationsApi.getMyNotifications();
//       setNotifications(res.data?.data || []);
//     } catch (e) {
//       console.error('Load notifications failed', e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();                                  // initial
//     pollRef.current = setInterval(load, POLL_MS); // start polling
//     return () => clearInterval(pollRef.current);  // cleanup
//   }, []);

//   const unread = notifications.filter(n => !n.read).length;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Notifications</h1>
//         <div className="text-sm text-gray-500">
//           {unread > 0 ? `${unread} unread` : 'All caught up'}
//         </div>
//       </div>

//       {loading ? (
//         <div className="py-12 text-center text-gray-400">Loading…</div>
//       ) : (
//         <ul className="space-y-2">
//           {notifications.map((n) => (
//             <li
//               key={n.id}
//               className={`p-3 rounded shadow bg-white border ${
//                 n.read ? 'border-gray-100' : 'border-blue-200 bg-blue-50'
//               }`}
//             >
//               <div className="text-sm text-gray-800">{n.message}</div>
//               <div className="text-xs text-gray-400">
//                 {new Date(n.createdAt).toLocaleString()}
//               </div>
//             </li>
//           ))}
//           {notifications.length === 0 && (
//             <li className="p-6 text-center text-gray-400 bg-white rounded shadow">
//               No notifications yet
//             </li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// }

import { useEffect, useState, useRef } from 'react';
import { notificationsApi } from '../../api/notifications';
import { CheckCheck, Bell, BellOff, Circle } from 'lucide-react'; // Optional: install lucide-react

const POLL_MS = 10000; // 10 seconds is safer for polling

export default function UserNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const pollRef = useRef(null);

  const load = async () => {
    try {
      const res = await notificationsApi.getMyNotifications();
      const rawData = res.data?.data || [];
      
      // PRIORITIZE: Sort by Unread first, then by Date (Newest first)
      const sorted = [...rawData].sort((a, b) => {
        if (a.read !== b.read) return a.read ? 1 : -1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setNotifications(sorted);
    } catch (e) {
      console.error('Load notifications failed', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    pollRef.current = setInterval(load, POLL_MS);
    return () => clearInterval(pollRef.current);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationsApi.markAsRead(id);
      // Optimistic Update: Update UI immediately
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (e) {
      console.error("Failed to mark as read", e);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (e) {
      console.error("Failed to mark all read", e);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" />
            Notifications
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {unreadCount > 0 ? `You have ${unreadCount} unread messages` : 'No new notifications'}
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllRead}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {loading && notifications.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <div className="animate-pulse">Fetching updates...</div>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => !n.read && handleMarkAsRead(n.id)}
              className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                n.read 
                  ? 'bg-white border-gray-100 opacity-75' 
                  : 'bg-blue-50 border-blue-100 shadow-sm hover:border-blue-300'
              }`}
            >
              <div className="flex gap-4">
                {/* Unread Status Dot */}
                {!n.read && (
                  <div className="mt-1.5">
                    <Circle className="w-2.5 h-2.5 fill-blue-600 text-blue-600" />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className={`text-sm ${n.read ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                    {n.message}
                  </div>
                  <div className="text-xs text-gray-400 mt-2 flex justify-between items-center">
                    <span>{formatDate(n.createdAt)}</span>
                    {!n.read && <span className="text-blue-600 font-medium">New</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
              <BellOff className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">All caught up!</p>
              <p className="text-sm text-gray-400">We'll notify you when something happens.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper for real-world date formatting
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}