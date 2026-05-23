import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Phone, Loader2, Star, Download, 
  ArrowDown, FileText, Mail, ShieldCheck 
} from "lucide-react";
import { useGetAdminCoachProfileQuery 
  ,useGetRecentActivityQuery, 
  useGetDailyStatsQuery,
  useGetCoachPerformanceQuery,
useGetCoachFinancialsQuery,
useGetActivityLogsQuery} from "../../../store/api/auth/adminLogin";

export default function ListenerProfile() {
  const navigate = useNavigate();
  const { coachId } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");

  const { data, isLoading, isError } = useGetAdminCoachProfileQuery(
    { coachId },
    { skip: !coachId }
  );

  const { data: dailyStatsData, isLoading: dailyStatsLoading } =
  useGetDailyStatsQuery({ coachId });

  const listener = data?.data?.adminCoachProfile;
  const dailyStats = dailyStatsData?.data?.dailyStats;

  const {
  data: recentActivityData,
  isLoading: activityLoading,
  isError: activityError,
} = useGetRecentActivityQuery(
  { userId: coachId },
  { skip: !coachId }
);

const recentActivities =
  recentActivityData?.data?.recentActivity || [];

 const {
  data: performanceData,
  isLoading: performanceLoading,
  isError: performanceError,
} = useGetCoachPerformanceQuery(
  { coachId },
  { skip: !coachId || activeTab !== "Performance", }
);

const coreMetrics =
  performanceData?.data?.coachPerformance?.coreMetrics;

const reviewRating =
  performanceData?.data?.coachPerformance?.reviewRating;

  const {
  data: financialData,
  isLoading: financialLoading,
  isError: financialError,
} = useGetCoachFinancialsQuery(
  { coachId },
  {  skip: !coachId || activeTab !== "Financials", }
);

const financials =
  financialData?.data?.coachFinancials;

const overview = financials?.overview;

const recentTransactions =
  financials?.recentTransactions?.transactions || [];

 const { 
  data: activityLogsData, 
  isLoading: logsLoading, 
  isError: logsError, } 
  = useGetActivityLogsQuery(
     { userId: coachId }, 
     { skip: !coachId || activeTab !== "Activity Logs", } 
    );

const activityLogs =
  activityLogsData?.data?.activityLogs || [];

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
            src={listener.profilePhoto || "https://randomuser.me/api/portraits/men/32.jpg"} 
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-100" 
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{listener.displayName}</h2>
            <p className="text-sm text-gray-500 mt-1">ID: {coachId} • Joined {new Date(listener.appliedDate).toLocaleDateString()}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md">{listener.coachType }</span>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-md">{listener.coachLevelName}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-md ${listener.accountStatus === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {listener.accountStatus }
              </span>
              <span className="ml-2 text-yellow-500 font-semibold text-sm">
                ★ {listener.rankingScore } <span className="text-gray-400 font-normal">({listener.reviewCount || 0} reviews)</span>
              </span>

                {/* Total Calls */}
  <span className="text-gray-700 text-sm font-medium flex items-center gap-1">
    🎧 {listener.totalCalls } Total Calls
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
      <p className="text-3xl font-bold">
        {dailyStats?.callsTaken }
      </p>
    </div>

    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">Talk Time</p>
      <p className="text-3xl font-bold">
        {dailyStats?.talkTime }
      </p>
    </div>

    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      <p className="text-sm text-gray-500 mb-1">Earnings</p>
      <p className="text-3xl font-bold text-green-600">
        ₹{dailyStats?.earnings }
      </p>
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
                  {activityLoading ? (
  <div className="text-center py-6 text-gray-500">
    Loading recent activity...
  </div>
) : activityError ? (
  <div className="text-center py-6 text-red-500">
    Failed to load activity
  </div>
) : recentActivities.length === 0 ? (
  <div className="text-center py-6 text-gray-400">
    No recent activity found
  </div>
) : (
  recentActivities.map((item, idx) => (
    <div key={idx} className="flex gap-8 relative">
      <div className="text-sm text-gray-400 w-20 pt-1 text-right font-medium">
        {item.time}
      </div>

      <div className="relative">
        <div className="w-3 h-3 rounded-full bg-indigo-500 mt-2 z-10 relative border-4 border-white shadow-sm"></div>
      </div>

      <div>
        <p className="font-bold text-gray-900">
          {item.title}
        </p>

        <p className="text-sm text-gray-500">
          {item.description}
        </p>
      </div>
    </div>
  ))
)}
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
    
    {/* CORE METRICS */}
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold mb-8">Core Metrics</h3>

      {performanceLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="animate-spin text-gray-400" size={28} />
        </div>
      ) : performanceError ? (
        <div className="text-center py-10 text-red-500">
          Failed to load performance data
        </div>
      ) : (
        <div className="space-y-8">
          
          <div className="flex justify-between border-b border-gray-50 pb-4">
            <span className="text-gray-600 font-medium">
              Acceptance Rate
            </span>

            <span className="text-2xl font-bold text-green-500">
              {coreMetrics?.acceptanceRate || 0}%
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-50 pb-4">
            <span className="text-gray-600 font-medium">
              Average Duration
            </span>

            <span className="text-2xl font-bold">
              {coreMetrics?.averageDuration || "0 mins"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">
              User Retention Rate
            </span>

            <span className="text-2xl font-bold text-indigo-600">
              {coreMetrics?.userRetentionRate || 0}%
            </span>
          </div>
        </div>
      )}
    </div>

    {/* REVIEWS & RATINGS */}
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold mb-6">
        Reviews & Ratings
      </h3>

      {performanceLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="animate-spin text-gray-400" size={28} />
        </div>
      ) : performanceError ? (
        <div className="text-center py-10 text-red-500">
          Failed to load ratings
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl font-bold">
              {reviewRating?.averageRating || 0}
            </span>

            <div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={
                      i < Math.round(reviewRating?.averageRating || 0)
                        ? "currentColor"
                        : "none"
                    }
                    stroke="currentColor"
                  />
                ))}
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Based on{" "}
                {reviewRating?.totalSessions || 0} completed
                sessions
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {reviewRating?.breakdown?.length > 0 ? (
              reviewRating.breakdown.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-sm"
                >
                  <span className="w-12 text-gray-500">
                    {item.star} Star
                  </span>

                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-400"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>

                  <span className="w-8 text-right text-gray-400">
                    {item.percentage}%
                  </span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400">
                No ratings available
              </div>
            )}
          </div>
        </>
      )}
    </div>
  </div>
)}

      {/* FINANCIALS TAB */}
{activeTab === "Financials" && (
  <div className="space-y-6 animate-in fade-in duration-300">
    
    {/* TOP CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500 mb-1">
          Lifetime Earnings
        </p>

        <p className="text-3xl font-bold">
          ₹
          {overview?.lifetimeEarnings?.toLocaleString() || 0}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500 mb-1">
          Pending Clearance
        </p>

        <p className="text-3xl font-bold">
          ₹
          {overview?.pendingClearance?.toLocaleString() || 0}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500 mb-1">
          Penalties
        </p>

        <p className="text-3xl font-bold text-red-500">
          ₹
          {overview?.penalties?.toLocaleString() || 0}
        </p>
      </div>
    </div>

    {/* TRANSACTIONS TABLE */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 className="font-bold">
          Recent Transactions
        </h3>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm">
          <Download size={16} /> Download
        </button>
      </div>

      {financialLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2
            className="animate-spin text-gray-400"
            size={28}
          />
        </div>
      ) : financialError ? (
        <div className="text-center py-12 text-red-500">
          Failed to load financial data
        </div>
      ) : (
        <table className="w-full text-left">
          
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">TXN ID</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">
                Amount
              </th>
              <th className="px-6 py-4 text-right">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            
            {recentTransactions.length > 0 ? (
              recentTransactions.map((txn) => (
                
                <tr
                  key={txn.id}
                  className="text-sm"
                >
                  <td className="px-6 py-4 font-medium text-indigo-600">
                    {txn.id}
                  </td>

                  <td className="px-6 py-4">
                    {txn.title}
                  </td>

                  <td
                    className={`px-6 py-4 text-right font-bold ${
                      txn.transactionNature === "CREDIT"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {txn.transactionNature === "CREDIT"
                      ? "+"
                      : "-"}
                    ₹{txn.amount}
                  </td>

                  <td className="px-6 py-4 text-right text-gray-400">
                    {new Date(
                      txn.dateTime
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-400"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
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
                  <td className="px-6 py-4 text-gray-400">{log.ipDevice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}