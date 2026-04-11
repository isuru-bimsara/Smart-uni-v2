// import { useState, useEffect } from 'react'
// import { notificationsApi } from '../api/notifications'

// const typeIcons = {
//   BOOKING_APPROVED: '✅',
//   BOOKING_REJECTED: '❌',
//   BOOKING_CANCELLED: '🚫',
//   TICKET_UPDATED: '🔧',
//   TICKET_ASSIGNED: '👤',
//   GENERAL: '📢',
// }

// export default function NotificationsPage() {
//   const [notifications, setNotifications] = useState([])
//   const [loading, setLoading] = useState(true)

//   const fetchNotifications = () => {
//     setLoading(true)
//     notificationsApi.getAll()
//       .then(res => setNotifications(res.data.data || []))
//       .catch(() => {})
//       .finally(() => setLoading(false))
//   }

//   useEffect(() => { fetchNotifications() }, [])

//   const handleMarkAsRead = async (id) => {
//     await notificationsApi.markAsRead(id)
//     fetchNotifications()
//   }

//   const handleMarkAllRead = async () => {
//     await notificationsApi.markAllAsRead()
//     fetchNotifications()
//   }

//   const unreadCount = notifications.filter(n => !n.read).length

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
//           <p className="text-gray-500 text-sm mt-1">
//             {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
//           </p>
//         </div>
//         {unreadCount > 0 && (
//           <button onClick={handleMarkAllRead} className="btn-secondary text-sm">
//             Mark all as read
//           </button>
//         )}
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {notifications.length === 0 && (
//             <div className="card text-center py-12">
//               <div className="text-4xl mb-3">🔔</div>
//               <p className="text-gray-500">No notifications yet</p>
//             </div>
//           )}
//           {notifications.map(n => (
//             <div
//               key={n.id}
//               className={`card flex items-start gap-4 cursor-pointer transition-colors ${
//                 !n.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
//               }`}
//               onClick={() => !n.read && handleMarkAsRead(n.id)}
//             >
//               <span className="text-2xl">{typeIcons[n.type] || '📢'}</span>
//               <div className="flex-1">
//                 <p className="text-sm text-gray-900">{n.message}</p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   {new Date(n.createdAt).toLocaleString()}
//                 </p>
//               </div>
//               {!n.read && (
//                 <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
