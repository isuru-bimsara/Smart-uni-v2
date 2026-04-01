// // //frontend/src/pages/tech/TechNotifications.jsx
// // import { useEffect, useState } from 'react';
// // import { notificationsApi } from '../../api/notifications';

// // export default function TechNotifications() {
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

// import { useEffect, useState, useRef } from "react";
// import { notificationsApi } from "../../api/notifications";

// const POLL_MS = 3000;

// export default function TechNotifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const pollRef = useRef(null);

//   const load = async () => {
//     try {
//       const res = await notificationsApi.getMyNotifications();
//       setNotifications(res.data?.data || []);
//     } catch (e) {
//       console.error("Load notifications failed", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//     pollRef.current = setInterval(load, POLL_MS);
//     return () => clearInterval(pollRef.current);
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//       {loading ? (
//         <div className="py-12 text-center text-gray-400">Loading…</div>
//       ) : (
//         <ul className="space-y-2">
//           {notifications.map((n) => (
//             <li
//               key={n.id}
//               className={`p-3 rounded shadow bg-white border ${
//                 n.read ? "border-gray-100" : "border-blue-200 bg-blue-50"
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


import { useEffect, useState, useRef } from "react";
import { notificationsApi } from "../../api/notifications";
import { 
  Bell, 
  CheckCheck, 
  Clock, 
  Ticket, 
  Calendar, 
  Info, 
  Trash2, 
  Circle 
} from "lucide-react";

const POLL_MS = 10000; // 10s is better for battery/performance

export default function UserNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const pollRef = useRef(null);

  const load = async () => {
    try {
      const res = await notificationsApi.getMyNotifications();
      const data = res.data?.data || [];
      
      // SORTING LOGIC: 
      // 1. Unread first (n.read === false)
      // 2. Then newest date first
      const sorted = data.sort((a, b) => {
        if (a.read !== b.read) return a.read ? 1 : -1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setNotifications(sorted);
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

  const handleMarkRead = async (id) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (e) { console.error(e); }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationsApi.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (e) { console.error(e); }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Helper to choose icon based on message content
  const getIcon = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes("ticket")) return <Ticket className="w-5 h-5 text-rose-500" />;
    if (msg.includes("booking") || msg.includes("approve")) return <Calendar className="w-5 h-5 text-emerald-500" />;
    return <Info className="w-5 h-5 text-blue-500" />;
  };

  // Simple relative time formatter
  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-600" />
            Notifications
          </h1>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread updates.` 
              : "You're all caught up!"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && notifications.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="font-medium">Syncing notifications...</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => !n.read && handleMarkRead(n.id)}
                className={`group relative p-5 transition-all flex gap-4 items-start cursor-pointer ${
                  n.read ? "bg-white opacity-80" : "bg-blue-50/40 hover:bg-blue-50"
                }`}
              >
                {/* Status Indicator */}
                {!n.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                )}

                {/* Category Icon */}
                <div className={`p-3 rounded-xl ${n.read ? "bg-gray-100" : "bg-white shadow-sm border border-blue-100"}`}>
                  {getIcon(n.message)}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className={`text-sm leading-relaxed ${n.read ? "text-gray-600" : "text-gray-900 font-bold"}`}>
                      {n.message}
                    </p>
                    {!n.read && (
                      <span className="flex-shrink-0 ml-2">
                        <Circle className="w-2.5 h-2.5 fill-blue-600 text-blue-600 animate-pulse" />
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {getRelativeTime(n.createdAt)}
                    </span>
                    {n.read && <span className="text-gray-300">• Seen</span>}
                  </div>
                </div>

                {/* Hover Action */}
                {!n.read && (
                  <button className="hidden group-hover:block p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <CheckCheck className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="py-24 px-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                  <Bell className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Quiet for now</h3>
                <p className="text-gray-500 max-w-xs mx-auto text-sm mt-1">
                  We'll let you know when there are updates on your bookings or tickets.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer / Meta info */}
      <p className="text-center text-[10px] text-gray-300 uppercase tracking-widest mt-8 font-bold">
        Secure Smart-Uni Notification Channel
      </p>
    </div>
  );
}