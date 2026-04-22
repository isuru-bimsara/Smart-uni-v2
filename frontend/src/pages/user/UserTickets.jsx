// // import { useState, useEffect, useMemo } from "react";
// // import { useSearchParams, useNavigate } from "react-router-dom";
// // import { ticketsApi } from "../../api/tickets";
// // import { bookingsApi } from "../../api/bookings";
// // import TicketComments from "../TicketComments";
// // import {
// //   PlusCircle,
// //   Ticket,
// //   MessageSquare,
// //   Layers,
// //   AlertCircle,
// //   Image as ImageIcon,
// //   Send,
// //   Loader2,
// //   Clock,
// //   CalendarDays,
// //   Phone,
// //   Info,
// //   X,
// // } from "lucide-react";

// // export default function UserTickets() {
// //   const [tickets, setTickets] = useState([]);
// //   const [bookings, setBookings] = useState([]);
// //   const [form, setForm] = useState({
// //     title: "",
// //     description: "",
// //     category: "",
// //     priority: "MEDIUM",
// //     contactDetails: "",
// //     isOther: false,
// //     bookingId: "",
// //   });
// //   const [images, setImages] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [fetching, setFetching] = useState(true);

// //   // Comments state
// //   const [commentOpen, setCommentOpen] = useState(false);
// //   const [commentTicketId, setCommentTicketId] = useState(null);

// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const navigate = useNavigate();

// //   const ticketIdFromQuery = searchParams.get("ticketId");
// //   const openCommentsFromQuery = searchParams.get("openComments") === "true";

// //   const fetchTickets = async () => {
// //     try {
// //       setFetching(true);
// //       const res = await ticketsApi.getMyTickets();
// //       setTickets(res.data.data || []);
// //     } catch {
// //       setTickets([]);
// //     } finally {
// //       setFetching(false);
// //     }
// //   };

// //   const fetchBookings = async () => {
// //     try {
// //       const res = await bookingsApi.getMyBookings();
// //       // Filter for approved/completed bookings might be better, but let's show all for now
// //       setBookings(res.data.data || []);
// //     } catch (err) {
// //       console.error("Failed to fetch bookings", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTickets();
// //     fetchBookings();
// //   }, []);

// //   useEffect(() => {
// //     if (fetching) return;
// //     if (!ticketIdFromQuery) return;

// //     const ticketIdNum = Number(ticketIdFromQuery);
// //     if (Number.isNaN(ticketIdNum)) return;

// //     const exists = tickets.some((t) => Number(t.id) === ticketIdNum);

// //     if (exists && openCommentsFromQuery) {
// //       setCommentTicketId(ticketIdNum);
// //       setCommentOpen(true);
// //     }

// //     const timeout = setTimeout(() => {
// //       setSearchParams({}, { replace: true });
// //     }, 0);

// //     return () => clearTimeout(timeout);
// //   }, [fetching, ticketIdFromQuery, openCommentsFromQuery, tickets, setSearchParams]);

// //   const sortedTickets = useMemo(() => {
// //     const statusPriority = {
// //       OPEN: 1,
// //       IN_PROGRESS: 2,
// //       RESOLVED: 3,
// //       REJECTED: 4,
// //       CLOSED: 5,
// //     };

// //     return [...tickets].sort((a, b) => {
// //       const priorityA = statusPriority[a.status] || 6;
// //       const priorityB = statusPriority[b.status] || 6;

// //       if (priorityA !== priorityB) {
// //         return priorityA - priorityB;
// //       }

// //       return new Date(b.createdAt) - new Date(a.createdAt);
// //     });
// //   }, [tickets]);

// //   function handleChange(e) {
// //     const { name, value, type, checked } = e.target;
// //     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
// //   }

// //   function handleImageChange(e) {
// //     const files = Array.from(e.target.files);
// //     setImages((prev) => {
// //       const next = [...prev, ...files];
// //       if (next.length > 3) {
// //         alert("Maximum 3 images allowed. Keeping only the first 3.");
// //         return next.slice(0, 3);
// //       }
// //       return next;
// //     });
// //   }

// //   function removeImage(index) {
// //     setImages(images.filter((_, i) => i !== index));
// //   }

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setLoading(true);

// //     const ticketData = { ...form };
// //     if (form.isOther) {
// //       ticketData.bookingId = null;
// //       ticketData.resourceId = null;
// //     } else if (form.bookingId) {
// //       const selectedBooking = bookings.find(b => b.id === Number(form.bookingId));
// //       ticketData.resourceId = selectedBooking?.resourceId;
// //     }

// //     const fd = new FormData();
// //     fd.append(
// //       "ticket",
// //       new Blob([JSON.stringify(ticketData)], { type: "application/json" }),
// //     );
// //     for (let i = 0; i < images.length; i++) {
// //       fd.append("images", images[i]);
// //     }

