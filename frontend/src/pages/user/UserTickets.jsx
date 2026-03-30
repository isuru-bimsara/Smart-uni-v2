

// //frontend/src/pages/user/UserTickets.jsx
// import { useState, useEffect } from 'react';
// import { ticketsApi } from '../../api/tickets';
// import { 
//   PlusCircle, 
//   Ticket, 
//   MessageSquare, 
//   Layers, 
//   AlertCircle, 
//   Image as ImageIcon, 
//   Send,
//   Loader2,
//   Clock
// } from 'lucide-react';

// export default function UserTickets() {
//   const [tickets, setTickets] = useState([]);
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     category: '',
//     priority: ''
//   });
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchTickets = async () => {
//     try {
//       const res = await ticketsApi.getMyTickets();
//       setTickets(res.data.data || []);
//     } catch {
//       setTickets([]);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   function handleImageChange(e) {
//     setImages(Array.from(e.target.files));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     const fd = new FormData();
//     fd.append('ticket', new Blob([JSON.stringify(form)], { type: 'application/json' }));
//     for (let i = 0; i < images.length; i++) {
//       fd.append('images', images[i]);
//     }
//     try {
//       await ticketsApi.create(fd);
//       alert('✅ Ticket created!');
//       setForm({ title: '', description: '', category: '', priority: '' });
//       setImages([]);
//       fetchTickets();
//     } catch (err) {
//       alert('❌ ' + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Helper for Status Badge Colors
//   const getStatusStyle = (status) => {
//     const map = {
//       'OPEN': 'bg-emerald-50 text-emerald-700 border-emerald-100',
//       'PENDING': 'bg-amber-50 text-amber-700 border-amber-100',
//       'CLOSED': 'bg-slate-100 text-slate-600 border-slate-200',
//     };
//     return map[status] || 'bg-blue-50 text-blue-700 border-blue-100';
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-10 pb-20">
      
//       {/* HEADER */}
//       <div className="flex items-center gap-3">
//         <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
//           <Ticket className="text-white w-6 h-6" />
//         </div>
//         <div>
//           <h1 className="text-3xl font-black text-slate-800 tracking-tight">Support Tickets</h1>
//           <p className="text-slate-500 font-medium">Report issues or request maintenance for resources.</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
//         {/* LEFT: CREATE TICKET FORM */}
//         <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
//           <div className="p-6 border-b border-slate-50 bg-slate-50/50">
//             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//               <PlusCircle className="w-5 h-5 text-indigo-600" />
//               New Support Request
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-5">
//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Subject</label>
//               <input
//                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
//                 required
//                 name="title"
//                 placeholder="Brief summary of the issue"
//                 value={form.title}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Details</label>
//               <textarea
//                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
//                 required
//                 name="description"
//                 placeholder="Describe the problem in detail..."
//                 rows={4}
//                 value={form.description}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Category</label>
//                 <div className="relative">
//                   <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                   <select
//                     className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
//                     name="category"
//                     value={form.category}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Category</option>
//                     <option value="ELECTRICAL">Electrical</option>
//                     <option value="PLUMBING">Plumbing</option>
//                     <option value="HVAC">HVAC</option>
//                     <option value="IT">IT</option>
//                     <option value="CLEANING">Cleaning</option>
//                     <option value="OTHER">Other</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Priority</label>
//                 <div className="relative">
//                   <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                   <select
//                     className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
//                     name="priority"
//                     value={form.priority}
//                     onChange={handleChange}
//                   >
//                     <option value="">Priority Level</option>
//                     <option value="LOW">Low</option>
//                     <option value="MEDIUM">Medium</option>
//                     <option value="HIGH">High</option>
//                     <option value="CRITICAL">Critical</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Attachments (Max 3)</label>
//               <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-indigo-300 transition-all">
//                 <div className="flex flex-col items-center justify-center pt-2">
//                   <ImageIcon className="w-6 h-6 text-slate-400 mb-1" />
//                   <p className="text-xs text-slate-500">
//                     {images.length > 0 ? `${images.length} file(s) selected` : "Upload photos of the issue"}
//                   </p>
//                 </div>
//                 <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:bg-slate-300"
//             >
//               {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Submit Request</>}
//             </button>
//           </form>
//         </div>

//         {/* RIGHT: TICKET LIST */}
//         <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-fit">
//           <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
//             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//               <MessageSquare className="w-5 h-5 text-indigo-600" />
//               Your Ticket History
//             </h3>
//           </div>

//           <div className="overflow-x-auto">
//             {tickets.length === 0 ? (
//               <div className="p-16 text-center">
//                 <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                    <Clock className="w-8 h-8 text-slate-300" />
//                 </div>
//                 <p className="text-slate-500 font-bold">No tickets found</p>
//                 <p className="text-slate-400 text-sm">Your submitted requests will appear here.</p>
//               </div>
//             ) : (
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="bg-slate-50/50">
//                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Request Info</th>
//                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
//                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Evidence</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100">
//                   {tickets.map(t => (
//                     <tr key={t.id} className="hover:bg-slate-50/30 transition-colors">
//                       <td className="px-6 py-5">
//                         <div className="font-bold text-slate-800 mb-1">{t.title}</div>
//                         <div className="flex items-center gap-2">
//                           <span className={`w-2 h-2 rounded-full ${t.priority === 'CRITICAL' ? 'bg-rose-500' : t.priority === 'HIGH' ? 'bg-orange-400' : 'bg-blue-400'}`}></span>
//                           <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">{t.priority} PRIORITY</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-5 text-center">
//                         <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusStyle(t.status)}`}>
//                           {t.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-5">
//                         {t.images && t.images.length > 0 ? (
//                           <div className="flex -space-x-3 overflow-hidden">
//                             {t.images.slice(0, 3).map((img, idx) => (
//                               <img
//                                 key={idx}
//                                 src={img.startsWith('http') ? img : `/${img}`}
//                                 alt="Attachment"
//                                 className="inline-block h-10 w-10 rounded-xl ring-4 ring-white object-cover shadow-sm"
//                               />
//                             ))}
//                           </div>
//                         ) : (
//                           <span className="text-xs font-medium text-slate-300 italic">No attachments</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { ticketsApi } from '../../api/tickets';
import TicketComments from '../TicketComments';
import { 
  PlusCircle, 
  Ticket, 
  MessageSquare, 
  Layers, 
  AlertCircle, 
  Image as ImageIcon, 
  Send,
  Loader2,
  Clock
} from 'lucide-react';

export default function UserTickets() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Comments state
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentTicketId, setCommentTicketId] = useState(null);

  const fetchTickets = async () => {
    try {
      const res = await ticketsApi.getMyTickets();
      setTickets(res.data.data || []);
    } catch {
      setTickets([]);
    }
  };

  useEffect(() => { fetchTickets(); }, []);

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function handleImageChange(e) { setImages(Array.from(e.target.files)); }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append('ticket', new Blob([JSON.stringify(form)], { type: 'application/json' }));
    for (let i = 0; i < images.length; i++) { fd.append('images', images[i]); }
    try {
      await ticketsApi.create(fd);
      alert('✅ Ticket created!');
      setForm({ title: '', description: '', category: '', priority: '' });
      setImages([]);
      fetchTickets();
    } catch (err) {
      alert('❌ ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  const getStatusStyle = (status) => {
    const map = {
      'OPEN': 'bg-emerald-50 text-emerald-700 border-emerald-100',
      'PENDING': 'bg-amber-50 text-amber-700 border-amber-100',
      'CLOSED': 'bg-slate-100 text-slate-600 border-slate-200',
    };
    return map[status] || 'bg-blue-50 text-blue-700 border-blue-100';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
          <Ticket className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Support Tickets</h1>
          <p className="text-slate-500 font-medium">Report issues or request maintenance for resources.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: CREATE TICKET FORM */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-600" />
              New Support Request
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Subject</label>
              <input
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                required
                name="title"
                placeholder="Brief summary of the issue"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Details</label>
              <textarea
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                required
                name="description"
                placeholder="Describe the problem in detail..."
                rows={4}
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Category</label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="ELECTRICAL">Electrical</option>
                    <option value="PLUMBING">Plumbing</option>
                    <option value="HVAC">HVAC</option>
                    <option value="IT">IT</option>
                    <option value="CLEANING">Cleaning</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Priority</label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option value="">Priority Level</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Attachments (Max 3)</label>
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-indigo-300 transition-all">
                <div className="flex flex-col items-center justify-center pt-2">
                  <ImageIcon className="w-6 h-6 text-slate-400 mb-1" />
                  <p className="text-xs text-slate-500">
                    {images.length > 0 ? `${images.length} file(s) selected` : "Upload photos of the issue"}
                  </p>
                </div>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:bg-slate-300"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Submit Request</>}
            </button>
          </form>
        </div>
        {/* Ticket Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              Your Ticket History
            </h3>
          </div>
          <div className="overflow-x-auto">
            {tickets.length === 0 ? (
              <div className="p-16 text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Clock className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500 font-bold">No tickets found</p>
                <p className="text-slate-400 text-sm">Your submitted requests will appear here.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Request Info</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Evidence</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Messages</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-800 mb-1">{t.title}</div>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${t.priority === 'CRITICAL' ? 'bg-rose-500' : t.priority === 'HIGH' ? 'bg-orange-400' : 'bg-blue-400'}`}></span>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">{t.priority} PRIORITY</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusStyle(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        {t.images && t.images.length > 0 ? (
                          <div className="flex -space-x-3 overflow-hidden">
                            {t.images.slice(0, 3).map((img, idx) => (
                              <img
                                key={idx}
                                src={img.startsWith('http') ? img : `/${img}`}
                                alt="Attachment"
                                className="inline-block h-10 w-10 rounded-xl ring-4 ring-white object-cover shadow-sm"
                              />
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs font-medium text-slate-300 italic">No attachments</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() => { setCommentTicketId(t.id); setCommentOpen(true); }}
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
            )}
          </div>
        </div>
      </div>
      {/* COMMENT MODAL */}
      <TicketComments
        ticketId={commentTicketId}
        open={commentOpen}
        onClose={() => setCommentOpen(false)}
      />
    </div>
  );
}