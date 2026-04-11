// // // //frontend/src/layouts/AdminLayout.jsx
// // // import { Link, Outlet } from "react-router-dom";

// // // export default function AdminLayout() {
// // //   return (
// // //     <div className="flex h-screen bg-gray-100">
// // //       <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
// // //         <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
// // //         <nav className="flex flex-col gap-3">
// // //           <Link to="/admin/dashboard" className="hover:text-blue-600">
// // //             Dashboard
// // //           </Link>
// // //           <Link to="/admin/bookings" className="hover:text-blue-600">
// // //             Bookings
// // //           </Link>
// // //           <Link to="/admin/resources" className="hover:text-blue-600">
// // //             Resources
// // //           </Link>
// // //           <Link to="/admin/tickets" className="hover:text-blue-600">
// // //             Tickets
// // //           </Link>
// // //           <Link to="/admin/users" className="hover:text-blue-600">
// // //             Users
// // //           </Link>
// // //           <Link to="/admin/notifications" className="hover:text-blue-600">
// // //             Notifications
// // //           </Link>
// // //         </nav>
// // //       </aside>
// // //       <main className="flex-1 p-6 overflow-y-auto">
// // //         <Outlet />
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // frontend/src/layouts/AdminLayout.jsx

// // import { NavLink, Outlet } from "react-router-dom";
// // import {
// //   LayoutDashboard,
// //   CalendarCheck,
// //   Box,
// //   Ticket,
// //   Bell,
// //   Users,
// //   LogOut,
// //   ShieldCheck
// // } from "lucide-react";

// // export default function AdminLayout() {

// //   const navItemClass = ({ isActive }) =>
// //     `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
// //       isActive
// //         ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
// //         : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
// //     }`;

// //   return (
// //     <div className="flex h-screen bg-slate-50 font-sans">
      
// //       {/* SIDEBAR */}
// //       <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">

// //         {/* Logo */}
// //         <div className="p-8">
// //           <div className="flex items-center gap-3">
// //             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
// //               <ShieldCheck className="text-white w-6 h-6" />
// //             </div>
// //             <span className="text-xl font-black text-slate-800 tracking-tight">
// //               Admin<span className="text-indigo-600">Panel</span>
// //             </span>
// //           </div>
// //         </div>

// //         {/* NAVIGATION */}
// //         <nav className="flex-1 px-4 space-y-2">
// //           <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
// //             Admin Menu
// //           </p>

// //           <NavLink to="/admin/dashboard" className={navItemClass}>
// //             <LayoutDashboard className="w-5 h-5" />
// //             <span className="font-semibold">Dashboard</span>
// //           </NavLink>

// //           <NavLink to="/admin/bookings" className={navItemClass}>
// //             <CalendarCheck className="w-5 h-5" />
// //             <span className="font-semibold">Bookings</span>
// //           </NavLink>

// //           <NavLink to="/admin/resources" className={navItemClass}>
// //             <Box className="w-5 h-5" />
// //             <span className="font-semibold">Resources</span>
// //           </NavLink>

// //           <NavLink to="/admin/tickets" className={navItemClass}>
// //             <Ticket className="w-5 h-5" />
// //             <span className="font-semibold">Tickets</span>
// //           </NavLink>

// //           <NavLink to="/admin/users" className={navItemClass}>
// //             <Users className="w-5 h-5" />
// //             <span className="font-semibold">Users</span>
// //           </NavLink>

// //           <NavLink to="/admin/notifications" className={navItemClass}>
// //             <Bell className="w-5 h-5" />
// //             <span className="font-semibold">Notifications</span>
// //           </NavLink>
// //         </nav>

// //         {/* PROFILE + LOGOUT */}
// //         <div className="p-4 border-t border-slate-100">
// //           <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl mb-4">
// //             <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
// //               <ShieldCheck className="w-6 h-6 text-indigo-600" />
// //             </div>
// //             <div className="flex-1 min-w-0">
// //               <p className="text-sm font-bold text-slate-800 truncate">
// //                 Admin User
// //               </p>
// //               <p className="text-xs text-slate-500 truncate">
// //                 System Administrator
// //               </p>
// //             </div>
// //           </div>

// //           <button className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 font-semibold hover:bg-rose-50 rounded-xl transition-colors">
// //             <LogOut className="w-5 h-5" />
// //             Logout
// //           </button>
// //         </div>
// //       </aside>

// //       {/* MAIN CONTENT */}
// //       <main className="flex-1 flex flex-col overflow-hidden">

// //         {/* TOP BAR */}
// //         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
// //           <h1 className="text-slate-500 font-medium">
// //             Admin Dashboard —{" "}
// //             <span className="text-slate-800 font-bold">
// //               Manage System
// //             </span>
// //           </h1>

// //           <div className="flex items-center gap-4">
// //             <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
// //               <Bell className="w-6 h-6" />
// //               <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
// //             </button>
// //           </div>
// //         </header>

// //         {/* PAGE CONTENT */}
// //         <section className="flex-1 overflow-y-auto p-8">
// //           <Outlet />
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }

