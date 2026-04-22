// // import { useEffect, useState, useMemo } from "react";
// // import { useSearchParams } from "react-router-dom";
// // import { ticketsApi } from "../../api/tickets";
// // import { useAuth } from "../../context/AuthContext";
// // import TicketComments from "../TicketComments";
// // import {
// //   MessageSquare,
// //   Filter,
// //   Clock,
// //   AlertCircle,
// //   CheckCircle2,
// //   UserCheck,
// //   ClipboardList,
// //   ChevronRight,
// //   Info,
// //   Send,
// //   Loader2,
// //   X,
// // } from "lucide-react";

// // const BASE_URL = "http://localhost:8083";

// // export default function TechTickets() {
// //   const { user } = useAuth();
// //   const [tickets, setTickets] = useState([]);
// //   const [fetching, setFetching] = useState(true);
// //   const [activeTab, setActiveTab] = useState("AVAILABLE"); // AVAILABLE, MY_ACTIVE, COMPLETED

// //   const [commentOpen, setCommentOpen] = useState(false);
// //   const [commentTicketId, setCommentTicketId] = useState(null);
  
// //   const [resolveModal, setResolveModal] = useState({ open: false, ticketId: null });
// //   const [resolveForm, setResolveForm] = useState({ explanation: "", internalNotes: "" });
// //   const [submitting, setSubmitting] = useState(false);

// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const ticketIdFromQuery = searchParams.get("ticketId");

// //   useEffect(() => {
// //     fetchTickets();
// //   }, []);

// //   const fetchTickets = async () => {
// //     setFetching(true);
// //     try {
// //       const res = await ticketsApi.getAll();
// //       setTickets(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //       setTickets([]);
// //     } finally {
// //       setFetching(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!ticketIdFromQuery || !tickets.length) return;
// //     const idNum = Number(ticketIdFromQuery);
// //     const matched = tickets.find(t => t.id === idNum);
// //     if (matched) {
// //       const isAssignedToMe = Number(matched.assigneeId) === Number(user?.id);
// //       if (isAssignedToMe) setActiveTab("MY_ACTIVE");
// //       else if (!matched.assigneeId) setActiveTab("AVAILABLE");
// //       else setActiveTab("MY_ACTIVE"); // fallback
// //     }
// //   }, [ticketIdFromQuery, tickets, user?.id]);

// //   const filteredTickets = useMemo(() => {
// //     const myId = Number(user?.id);
// //     switch (activeTab) {
// //       case "AVAILABLE":
// //         return tickets.filter(t => !t.assigneeId && t.status === "OPEN");
// //       case "MY_ACTIVE":
// //         return tickets.filter(t => Number(t.assigneeId) === myId && (t.status === "IN_PROGRESS" || t.status === "OPEN"));
// //       case "COMPLETED":
// //         return tickets.filter(t => Number(t.assigneeId) === myId && (t.status === "RESOLVED" || t.status === "CLOSED"));
// //       default:
// //         return [];
// //     }
// //   }, [tickets, activeTab, user?.id]);

// //   const handleTake = async (id) => {
// //     if (!window.confirm("Do you want to take responsibility for this ticket?")) return;
// //     try {
// //       await ticketsApi.takeResponsibility(id);
// //       alert("✅ Ticket assigned to you!");
// //       fetchTickets();
// //       setActiveTab("MY_ACTIVE");
// //     } catch (err) {
// //       alert("❌ " + (err.response?.data?.message || "Failed to take ticket"));
// //     }
// //   };

