// import { useEffect, useState } from "react";
// import { adminApi } from "../../api/admin";

// const ROLES = ["USER", "TECHNICIAN", "ADMIN"];

// export default function AdminUsers() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await adminApi.getUsers();
//       setUsers(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load users");
//     }
//   };

//   const handleRoleChange = async (id, newRole) => {
//     try {
//       await adminApi.updateRole(id, newRole);
//       fetchUsers();
//     } catch (err) {
//       alert("Failed to update role");
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

//       <table className="w-full border bg-white">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2">Name</th>
//             <th className="p-2">Email</th>
//             <th className="p-2">Role</th>
//             <th className="p-2">Change Role</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id} className="border-t">
//               <td className="p-2 flex items-center gap-2">
//                 {u.picture && (
//                   <img
//                     src={u.picture}
//                     alt="profile"
//                     className="w-8 h-8 rounded-full"
//                   />
//                 )}
//                 {u.name}
//               </td>

//               <td className="p-2">{u.email}</td>

//               <td className="p-2 font-semibold">{u.role}</td>

//               <td className="p-2">
//                 <select
//                   value={u.role}
//                   onChange={(e) =>
//                     handleRoleChange(u.id, e.target.value)
//                   }
//                   className="border px-2 py-1 rounded"
//                 >
//                   {ROLES.map((r) => (
//                     <option key={r} value={r}>
//                       {r}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState, useMemo } from "react";
import { adminApi } from "../../api/admin";
import { 
  UserCog, 
  Mail, 
  ShieldCheck, 
  ArrowUpDown, 
  Search, 
  UserCircle,
  ChevronDown,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const ROLES = ["USER", "TECHNICIAN", "ADMIN"];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sorting State
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getUsers();
      setUsers(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await adminApi.updateRole(id, newRole);
      fetchUsers();
    } catch (err) {
      alert("Failed to update role");
    }
  };

  // 1. Sorting Logic
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // 2. Computed Data (Filtered + Sorted)
  const processedUsers = useMemo(() => {
    let filtered = users.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const valA = a[sortConfig.key]?.toUpperCase() || "";
      const valB = b[sortConfig.key]?.toUpperCase() || "";
      
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [users, sortConfig, searchTerm]);

  // UI Helpers
  const getRoleBadge = (role) => {
    switch (role) {
      case "ADMIN": return "bg-purple-100 text-purple-700 border-purple-200";
      case "TECHNICIAN": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="w-3 h-3 text-gray-300" />;
    return sortConfig.direction === "asc" ? 
      <ArrowUp className="w-3 h-3 text-indigo-600" /> : 
      <ArrowDown className="w-3 h-3 text-indigo-600" />;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <UserCog className="w-8 h-8 text-indigo-600" />
              Manage Users
            </h1>
            <p className="text-gray-500 mt-1 font-medium">Assign roles and monitor system access.</p>
          </div>

          <div className="relative group w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all text-sm"
            />
          </div>
        </div>

        {/* User Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th 
                    onClick={() => requestSort("name")}
                    className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      User Profile {getSortIcon("name")}
                    </div>
                  </th>
                  <th 
                    onClick={() => requestSort("email")}
                    className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      Contact Details {getSortIcon("email")}
                    </div>
                  </th>
                  <th 
                    onClick={() => requestSort("role")}
                    className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      Current Role {getSortIcon("role")}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Access Level
                  </th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-20 text-center text-gray-400 font-medium animate-pulse">
                      Retrieving user records...
                    </td>
                  </tr>
                ) : processedUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full border border-gray-100 overflow-hidden bg-gray-50 flex-shrink-0">
                          {u.picture ? (
                            <img src={u.picture} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-300">
                              <UserCircle className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-gray-800 text-sm">{u.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {u.email}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg border text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 w-fit ${getRoleBadge(u.role)}`}>
                        <ShieldCheck className="w-3 h-3" />
                        {u.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block text-left">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-xs font-bold hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all cursor-pointer"
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!loading && processedUsers.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 mb-4">
                <UserCog className="h-8 w-8 text-gray-200" />
              </div>
              <p className="text-gray-500 font-bold">No users found</p>
              <p className="text-gray-400 text-sm">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
          Smart-Uni Admin Infrastructure • Secure User Registry
        </p>
      </div>
    </div>
  );
}