// // frontend/src/layouts/AdminLayout.jsx

// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../api/axios";

// import {
//   LayoutDashboard,
//   CalendarCheck,
//   Box,
//   Ticket,
//   Bell,
//   Users,
//   LogOut,
//   ShieldCheck
// } from "lucide-react";

// export default function AdminLayout() {

//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);

//   // ✅ GET LOGGED-IN USER
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

//   // ✅ LOGOUT FUNCTION
//   const handleLogout = () => {
//     localStorage.removeItem("token"); // remove JWT
//     navigate("/login"); // redirect
//   };

//   // ✅ ACTIVE LINK STYLE
//   const navItemClass = ({ isActive }) =>
//     `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//       isActive
//         ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
//         : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
//     }`;

//   return (
//     <div className="flex h-screen bg-slate-50 font-sans">

//       {/* SIDEBAR */}
//       <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">

//         {/* LOGO */}
//         <div className="p-8">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
//               <ShieldCheck className="text-white w-6 h-6" />
//             </div>
//             <span className="text-xl font-black text-slate-800 tracking-tight">
//               Admin<span className="text-indigo-600">Panel</span>
//             </span>
//           </div>
//         </div>

//         {/* NAVIGATION */}
//         <nav className="flex-1 px-4 space-y-2">
//           <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
//             Admin Menu
//           </p>

//           <NavLink to="/admin/dashboard" className={navItemClass}>
//             <LayoutDashboard className="w-5 h-5" />
//             Dashboard
//           </NavLink>

//           <NavLink to="/admin/bookings" className={navItemClass}>
//             <CalendarCheck className="w-5 h-5" />
//             Bookings
//           </NavLink>

//           <NavLink to="/admin/resources" className={navItemClass}>
//             <Box className="w-5 h-5" />
//             Resources
//           </NavLink>

//           <NavLink to="/admin/tickets" className={navItemClass}>
//             <Ticket className="w-5 h-5" />
//             Tickets
//           </NavLink>

//           <NavLink to="/admin/users" className={navItemClass}>
//             <Users className="w-5 h-5" />
//             Users
//           </NavLink>

//           <NavLink to="/admin/notifications" className={navItemClass}>
//             <Bell className="w-5 h-5" />
//             Notifications
//           </NavLink>
//         </nav>

//         {/* ✅ PROFILE + LOGOUT */}
//         <div className="p-4 border-t border-slate-100">
          
//           <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl mb-4">
            
//             {/* PROFILE IMAGE */}
//             {user?.imageUrl ? (
//               <img
//                 src={user.imageUrl}
//                 alt="profile"
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//             ) : (
//               <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
//                 <ShieldCheck className="w-6 h-6 text-indigo-600" />
//               </div>
//             )}

//             {/* NAME */}
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-bold text-slate-800 truncate">
//                 {user?.name || "Admin User"}
//               </p>
//               <p className="text-xs text-slate-500 truncate">
//                 {user?.email || "admin@email.com"}
//               </p>
//             </div>
//           </div>

//           {/* LOGOUT BUTTON */}
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 font-semibold hover:bg-rose-50 rounded-xl transition-colors"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 flex flex-col overflow-hidden">

//         {/* TOP BAR */}
//         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
//           <h1 className="text-slate-500 font-medium">
//             Welcome,{" "}
//             <span className="text-slate-800 font-bold">
//               {user?.name || "Admin"}
//             </span>
//           </h1>

//           <button className="relative p-2 text-slate-400 hover:text-indigo-600">
//             <Bell className="w-6 h-6" />
//           </button>
//         </header>

//         {/* CONTENT */}
//         <section className="flex-1 overflow-y-auto p-8">
//           <Outlet />
//         </section>
//       </main>
//     </div>
//   );
// }


// frontend/src/layouts/AdminLayout.jsx

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  LayoutDashboard,
  CalendarCheck,
  Box,
  Ticket,
  Bell,
  Users,
  LogOut,
  ShieldCheck,
  Settings
} from "lucide-react";

export default function AdminLayout() {

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
              Admin<span className="text-indigo-600">Panel</span>
            </span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-2">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Admin Menu
          </p>

          <NavLink to="/admin/dashboard" className={navItemClass}>
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink to="/admin/bookings" className={navItemClass}>
            <CalendarCheck className="w-5 h-5" />
            Bookings
          </NavLink>

          <NavLink to="/admin/resources" className={navItemClass}>
            <Box className="w-5 h-5" />
            Resources
          </NavLink>

          <NavLink to="/admin/tickets" className={navItemClass}>
            <Ticket className="w-5 h-5" />
            Tickets
          </NavLink>

          <NavLink to="/admin/users" className={navItemClass}>
            <Users className="w-5 h-5" />
            Users
          </NavLink>

          <NavLink to="/admin/notifications" className={navItemClass}>
            <Bell className="w-5 h-5" />
            Notifications
          </NavLink>

          <NavLink to="/admin/profile" className={navItemClass}>
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
                {user?.name || "Admin User"}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email || "admin@email.com"}
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
              {user?.name || "Admin"}
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