//frontend/src/pages/TicketComments.jsx
import { useState, useEffect, useRef } from "react";
import { ticketsApi } from "../api/tickets";
import { Send, X, MessageSquare } from "lucide-react";

export default function TicketComments({ ticketId, open, onClose }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    if (open && ticketId) {
      setLoading(true);
      ticketsApi.getComments(ticketId).then(res => {
        setComments(res.data.data || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [ticketId, open]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [comments, open]);

  const sendComment = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    try {
      await ticketsApi.addComment(ticketId, message);
      setMessage("");
      const res = await ticketsApi.getComments(ticketId);
      setComments(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg relative flex flex-col max-h-[80vh]">
        <button onClick={onClose} className="absolute right-3 top-3 text-gray-400 hover:text-red-600">
          <X className="w-6 h-6" />
        </button>
        <div className="p-5 border-b flex gap-2 items-center">
          <MessageSquare className="text-indigo-600 w-6 h-6" />
          <div>
            <div className="font-bold text-lg text-slate-800">Ticket Messages</div>
            <div className="text-xs text-slate-400">Ticket #{ticketId}</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="text-center text-slate-400">Loading...</div>
          ) : (
            comments.length === 0 ? (
              <div className="text-center text-slate-400 italic">No messages yet.</div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="bg-slate-50 border rounded-xl p-3">
                  <div className="text-xs font-semibold text-slate-700">{c.userName}</div>
                  <div className="text-slate-700">{c.content}</div>
                  <div className="text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleString()}</div>
                </div>
              ))
            )
          )}
          <div ref={bottomRef}></div>
        </div>
        <form onSubmit={sendComment} className="p-4 border-t flex gap-2">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            type="text"
            placeholder="Type your message…"
            className="flex-1 border bg-slate-50 rounded-full px-4 py-2"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-1"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}