// //     try {
// //       await ticketsApi.create(fd);
// //       alert("✅ Ticket created successfully!");
// //       setForm({ 
// //         title: "", 
// //         description: "", 
// //         category: "", 
// //         priority: "MEDIUM", 
// //         contactDetails: "",
// //         isOther: false,
// //         bookingId: ""
// //       });
// //       setImages([]);
// //       fetchTickets();
// //     } catch (err) {
// //       alert("❌ " + (err.response?.data?.message || err.message));
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   const getStatusStyle = (status) => {
// //     switch (status) {
// //       case "OPEN":
// //         return "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20";
// //       case "IN_PROGRESS":
// //         return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20";
// //       case "RESOLVED":
// //         return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20";
// //       case "REJECTED":
// //         return "bg-orange-50 text-orange-700 border-orange-200 ring-orange-500/20";
// //       case "CLOSED":
// //         return "bg-slate-50 text-slate-600 border-slate-200 ring-slate-500/20";
// //       default:
// //         return "bg-gray-50 text-gray-700 border-gray-200";
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return "Just now";
// //     return new Intl.DateTimeFormat("en-GB", {
// //       day: "numeric",
// //       month: "short",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     }).format(new Date(dateString));
// //   };

// //   return (
// //     <div className="max-w-6xl mx-auto space-y-10 pb-20 p-6 md:p-0">
// //       {/* HEADER */}
// //       <div className="flex items-center gap-4">
// //         <div className="p-3.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center">
// //           <Ticket className="text-white w-7 h-7" />
// //         </div>
// //         <div>
// //           <h1 className="text-3xl font-black text-slate-900 tracking-tight">
// //             Support Center
// //           </h1>
// //           <p className="text-slate-500 font-medium mt-0.5">
// //             Report issues or request maintenance for resources.
// //           </p>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
// //         {/* LEFT: CREATE TICKET FORM */}
// //         <div className="xl:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
// //           <div className="p-6 border-b border-slate-100 bg-slate-50/50">
// //             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
// //               <PlusCircle className="w-5 h-5 text-indigo-600" />
// //               New Support Request
// //             </h2>
// //           </div>
// //           <form onSubmit={handleSubmit} className="p-6 space-y-5">
// //             <div className="space-y-1.5">
// //               <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
// //                 Subject
// //               </label>
// //               <input
// //                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium"
// //                 required
// //                 name="title"
// //                 placeholder="Brief summary of the issue"
// //                 value={form.title}
// //                 onChange={handleChange}
// //               />
// //             </div>
            
// //             <div className="space-y-1.5">
// //               <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
// //                 Resource / Equipment
// //               </label>
// //               <div className="space-y-3">
// //                 <label className="flex items-center gap-2 cursor-pointer group">
// //                   <input
// //                     type="checkbox"
// //                     name="isOther"
// //                     checked={form.isOther}
// //                     onChange={handleChange}
// //                     className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
// //                   />
// //                   <span className="text-sm font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors">
// //                     Issue is not related to a specific booking (Other)
// //                   </span>
// //                 </label>

// //                 {!form.isOther && (
// //                   <div className="relative">
// //                     <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// //                     <select
// //                       className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none appearance-none cursor-pointer text-sm font-semibold text-slate-700 disabled:opacity-50"
// //                       name="bookingId"
// //                       required={!form.isOther}
// //                       value={form.bookingId}
// //                       onChange={handleChange}
// //                     >
// //                       <option value="" disabled>Select from your bookings...</option>
// //                       {bookings.map(b => (
// //                         <option key={b.id} value={b.id}>
// //                           {b.resourceName} ({formatDate(b.startTime)})
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="space-y-1.5">
// //               <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
// //                 Details
// //               </label>
// //               <textarea
// //                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all resize-none text-sm font-medium leading-relaxed"
// //                 required
// //                 name="description"
// //                 placeholder="Describe the problem in detail..."
// //                 rows={3}
// //                 value={form.description}
// //                 onChange={handleChange}
// //               />
// //             </div>

// //             <div className="space-y-1.5">
// //               <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
// //                 Contact Details (Email or Phone)
// //               </label>
// //               <div className="relative">
// //                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// //                 <input
// //                   className="w-full pl-9 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium"
// //                   required
// //                   name="contactDetails"
// //                   placeholder="e.g. +94 77 123 4567 or email@example.com"
// //                   value={form.contactDetails}
// //                   onChange={handleChange}
// //                 />
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="space-y-1.5">
// //                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
// //                   Category
// //                 </label>
// //                 <div className="relative">
// //                   <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// //                   <select
// //                     className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none appearance-none cursor-pointer text-sm font-semibold text-slate-700"
// //                     name="category"
// //                     required
// //                     value={form.category}
// //                     onChange={handleChange}
// //                   >
// //                     <option value="" disabled>Select...</option>
// //                     <option value="ELECTRICAL">Electrical</option>
// //                     <option value="PLUMBING">Plumbing</option>
// //                     <option value="HVAC">HVAC</option>
// //                     <option value="IT">IT Support</option>
// //                     <option value="CLEANING">Cleaning</option>
// //                     <option value="OTHER">Other</option>
// //                   </select>
// //                 </div>
// //               </div>
// //               <div className="space-y-1.5">
// //                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
// //                   Priority
// //                 </label>
// //                 <div className="relative">
// //                   <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// //                   <select
// //                     className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none appearance-none cursor-pointer text-sm font-semibold text-slate-700"
// //                     name="priority"
// //                     required
// //                     value={form.priority}
// //                     onChange={handleChange}
// //                   >
// //                     <option value="LOW">Low</option>
// //                     <option value="MEDIUM">Medium</option>
// //                     <option value="HIGH">High</option>
// //                     <option value="CRITICAL">Critical</option>
// //                   </select>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="space-y-1.5">
// //               <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
// //                 Attachments (Max 3)
// //               </label>
// //               <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-indigo-300 transition-all bg-slate-50/50">
// //                 <div className="flex flex-col items-center justify-center pt-2">
// //                   <ImageIcon className="w-6 h-6 text-slate-400 mb-1" />
// //                   <p className="text-xs font-medium text-slate-500">
// //                     {images.length > 0 ? (
// //                       <span className="text-indigo-600 font-bold">
// //                         {images.length} file(s) selected
// //                       </span>
// //                     ) : (
// //                       "Upload photos of the issue"
// //                     )}
// //                   </p>
// //                 </div>
// //                 <input
// //                   type="file"
// //                   multiple
// //                   accept="image/*"
// //                   onChange={handleImageChange}
// //                   className="hidden"
// //                 />
// //               </label>

// //               {images.length > 0 && (
// //                 <div className="flex flex-wrap gap-2 mt-2">
// //                   {images.map((img, idx) => (
// //                     <div key={idx} className="relative group">
// //                       <img
// //                         src={URL.createObjectURL(img)}
// //                         className="w-12 h-12 object-cover rounded-lg border border-slate-200"
// //                         alt="Preview"
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => removeImage(idx)}
// //                         className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
// //                       >
// //                         <X className="w-3 h-3" />
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:bg-slate-300 disabled:shadow-none"
// //             >
// //               {loading ? (
// //                 <Loader2 className="w-5 h-5 animate-spin" />
// //               ) : (
// //                 <>
// //                   <Send className="w-5 h-5" /> Submit Request
// //                 </>
// //               )}
// //             </button>
// //           </form>
// //         </div>

