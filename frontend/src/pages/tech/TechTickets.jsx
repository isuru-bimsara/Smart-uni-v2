// // // // // // //frontend/src/pages/tech/TechTickets.jsx
// // // // // // import { useEffect, useState } from 'react';
// // // // // // import { ticketsApi } from '../../api/tickets';

// // // // // // export default function TechTickets() {
// // // // // //   const [tickets, setTickets] = useState([]);
// // // // // //   useEffect(() => {
// // // // // //     ticketsApi.getAssigned().then(res => setTickets(res.data.data)).catch(() => {});
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <h1 className="text-2xl font-bold mb-4">Assigned Tickets</h1>
// // // // // //       <table className="w-full border">
// // // // // //         <thead>
// // // // // //           <tr className="bg-gray-100">
// // // // // //             <th className="p-2">Title</th>
// // // // // //             <th className="p-2">User</th>
// // // // // //             <th className="p-2">Status</th>
// // // // // //           </tr>
// // // // // //         </thead>
// // // // // //         <tbody>
// // // // // //           {tickets.map(t => (
// // // // // //             <tr key={t.id} className="border-t">
// // // // // //               <td className="p-2">{t.title}</td>
// // // // // //               <td className="p-2">{t.userName}</td>
// // // // // //               <td className="p-2">{t.status}</td>
// // // // // //             </tr>
// // // // // //           ))}
// // // // // //         </tbody>
// // // // // //       </table>
// // // // // //     </div>
// // // // // //   )
// // // // // // }

// // // // // // frontend/src/pages/tech/TechTickets.jsx
// // // // // import { useEffect, useState } from 'react';
// // // // // import { ticketsApi } from '../../api/tickets';
// // // // // import TicketComments from '../TicketComments';
// // // // // import { MessageSquare } from 'lucide-react';

// // // // // export default function TechTickets() {
// // // // //   const [tickets, setTickets] = useState([]);
// // // // //   const [commentOpen, setCommentOpen] = useState(false);
// // // // //   const [commentTicketId, setCommentTicketId] = useState(null);

// // // // //   useEffect(() => {
// // // // //     ticketsApi.getAssigned()
// // // // //       .then(res => setTickets(res.data.data || []))
// // // // //       .catch(() => setTickets([]));
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className="max-w-5xl mx-auto">
// // // // //       <h1 className="text-2xl font-bold mb-4">Assigned Tickets</h1>
// // // // //       <table className="w-full border">
// // // // //         <thead>
// // // // //           <tr className="bg-gray-100">
// // // // //             <th className="p-2">Title</th>
// // // // //             <th className="p-2">User</th>
// // // // //             <th className="p-2">Status</th>
// // // // //             <th className="p-2">Messages</th> {/* <--- new column */}
// // // // //           </tr>
// // // // //         </thead>
// // // // //         <tbody>
// // // // //           {tickets.map(t => (
// // // // //             <tr key={t.id} className="border-t">
// // // // //               <td className="p-2">{t.title}</td>
// // // // //               <td className="p-2">{t.reporterName}</td>
// // // // //               <td className="p-2">{t.status}</td>
// // // // //               <td className="p-2">
// // // // //                 <button
// // // // //                   onClick={() => { setCommentTicketId(t.id); setCommentOpen(true); }}
// // // // //                   className="inline-flex items-center gap-1 px-3 py-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 font-semibold text-xs active:scale-95"
// // // // //                 >
// // // // //                   <MessageSquare className="w-4 h-4" />
// // // // //                   Messages
// // // // //                 </button>
// // // // //               </td>
// // // // //             </tr>
// // // // //           ))}
// // // // //         </tbody>
// // // // //       </table>
// // // // //       {/* Attach comment modal */}
// // // // //       <TicketComments
// // // // //         ticketId={commentTicketId}
// // // // //         open={commentOpen}
// // // // //         onClose={() => setCommentOpen(false)}
// // // // //       />
// // // // //     </div>
// // // // //   )
// // // // // }



