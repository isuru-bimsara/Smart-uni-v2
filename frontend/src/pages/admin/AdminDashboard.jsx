// frontend/src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Bar,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
} from "recharts";
import {
  Users,
  ShieldAlert,
  Wrench,
  Briefcase,
  TrendingUp,
} from "lucide-react";

const PIE_COLORS = ["#4f46e5", "#ec4899", "#f59e0b", "#10b981"];
const STATUS_COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    adminCount: 0,
    opsCount: 0,
    techCount: 0,
    userCount: 0,
    bookings: 0,
    pendingBookings: 0,
    tickets: 0,
    bookingDistribution: [],
    roleDistribution: [],
    userGrowth: [],
    activityTrends: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/stats")
      .then((res) => {
        console.log("API:", res.data); // debug
        setStats(res.data.data); // ✅ FIXED
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <Users className="w-6 h-6 text-white" />,
      gradient: "from-indigo-500 to-indigo-700",
    },
    {
      title: "System Admins",
      value: stats.adminCount,
      icon: <ShieldAlert className="w-6 h-6 text-white" />,
      gradient: "from-rose-500 to-rose-700",
    },
    {
      title: "Ops Managers",
      value: stats.opsCount,
      icon: <Briefcase className="w-6 h-6 text-white" />,
      gradient: "from-amber-500 to-amber-700",
    },
    {
      title: "Technicians",
      value: stats.techCount,
      icon: <Wrench className="w-6 h-6 text-white" />,
      gradient: "from-emerald-500 to-emerald-700",
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            System-wide overview and user management analytics.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          Live Data
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div
            key={card.title}
            className={`bg-gradient-to-br ${card.gradient} rounded-3xl p-6 text-white shadow-md flex items-center gap-4 transform hover:scale-[1.02] transition-transform duration-200`}
          >
            <div className="p-3 bg-white/20 rounded-2xl flex-shrink-0 backdrop-blur-sm">
              {card.icon}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                {card.title}
              </p>
              {loading ? (
                <div className="h-8 w-16 bg-white/20 rounded-lg animate-pulse mt-1" />
              ) : (
                <p className="text-3xl font-black">
                  {typeof card.value === "number"
                    ? card.value.toLocaleString()
                    : card.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW 1: USER FOCUS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROLE DISTRIBUTION PIE */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-lg font-bold text-slate-700">
                User Role Distribution
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Active accounts by privilege level
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="flex-1 min-h-[300px]">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={
                      stats.roleDistribution?.some((d) => d.value > 0)
                        ? stats.roleDistribution
                        : [{ name: "No Data", value: 1 }]
                    }
                    innerRadius={75}
                    outerRadius={110}
                    paddingAngle={6}
                    dataKey="value"
                    stroke="none"
                  >
                    {stats.roleDistribution?.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{
                      paddingTop: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* USER GROWTH BAR */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-700">
                New Enrollments
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Daily registered users
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full">
              Last 7 Days
            </span>
          </div>
          <div className="flex-1 min-h-[300px]">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.userGrowth} barSize={36}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 20px -4px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2: SYSTEM ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BOOKINGS VS TICKETS COMPOSED */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-700">
                System Engagement
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Bookings vs. Support Tickets
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stats.activityTrends}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
                />
                <Bar
                  name="New Bookings"
                  dataKey="bookings"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
                <Line
                  name="New Tickets"
                  type="monotone"
                  dataKey="tickets"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ef4444", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOOKING STATUS PIE */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-700 mb-2">
            Booking Flow Status
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 mb-2">
            Current state of active reservations
          </p>
          <div className="h-64">
            {loading ? null : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={
                      stats.bookingDistribution?.some((d) => d.value > 0)
                        ? stats.bookingDistribution
                        : [{ name: "No Data", value: 1 }]
                    }
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {stats.bookingDistribution?.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