// //         {/* RIGHT: TICKET TABLE */}
// //         <div className="xl:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-fit">
// //           <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
// //             <div>
// //               <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
// //                 <Layers className="w-5 h-5 text-indigo-600" />
// //                 Your Ticket History
// //               </h3>
// //               <p className="text-xs font-medium text-slate-400 mt-1">
// //                 Sorted by priority and recent activity
// //               </p>
// //             </div>
// //             <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500">
// //               {sortedTickets.length} Total
// //             </div>
// //           </div>

// //           <div className="overflow-x-auto">
// //             {fetching ? (
// //               <div className="p-20 text-center animate-pulse">
// //                 <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
// //                 </div>
// //                 <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">
// //                   Loading History...
// //                 </p>
// //               </div>
// //             ) : sortedTickets.length === 0 ? (
// //               <div className="p-20 text-center">
// //                 <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
// //                   <Clock className="w-8 h-8 text-slate-300" />
// //                 </div>
// //                 <p className="text-slate-600 font-bold text-lg">
// //                   No tickets found
// //                 </p>
// //                 <p className="text-slate-400 text-sm mt-1">
// //                   Your submitted requests will appear here.
// //                 </p>
// //               </div>
// //             ) : (
// //               <table className="w-full text-left border-collapse">
// //                 <thead>
// //                   <tr className="bg-slate-50/50 border-b border-slate-100">
// //                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
// //                       Request Info
// //                     </th>
// //                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
// //                       Status
// //                     </th>
// //                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
// //                       Evidence
// //                     </th>
// //                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
// //                       Action
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-slate-50">
// //                   {sortedTickets.map((t) => (
// //                     <tr
// //                       key={t.id}
// //                       className="hover:bg-indigo-50/30 transition-colors group"
// //                     >
// //                       <td className="px-6 py-5">
// //                         <div className="font-bold text-slate-800 mb-1 text-sm line-clamp-1">
// //                           {t.title}
// //                         </div>
// //                         <div className="text-[11px] font-semibold text-indigo-600 mb-1.5">
// //                           {t.isOther ? "Other / General" : t.resourceName || "Specific Resource"}
// //                         </div>
// //                         <div className="flex items-center gap-4">
// //                           <div className="flex items-center gap-1.5">
// //                             <span
// //                               className={`w-2 h-2 rounded-full ${
// //                                 t.priority === "CRITICAL"
// //                                   ? "bg-rose-500 animate-pulse"
// //                                   : t.priority === "HIGH"
// //                                     ? "bg-orange-500"
// //                                     : t.priority === "MEDIUM"
// //                                       ? "bg-amber-400"
// //                                       : "bg-blue-400"
// //                               }`}
// //                             ></span>
// //                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
// //                               {t.priority}
// //                             </span>
// //                           </div>
// //                           <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
// //                             <CalendarDays className="w-3 h-3" />
// //                             {formatDate(t.createdAt)}
// //                           </div>
// //                         </div>
// //                         {t.status === "REJECTED" && t.rejectionReason && (
// //                            <div className="mt-2 p-2 bg-orange-50 border border-orange-100 rounded-lg flex items-start gap-2">
// //                              <Info className="w-3 h-3 text-orange-500 mt-0.5 shrink-0" />
// //                              <p className="text-[10px] font-medium text-orange-700 leading-tight">
// //                                Rejection Reason: {t.rejectionReason}
// //                              </p>
// //                            </div>
// //                         )}
// //                       </td>

// //                       <td className="px-6 py-5 text-center">
// //                         <span
// //                           className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-[10px] font-black border ring-1 uppercase tracking-widest whitespace-nowrap ${getStatusStyle(t.status)}`}
// //                         >
// //                           {t.status.replace("_", " ")}
// //                         </span>
// //                       </td>

// //                       <td className="px-6 py-5">
// //                         <div className="flex justify-center">
// //                           {t.images && t.images.length > 0 ? (
// //                             <div className="flex -space-x-2 overflow-hidden hover:space-x-0 transition-all duration-300">
// //                               {t.images.slice(0, 3).map((img, idx) => (
// //                                 <img
// //                                   key={idx}
// //                                   src={img.startsWith("http") ? img : img.startsWith("/") ? img : `/${img}`}
// //                                   alt="Attachment"
// //                                   className="inline-block h-9 w-9 rounded-lg ring-2 ring-white object-cover shadow-sm bg-slate-100"
// //                                 />
// //                               ))}
// //                             </div>
// //                           ) : (
// //                             <span className="text-[11px] font-semibold text-slate-300 bg-slate-50 px-2 py-1 rounded-md">
// //                               None
// //                             </span>
// //                           )}
// //                         </div>
// //                       </td>