// // // // // frontend/src/pages/tech/TechTickets.jsx
// // // // import { useEffect, useState } from 'react';
// // // // import { ticketsApi } from '../../api/tickets';
// // // // import TicketComments from '../TicketComments';
// // // // import { MessageSquare } from 'lucide-react';

// // // // const TICKET_TYPES = [
// // // //   "ELECTRICAL", "PLUMBING", "HVAC", "IT", "CLEANING", "OTHER"
// // // // ];

// // // // export default function TechTickets() {
// // // //   const [tickets, setTickets] = useState([]);
// // // //   const [selectedType, setSelectedType] = useState('');
// // // //   const [commentOpen, setCommentOpen] = useState(false);
// // // //   const [commentTicketId, setCommentTicketId] = useState(null);

// // // //   const fetchTickets = async (type) => {
// // // //     let res;
// // // //     if (type) {
// // // //       res = await ticketsApi.getAssignedByType(type);
// // // //     } else {
// // // //       res = await ticketsApi.getAssigned();
// // // //     }
// // // //     setTickets(res.data.data || []);
// // // //   };

// // // //   useEffect(() => { fetchTickets(selectedType); }, [selectedType]);

// // // //   // Status update
// // // //   const handleStatusChange = async (id, newStatus) => {
// // // //     await ticketsApi.updateStatus(id, newStatus);
// // // //     fetchTickets(selectedType);
// // // //   };

// // // //   return (
// // // //     <div className="max-w-5xl mx-auto">
// // // //       <h1 className="text-2xl font-bold mb-4">Assigned Tickets</h1>

// // // //       {/* Filter by type */}
// // // //       <div className="mb-4">
// // // //         <label className="mr-3 font-semibold">Please select your type: </label>
// // // //         <select
// // // //           value={selectedType}
// // // //           onChange={e => setSelectedType(e.target.value)}
// // // //           className="border p-2 rounded"
// // // //         >
// // // //           <option value="">All</option>
// // // //           {TICKET_TYPES.map(type => (
// // // //             <option key={type} value={type}>{type}</option>
// // // //           ))}
// // // //         </select>
// // // //       </div>

// // // //       <table className="w-full border text-sm">
// // // //         <thead>
// // // //           <tr className="bg-gray-100">
// // // //             <th className="p-2">Title</th>
// // // //             <th className="p-2">User</th>
// // // //             <th className="p-2">Category</th>
// // // //             <th className="p-2">Status</th>
// // // //             <th className="p-2">Evidence</th>
// // // //             <th className="p-2">Update</th>
// // // //             <th className="p-2">Messages</th>
// // // //           </tr>
// // // //         </thead>
// // // //         <tbody>
// // // //           {tickets.map(t => (
// // // //             <tr key={t.id} className="border-t">
// // // //               <td className="p-2 font-semibold">{t.title}</td>
// // // //               <td className="p-2">{t.reporterName}</td>
// // // //               <td className="p-2">{t.category}</td>
// // // //               <td className="p-2">
// // // //                 <span className="inline-block px-2 py-1 rounded text-xs bg-slate-200 font-bold">{t.status}</span>
// // // //               </td>
// // // //               <td className="p-2">
// // // //                 {t.images && t.images.length > 0 ? (
// // // //                   <div className="flex flex-wrap gap-2">
// // // //                     {t.images.map((img, idx) => (
// // // //                       <img
// // // //                         key={idx}
// // // //                         src={img.startsWith('http') ? img : `/${img}`}
// // // //                         alt=""
// // // //                         style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }}
// // // //                       />
// // // //                     ))}
// // // //                   </div>
// // // //                 ) : (
// // // //                   <span className="text-gray-400">No image</span>
// // // //                 )}
// // // //               </td>
// // // //               <td className="p-2">
// // // //                 {/* Allow IN_PROGRESS or OPEN to update */}
// // // //                 {(t.status === "OPEN" || t.status === "IN_PROGRESS") && (
// // // //                   <>
// // // //                     <button onClick={() => handleStatusChange(t.id, "IN_PROGRESS")}
// // // //                       className="bg-yellow-400 text-white px-2 py-1 rounded text-xs mr-1"
// // // //                     >In Progress</button>
// // // //                     <button onClick={() => handleStatusChange(t.id, "RESOLVED")}
// // // //                       className="bg-green-500 text-white px-2 py-1 rounded text-xs mr-1"
// // // //                     >Resolve</button>
// // // //                     <button onClick={() => handleStatusChange(t.id, "CLOSED")}
// // // //                       className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
// // // //                     >Close</button>
// // // //                   </>
// // // //                 )}
// // // //               </td>
// // // //               <td className="p-2">
// // // //                 <button
// // // //                   onClick={() => { setCommentTicketId(t.id); setCommentOpen(true); }}
// // // //                   className="inline-flex items-center gap-1 px-3 py-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 font-semibold text-xs active:scale-95"
// // // //                 >
// // // //                   <MessageSquare className="w-4 h-4" />
// // // //                   Messages
// // // //                 </button>
// // // //               </td>
// // // //             </tr>
// // // //           ))}
// // // //         </tbody>
// // // //       </table>
// // // //       <TicketComments
// // // //         ticketId={commentTicketId}
// // // //         open={commentOpen}
// // // //         onClose={() => setCommentOpen(false)}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }

