import {
  LayoutDashboard,
  Users,
  UserCheck,
  Video,
  CreditCard,
  FileText,
  Layers,
  BarChart3,
  Bell,
  Mail,
  MessageSquare,
  Settings,
  LogOut,
  DollarSign,
  Globe,
  TrendingUp,
  Download
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState("7 Days");

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/adminPanel" },
    { name: "Users", icon: Users, path: "/users" },
    { name: "Coaches", icon: UserCheck, path: "/coaches" },
    { name: "Sessions", icon: Video, path: "/sessions" },
    { name: "Payments", icon: CreditCard, path: "/payments" },
    { name: "Content", icon: FileText, path: "/content" },
    { name: "Categories", icon: Layers, path: "/categories" },
    { name: "Analytics", icon: BarChart3, path: "/analytics" },
    { name: "Notifications", icon: Bell, path: "/notifications" },
    { name: "Emails", icon: Mail, path: "/emails" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];
  const userGrowth = [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 150 },
    { name: "Wed", value: 180 },
    { name: "Thu", value: 160 },
    { name: "Fri", value: 200 },
    { name: "Sat", value: 240 },
    { name: "Sun", value: 210 },
   
  ];

  const sessions = [
    { name: "Mon", value: 90 },
    { name: "Tue", value: 110 },
    { name: "Wed", value: 130 },
    { name: "Thu", value: 95 },
    { name: "Fri", value: 140 },
    { name: "Sat", value: 170 },
    { name: "Sun", value: 150 },
  ];

  const revenue = [
    { name: "Jan", revenue: 450000, target: 400000 },
    { name: "Feb", revenue: 500000, target: 450000 },
    { name: "Mar", revenue: 550000, target: 500000 },
    { name: "Apr", revenue: 620000, target: 550000 },
    { name: "May", revenue: 700000, target: 600000 },
    { name: "Jun", revenue: 850000, target: 650000 },
  ];

  const categories = [
    { name: "Anxiety", value: 35 },
    { name: "Depression", value: 18 },
    { name: "Career", value: 12 },
    { name: "Other", value: 8 },
  ];

  const colors = ["#7c3aed", "#ec4899", "#3b82f6", "#f59e0b"];

  return (
    <div className="flex h-screen bg-[#f6f7fb]">
      <div className="flex-1 p-9">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 text-sm">
              Welcome back, Admin! Here's what's happening today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 rounded-lg bg-white border text-sm flex items-center gap-2 hover:bg-gray-100"
              >
                {range}
                <span className="text-gray-400">▼</span>
              </button>

              {isOpen && (
                <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
                  {["Today", "7 Days", "30 Days", "90 Days"].map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setRange(item);
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-[#eef2f7]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {[
            {
              title: "Total Users",
              value: "12,540",
              growth: "+12%",
              subText: "+1,234 this week",
              icon: Users,
              bg: "bg-blue-100",
              color: "text-blue-600",
            },
            {
              title: "Active Coaches",
              value: "289",
              growth: "+5%",
              subText: "+12 this week",
              icon: UserCheck,
              bg: "bg-green-100",
              color: "text-green-600",
            },
            {
              title: "Sessions Today",
              value: "145",
              growth: "+8%",
              subText: "+24 from yesterday",
              icon: Video,
              bg: "bg-purple-100",
              color: "text-purple-600",
            },
            {
              title: "Revenue",
              value: "₹45.2L",
              growth: "+10%",
              subText: "+₹2.1L this month",
              icon: DollarSign,
              bg: "bg-green-100",
              color: "text-green-600",
            },
          ].map((card, i) => {
            const Icon = card.icon;

            return (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-100">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${card.bg}`}>
                    <Icon className={card.color} size={20} />
                  </div>

                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <TrendingUp size={14} />
                    {card.growth}
                  </div>
                </div>

                <p className="text-gray-500 text-sm">{card.title}</p>
                <h2 className="text-2xl font-bold text-gray-800 mt-1">{card.value}</h2>
                <p className="text-gray-400 text-sm mt-1">{card.subText}</p>
              </div>
            );
          })}
        </div>

        {/* Keep rest SAME (charts + bottom sections unchanged) */}


{/* Charts */}
<div className="grid grid-cols-2 gap-6 mb-6">

  {/* User Growth */}
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">

    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="font-semibold text-gray-800">User Growth</h3>
        <p className="text-sm text-gray-400">+12% this week</p>
      </div>

      <button className="text-sm text-purple-600 font-medium hover:underline">
        View Details
      </button>
    </div>

    {/* Chart */}
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={userGrowth}>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#7c3aed"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Daily Sessions */}
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">

    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="font-semibold text-gray-800">Daily Sessions</h3>
        <p className="text-sm text-gray-400">+8% this week</p>
      </div>

      <button className="text-sm text-purple-600 font-medium hover:underline">
        View Details
      </button>
    </div>

    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={sessions}>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#3b82f6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>


        {/* Bottom Charts FIXED ONLY STRUCTURE */}
        <div className="grid grid-cols-2 gap-6">

          {/* Revenue */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">Revenue</h3>
                <p className="text-sm text-gray-400">Monthly performance</p>
              </div>
              <button className="text-sm text-purple-600 font-medium hover:underline">
                View Report
              </button>
            </div>

            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenue}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area dataKey="revenue" stroke="#7c3aed" fill="#7c3aed20" />
                <Area dataKey="target" stroke="#ec4899" fill="#ec489920" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Categories */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">Top Categories</h3>
              <p className="text-sm text-gray-400">Based on sessions</p>
            </div>

            <div className="flex items-center justify-between">
              <ResponsiveContainer width="50%" height={220}>
                <PieChart>
                  <Pie data={categories} dataKey="value" outerRadius={80} innerRadius={50}>
                    {categories.map((_, i) => (
                      <Cell key={i} fill={colors[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-col gap-4 w-[45%]">
                {categories.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
                      <span className="text-sm text-gray-600">{cat.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

{/* Bottom Section */}
<div className="grid grid-cols-3 gap-6 mt-6">

  {/* LEFT SIDE (2 stacked cards) */}
  <div className="col-span-2 grid grid-rows-2 gap-6">

    {/* ================= Recent Activity ================= */}
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Recent Activity</h3>
        <button className="text-sm text-purple-600 font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {[
          { text: "New user registered", time: "2 min ago" },
          { text: "Coach approved", time: "10 min ago" },
          { text: "Session completed", time: "30 min ago" },
          { text: "Payment received", time: "1 hour ago" },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center">
            <p className="text-sm text-gray-600">{item.text}</p>
            <span className="text-xs text-gray-400">{item.time}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ================= Pending Approvals ================= */}
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Pending Approvals</h3>
        <button className="text-sm text-purple-600 font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {[
          { name: "Riya Sharma", role: "Therapist" },
          { name: "Aman Verma", role: "Career Coach" },
          { name: "Sneha Patel", role: "Life Coach" },
        ].map((user, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-400">{user.role}</p>
            </div>

            <button className="text-xs px-3 py-1 rounded-lg bg-green-100 text-green-600 hover:bg-green-200">
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>

  </div>

  {/* RIGHT SIDE (Tall Card) */}
  <div className="col-span-1 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">

    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-gray-800">Top Coaches</h3>
      <button className="text-sm text-purple-600 font-medium hover:underline">
        View All
      </button>
    </div>

    {/* List */}
    <div className="space-y-5">
      {[
        { name: "Dr. Mehta", sessions: 120, rating: 4.9 },
        { name: "Anjali Rao", sessions: 98, rating: 4.8 },
        { name: "Rahul Singh", sessions: 87, rating: 4.7 },
        { name: "Neha Kapoor", sessions: 75, rating: 4.6 },
      ].map((coach, i) => (
        <div key={i} className="flex justify-between items-center">

          {/* Left */}
          <div>
            <p className="text-sm font-medium text-gray-800">{coach.name}</p>
            <p className="text-xs text-gray-400">
              {coach.sessions} sessions
            </p>
          </div>

          {/* Right */}
          <div className="text-sm font-semibold text-yellow-500">
            ⭐ {coach.rating}
          </div>

        </div>
      ))}
    </div>

  </div>

</div>


      </div>
    </div>
  );
}