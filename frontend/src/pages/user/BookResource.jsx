// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function BookResource() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [bookings, setBookings] = useState([]);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [purpose, setPurpose] = useState("");

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8083/api/bookings/resource/${id}`
//         );
//         setBookings(res.data.data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBookings();
//   }, [id]);

//   // Convert bookings to intervals for conflict checking
//   const intervals = bookings.map((b) => ({
//     start: new Date(b.startTime),
//     end: new Date(b.endTime),
//   }));

//   const isConflict = (start, end) => {
//     return intervals.some((i) => start < i.end && end > i.start);
//   };

//   // Format date for backend: yyyy-MM-ddTHH:mm:ss
//   const formatDateForBackend = (date) => {
//     if (!date) return null;
//     const pad = (n) => (n < 10 ? "0" + n : n);
//     return (
//       date.getFullYear() +
//       "-" +
//       pad(date.getMonth() + 1) +
//       "-" +
//       pad(date.getDate()) +
//       "T" +
//       pad(date.getHours()) +
//       ":" +
//       pad(date.getMinutes()) +
//       ":" +
//       pad(date.getSeconds())
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!startTime || !endTime || !purpose) {
//       alert("❌ Please fill all fields");
//       return;
//     }

//     if (endTime <= startTime) {
//       alert("❌ End time must be after start time");
//       return;
//     }

//     if (isConflict(startTime, endTime)) {
//       alert("❌ This time is already booked!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("❌ You must be logged in");
//         return;
//       }

//       await axios.post(
//         "http://localhost:8083/api/bookings",
//         {
//           resourceId: Number(id),
//           startTime: formatDateForBackend(startTime),
//           endTime: formatDateForBackend(endTime),
//           purpose,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("✅ Booking Successful!");
//       navigate("/user/bookings");
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("❌ " + (err.response?.data?.message || err.message || "Error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>📅 Book Resource</h2>

//       <div style={{ background: "#ffe6e6", padding: "10px", marginBottom: "20px" }}>
//         <h4>🚫 Booked Time Slots</h4>
//         {bookings.length === 0
//           ? "No bookings"
//           : bookings.map((b, i) => (
//               <p key={i}>
//                 🟥 {new Date(b.startTime).toLocaleString()} →{" "}
//                 {new Date(b.endTime).toLocaleString()}
//               </p>
//             ))}
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "1rem" }}>
//           <label>Start Time</label>
//           <DatePicker
//             selected={startTime}
//             onChange={(date) => setStartTime(date)}
//             showTimeSelect
//             timeIntervals={30}
//             dateFormat="yyyy-MM-dd HH:mm"
//             minDate={new Date()}
//             placeholderText="Select start time"
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>End Time</label>
//           <DatePicker
//             selected={endTime}
//             onChange={(date) => setEndTime(date)}
//             showTimeSelect
//             timeIntervals={30}
//             dateFormat="yyyy-MM-dd HH:mm"
//             minDate={startTime || new Date()}
//             placeholderText="Select end time"
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>Purpose</label>
//           <textarea
//             value={purpose}
//             onChange={(e) => setPurpose(e.target.value)}
//             rows={3}
//             placeholder="Enter purpose"
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Booking..." : "Confirm Booking"}
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookResource() {
  const { id } = useParams(); // resource id
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [purpose, setPurpose] = useState("");

  // Fetch bookings for this resource
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:8083/api/bookings/resource/${id}`);
        if (res.data.data) {
          // Parse API strings into Date objects
          const parsed = res.data.data.map(b => ({
            ...b,
            startTime: new Date(b.startTime),
            endTime: new Date(b.endTime),
          }));
          setBookings(parsed);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, [id]);

  // Convert bookings into intervals for conflict check
  const intervals = bookings.map(b => ({ start: b.startTime, end: b.endTime }));

  // Check if selected times conflict
  const isConflict = (start, end) => intervals.some(i => start < i.end && end > i.start);

  // Get booked hours for a given date
  const getDisabledHours = (date) => {
    const disabled = [];
    intervals.forEach(interval => {
      if (date && interval.start.toDateString() === date.toDateString()) {
        for (let h = interval.start.getHours(); h < interval.end.getHours(); h++) {
          disabled.push(h);
        }
      }
    });
    return disabled;
  };

  // Highlight booked dates in calendar
  const highlightDates = intervals.map(i => i.start);

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime || !purpose) return alert("❌ Please fill all fields");
    if (endTime <= startTime) return alert("❌ End time must be after start");
    if (isConflict(startTime, endTime)) return alert("❌ This time is already booked!");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8083/api/bookings",
        { resourceId: Number(id), startTime, endTime, purpose },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Booking Successful!");
      navigate("/user/bookings");
    } catch (err) {
      console.error(err);
      alert("❌ " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 className="text-2xl font-bold mb-4">📅 Book Resource</h2>

      {/* Booked Time Slots */}
      <div style={{ background: "#ffe6e6", padding: "10px", marginBottom: "20px" }}>
        <h4>🚫 Booked Time Slots</h4>
        {bookings.length === 0 ? (
          <p>No bookings</p>
        ) : (
          bookings.map((b, i) => (
            <p key={i}>
              🟥 {b.startTime.toLocaleString()} → {b.endTime.toLocaleString()} ({b.status})
            </p>
          ))
        )}
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Start Time</label>
          <DatePicker
            selected={startTime}
            onChange={date => setStartTime(date)}
            showTimeSelect
            timeIntervals={30}
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={new Date()}
            highlightDates={highlightDates} // Highlight booked dates
            filterTime={time => !getDisabledHours(startTime || new Date()).includes(time.getHours())} // Disable booked hours
            placeholderText="Select start time"
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">End Time</label>
          <DatePicker
            selected={endTime}
            onChange={date => setEndTime(date)}
            showTimeSelect
            timeIntervals={30}
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={startTime || new Date()}
            highlightDates={highlightDates}
            filterTime={time => !getDisabledHours(endTime || startTime || new Date()).includes(time.getHours())}
            placeholderText="Select end time"
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Purpose</label>
          <textarea
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
            rows={3}
            className="border p-2 w-full"
            placeholder="Enter purpose"
          />
        </div>

        <button type="submit" disabled={loading} className="bg-green-500 text-white px-4 py-2">
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}