// // // import { useEffect, useState } from 'react';
// // // import { ticketsApi } from '../../api/tickets';
// // // import TicketComments from '../TicketComments';
// // // import { MessageSquare } from 'lucide-react';

// // // export default function TechTickets({ selectedType }) {

// // //   const [tickets, setTickets] = useState([]);
// // //   const [commentOpen, setCommentOpen] = useState(false);
// // //   const [commentTicketId, setCommentTicketId] = useState(null);

// // //   // 🔥 Load from localStorage if not passed
// // //   const type = selectedType || localStorage.getItem("techType");

// // //   const fetchTickets = async () => {
// // //     try {
// // //       let res;

// // //       if (type) {
// // //         res = await ticketsApi.getAssignedByType(type);
// // //       } else {
// // //         res = await ticketsApi.getAssigned();
// // //       }

// // //       setTickets(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchTickets();
// // //   }, [type]);

// // //   // ✅ Status update
// // //   const handleStatusChange = async (id, status) => {
// // //     await ticketsApi.updateStatus(id, status);
// // //     fetchTickets();
// // //   };

// // //   return (
// // //     <div className="max-w-5xl mx-auto">

// // //       <h1 className="text-2xl font-bold mb-4">
// // //         Assigned Tickets ({type || "All"})
// // //       </h1>

// // //       <table className="w-full border text-sm">
// // //         <thead>
// // //           <tr className="bg-gray-100">
// // //             <th>Title</th>
// // //             <th>User</th>
// // //             <th>Category</th>
// // //             <th>Status</th>
// // //             <th>Image</th>
// // //             <th>Actions</th>
// // //             <th>Chat</th>
// // //           </tr>
// // //         </thead>

// // //         <tbody>
// // //           {tickets.map(t => (
// // //             <tr key={t.id} className="border-t">

// // //               <td>{t.title}</td>
// // //               <td>{t.reporterName}</td>
// // //               <td>{t.category}</td>

// // //               <td>
// // //                 <span className="px-2 py-1 bg-gray-200 rounded text-xs">
// // //                   {t.status}
// // //                 </span>
// // //               </td>

// // //               {/* ✅ IMAGE */}
// // //               <td>
// // //                 {t.images?.length > 0 ? (
// // //                   t.images.map((img, i) => (
// // //                     <img
// // //                       key={i}
// // //                       src={img.startsWith("http") ? img : `/${img}`}
// // //                       alt=""
// // //                       style={{ width: 40, height: 40 }}
// // //                     />
// // //                   ))
// // //                 ) : "No Image"}
// // //               </td>