// //                       <td className="px-6 py-5 text-right">
// //                         <button
// //                           onClick={() => {
// //                             setCommentTicketId(t.id);
// //                             setCommentOpen(true);
// //                           }}
// //                           className="inline-flex items-center gap-2 px-4 py-2 text-indigo-600 bg-white border border-indigo-100 shadow-sm rounded-xl hover:bg-indigo-50 hover:border-indigo-200 font-bold text-xs transition-all active:scale-95 whitespace-nowrap"
// //                         >
// //                           <MessageSquare className="w-4 h-4" />
// //                           View Log
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* COMMENT MODAL */}
// //       <TicketComments
// //         ticketId={commentTicketId}
// //         open={commentOpen}
// //         onClose={() => setCommentOpen(false)}
// //       />
// //     </div>
// //   );
// // }


// import { useState, useEffect, useMemo, useRef } from "react";
// import { useSearchParams } from "react-router-dom";
// import { ticketsApi } from "../../api/tickets";
// import { bookingsApi } from "../../api/bookings";
// import TicketComments from "../TicketComments";
// import {
//   PlusCircle,
//   Ticket,
//   MessageSquare,
//   Layers,
//   AlertCircle,
//   Image as ImageIcon,
//   Send,
//   Loader2,
//   CalendarDays,
//   Phone,
//   Info,
//   X,
//   CheckCircle2,
//   Eye,
// } from "lucide-react";

// export default function UserTickets() {
//   const [tickets, setTickets] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "",
//     priority: "MEDIUM",
//     contactDetails: "",
//     isOther: false,
//     bookingId: "",
//   });

//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   const [commentOpen, setCommentOpen] = useState(false);
//   const [commentTicketId, setCommentTicketId] = useState(null);

//   const [resolutionModal, setResolutionModal] = useState({ open: false, ticket: null });

//   // highlight + scroll target ticket from notification deep-link
//   const [highlightTicketId, setHighlightTicketId] = useState(null);

//   const rowRefs = useRef({});
//   const [searchParams, setSearchParams] = useSearchParams();
//   const ticketIdFromQuery = searchParams.get("ticketId");
//   const openCommentsFromQuery = searchParams.get("openComments") === "true";

//   const fetchTickets = async () => {
//     try {
//       setFetching(true);
//       const res = await ticketsApi.getMyTickets();
//       setTickets(res.data.data || []);
//     } catch {
//       setTickets([]);
//     } finally {
//       setFetching(false);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       const res = await bookingsApi.getMyBookings();
//       setBookings(res.data.data || []);
//     } catch (err) {
//       console.error("Failed to fetch bookings", err);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//     fetchBookings();
//   }, []);

//   // Handle notification deep-link:
//   // /user/tickets?ticketId=123
//   // /user/tickets?ticketId=123&openComments=true
//   useEffect(() => {
//     if (fetching || !ticketIdFromQuery) return;

//     const ticketIdNum = Number(ticketIdFromQuery);
//     if (Number.isNaN(ticketIdNum)) return;

//     const target = tickets.find((t) => Number(t.id) === ticketIdNum);
//     if (!target) return;

//     setHighlightTicketId(ticketIdNum);

//     // if ticket resolved, open resolution modal directly
//     if (!openCommentsFromQuery && target.status === "RESOLVED") {
//       openResolution(target);
//     }

//     // open comments if requested
//     if (openCommentsFromQuery) {
//       setCommentTicketId(ticketIdNum);
//       setCommentOpen(true);
//     }

//     // scroll target row into view
//     setTimeout(() => {
//       rowRefs.current[ticketIdNum]?.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }, 80);

//     // clear query once handled
//     const timeout = setTimeout(() => setSearchParams({}, { replace: true }), 0);
//     const clearHighlight = setTimeout(() => setHighlightTicketId(null), 3500);

//     return () => {
//       clearTimeout(timeout);
//       clearTimeout(clearHighlight);
//     };
//   }, [fetching, ticketIdFromQuery, openCommentsFromQuery, tickets, setSearchParams]);

//   const sortedTickets = useMemo(() => {
//     const statusPriority = {
//       OPEN: 1,
//       IN_PROGRESS: 2,
//       RESOLVED: 3,
//       REJECTED: 4,
//       CLOSED: 5,
//     };

//     return [...tickets].sort((a, b) => {
//       const pa = statusPriority[a.status] || 6;
//       const pb = statusPriority[b.status] || 6;
//       if (pa !== pb) return pa - pb;
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });
//   }, [tickets]);

//   function handleChange(e) {
//     const { name, value, type, checked } = e.target;
//     setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
//   }

//   function handleImageChange(e) {
//     const files = Array.from(e.target.files || []);
//     setImages((prev) => {
//       const next = [...prev, ...files];
//       if (next.length > 3) {
//         alert("Maximum 3 images allowed. Keeping first 3.");
//         return next.slice(0, 3);
//       }
//       return next;
//     });
//   }

//   function removeImage(index) {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     const ticketData = { ...form };

//     if (form.isOther) {
//       ticketData.bookingId = null;
//       ticketData.resourceId = null;
//     } else if (form.bookingId) {
//       const selectedBooking = bookings.find((b) => b.id === Number(form.bookingId));
//       ticketData.resourceId = selectedBooking?.resourceId;
//     }

//     const fd = new FormData();
//     fd.append("ticket", new Blob([JSON.stringify(ticketData)], { type: "application/json" }));
//     images.forEach((img) => fd.append("images", img));

//     try {
//       await ticketsApi.create(fd);
//       alert("✅ Ticket created successfully!");
//       setForm({
//         title: "",
//         description: "",
//         category: "",
//         priority: "MEDIUM",
//         contactDetails: "",
//         isOther: false,
//         bookingId: "",
//       });
//       setImages([]);
//       await fetchTickets();
//     } catch (err) {
//       alert("❌ " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   }