// //   const handleResolve = async (e) => {
// //     e.preventDefault();
// //     setSubmitting(true);
// //     try {
// //       await ticketsApi.resolve(resolveModal.ticketId, resolveForm.explanation, resolveForm.internalNotes);
// //       alert("✅ Ticket marked as RESOLVED!");
// //       setResolveModal({ open: false, ticketId: null });
// //       setResolveForm({ explanation: "", internalNotes: "" });
// //       fetchTickets();
// //       setActiveTab("COMPLETED");
// //     } catch (err) {
// //       alert("❌ " + (err.response?.data?.message || "Failed to resolve ticket"));
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const getPriorityStyle = (p) => {
// //     switch (p) {
// //       case "CRITICAL": return "bg-rose-500 text-white";
// //       case "HIGH": return "bg-orange-500 text-white";
// //       case "MEDIUM": return "bg-blue-500 text-white";
// //       default: return "bg-slate-400 text-white";
// //     }
// //   };

// //   return (
// //     <div className="max-w-6xl mx-auto pb-20 p-6 md:p-0">
// //       {/* HEADER */}
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
// //         <div className="flex items-center gap-4">
// //           <div className="p-3.5 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-100 flex items-center justify-center">
// //             <ClipboardList className="text-white w-7 h-7" />
// //           </div>
// //           <div>
// //             <h1 className="text-3xl font-black text-slate-900 tracking-tight">Technician Dashboard</h1>
// //             <p className="text-slate-500 font-medium mt-0.5">Manage and resolve maintenance requests.</p>
// //           </div>
// //         </div>

// //         {/* TABS */}
// //         <div className="flex p-1.5 bg-slate-100 rounded-2xl w-full md:w-auto">
// //           {[
// //             { id: "AVAILABLE", label: "Available", icon: ClipboardList },
// //             { id: "MY_ACTIVE", label: "My Active", icon: UserCheck },
// //             { id: "COMPLETED", label: "History", icon: CheckCircle2 },
// //           ].map((tab) => (
// //             <button
// //               key={tab.id}
// //               onClick={() => setActiveTab(tab.id)}
// //               className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
// //                 activeTab === tab.id
// //                   ? "bg-white text-emerald-600 shadow-sm"
// //                   : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
// //               }`}
// //             >
// //               <tab.icon className="w-4 h-4" />
// //               {tab.label}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* TICKETS LIST */}
// //       <div className="space-y-6">
// //         {fetching ? (
// //           <div className="py-20 text-center animate-pulse">
// //             <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
// //             </div>
// //             <p className="text-slate-500 font-black tracking-widest uppercase text-xs">Syncing Tasks...</p>
// //           </div>
// //         ) : filteredTickets.length === 0 ? (
// //           <div className="py-24 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
// //             <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
// //               <CheckCircle2 className="w-10 h-10 text-slate-200" />
// //             </div>
// //             <h3 className="text-xl font-bold text-slate-800">No tickets found</h3>
// //             <p className="text-slate-400 font-medium mt-1">
// //               {activeTab === "AVAILABLE" ? "All quiet! Check back later for new requests." : "You don't have any tickets in this category."}
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //             {filteredTickets.map((t) => (
// //               <div key={t.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all group overflow-hidden flex flex-col">
// //                 <div className="p-6 md:p-8 flex-1">
// //                   <div className="flex justify-between items-start mb-6">
// //                     <div className="flex gap-2">
// //                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getPriorityStyle(t.priority)}`}>
// //                          {t.priority}
// //                        </span>
// //                        <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 border border-slate-200">
// //                          {t.category}
// //                        </span>
// //                     </div>
// //                     <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px]">
// //                        <Clock className="w-3.5 h-3.5" />
// //                        {new Date(t.createdAt).toLocaleDateString()}
// //                     </div>
// //                   </div>

// //                   <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
// //                     {t.title}
// //                   </h3>
                  
// //                   <div className="flex items-center gap-2 mb-4">
// //                      <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-xl text-[11px] font-black text-indigo-600 flex items-center gap-2">
// //                         <Info className="w-3.5 h-3.5" />
// //                         {t.isOther ? "General Issue" : t.resourceName}
// //                      </div>
// //                   </div>

// //                   <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
// //                     {t.description}
// //                   </p>

// //                   {/* IMAGES */}
// //                   {t.images && t.images.length > 0 && (
// //                     <div className="flex gap-2 mb-6">
// //                        {t.images.map((img, idx) => (
// //                          <img 
// //                            key={idx} 
// //                            src={img.startsWith("http") ? img : img.startsWith("/") ? img : `/${img}`} 
// //                            className="w-14 h-14 object-cover rounded-xl border border-slate-100 shadow-sm"
// //                            alt="evidence"
// //                          />
// //                        ))}
// //                     </div>
// //                   )}

// //                   <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
// //                     <div className="flex items-center gap-3">
// //                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500 border-2 border-white shadow-sm overflow-hidden">
// //                           {t.reporterName?.charAt(0)}
// //                        </div>
// //                        <div>
// //                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Reporter</p>
// //                           <p className="text-xs font-bold text-slate-700">{t.reporterName}</p>
// //                        </div>
// //                     </div>

// //                     <div className="flex items-center gap-2">
// //                        <button 
// //                          onClick={() => {
// //                            setCommentTicketId(t.id);
// //                            setCommentOpen(true);
// //                          }}
// //                          className="p-3 bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-2xl transition-all border border-transparent hover:border-emerald-100"
// //                          title="Comments"
// //                        >
// //                          <MessageSquare className="w-5 h-5" />
// //                        </button>

// //                        {activeTab === "AVAILABLE" ? (
// //                          <button 
// //                            onClick={() => handleTake(t.id)}
// //                            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
// //                          >
// //                            Take Ticket <ChevronRight className="w-4 h-4" />
// //                          </button>
// //                        ) : activeTab === "MY_ACTIVE" ? (
// //                          <button 
// //                            onClick={() => setResolveModal({ open: true, ticketId: t.id })}
// //                            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
// //                          >
// //                            Mark Resolved <CheckCircle2 className="w-4 h-4" />
// //                          </button>
// //                        ) : (
// //                          <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest">
// //                             <CheckCircle2 className="w-4 h-4" /> {t.status}
// //                          </div>
// //                        )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* RESOLVE MODAL */}
// //       {resolveModal.open && (
// //         <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
// //            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
// //               <div className="flex justify-between items-center mb-6">
// //                  <h2 className="text-2xl font-black text-slate-800">Resolve Ticket</h2>
// //                  <button onClick={() => setResolveModal({ open: false, ticketId: null })} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all">
// //                     <X className="w-5 h-5" />
// //                  </button>
// //               </div>

// //               <form onSubmit={handleResolve} className="space-y-6">
// //                  <div className="space-y-2">
// //                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Resolution Explanation</label>
// //                     <textarea 
// //                       required
// //                       className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none text-sm font-medium leading-relaxed"
// //                       placeholder="What was the fix? (This will be visible to the user)"
// //                       rows={4}
// //                       value={resolveForm.explanation}
// //                       onChange={e => setResolveForm({ ...resolveForm, explanation: e.target.value })}
// //                     />
// //                  </div>

// //                  <div className="space-y-2">
// //                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">Internal Notes (Optional)</label>
// //                     <textarea 
// //                       className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none text-sm font-medium leading-relaxed"
// //                       placeholder="Technical details for other staff..."
// //                       rows={2}
// //                       value={resolveForm.internalNotes}
// //                       onChange={e => setResolveForm({ ...resolveForm, internalNotes: e.target.value })}
// //                     />
// //                  </div>

// //                  <button 
// //                    type="submit" 
// //                    disabled={submitting}
// //                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:bg-slate-300 disabled:shadow-none"
// //                  >
// //                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Confirm Resolution</>}
// //                  </button>
// //               </form>
// //            </div>
// //         </div>
// //       )}

// //       {/* COMMENTS MODAL */}
// //       <TicketComments
// //         ticketId={commentTicketId}
// //         open={commentOpen}
// //         onClose={() => setCommentOpen(false)}
// //         currentUserName={user?.name}
// //       />
// //     </div>
// //   );
// // }


// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { ticketsApi } from "../../api/tickets";
// import { useAuth } from "../../context/AuthContext";
// import TicketComments from "../TicketComments";
// import {
//   MessageSquare,
//   Clock,
//   CheckCircle2,
//   UserCheck,
//   ClipboardList,
//   ChevronRight,
//   Info,
//   Loader2,
//   X,
//   ArrowRightCircle,
// } from "lucide-react";

// export default function TechTickets() {
//   const { user } = useAuth();
//   const [tickets, setTickets] = useState([]);
//   const [fetching, setFetching] = useState(true);

//   // AVAILABLE | MY_ACTIVE | RESOLVED_HISTORY | CLOSED_HISTORY
//   const [activeTab, setActiveTab] = useState("AVAILABLE");

//   const [commentOpen, setCommentOpen] = useState(false);
//   const [commentTicketId, setCommentTicketId] = useState(null);

//   const [resolveModal, setResolveModal] = useState({ open: false, ticketId: null });
//   const [resolveForm, setResolveForm] = useState({ explanation: "", internalNotes: "" });

//   const [submitting, setSubmitting] = useState(false);

//   const [searchParams] = useSearchParams();
//   const ticketIdFromQuery = searchParams.get("ticketId");

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const fetchTickets = async () => {
//     setFetching(true);
//     try {
//       const res = await ticketsApi.getAll();
//       setTickets(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       setTickets([]);
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     if (!ticketIdFromQuery || !tickets.length) return;
//     const idNum = Number(ticketIdFromQuery);
//     const t = tickets.find((x) => Number(x.id) === idNum);
//     if (!t) return;

//     if (!t.assigneeId && t.status === "OPEN") setActiveTab("AVAILABLE");
//     else if (Number(t.assigneeId) === Number(user?.id) && t.status === "IN_PROGRESS")
//       setActiveTab("MY_ACTIVE");
//     else if (Number(t.assigneeId) === Number(user?.id) && t.status === "RESOLVED")
//       setActiveTab("RESOLVED_HISTORY");
//     else if (Number(t.assigneeId) === Number(user?.id) && t.status === "CLOSED")
//       setActiveTab("CLOSED_HISTORY");
//   }, [ticketIdFromQuery, tickets, user?.id]);

//   const filteredTickets = useMemo(() => {
//     const myId = Number(user?.id);
//     switch (activeTab) {
//       case "AVAILABLE":
//         return tickets.filter((t) => !t.assigneeId && t.status === "OPEN");
//       case "MY_ACTIVE":
//         return tickets.filter(
//           (t) => Number(t.assigneeId) === myId && t.status === "IN_PROGRESS"
//         );
//       case "RESOLVED_HISTORY":
//         return tickets.filter(
//           (t) => Number(t.assigneeId) === myId && t.status === "RESOLVED"
//         );
//       case "CLOSED_HISTORY":
//         return tickets.filter(
//           (t) => Number(t.assigneeId) === myId && t.status === "CLOSED"
//         );
//       default:
//         return [];
//     }
//   }, [tickets, activeTab, user?.id]);

//   const handleTake = async (id) => {
//     if (!window.confirm("Take responsibility for this ticket?")) return;
//     try {
//       await ticketsApi.takeResponsibility(id); // OPEN -> IN_PROGRESS
//       alert("✅ Ticket assigned to you and moved to IN_PROGRESS.");
//       await fetchTickets();
//       setActiveTab("MY_ACTIVE");
//     } catch (err) {
//       alert("❌ " + (err.response?.data?.message || "Failed to take ticket"));
//     }
//   };

//   // strictly IN_PROGRESS -> RESOLVED via /resolve with mandatory note
//   const handleResolve = async (e) => {
//     e.preventDefault();
//     if (!resolveForm.explanation.trim()) {
//       alert("Resolution explanation is required.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       await ticketsApi.resolve(
//         resolveModal.ticketId,
//         resolveForm.explanation.trim(),
//         resolveForm.internalNotes.trim() || null
//       );
//       alert("✅ Ticket moved to RESOLVED.");
//       setResolveModal({ open: false, ticketId: null });
//       setResolveForm({ explanation: "", internalNotes: "" });
//       await fetchTickets();
//       setActiveTab("RESOLVED_HISTORY");
//     } catch (err) {
//       alert("❌ " + (err.response?.data?.message || "Failed to resolve ticket"));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // optional manual close for technician (if your backend allows assigned tech RESOLVED -> CLOSED)
//   const handleClose = async (id) => {
//     if (!window.confirm("Close this RESOLVED ticket now?")) return;
//     try {
//       await ticketsApi.updateStatus(id, "CLOSED");
//       alert("✅ Ticket moved to CLOSED.");
//       await fetchTickets();
//       setActiveTab("CLOSED_HISTORY");
//     } catch (err) {
//       alert("❌ " + (err.response?.data?.message || "Cannot close this ticket"));
//     }
//   };

//   const getPriorityStyle = (p) => {
//     switch (p) {
//       case "CRITICAL":
//         return "bg-rose-500 text-white";
//       case "HIGH":
//         return "bg-orange-500 text-white";
//       case "MEDIUM":
//         return "bg-blue-500 text-white";
//       default:
//         return "bg-slate-400 text-white";
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto pb-20 p-6 md:p-0">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
//         <div className="flex items-center gap-4">
//           <div className="p-3.5 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-100">
//             <ClipboardList className="text-white w-7 h-7" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-black text-slate-900">Technician Dashboard</h1>
//             <p className="text-slate-500 font-medium mt-0.5">
//               Assigned lifecycle: IN_PROGRESS → RESOLVED → CLOSED
//             </p>
//           </div>
//         </div>

//         <div className="flex p-1.5 bg-slate-100 rounded-2xl w-full md:w-auto flex-wrap">
//           {[
//             { id: "AVAILABLE", label: "Available", icon: ClipboardList },
//             { id: "MY_ACTIVE", label: "My Active", icon: UserCheck },
//             { id: "RESOLVED_HISTORY", label: "Resolved", icon: CheckCircle2 },
//             { id: "CLOSED_HISTORY", label: "Closed", icon: CheckCircle2 },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
//                 activeTab === tab.id
//                   ? "bg-white text-emerald-600 shadow-sm"
//                   : "text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               <tab.icon className="w-4 h-4" />
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {fetching ? (
//         <div className="py-20 text-center">
//           <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto mb-3" />
//           <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
//             Syncing tickets...
//           </p>
//         </div>
//       ) : filteredTickets.length === 0 ? (
//         <div className="py-24 text-center bg-white rounded-3xl border border-slate-200">
//           <p className="text-slate-500 font-bold">No tickets in this tab.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {filteredTickets.map((t) => (
//             <div
//               key={t.id}
//               className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-5">
//                   <div className="flex gap-2">
//                     <span
//                       className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getPriorityStyle(
//                         t.priority
//                       )}`}
//                     >
//                       {t.priority}
//                     </span>
//                     <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 border">
//                       {t.status}
//                     </span>
//                   </div>
//                   <div className="text-xs text-slate-400 font-bold">
//                     {new Date(t.createdAt).toLocaleDateString()}
//                   </div>
//                 </div>

//                 <h3 className="text-lg font-black text-slate-800 mb-2">{t.title}</h3>
//                 <p className="text-sm text-slate-500 line-clamp-2 mb-4">{t.description}</p>

//                 <div className="mb-3 text-xs text-slate-600 font-semibold">
//                   Assigned Technician:{" "}
//                   <span className="font-black">{t.assigneeName || "Unassigned"}</span>
//                 </div>

//                 {t.resolutionExplanation && (
//                   <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
//                     <p className="text-[11px] font-black text-emerald-700 uppercase tracking-wider mb-1">
//                       Resolution Note
//                     </p>
//                     <p className="text-sm text-emerald-800">{t.resolutionExplanation}</p>
//                   </div>
//                 )}

//                 {t.images?.length > 0 && (
//                   <div className="flex gap-2 mb-5">
//                     {t.images.slice(0, 3).map((img, idx) => (
//                       <img
//                         key={idx}
//                         src={
//                           img?.startsWith("http")
//                             ? img
//                             : img?.startsWith("/uploads")
//                             ? img
//                             : img?.startsWith("uploads")
//                             ? `/${img}`
//                             : `/uploads/${img}`
//                         }
//                         className="w-14 h-14 object-cover rounded-xl border"
//                         alt="evidence"
//                       />
//                     ))}
//                   </div>
//                 )}

//                 <div className="flex justify-between items-center pt-4 border-t border-slate-100">
//                   <button
//                     onClick={() => {
//                       setCommentTicketId(t.id);
//                       setCommentOpen(true);
//                     }}
//                     className="p-2.5 rounded-xl border text-slate-500 hover:text-emerald-600 hover:border-emerald-200"
//                     title="Comments"
//                   >
//                     <MessageSquare className="w-4 h-4" />
//                   </button>

//                   <div className="flex gap-2">
//                     {activeTab === "AVAILABLE" && (
//                       <button
//                         onClick={() => handleTake(t.id)}
//                         className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black hover:bg-emerald-700 flex items-center gap-1"
//                       >
//                         Take <ChevronRight className="w-4 h-4" />
//                       </button>
//                     )}

//                     {activeTab === "MY_ACTIVE" && (
//                       <button
//                         onClick={() => setResolveModal({ open: true, ticketId: t.id })}
//                         className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 flex items-center gap-1"
//                       >
//                         Resolve <CheckCircle2 className="w-4 h-4" />
//                       </button>
//                     )}

//                     {activeTab === "RESOLVED_HISTORY" && (
//                       <button
//                         onClick={() => handleClose(t.id)}
//                         className="px-4 py-2.5 rounded-xl bg-slate-700 text-white text-xs font-black hover:bg-slate-800 flex items-center gap-1"
//                       >
//                         Close <ArrowRightCircle className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {resolveModal.open && (
//         <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-black text-slate-800">Resolve Ticket</h2>
//               <button
//                 onClick={() => setResolveModal({ open: false, ticketId: null })}
//                 className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <form onSubmit={handleResolve} className="space-y-5">
//               <div>
//                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">
//                   Resolution Explanation (Required)
//                 </label>
//                 <textarea
//                   required
//                   rows={4}
//                   className="mt-2 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
//                   placeholder="Explain what was fixed..."
//                   value={resolveForm.explanation}
//                   onChange={(e) =>
//                     setResolveForm((p) => ({ ...p, explanation: e.target.value }))
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">
//                   Internal Notes (Optional)
//                 </label>
//                 <textarea
//                   rows={2}
//                   className="mt-2 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
//                   placeholder="Optional notes for internal team..."
//                   value={resolveForm.internalNotes}
//                   onChange={(e) =>
//                     setResolveForm((p) => ({ ...p, internalNotes: e.target.value }))
//                   }
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl flex justify-center items-center gap-2"
//               >
//                 {submitting ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <>
//                     <CheckCircle2 className="w-5 h-5" /> Confirm RESOLVED
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       <TicketComments
//         ticketId={commentTicketId}
//         open={commentOpen}
//         onClose={() => setCommentOpen(false)}
//         currentUserName={user?.name}
//       />
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ticketsApi } from "../../api/tickets";
import { useAuth } from "../../context/AuthContext";
import TicketComments from "../TicketComments";
import {
  MessageSquare,
  CheckCircle2,
  UserCheck,
  ClipboardList,
  ChevronRight,
  Loader2,
  X,
  ArrowRightCircle,
  RefreshCcw,
} from "lucide-react";

/**
 * Workflow used:
 * OPEN -> IN_PROGRESS -> RESOLVED -> CLOSED
 *
 * UI behavior:
 * - AVAILABLE tab: OPEN + unassigned (technician can "Take" => IN_PROGRESS)
 * - MY_ACTIVE tab: assigned to me + IN_PROGRESS (technician can "Resolve", must provide message)
 * - RESOLVED tab: assigned to me + RESOLVED (technician can "Close")
 * - CLOSED tab: assigned to me + CLOSED
 */
export default function TechTickets() {
  const { user } = useAuth();
  const myId = Number(user?.id);

  const [tickets, setTickets] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("AVAILABLE");

  const [commentOpen, setCommentOpen] = useState(false);
  const [commentTicketId, setCommentTicketId] = useState(null);

  const [resolveModal, setResolveModal] = useState({ open: false, ticketId: null });
  const [resolveForm, setResolveForm] = useState({ explanation: "", internalNotes: "" });

  const [submitting, setSubmitting] = useState(false);

  const [searchParams] = useSearchParams();
  const ticketIdFromQuery = searchParams.get("ticketId");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setFetching(true);
    try {
      const res = await ticketsApi.getAll();
      setTickets(res?.data?.data || []);
    } catch (err) {
      console.error(err);
      setTickets([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!ticketIdFromQuery || !tickets.length) return;
    const idNum = Number(ticketIdFromQuery);
    const t = tickets.find((x) => Number(x.id) === idNum);
    if (!t) return;

    if (!t.assigneeId && t.status === "OPEN") {
      setActiveTab("AVAILABLE");
      return;
    }

    if (Number(t.assigneeId) === myId) {
      if (t.status === "IN_PROGRESS") setActiveTab("MY_ACTIVE");
      else if (t.status === "RESOLVED") setActiveTab("RESOLVED");
      else if (t.status === "CLOSED") setActiveTab("CLOSED");
    }
  }, [ticketIdFromQuery, tickets, myId]);

  const filteredTickets = useMemo(() => {
    switch (activeTab) {
      case "AVAILABLE":
        return tickets.filter((t) => !t.assigneeId && t.status === "OPEN");
      case "MY_ACTIVE":
        return tickets.filter(
          (t) => Number(t.assigneeId) === myId && t.status === "IN_PROGRESS"
        );
      case "RESOLVED":
        return tickets.filter(
          (t) => Number(t.assigneeId) === myId && t.status === "RESOLVED"
        );
      case "CLOSED":
        return tickets.filter(
          (t) => Number(t.assigneeId) === myId && t.status === "CLOSED"
        );
      default:
        return [];
    }
  }, [tickets, activeTab, myId]);

  const handleTake = async (id) => {
    if (!window.confirm("Take responsibility for this ticket?")) return;
    try {
      // Expected backend behavior: OPEN -> IN_PROGRESS
      await ticketsApi.takeResponsibility(id);
      alert("✅ Ticket assigned to you and moved to IN_PROGRESS.");
      await fetchTickets();
      setActiveTab("MY_ACTIVE");
    } catch (err) {
      alert("❌ " + (err?.response?.data?.message || "Failed to take ticket"));
    }
  };

  /**
   * IMPORTANT:
   * Resolution message is mandatory at RESOLVED stage.
   * This uses /tickets/{id}/resolve with explanation.
   */
  const handleResolve = async (e) => {
    e.preventDefault();
    const explanation = resolveForm.explanation.trim();
    if (!explanation) {
      alert("Resolution explanation is required.");
      return;
    }

    setSubmitting(true);
    try {
      await ticketsApi.resolve(
        resolveModal.ticketId,
        explanation,
        resolveForm.internalNotes?.trim() || null
      );

      alert("✅ Ticket moved to RESOLVED.");
      setResolveModal({ open: false, ticketId: null });
      setResolveForm({ explanation: "", internalNotes: "" });

      await fetchTickets();
      setActiveTab("RESOLVED");
    } catch (err) {
      alert("❌ " + (err?.response?.data?.message || "Failed to resolve ticket"));
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * RESOLVED -> CLOSED (sequential)
   */
  const handleClose = async (id) => {
    if (!window.confirm("Close this RESOLVED ticket now?")) return;

    try {
      await ticketsApi.updateStatus(id, "CLOSED");
      alert("✅ Ticket moved to CLOSED.");
      await fetchTickets();
      setActiveTab("CLOSED");
    } catch (err) {
      alert("❌ " + (err?.response?.data?.message || "Cannot close this ticket"));
    }
  };

  const getPriorityStyle = (p) => {
    switch (p) {
      case "CRITICAL":
        return "bg-rose-500 text-white";
      case "HIGH":
        return "bg-orange-500 text-white";
      case "MEDIUM":
        return "bg-blue-500 text-white";
      default:
        return "bg-slate-400 text-white";
    }
  };

  const prettyStatus = (s) => String(s || "").replace("_", " ");

  return (
    <div className="max-w-6xl mx-auto pb-20 p-6 md:p-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-100">
            <ClipboardList className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Technician Dashboard</h1>
            <p className="text-slate-500 font-medium mt-0.5">
              Workflow: OPEN → IN_PROGRESS → RESOLVED → CLOSED
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={fetchTickets}
            className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            title="Refresh"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>

          <div className="flex p-1.5 bg-slate-100 rounded-2xl w-full md:w-auto flex-wrap">
            {[
              { id: "AVAILABLE", label: "Available", icon: ClipboardList },
              { id: "MY_ACTIVE", label: "My Active", icon: UserCheck },
              { id: "RESOLVED", label: "Resolved", icon: CheckCircle2 },
              { id: "CLOSED", label: "Closed", icon: CheckCircle2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {fetching ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto mb-3" />
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
            Syncing tickets...
          </p>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="py-24 text-center bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-500 font-bold">No tickets in this tab.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTickets.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getPriorityStyle(
                        t.priority
                      )}`}
                    >
                      {t.priority}
                    </span>
                    <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 border">
                      {prettyStatus(t.status)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-bold">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-800 mb-2">{t.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{t.description}</p>

                <div className="mb-3 text-xs text-slate-600 font-semibold">
                  Assigned Technician:{" "}
                  <span className="font-black">{t.assigneeName || "Unassigned"}</span>
                </div>

                {t.resolutionExplanation && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <p className="text-[11px] font-black text-emerald-700 uppercase tracking-wider mb-1">
                      Resolution Note
                    </p>
                    <p className="text-sm text-emerald-800">{t.resolutionExplanation}</p>
                  </div>
                )}

                {t.images?.length > 0 && (
                  <div className="flex gap-2 mb-5">
                    {t.images.slice(0, 3).map((img, idx) => (
                      <img
                        key={idx}
                        src={
                          img?.startsWith("http")
                            ? img
                            : img?.startsWith("/uploads")
                            ? img
                            : img?.startsWith("uploads")
                            ? `/${img}`
                            : `/uploads/${img}`
                        }
                        className="w-14 h-14 object-cover rounded-xl border"
                        alt="evidence"
                      />
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setCommentTicketId(t.id);
                      setCommentOpen(true);
                    }}
                    className="p-2.5 rounded-xl border text-slate-500 hover:text-emerald-600 hover:border-emerald-200"
                    title="Comments"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  <div className="flex gap-2">
                    {activeTab === "AVAILABLE" && (
                      <button
                        onClick={() => handleTake(t.id)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black hover:bg-emerald-700 flex items-center gap-1"
                      >
                        Take <ChevronRight className="w-4 h-4" />
                      </button>
                    )}

                    {activeTab === "MY_ACTIVE" && (
                      <button
                        onClick={() => setResolveModal({ open: true, ticketId: t.id })}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 flex items-center gap-1"
                      >
                        Resolve <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}

                    {activeTab === "RESOLVED" && (
                      <button
                        onClick={() => handleClose(t.id)}
                        className="px-4 py-2.5 rounded-xl bg-slate-700 text-white text-xs font-black hover:bg-slate-800 flex items-center gap-1"
                      >
                        Close <ArrowRightCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resolve Modal: mandatory message */}
      {resolveModal.open && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-800">Resolve Ticket</h2>
              <button
                onClick={() => setResolveModal({ open: false, ticketId: null })}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResolve} className="space-y-5">
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">
                  Resolution Message (Required)
                </label>
                <textarea
                  required
                  rows={4}
                  className="mt-2 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Describe exactly what you fixed..."
                  value={resolveForm.explanation}
                  onChange={(e) =>
                    setResolveForm((p) => ({ ...p, explanation: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">
                  Internal Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  className="mt-2 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Optional technical notes..."
                  value={resolveForm.internalNotes}
                  onChange={(e) =>
                    setResolveForm((p) => ({ ...p, internalNotes: e.target.value }))
                  }
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl flex justify-center items-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> Move to RESOLVED
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <TicketComments
        ticketId={commentTicketId}
        open={commentOpen}
        onClose={() => setCommentOpen(false)}
        currentUserName={user?.name}
      />
    </div>
  );
}