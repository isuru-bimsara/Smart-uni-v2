// // // //frontend/src/layouts/TechLayout.jsx
// // // import { Link, Outlet } from 'react-router-dom';

// // // export default function TechLayout() {
// // //   return (
// // //     <div className="flex h-screen bg-gray-100">
// // //       <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
// // //         <h2 className="text-xl font-bold mb-6">Technician Panel</h2>
// // //         <nav className="flex flex-col gap-3">
// // //           <Link to="/tech/dashboard" className="hover:text-blue-600">Dashboard</Link>
// // //           <Link to="/tech/tickets" className="hover:text-blue-600">Assigned Tickets</Link>
// // //           <Link to="/tech/notifications" className="hover:text-blue-600">Notifications</Link>
// // //         </nav>
// // //       </aside>
// // //       <main className="flex-1 p-6 overflow-y-auto">
// // //         <Outlet />
// // //       </main>
// // //     </div>
// // //   )
// // // }

// // // frontend/src/layouts/TechLayout.jsx
// // import { Link, Outlet, useLocation } from 'react-router-dom';

// // export default function TechLayout() {
// //   const location = useLocation();

// //   const navLinkClass = (path) =>
// //     `px-4 py-2 rounded-lg transition-colors ${
// //       location.pathname === path
// //         ? "bg-blue-50 text-blue-600 font-semibold"
// //         : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
// //     }`;

// //   return (
// //     <div className="flex h-screen bg-gray-100 font-sans">
// //       {/* Sidebar */}
// //       <aside className="w-64 bg-white shadow-lg p-6 flex flex-col border-r border-gray-200">
// //         <h2 className="text-xl font-bold mb-8 text-gray-800">Technician Panel</h2>

// //         <nav className="flex flex-col gap-2">
// //           <Link to="/tech/dashboard" className={navLinkClass('/tech/dashboard')}>
// //             Dashboard
// //           </Link>
// //           <Link to="/tech/tickets" className={navLinkClass('/tech/tickets')}>
// //             Assigned Tickets
// //           </Link>
// //           <Link to="/tech/notifications" className={navLinkClass('/tech/notifications')}>
// //             Notifications
// //           </Link>
// //         </nav>

// //         <div className="mt-auto pt-6 border-t border-gray-100">
// //           <button className="text-sm text-red-500 hover:text-red-700 px-4">Logout</button>
// //         </div>
// //       </aside>

// //       {/* Main Content Area */}
// //       <main className="flex-1 p-8 overflow-y-auto">
// //         <Outlet />
// //       </main>
// //     </div>
// //   );
// // }

// // frontend/src/layouts/TechLayout.jsx
// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { LogOut } from "lucide-react";

// export default function TechLayout() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   // ✅ Fetch logged-in user
//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await api.get("/auth/me");
//       setUser(res.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ✅ Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const navLinkClass = (path) =>
//     `px-4 py-2 rounded-lg transition-colors ${
//       location.pathname === path
//         ? "bg-blue-50 text-blue-600 font-semibold"
//         : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
//     }`;

//   return (
//     <div className="flex h-screen bg-gray-100 font-sans">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg p-6 flex flex-col border-r border-gray-200">
//         {/* Logo + User */}
//         <div className="flex flex-col items-center mb-8">
//           {user?.picture ? (
//             <img
//               src={user.picture}
//               alt="profile"
//               className="w-16 h-16 rounded-full object-cover mb-2"
//             />
//           ) : (
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
//               <LogOut className="w-6 h-6 text-blue-600" />
//             </div>
//           )}
//           <p className="font-bold text-gray-800">{user?.name || "Technician"}</p>
//           <p className="text-sm text-gray-500 truncate">{user?.email}</p>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-2">
//           <Link to="/tech/dashboard" className={navLinkClass("/tech/dashboard")}>
//             Dashboard
//           </Link>
//           <Link to="/tech/tickets" className={navLinkClass("/tech/tickets")}>
//             Assigned Tickets
//           </Link>
//           <Link to="/tech/notifications" className={navLinkClass("/tech/notifications")}>
//             Notifications
//           </Link>
//         </nav>

//         {/* Logout */}
//         <div className="mt-auto pt-6 border-t border-gray-100">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-700 px-4 py-2 rounded-lg transition-colors font-semibold"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 p-8 overflow-y-auto bg-gray-100">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// frontend/src/layouts/TechLayout.jsx

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  LayoutDashboard,
  Ticket,
  Bell,
  LogOut,
  ShieldCheck,
  Settings,
} from "lucide-react";

export default function TechLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ GET LOGGED-IN USER
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login"); // redirect
  };

  // ✅ ACTIVE LINK STYLE
  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
        {/* LOGO */}
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight">
              Technician<span className="text-indigo-600">Panel</span>
            </span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-2">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Technician Menu
          </p>

          <NavLink to="/tech/dashboard" className={navItemClass}>
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink to="/tech/tickets" className={navItemClass}>
            <Ticket className="w-5 h-5" />
            Assigned Tickets
          </NavLink>

          <NavLink to="/tech/notifications" className={navItemClass}>
            <Bell className="w-5 h-5" />
            Notifications
          </NavLink>

          <NavLink to="/tech/profile" className={navItemClass}>
            <Settings className="w-5 h-5" />
            Profile Settings
          </NavLink>
        </nav>

        {/* ✅ PROFILE + LOGOUT */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl mb-4">
            {/* PROFILE IMAGE */}
            {user?.picture ? (
              <img
                src={
                  user.picture?.startsWith("http")
                    ? user.picture
                    : `http://localhost:8083${user.picture}`
                }
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              </div>
            )}

            {/* NAME */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">
                {user?.name || "Tech User"}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email || "tech@email.com"}
              </p>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 font-semibold hover:bg-rose-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-slate-500 font-medium">
            Welcome,{" "}
            <span className="text-slate-800 font-bold">
              {user?.name || "Technician"}
            </span>
          </h1>

          <button className="relative p-2 text-slate-400 hover:text-indigo-600">
            <Bell className="w-6 h-6" />
          </button>
        </header>

        {/* CONTENT */}
        <section className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