//   const openResolution = async (ticket) => {
//     try {
//       await ticketsApi.markResolutionViewed(ticket.id);
//     } catch (e) {
//       console.error(e);
//     }
//     setResolutionModal({ open: true, ticket });
//   };

//   const acknowledgeAndClose = async () => {
//     const t = resolutionModal.ticket;
//     if (!t) return;

//     try {
//       await ticketsApi.acknowledgeResolution(t.id);
//       alert("✅ Acknowledged. Ticket is now CLOSED.");
//       setResolutionModal({ open: false, ticket: null });
//       await fetchTickets();
//     } catch (err) {
//       alert("❌ " + (err.response?.data?.message || "Failed to acknowledge"));
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "OPEN":
//         return "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20";
//       case "IN_PROGRESS":
//         return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20";
//       case "RESOLVED":
//         return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20";
//       case "REJECTED":
//         return "bg-orange-50 text-orange-700 border-orange-200 ring-orange-500/20";
//       case "CLOSED":
//         return "bg-slate-50 text-slate-600 border-slate-200 ring-slate-500/20";
//       default:
//         return "bg-gray-50 text-gray-700 border-gray-200";
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "Just now";
//     return new Intl.DateTimeFormat("en-GB", {
//       day: "numeric",
//       month: "short",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(new Date(dateString));
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-10 pb-20 p-6 md:p-0">
//       <div className="flex items-center gap-4">
//         <div className="p-3.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
//           <Ticket className="text-white w-7 h-7" />
//         </div>
//         <div>
//           <h1 className="text-3xl font-black text-slate-900">Support Center</h1>
//           <p className="text-slate-500 font-medium mt-0.5">
//             Create tickets and review technician resolutions.
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
//         {/* CREATE FORM */}
//         <div className="xl:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
//           <div className="p-6 border-b border-slate-100 bg-slate-50/50">
//             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//               <PlusCircle className="w-5 h-5 text-indigo-600" />
//               New Support Request
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6 space-y-5">
//             <input
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
//               required
//               name="title"
//               placeholder="Issue title"
//               value={form.title}
//               onChange={handleChange}
//             />

//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
//                 <input
//                   type="checkbox"
//                   name="isOther"
//                   checked={form.isOther}
//                   onChange={handleChange}
//                 />
//                 Other (not linked to booking)
//               </label>

//               {!form.isOther && (
//                 <select
//                   className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
//                   name="bookingId"
//                   required={!form.isOther}
//                   value={form.bookingId}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select booking...</option>
//                   {bookings.map((b) => (
//                     <option key={b.id} value={b.id}>
//                       {b.resourceName} ({formatDate(b.startTime)})
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>

//             <textarea
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none"
//               required
//               rows={3}
//               name="description"
//               placeholder="Describe issue..."
//               value={form.description}
//               onChange={handleChange}
//             />

//             <input
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
//               required
//               name="contactDetails"
//               placeholder="Email or phone"
//               value={form.contactDetails}
//               onChange={handleChange}
//             />

//             <div className="grid grid-cols-2 gap-3">
//               <select
//                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
//                 name="category"
//                 required
//                 value={form.category}
//                 onChange={handleChange}
//               >
//                 <option value="">Category</option>
//                 <option value="ELECTRICAL">Electrical</option>
//                 <option value="PLUMBING">Plumbing</option>
//                 <option value="HVAC">HVAC</option>
//                 <option value="IT">IT</option>
//                 <option value="CLEANING">Cleaning</option>
//                 <option value="OTHER">Other</option>
//               </select>

//               <select
//                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
//                 name="priority"
//                 required
//                 value={form.priority}
//                 onChange={handleChange}
//               >
//                 <option value="LOW">LOW</option>
//                 <option value="MEDIUM">MEDIUM</option>
//                 <option value="HIGH">HIGH</option>
//                 <option value="CRITICAL">CRITICAL</option>
//               </select>
//             </div>

//             <div>
//               <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer bg-slate-50/50">
//                 <ImageIcon className="w-6 h-6 text-slate-400 mb-1" />
//                 <p className="text-xs text-slate-500">
//                   {images.length > 0 ? `${images.length} selected` : "Upload images (max 3)"}
//                 </p>
//                 <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
//               </label>

//               {images.length > 0 && (
//                 <div className="flex gap-2 mt-3 flex-wrap">
//                   {images.map((img, idx) => (
//                     <div key={idx} className="relative">
//                       <img
//                         src={URL.createObjectURL(img)}
//                         alt="preview"
//                         className="w-12 h-12 rounded-lg object-cover border"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(idx)}
//                         className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-0.5"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <>
//                   <Send className="w-5 h-5" /> Submit
//                 </>
//               )}
//             </button>
//           </form>
//         </div>

//         {/* LIST */}
//         <div className="xl:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
//           <div className="p-6 border-b border-slate-100 flex justify-between items-center">
//             <div>
//               <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//                 <Layers className="w-5 h-5 text-indigo-600" />
//                 Your Tickets
//               </h3>
//               <p className="text-xs text-slate-400 mt-1">
//                 Clicked ticket notifications will highlight and scroll to relevant ticket.
//               </p>
//             </div>
//             <span className="text-xs font-bold text-slate-500 bg-slate-50 border px-3 py-1.5 rounded-lg">
//               {sortedTickets.length} Total
//             </span>
//           </div>

//           <div className="overflow-x-auto">
//             {fetching ? (
//               <div className="p-20 text-center">
//                 <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-3" />
//                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
//                   Loading...
//                 </p>
//               </div>
//             ) : sortedTickets.length === 0 ? (
//               <div className="p-20 text-center text-slate-500 font-semibold">
//                 No tickets yet.
//               </div>
//             ) : (
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-slate-50/50 border-b border-slate-100">
//                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
//                       Info
//                     </th>
//                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
//                       Status
//                     </th>
//                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
//                       Technician
//                     </th>
//                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-50">
//                   {sortedTickets.map((t) => {
//                     const isHighlighted = Number(highlightTicketId) === Number(t.id);