// // //               {/* ✅ STATUS BUTTONS */}
// // //               <td>
// // //                 <button onClick={() => handleStatusChange(t.id, "IN_PROGRESS")}
// // //                   className="bg-yellow-400 text-white px-2 py-1 mr-1 rounded">
// // //                   Start
// // //                 </button>

// // //                 <button onClick={() => handleStatusChange(t.id, "RESOLVED")}
// // //                   className="bg-green-500 text-white px-2 py-1 mr-1 rounded">
// // //                   Done
// // //                 </button>

// // //                 <button onClick={() => handleStatusChange(t.id, "CLOSED")}
// // //                   className="bg-gray-500 text-white px-2 py-1 rounded">
// // //                   Close
// // //                 </button>
// // //               </td>

// // //               {/* ✅ CHAT */}
// // //               <td>
// // //                 <button
// // //                   onClick={() => {
// // //                     setCommentTicketId(t.id);
// // //                     setCommentOpen(true);
// // //                   }}
// // //                   className="text-indigo-600"
// // //                 >
// // //                   <MessageSquare />
// // //                 </button>
// // //               </td>

// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>

// // //       <TicketComments
// // //         ticketId={commentTicketId}
// // //         open={commentOpen}
// // //         onClose={() => setCommentOpen(false)}
// // //       />
// // //     </div>
// // //   );
// // // }


// // import { useEffect, useState } from "react";
// // import { ticketsApi } from "../../api/tickets";
// // import TicketComments from "../TicketComments";

// // export default function TechTickets() {

// //   const [tickets, setTickets] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const [commentOpen, setCommentOpen] = useState(false);
// //   const [commentTicketId, setCommentTicketId] = useState(null);

// //   // ✅ FETCH tickets using saved type
// //   const fetchTickets = async () => {
// //     try {
// //       setLoading(true);

// //       const type = localStorage.getItem("techType");

// //       let res;
// //       if (type && type !== "") {
// //         res = await ticketsApi.getAssignedByType(type);
// //       } else {
// //         res = await ticketsApi.getAssigned();
// //       }

// //       setTickets(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTickets();
// //   }, []);

// //   // ✅ UPDATE STATUS
// //   const handleStatusChange = async (id, status) => {
// //     await ticketsApi.updateStatus(id, status);
// //     fetchTickets();
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto">

// //       <h1 className="text-2xl font-bold mb-4">Assigned Tickets</h1>

// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <table className="w-full border text-sm">

// //           <thead>
// //             <tr className="bg-gray-100">
// //               <th className="p-2">Title</th>
// //               <th className="p-2">User</th>
// //               <th className="p-2">Category</th>
// //               <th className="p-2">Status</th>
// //               <th className="p-2">Images</th>
// //               <th className="p-2">Update</th>
// //               <th className="p-2">Chat</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {tickets.map((t) => (
// //               <tr key={t.id} className="border-t">

// //                 <td className="p-2 font-semibold">{t.title}</td>
// //                 <td className="p-2">{t.reporterName}</td>
// //                 <td className="p-2">{t.category}</td>

// //                 <td className="p-2">
// //                   <span className="px-2 py-1 bg-gray-200 text-xs rounded">
// //                     {t.status}
// //                   </span>
// //                 </td>

// //                 {/* ✅ IMAGE VIEW */}
// //                 <td className="p-2">
// //                   {t.images && t.images.length > 0 ? (
// //                     t.images.map((img, i) => (
// //                       <img
// //                         key={i}
// //                         src={`http://localhost:8083/${img}`}
// //                         alt=""
// //                         style={{
// //                           width: 40,
// //                           height: 40,
// //                           marginRight: 5,
// //                           cursor: "pointer"
// //                         }}
// //                         onClick={() =>
// //                           window.open(`http://localhost:8083/${img}`, "_blank")
// //                         }
// //                       />
// //                     ))
// //                   ) : (
// //                     "No Image"
// //                   )}
// //                 </td>

