import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Ban,
  MoreVertical,
  Users,
  Activity,
  IndianRupee,
  Wallet,
  Calendar,
  Upload,
  Download,
} from "lucide-react";

const users = [
  {
    name: "Alex Martin",
    city: "Mumbai",
    email: "alex@email.com",
    phone: "+91 98765 43210",
    plan: "Premium",
    sessions: 12,
    spent: "₹8,500",
    wallet: "₹1,200",
    status: "active",
  },
  {
    name: "Priya Sharma",
    city: "Delhi",
    email: "priya@email.com",
    phone: "+91 98765 43211",
    plan: "Standard",
    sessions: 8,
    spent: "₹12,000",
    wallet: "₹500",
    status: "active",
  },
];

export default function UserManagement() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All Status");

  const options = ["All Status", "Active", "Inactive", "Suspended"];

  return (
    <div className="p-3 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[28px] font-semibold text-[#111827]">
            User Management
          </h1>
          <p className="text-[14px] text-[#6B7280] mt-1">
            Manage and monitor all platform users
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 h-[45px] border rounded-lg">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>

          <button className="flex items-center gap-2 px-4 h-[45px] border rounded-lg">
            <Upload className="w-4 h-4" />
            Import
          </button>

          <button className="flex items-center gap-2 px-4 h-[45px] bg-purple-600 text-white rounded-lg">
            <Download className="w-4 h-4" />
            Export Users
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { title: "Total Users", value: "12,458", icon: Users },
          { title: "Active Users", value: "8,234", icon: Activity },
          { title: "Total Revenue", value: "₹8.5L", icon: IndianRupee },
          { title: "Avg. Spent", value: "₹6,820", icon: Wallet },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-xl shadow-sm flex gap-4">
              <Icon className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h2 className="text-lg font-semibold">{card.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-5 relative">
        <div className="flex items-center w-[300px] border rounded-lg px-3">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            className="ml-2 w-full outline-none"
            placeholder="Search..."
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="border px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            {selected}
          </button>

          {open && (
            <div className="absolute top-10 bg-white border rounded-lg w-full shadow">
              {options.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm bg-white rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">User</th>
            <th>Email</th>
            <th>Sessions</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, i) => (
            <tr key={i} className="border-t">
              <td className="p-3">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.sessions}</td>
              <td>{user.status}</td>
              <td className="flex gap-2">
                <Eye className="w-4 h-4 cursor-pointer" />
                <Ban className="w-4 h-4 cursor-pointer" />
                <MoreVertical className="w-4 h-4 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}