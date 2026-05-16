import { useState } from "react";
import { BarChart3, Clock, Phone, AlertCircle, Filter, ChevronDown } from "lucide-react";
import {useGetDailyPerformanceQuery} from "../../../store/api/auth/adminLogin";



function StatCard({ title, value, subText, trend, isPositive }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex-1">
      <p className="text-[12px] text-gray-500 font-semibold uppercase tracking-tight mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-950 mb-0.5">{value}</h3>
      <div className={`text-[12px] font-bold flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <span>{trend}</span>
        <span className="text-gray-400 font-normal">{subText}</span>
      </div>
    </div>
  );
}

export default function DailyPerformancePage() {

const [sortBy, setSortBy] = useState("calls");
const [type, setType] = useState('all');
  const [level, setLevel] = useState('all');
  
  // Hook 
  const { data, isLoading, isError } = useGetDailyPerformanceQuery({sortBy,
    type: type === 'all' ? undefined : type,
    level: level === 'all' ? undefined : level,});

  const performance = data?.data?.dailyPerformance;
  const listeners = performance?.listeners || [];

  if (isLoading) return <div className="p-8 text-gray-500 font-medium">Loading metrics...</div>;
  if (isError) return <div className="p-8 text-red-500 font-medium">Error fetching data. Check your connection.</div>;

  return (
    <div className="p-8 bg-[#f6f7fb] min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950">Daily Performance</h1>
        <p className="text-sm text-gray-500 mt-1">
          Aggregated metrics and listener-wise breakdown for today's shifts.
        </p>
      </div>

      {/* Stats Row  */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-8">
      <StatCard 
          title="Total Calls Today" 
          value={performance?.totalCallsToday?.toLocaleString() || "0"} 
          isPositive={true} 
        />
        <StatCard 
          title="Avg Call Duration" 
          value={performance?.avgCallDuration || "0m 0s"} 
          isPositive={true} 
        />
        <StatCard 
          title="Total Talk Time" 
          value={performance?.totalTalkTime || "0 hrs"} 
          isPositive={true} 
        />
<StatCard
    title="Missed/Rejected"
    value={performance?.missedRejected?.toLocaleString() || "0"}
    isPositive={false}
  />

      </div>

      {/* Filter and Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
  <div className="flex items-center gap-2 text-gray-500 text-xs font-bold mr-2 uppercase tracking-wider">
    <Filter size={14} /> Filters:
  </div>

  {/* Type Filter */}
  <div className="relative">
    <select
    value={type}
          onChange={(e) => setType(e.target.value)}
    className="appearance-none flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-medium hover:bg-gray-100 transition cursor-pointer pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
      <option value="all">All Types</option>
      <option value="internal">Internal</option>
      <option value="external">External</option>
    </select>
    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
  </div>

  {/* Levels Filter */}
  <div className="relative">
    <select
    value={level} 
    onChange={(e) => setLevel(e.target.value)}
     className="appearance-none flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-medium hover:bg-gray-100 transition cursor-pointer pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
      <option value="all">All Levels</option>
      <option value="celebrity">Celebrity</option>
      <option value="expert">Expert</option>
      <option value="normal">Normal</option>
    </select>
    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
  </div>

  {/* Sort Filter */}
  <div className="relative">
    <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
     className="appearance-none flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-medium hover:bg-gray-100 transition cursor-pointer pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
     
      <option value="talk-time">Sort by: Talk Time</option>
      <option value="missed-calls">Sort by: Missed Calls</option>
      <option value="avg-duration">Sort by: Avg Duration</option>
    </select>
    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
  </div>
</div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#fafafa] text-gray-400 text-[10px] uppercase font-bold tracking-widest">
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
              {listeners.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={row.profilePhoto || "https://ui-avatars.com/api/?name=" + row.listener}
                      alt={row.listener}
                      width={36}
                      height={36}
                      className="rounded-full ring-2 ring-gray-50"
                    />
                    <div>
                      <p className="font-bold text-sm text-gray-900">{row.listener}</p>
                      <p className="text-[11px] text-gray-400 font-medium">ID: {idx + 100}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-1 rounded-md tracking-tighter ${
                        row.type === "INTERNAL"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-gray-900">{row.totalCalls}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{row.talkTime}</td>
                  <td className="px-6 py-4">
                    {row.missedRejected > 0 ? (
                      <span className="bg-red-50 text-red-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter">
                        {row.missedRejected} Missed
                      </span>
                    ) : (
                      <span className="text-gray-300 text-xs font-bold">0</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-bold text-sm">{row.avgDuration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}