// //                 {/* ✅ STATUS BUTTONS */}
// //                 <td className="p-2">
// //                   <button
// //                     onClick={() => handleStatusChange(t.id, "IN_PROGRESS")}
// //                     className="bg-yellow-400 px-2 py-1 text-xs mr-1"
// //                   >
// //                     Start
// //                   </button>

// //                   <button
// //                     onClick={() => handleStatusChange(t.id, "RESOLVED")}
// //                     className="bg-green-500 text-white px-2 py-1 text-xs mr-1"
// //                   >
// //                     Resolve
// //                   </button>

// //                   <button
// //                     onClick={() => handleStatusChange(t.id, "CLOSED")}
// //                     className="bg-gray-500 text-white px-2 py-1 text-xs"
// //                   >
// //                     Close
// //                   </button>
// //                 </td>

// //                 {/* ✅ CHAT */}
// //                 <td className="p-2">
// //                   <button
// //                     onClick={() => {
// //                       setCommentTicketId(t.id);
// //                       setCommentOpen(true);
// //                     }}
// //                     className="bg-blue-500 text-white px-2 py-1 text-xs"
// //                   >
// //                     Chat
// //                   </button>
// //                 </td>

// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}

// //       <TicketComments
// //         ticketId={commentTicketId}
// //         open={commentOpen}
// //         onClose={() => setCommentOpen(false)}
// //       />
// //     </div>
// //   );
// // }

// //frontend/src/pages/tech/TechTickets.jsx
// import { useEffect, useState } from "react";
// import { ticketsApi } from "../../api/tickets";
// import TicketComments from "../TicketComments";
// import { MessageSquare } from "lucide-react";

// const TICKET_CATEGORIES = [
//   "ALL",
//   "ELECTRICAL",
//   "PLUMBING",
//   "HVAC",
//   "IT",
//   "CLEANING",
//   "OTHER",
// ];

// export default function TechTickets() {
//   const [tickets, setTickets] = useState([]);
//   const [filter, setFilter] = useState("ALL");
//   const [commentOpen, setCommentOpen] = useState(false);
//   const [commentTicket, setCommentTicket] = useState(null); // whole ticket object

//   // Fetch tickets whenever filter changes
//   useEffect(() => {
//     fetchTickets();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filter]);

//   const fetchTickets = async () => {
//     try {
//       let res;
//       if (!filter || filter === "ALL") {
//         res = await ticketsApi.getAssigned();
//       } else {
//         res = await ticketsApi.getAssignedByType(filter);
//       }
//       setTickets(res.data.data || []);
//     } catch (err) {
//       setTickets([]);
//     }
//   };

//   // Ticket status update handler
//   async function handleStatusChange(ticketId, status) {
//     try {
//       await ticketsApi.updateStatus(ticketId, status);
//       fetchTickets();
//       if (commentOpen) setCommentTicket(null), setCommentOpen(false);
//     } catch (err) {
//       alert("Failed to update status: " + (err.response?.data?.message || err.message));
//     }
//   }

