import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Phone, Loader2, Star, Download, 
  ArrowDown, FileText, Mail, ShieldCheck 
} from "lucide-react";
import { useGetAdminCoachProfileQuery } from "../../../store/api/auth/adminLogin";

export default function ListenerProfile() {
  const navigate = useNavigate();
  const { coachId } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");

  const { data, isLoading, isError } = useGetAdminCoachProfileQuery(
    { coachId },
    { skip: !coachId }
  );

  const listener = data?.data?.adminCoachProfile;

  // Mock Data for Tabs
  const activityLogs = [
    { time: "10:45 AM", action: "Status Changed", details: "Offline → Online", device: "192.168.1.1 (iOS 16)", status: "neutral" },
    { time: "11:15 AM", action: "Call Accepted", details: "Connected with U-9921", device: "192.168.1.1 (iOS 16)", status: "neutral" },
    { time: "Yesterday", action: "Missed Call", details: "Failed to connect with U-4412", device: "192.168.1.1 (iOS 16)", status: "error" },
  ];

  const transactions = [
    { id: "TXN-8812", type: "Call Payout (U-112)", amount: 120, status: "plus", date: "Today, 10:45 AM" },
    { id: "TXN-8809", type: "Penalty (Call Drop)", amount: 50, status: "minus", date: "Yesterday, 14:20 PM" },
    { id: "TXN-8790", type: "Bank Withdrawal", amount: 15000, status: "minus", date: "20 Oct 2026" },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <Loader2 className="animate-spin mb-2" size={32} />
        <p>Fetching listener profile...</p>
      </div>
    );
  }

  if (isError || !listener) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-medium">Failed to load listener profile.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen text-gray-900">
      
      {/* HEADER NAVIGATION */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-500 hover:text-gray-900 mb-6 text-sm font-medium"
      >
        <ChevronLeft size={18} className="mr-1" /> Back to All Listeners
      </button>

      {/* TOP PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6 flex items-start gap-6">
          <img 
            src={listener.profileImage || "https://randomuser.me/api/portraits/men/32.jpg"} 
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-100" 
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{listener.displayName || "Unknown Name"}</h2>
            <p className="text-sm text-gray-500 mt-1">ID: {coachId} • Joined {new Date(listener.createdAt).toLocaleDateString()}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md">{listener.role || "EXTERNAL"}</span>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-md">{listener.experienceLevel || "Normal"}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-md ${listener.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {listener.status || "N/A"}
              </span>
              <span className="ml-2 text-yellow-500 font-semibold text-sm">
                ★ {listener.averageRating || "0.0"} <span className="text-gray-400 font-normal">({listener.reviewCount || 0} reviews)</span>
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">Adjust Level</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">Force Logout</button>
          </div>
        </div>

        {/* TABS */}
        <div className="px-6 flex gap-8 border-t border-gray-100">
          {["Overview", "Performance", "Financials", "Activity Logs"].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab ? "text-indigo-600 border-indigo-600" : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Daily Stats Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-6">Daily Stats (Today)</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Calls Taken</p>
                  <p className="text-3xl font-bold">{listener.dailyStats?.callsTaken || 18}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Talk Time</p>
                  <p className="text-3xl font-bold">{listener.dailyStats?.talkTime || "4h 15m"}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Earnings</p>
                  <p className="text-3xl font-bold text-green-600">₹{(listener.dailyStats?.earnings || 8450).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 flex justify-between items-center border-b border-gray-50">
                <h3 className="font-bold text-lg">Recent Activity</h3>
                <button 
                  onClick={() => setActiveTab("Activity Logs")}
                  className="text-sm text-indigo-600 font-medium hover:underline"
                >
                  View Full Ledger
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-8 relative before:absolute before:left-[39px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-100">
                  {[
                    { time: "10:45 AM", event: "Call Ended", detail: "Duration: 45 mins. Rating: 5 stars." },
                    { time: "10:00 AM", event: "Call Accepted", detail: "Connected to U-9921" },
                    { time: "09:00 AM", event: "Login", detail: "Status changed to Online via Mobile App" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-8 relative">
                      <div className="text-sm text-gray-400 w-20 pt-1 text-right font-medium">{item.time}</div>
                      <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-indigo-500 mt-2 z-10 relative border-4 border-white shadow-sm"></div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{item.event}</p>
                        <p className="text-sm text-gray-500">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Widgets (Right) */}
          <div className="space-y-6">
            
            {/* Categories Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {["Mental Health", "Relationships", "Career"].map(cat => (
                  <span key={cat} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Fraud & Health Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">AI Fraud & Health Indicators</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Short Calls (&lt;1m)</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Low (2%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Call Reject Rate</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold rounded uppercase">Med (15%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Ping</span>
                  <span className="text-sm font-bold text-green-500">42ms</span>
                </div>
              </div>
            </div>

            {/* Contact & Documents Widget */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
  <h3 className="font-bold text-gray-900 mb-4">Contact & Documents</h3>
  <div className="space-y-4">
    {/* Email from API */}
    <div className="flex items-center gap-3 text-sm text-gray-600">
      <Mail size={16} className="text-gray-400" />
      <span>{listener?.email || "No email provided"}</span>
    </div>

    {/* Phone from API */}
    <div className="flex items-center gap-3 text-sm text-gray-600">
      <Phone size={16} className="text-gray-400" />
      <span>{listener?.phone || "No phone provided"}</span>
    </div>

    {/* KYC Documents Section */}
    <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <FileText size={16} className="text-gray-400" />
        <span>KYC Documents</span>
      </div>
      
      {/* Dynamic Status Badge */}
      {listener?.isKycVerified ? (
        <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
          <ShieldCheck size={12} /> VERIFIED
        </span>
      ) : (
        <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
          NOT VERIFIED
        </span>
      )}
    </div>
  </div>
</div>

          </div>
        </div>
      )}

      {/* PERFORMANCE TAB */}
      {activeTab === "Performance" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-8">Core Metrics</h3>
            <div className="space-y-8">
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-gray-600 font-medium">Acceptance Rate</span>
                <span className="text-2xl font-bold text-green-500">94.2%</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-4">
                <span className="text-gray-600 font-medium">Average Duration</span>
                <span className="text-2xl font-bold">18m 30s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">User Retention Rate</span>
                <span className="text-2xl font-bold text-indigo-600">68%</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Reviews & Ratings</h3>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-5xl font-bold">4.8</span>
              <div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" />)}
                </div>
                <p className="text-sm text-gray-500 mt-1">Based on 1,240 completed sessions</p>
              </div>
            </div>
            <div className="space-y-3">
              {[85, 10, 3, 1, 1].map((p, i) => (
                <div key={i} className="flex items-center gap-4 text-sm">
                  <span className="w-12 text-gray-500">{5-i} Star</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: `${p}%` }} />
                  </div>
                  <span className="w-8 text-right text-gray-400">{p}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FINANCIALS TAB */}
      {activeTab === "Financials" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Lifetime Earnings</p>
              <p className="text-3xl font-bold">₹3,80,250</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Pending Clearance</p>
              <p className="text-3xl font-bold">₹12,500</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Penalties</p>
              <p className="text-3xl font-bold text-red-500">₹450</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold">Recent Transactions</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm">
                <Download size={16} /> Download
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">TXN ID</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="text-sm">
                    <td className="px-6 py-4 font-medium text-indigo-600">{txn.id}</td>
                    <td className="px-6 py-4">{txn.type}</td>
                    <td className={`px-6 py-4 text-right font-bold ${txn.status === 'plus' ? 'text-green-600' : 'text-red-500'}`}>
                      {txn.status === 'plus' ? '+' : '-'}₹{txn.amount}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ACTIVITY LOGS TAB */}
      {activeTab === "Activity Logs" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in duration-300">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold">Detailed Activity Feed</h3>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm">
              <FileText size={16} /> Export
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Device/IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {activityLogs.map((log, i) => (
                <tr key={i} className="text-sm">
                  <td className="px-6 py-4 text-gray-400">{log.time}</td>
                  <td className={`px-6 py-4 font-bold ${log.status === 'error' ? 'text-red-500' : 'text-gray-900'}`}>{log.action}</td>
                  <td className="px-6 py-4 text-gray-500">{log.details}</td>
                  <td className="px-6 py-4 text-gray-400">{log.device}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}