//                     return (
//                       <tr
//                         key={t.id}
//                         ref={(el) => {
//                           rowRefs.current[t.id] = el;
//                         }}
//                         className={`hover:bg-indigo-50/20 transition-colors ${
//                           isHighlighted ? "bg-yellow-50/70 ring-2 ring-yellow-200" : ""
//                         }`}
//                       >
//                         <td className="px-6 py-5">
//                           <div className="font-bold text-slate-800 text-sm">{t.title}</div>
//                           <div className="text-[11px] text-slate-500 mt-1">
//                             {t.isOther ? "Other / General" : t.resourceName || "Resource"} •{" "}
//                             {formatDate(t.createdAt)}
//                           </div>

//                           {t.status === "REJECTED" && t.rejectionReason && (
//                             <div className="mt-2 p-2 bg-orange-50 border border-orange-100 rounded-lg text-[11px] text-orange-700">
//                               <Info className="w-3 h-3 inline mr-1" />
//                               Rejection: {t.rejectionReason}
//                             </div>
//                           )}

//                           {t.status === "RESOLVED" && t.resolutionExplanation && (
//                             <div className="mt-2 p-2 bg-emerald-50 border border-emerald-100 rounded-lg text-[11px] text-emerald-700">
//                               <CheckCircle2 className="w-3 h-3 inline mr-1" />
//                               Resolution available
//                             </div>
//                           )}
//                         </td>

//                         <td className="px-6 py-5 text-center">
//                           <span
//                             className={`inline-flex px-3 py-1.5 rounded-lg text-[10px] font-black border ring-1 uppercase tracking-widest ${getStatusStyle(
//                               t.status
//                             )}`}
//                           >
//                             {t.status.replace("_", " ")}
//                           </span>
//                         </td>

//                         <td className="px-6 py-5 text-center">
//                           <span className="text-xs font-semibold text-slate-600">
//                             {t.assigneeName || "Unassigned"}
//                           </span>
//                         </td>

//                         <td className="px-6 py-5 text-right">
//                           <div className="flex justify-end gap-2">
//                             {t.status === "RESOLVED" && (
//                               <button
//                                 onClick={() => openResolution(t)}
//                                 className="inline-flex items-center gap-2 px-3 py-2 text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-bold"
//                               >
//                                 <Eye className="w-4 h-4" />
//                                 Review
//                               </button>
//                             )}

//                             <button
//                               onClick={() => {
//                                 setCommentTicketId(t.id);
//                                 setCommentOpen(true);
//                               }}
//                               className="inline-flex items-center gap-2 px-3 py-2 text-indigo-600 bg-white border border-indigo-100 rounded-xl text-xs font-bold"
//                             >
//                               <MessageSquare className="w-4 h-4" />
//                               Log
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* RESOLUTION REVIEW MODAL */}
//       {resolutionModal.open && resolutionModal.ticket && (
//         <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8">
//             <h2 className="text-2xl font-black text-slate-800 mb-4">Resolution Review</h2>
//             <p className="text-sm text-slate-500 mb-4">
//               Ticket:{" "}
//               <span className="font-bold text-slate-700">{resolutionModal.ticket.title}</span>
//             </p>

//             <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 mb-6">
//               <p className="text-[11px] font-black text-emerald-700 uppercase tracking-widest mb-2">
//                 Technician Resolution Note
//               </p>
//               <p className="text-sm text-emerald-800 whitespace-pre-wrap">
//                 {resolutionModal.ticket.resolutionExplanation || "No note provided."}
//               </p>
//             </div>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setResolutionModal({ open: false, ticket: null })}
//                 className="px-4 py-2.5 rounded-xl border text-slate-600 font-bold text-sm"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={acknowledgeAndClose}
//                 className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm"
//               >
//                 Acknowledge & Auto-Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <TicketComments
//         ticketId={commentTicketId}
//         open={commentOpen}
//         onClose={() => setCommentOpen(false)}
//       />
//     </div>
//   );
// }


import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ticketsApi } from "../../api/tickets";
import { bookingsApi } from "../../api/bookings";
import TicketComments from "../TicketComments";
import {
  PlusCircle,
  Ticket,
  MessageSquare,
  Layers,
  Image as ImageIcon,
  Send,
  Loader2,
  Info,
  X,
  CheckCircle2,
  Eye,
  XCircle,
} from "lucide-react";