//   return (
//     <div className="max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Assigned Tickets</h1>
//       {/* Technician Ticket Type Filter */}
//       <div className="mb-6 flex gap-3 items-center">
//         <label className="font-semibold">Please select your type:</label>
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="bg-white border rounded px-4 py-2"
//         >
//           {TICKET_CATEGORIES.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat[0] + cat.slice(1).toLowerCase()}
//             </option>
//           ))}
//         </select>
//       </div>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2">Title</th>
//             <th className="p-2">User</th>
//             <th className="p-2">Type</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Images</th>
//             <th className="p-2">Change Status</th>
//             <th className="p-2">Messages</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tickets.map((t) => (
//             <tr key={t.id} className="border-t">
//               <td className="p-2">{t.title}</td>
//               <td className="p-2">{t.reporterName}</td>
//               <td className="p-2">{t.category}</td>
//               <td className="p-2">{t.status}</td>
//               <td className="p-2">
//                 {t.images && t.images.length > 0 ? (
//                   <div className="flex -space-x-3 overflow-hidden">
//                     {t.images.map((img, idx) => (
//                       <img
//                         key={idx}
//                         src={img.startsWith("http") ? img : `/${img}`}
//                         alt="Ticket"
//                         style={{
//                           width: "40px",
//                           height: "40px",
//                           objectFit: "cover",
//                           borderRadius: "6px",
//                         }}
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <span className="text-xs text-gray-400">No image</span>
//                 )}
//               </td>
//               <td className="p-2">
//                 <select
//                   value={t.status}
//                   onChange={(e) => handleStatusChange(t.id, e.target.value)}
//                   className="border rounded px-2 py-1"
//                 >
//                   {/* These should be validated on backend as well! */}
//                   <option value="OPEN">Open</option>
//                   <option value="IN_PROGRESS">In Progress</option>
//                   <option value="RESOLVED">Resolved</option>
//                   <option value="CLOSED">Closed</option>
//                 </select>
//               </td>
//               <td className="p-2">
//                 <button
//                   onClick={() => {
//                     setCommentTicket(t);
//                     setCommentOpen(true);
//                   }}
//                   className="inline-flex items-center gap-1 px-3 py-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 font-semibold text-xs active:scale-95"
//                 >
//                   <MessageSquare className="w-4 h-4" />
//                   Messages
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* Comments modal for selected ticket */}
//       <TicketComments
//         ticketId={commentOpen ? commentTicket?.id : null}
//         open={commentOpen}
//         onClose={() => { setCommentOpen(false); setCommentTicket(null); }}
//       />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { ticketsApi } from "../../api/tickets";
import TicketComments from "../TicketComments";
import { MessageSquare } from "lucide-react";

const TICKET_CATEGORIES = [
  "ALL",
  "ELECTRICAL",
  "PLUMBING",
  "HVAC",
  "IT",
  "CLEANING",
  "OTHER",
];

export default function TechTickets() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentTicket, setCommentTicket] = useState(null); // whole ticket object

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchTickets = async () => {
    try {
      let res;
      if (!filter || filter === "ALL") {
        res = await ticketsApi.getAssigned();
      } else {
        // Only pass valid Java Enum value, not "ALL"
        res = await ticketsApi.getAssignedByType(filter);
      }
      setTickets(res.data.data || []);
    } catch (err) {
      setTickets([]);
    }
  };

  async function handleStatusChange(ticketId, status) {
    try {
      await ticketsApi.updateStatus(ticketId, status);
      fetchTickets();
      if (commentOpen) setCommentTicket(null), setCommentOpen(false);
    } catch (err) {
      alert("Failed to update status: " + (err.response?.data?.message || err.message));
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Assigned Tickets</h1>
      {/* Technician Ticket Type Filter */}
      <div className="mb-6 flex gap-3 items-center">
        <label className="font-semibold">Please select your type:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border rounded px-4 py-2"
        >
          {TICKET_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat[0] + cat.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">User</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Images</th>
            <th className="p-2">Change Status</th>
            <th className="p-2">Messages</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-2">{t.title}</td>
              <td className="p-2">{t.reporterName}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2">{t.status}</td>
              <td className="p-2">
                {t.images && t.images.length > 0 ? (
                  <div className="flex -space-x-3 overflow-hidden">
                    {t.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.startsWith("http") ? img : `/${img}`}
                        alt="Ticket"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">No image</span>
                )}
              </td>
              <td className="p-2">
                <select
                  value={t.status}
                  onChange={(e) => handleStatusChange(t.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </td>
              <td className="p-2">
                <button
                  onClick={() => {
                    setCommentTicket(t);
                    setCommentOpen(true);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 font-semibold text-xs active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  Messages
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TicketComments
        ticketId={commentOpen ? commentTicket?.id : null}
        open={commentOpen}
        onClose={() => { setCommentOpen(false); setCommentTicket(null); }}
      />
    </div>
  );
}