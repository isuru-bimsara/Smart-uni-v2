// // //frontend/src/pages/tech/TechDashboard.jsx
// // import { useEffect, useState } from 'react';
// // import api from '../../api/axios';

// // export default function TechDashboard() {
// //   const [stats, setStats] = useState({
// //     assignedTickets: 0,
// //     completedTickets: 0
// //   });

// //   useEffect(() => {
// //     api.get('/tech/stats').then(res => setStats(res.data)).catch(() => {});
// //   }, []);

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold mb-4">Technician Dashboard</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <div className="card p-4 bg-white shadow">
// //           <p className="text-sm text-gray-500">Assigned Tickets</p>
// //           <p className="text-xl font-bold">{stats.assignedTickets}</p>
// //         </div>
// //         <div className="card p-4 bg-white shadow">
// //           <p className="text-sm text-gray-500">Completed Tickets</p>
// //           <p className="text-xl font-bold">{stats.completedTickets}</p>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }


// import { useEffect } from "react";

// const TICKET_TYPES = [
//   "ELECTRICAL",
//   "PLUMBING",
//   "HVAC",
//   "IT",
//   "CLEANING",
//   "OTHER"
// ];

// export default function TechDashboard({ selectedType, setSelectedType }) {

//   // 🔥 Load saved type from localStorage
//   useEffect(() => {
//     const savedType = localStorage.getItem("techType");
//     if (savedType) {
//       setSelectedType(savedType);
//     }
//   }, []);

//   // 🔥 Save when changed
//   const handleChange = (value) => {
//     setSelectedType(value);
//     localStorage.setItem("techType", value);
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Technician Dashboard</h1>

//       <div className="mb-6">
//         <label className="block mb-2 font-semibold">
//           Please select your technician type:
//         </label>

//         <select
//           value={selectedType}
//           onChange={(e) => handleChange(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">-- Select Type --</option>
//           {TICKET_TYPES.map(type => (
//             <option key={type} value={type}>{type}</option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";

const TICKET_TYPES = [
  "ELECTRICAL",
  "PLUMBING",
  "HVAC",
  "IT",
  "CLEANING",
  "OTHER"
];

export default function TechDashboard() {
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("techType");
    if (saved) setSelectedType(saved);
  }, []);

  const handleChange = (type) => {
    setSelectedType(type);
    localStorage.setItem("techType", type); // ✅ SAVE
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Technician Dashboard</h1>

      <label className="block mb-2 font-semibold">
        Please select your technician type:
      </label>

      <select
        value={selectedType}
        onChange={(e) => handleChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">-- Select Type --</option>
        {TICKET_TYPES.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
}