export default function UserTickets() {
  const [tickets, setTickets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "MEDIUM",
    contactDetails: "",
    isOther: false,
    bookingId: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [commentOpen, setCommentOpen] = useState(false);
  const [commentTicketId, setCommentTicketId] = useState(null);

  // Full ticket detail modal (images + resolution note + close button if not closed)
  const [detailModal, setDetailModal] = useState({ open: false, ticket: null, ackLoading: false });

  const [highlightTicketId, setHighlightTicketId] = useState(null);

  const rowRefs = useRef({});
  const [searchParams, setSearchParams] = useSearchParams();
  const ticketIdFromQuery = searchParams.get("ticketId");
  const openCommentsFromQuery = searchParams.get("openComments") === "true";

  const fetchTickets = async () => {
    try {
      setFetching(true);
      const res = await ticketsApi.getMyTickets();
      setTickets(res.data.data || []);
    } catch {
      setTickets([]);
    } finally {
      setFetching(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await bookingsApi.getMyBookings();
      setBookings(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchBookings();
  }, []);

  // Notification deep-link handling
  useEffect(() => {
    if (fetching || !ticketIdFromQuery) return;

    const ticketIdNum = Number(ticketIdFromQuery);
    if (Number.isNaN(ticketIdNum)) return;

    const target = tickets.find((t) => Number(t.id) === ticketIdNum);
    if (!target) return;

    setHighlightTicketId(ticketIdNum);

    // If comments query, open comments
    if (openCommentsFromQuery) {
      setCommentTicketId(ticketIdNum);
      setCommentOpen(true);
    } else {
      // open detail modal by default for ticket notification click
      openTicketDetails(target);
    }

    // scroll target row
    setTimeout(() => {
      rowRefs.current[ticketIdNum]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 80);

    // cleanup query + remove highlight
    const timeout = setTimeout(() => setSearchParams({}, { replace: true }), 0);
    const clearHighlight = setTimeout(() => setHighlightTicketId(null), 3500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(clearHighlight);
    };
  }, [fetching, ticketIdFromQuery, openCommentsFromQuery, tickets, setSearchParams]);

  const sortedTickets = useMemo(() => {
    const statusPriority = {
      OPEN: 1,
      IN_PROGRESS: 2,
      RESOLVED: 3,
      REJECTED: 4,
      CLOSED: 5,
    };

    return [...tickets].sort((a, b) => {
      const pa = statusPriority[a.status] || 6;
      const pb = statusPriority[b.status] || 6;
      if (pa !== pb) return pa - pb;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tickets]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files || []);
    setImages((prev) => {
      const next = [...prev, ...files];
      if (next.length > 3) {
        alert("Maximum 3 images allowed. Keeping first 3.");
        return next.slice(0, 3);
      }
      return next;
    });
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const ticketData = { ...form };

    if (form.isOther) {
      ticketData.bookingId = null;
      ticketData.resourceId = null;
    } else if (form.bookingId) {
      const selectedBooking = bookings.find((b) => b.id === Number(form.bookingId));
      ticketData.resourceId = selectedBooking?.resourceId;
    }

    const fd = new FormData();
    fd.append("ticket", new Blob([JSON.stringify(ticketData)], { type: "application/json" }));
    images.forEach((img) => fd.append("images", img));

    try {
      await ticketsApi.create(fd);
      alert("✅ Ticket created successfully!");
      setForm({
        title: "",
        description: "",
        category: "",
        priority: "MEDIUM",
        contactDetails: "",
        isOther: false,
        bookingId: "",
      });
      setImages([]);
      await fetchTickets();
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  const normalizeImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/uploads")) return img;
    if (img.startsWith("uploads")) return `/${img}`;
    return `/uploads/${img}`;
  };

  const openTicketDetails = async (ticket) => {
    // mark resolution viewed if ticket is resolved
    if (ticket.status === "RESOLVED") {
      try {
        await ticketsApi.markResolutionViewed(ticket.id);
      } catch (e) {
        console.error(e);
      }
    }
    setDetailModal({ open: true, ticket, ackLoading: false });
  };

  const closeTicketByUser = async () => {
    const t = detailModal.ticket;
    if (!t) return;

    // if already closed, nothing
    if (t.status === "CLOSED") return;

    if (!window.confirm("Are you sure you want to close this ticket?")) return;

    setDetailModal((p) => ({ ...p, ackLoading: true }));
    try {
      // uses backend acknowledge endpoint (auto-closes)
      await ticketsApi.acknowledgeResolution(t.id);
      alert("✅ Ticket closed successfully.");
      setDetailModal({ open: false, ticket: null, ackLoading: false });
      await fetchTickets();
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Failed to close ticket"));
      setDetailModal((p) => ({ ...p, ackLoading: false }));
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20";
      case "IN_PROGRESS":
        return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20";
      case "RESOLVED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20";
      case "REJECTED":
        return "bg-orange-50 text-orange-700 border-orange-200 ring-orange-500/20";
      case "CLOSED":
        return "bg-slate-50 text-slate-600 border-slate-200 ring-slate-500/20";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 p-6 md:p-0">
      <div className="flex items-center gap-4">
        <div className="p-3.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
          <Ticket className="text-white w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">Support Center</h1>
          <p className="text-slate-500 font-medium mt-0.5">
            Create tickets and manage your ticket lifecycle.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* CREATE FORM */}
        <div className="xl:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-600" />
              New Support Request
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <input
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
              required
              name="title"
              placeholder="Issue title"
              value={form.title}
              onChange={handleChange}
            />

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <input
                  type="checkbox"
                  name="isOther"
                  checked={form.isOther}
                  onChange={handleChange}
                />
                Other (not linked to booking)
              </label>

              {!form.isOther && (
                <select
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                  name="bookingId"
                  required={!form.isOther}
                  value={form.bookingId}
                  onChange={handleChange}
                >
                  <option value="">Select booking...</option>
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.resourceName} ({formatDate(b.startTime)})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <textarea
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none"
              required
              rows={3}
              name="description"
              placeholder="Describe issue..."
              value={form.description}
              onChange={handleChange}
            />

            <input
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
              required
              name="contactDetails"
              placeholder="Email or phone"
              value={form.contactDetails}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                name="category"
                required
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Category</option>
                <option value="ELECTRICAL">Electrical</option>
                <option value="PLUMBING">Plumbing</option>
                <option value="HVAC">HVAC</option>
                <option value="IT">IT</option>
                <option value="CLEANING">Cleaning</option>
                <option value="OTHER">Other</option>
              </select>

              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                name="priority"
                required
                value={form.priority}
                onChange={handleChange}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <div>
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer bg-slate-50/50">
                <ImageIcon className="w-6 h-6 text-slate-400 mb-1" />
                <p className="text-xs text-slate-500">
                  {images.length > 0 ? `${images.length} selected` : "Upload images (max 3)"}
                </p>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>

              {images.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Submit</>}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="xl:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                Your Tickets
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Click a ticket row to view images, resolution notes, and close action.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-50 border px-3 py-1.5 rounded-lg">
              {sortedTickets.length} Total
            </span>
          </div>

          <div className="overflow-x-auto">
            {fetching ? (
              <div className="p-20 text-center">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-3" />
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Loading...</p>
              </div>
            ) : sortedTickets.length === 0 ? (
              <div className="p-20 text-center text-slate-500 font-semibold">No tickets yet.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Info
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Status
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Technician
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {sortedTickets.map((t) => {
                    const isHighlighted = Number(highlightTicketId) === Number(t.id);

                    return (
                      <tr
                        key={t.id}
                        ref={(el) => {
                          rowRefs.current[t.id] = el;
                        }}
                        onClick={() => openTicketDetails(t)}
                        className={`cursor-pointer hover:bg-indigo-50/20 transition-colors ${
                          isHighlighted ? "bg-yellow-50/70 ring-2 ring-yellow-200" : ""
                        }`}
                      >
                        <td className="px-6 py-5">
                          <div className="font-bold text-slate-800 text-sm">{t.title}</div>
                          <div className="text-[11px] text-slate-500 mt-1">
                            {t.isOther ? "Other / General" : t.resourceName || "Resource"} • {formatDate(t.createdAt)}
                          </div>

                          {t.status === "REJECTED" && t.rejectionReason && (
                            <div className="mt-2 p-2 bg-orange-50 border border-orange-100 rounded-lg text-[11px] text-orange-700">
                              <Info className="w-3 h-3 inline mr-1" />
                              Rejection: {t.rejectionReason}
                            </div>
                          )}

                          {t.resolutionExplanation && (
                            <div className="mt-2 p-2 bg-emerald-50 border border-emerald-100 rounded-lg text-[11px] text-emerald-700">
                              <CheckCircle2 className="w-3 h-3 inline mr-1" />
                              Resolution note available
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-5 text-center">
                          <span
                            className={`inline-flex px-3 py-1.5 rounded-lg text-[10px] font-black border ring-1 uppercase tracking-widest ${getStatusStyle(
                              t.status
                            )}`}
                          >
                            {t.status.replace("_", " ")}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-center">
                          <span className="text-xs font-semibold text-slate-600">
                            {t.assigneeName || "Unassigned"}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => {
                                setCommentTicketId(t.id);
                                setCommentOpen(true);
                              }}
                              className="inline-flex items-center gap-2 px-3 py-2 text-indigo-600 bg-white border border-indigo-100 rounded-xl text-xs font-bold"
                            >
                              <MessageSquare className="w-4 h-4" />
                              Log
                            </button>

                            <button
                              onClick={() => openTicketDetails(t)}
                              className="inline-flex items-center gap-2 px-3 py-2 text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-bold"
                            >
                              <Eye className="w-4 h-4" />
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* TICKET DETAIL MODAL (images + resolution + close button if not CLOSED) */}
      {detailModal.open && detailModal.ticket && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-800">Ticket Details</h2>
                <p className="text-sm text-slate-500 mt-1">
                  #{detailModal.ticket.id} • {detailModal.ticket.title}
                </p>
              </div>
              <button
                onClick={() => setDetailModal({ open: false, ticket: null, ackLoading: false })}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex px-3 py-1.5 rounded-lg text-[10px] font-black border ring-1 uppercase tracking-widest ${getStatusStyle(
                    detailModal.ticket.status
                  )}`}
                >
                  {detailModal.ticket.status.replace("_", " ")}
                </span>
                <span className="inline-flex px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 border">
                  {detailModal.ticket.priority}
                </span>
              </div>

              <div className="text-sm text-slate-700 whitespace-pre-wrap">
                {detailModal.ticket.description}
              </div>

              <div className="text-xs text-slate-500">
                Technician:{" "}
                <span className="font-semibold text-slate-700">
                  {detailModal.ticket.assigneeName || "Unassigned"}
                </span>
              </div>

              {/* Resolution note if exists */}
              {detailModal.ticket.resolutionExplanation && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <p className="text-[11px] font-black text-emerald-700 uppercase tracking-widest mb-2">
                    Resolution Note
                  </p>
                  <p className="text-sm text-emerald-800 whitespace-pre-wrap">
                    {detailModal.ticket.resolutionExplanation}
                  </p>
                </div>
              )}

              {/* Ticket images */}
              <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Ticket Images
                </p>
                {detailModal.ticket.images && detailModal.ticket.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {detailModal.ticket.images.map((img, idx) => (
                      <a
                        key={idx}
                        href={normalizeImageUrl(img)}
                        target="_blank"
                        rel="noreferrer"
                        className="block"
                      >
                        <img
                          src={normalizeImageUrl(img)}
                          alt={`ticket-${detailModal.ticket.id}-img-${idx}`}
                          className="w-full h-36 object-cover rounded-xl border border-slate-200 hover:opacity-90 transition"
                        />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-400">No images attached.</div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setDetailModal({ open: false, ticket: null, ackLoading: false })}
                className="px-4 py-2.5 rounded-xl border text-slate-600 font-bold text-sm"
              >
                Close
              </button>

              {/* Show close action only if ticket is not CLOSED */}
              {detailModal.ticket.status !== "CLOSED" && (
                <button
                  onClick={closeTicketByUser}
                  disabled={detailModal.ackLoading}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm inline-flex items-center gap-2 disabled:opacity-60"
                >
                  {detailModal.ackLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  Close Ticket
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <TicketComments
        ticketId={commentTicketId}
        open={commentOpen}
        onClose={() => setCommentOpen(false)}
      />
    </div>
  );
}