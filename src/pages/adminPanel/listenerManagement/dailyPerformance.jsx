import { BarChart3, Clock, Phone, AlertCircle, Filter, ChevronDown } from "lucide-react";

// Dummy data
const performanceData = [
  {
    name: "Anjali K.",
    id: "L-104",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    type: "EXTERNAL",
    totalCalls: "1240",
    talkTime: "4h 15m",
    missed: 2,
    avgDuration: "18m 30s",
  },
  {
    name: "Rahul M.",
    id: "L-299",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    type: "EXTERNAL",
    totalCalls: "312",
    talkTime: "0h 0m",
    missed: 14,
    avgDuration: "5m 10s",
  },
  {
    name: "Vikram S.",
    id: "L-305",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    type: "INTERNAL",
    totalCalls: "890",
    talkTime: "2h 10m",
    missed: 0,
    avgDuration: "22m 15s",
  },
];

// Stats Card Component
function StatCard({ title, value, subText, trend, isPositive }) {
  return (
    <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex-1 min-w-[240px]">
      <p className="text-sm text-gray-500 font-medium mb-2">{title}</p>
      <h3 className="text-3xl font-bold text-gray-950 mb-1">{value}</h3>
      <div className={`text-sm font-semibold flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <span>{trend}</span>
        <span className="text-gray-400 font-normal">{subText}</span>
      </div>
    </div>
  );
}

export default function DailyPerformancePage() {
  return (
    <div className="p-8 bg-[#f6f7fb] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950">Daily Performance</h1>
        <p className="text-sm text-gray-500 mt-1">
          Aggregated metrics and listener-wise breakdown for today's shifts.
        </p>
      </div>

      {/* Stats Row */}
      <div className="flex gap-3 overflow-x-auto mb-8 pb-2">
        <StatCard title="Total Calls Today" value="3,421" trend="↑ 4%" subText="vs last hr" isPositive={true} />
        <StatCard title="Avg Call Duration" value="14m 20s" trend="↓ 1m" subText="vs last hr" isPositive={false} />
        <StatCard title="Total Talk Time" value="842 hrs" trend="--" subText="active today" isPositive={true} />
        <StatCard title="Missed/Rejected" value="145" trend="↓ 12%" subText="vs last hr" isPositive={false} />
      </div>

      {/* Filter and Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mr-4">
            <Filter size={16} /> Filters:
          </div>
          {['All Types', 'All Levels', 'Sort by: Talk Time'].map((filter, i) => (
            <button
              key={i}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
            >
              {filter} <ChevronDown size={14} />
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#fafafa] text-gray-400 text-[11px] uppercase font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Listener</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Total Calls</th>
                <th className="px-6 py-4">Talk Time Today</th>
                <th className="px-6 py-4">Missed/Rejected</th>
                <th className="px-6 py-4">Avg Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {performanceData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={row.avatar}
                      alt={row.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{row.name}</p>
                      <p className="text-xs text-gray-400">{row.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                        row.type === "INTERNAL"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{row.totalCalls}</td>
                  <td className="px-6 py-4 text-gray-600">{row.talkTime}</td>
                  <td className="px-6 py-4">
                    {row.missed > 0 ? (
                      <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
                        {row.missed} Missed
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">0</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{row.avgDuration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}