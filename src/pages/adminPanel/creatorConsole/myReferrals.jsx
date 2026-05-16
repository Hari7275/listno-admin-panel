import React, { useState } from 'react';
import { 
  Search, Bell, Link as LinkIcon, Copy, 
  Users, UserCheck, BarChart3, Download,
  LayoutDashboard, Wallet, UserPlus, Settings, LogOut
} from 'lucide-react';

const ReferralDashboard = () => {
  const [copied, setCopied] = useState(false);

  const stats = [
    { label: 'Total Users Referred', value: '1240', change: '+45', icon: Users },
    { label: 'Active Users', value: '850', change: '+12', icon: UserCheck },
    { label: 'Conversion Rate', value: '68%', change: '+2.1%', icon: BarChart3 },
  ];

  const tableData = [
    { id: 'USR-1001', name: 'Ravi Verma', date: '12 Oct 2023', status: 'Active', spend: '₹12,500', commission: '₹1,000' },
    { id: 'USR-1002', name: 'Aisha Khan', date: '15 Oct 2023', status: 'Active', spend: '₹4,200', commission: '₹336' },
    { id: 'USR-1003', name: 'Rahul D', date: '01 Nov 2023', status: 'Inactive', spend: '₹0', commission: '₹0' },
    { id: 'USR-1004', name: 'Pooja Singh', date: '10 Nov 2023', status: 'Active', spend: '₹28,400', commission: '₹2,272' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText("https://listener.app/join/NEHA20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-900 font-sans">
    

      {/* Main Content */}
      <main className="flex-1 p-8">
       

        {/* User Profile Info (Moved outside the card) */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Neha Vlogs</h1>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-md">Active Partner</span>
          </div>
          <p className="text-xs text-gray-400 font-medium">ID: INF-01 • Joined: Jan 2023</p>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Link Section Card */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-sm font-bold text-gray-600 mb-4 flex items-center gap-2">
                <LinkIcon size={16} className="text-indigo-600" /> Dedicated Referral Link
              </p>
              
              <div className="flex gap-2 mb-8">
                <div className="flex-1 flex items-center bg-gray-50 border border-gray-100 px-4 py-3.5 rounded-2xl">
                  <span className="text-indigo-600 font-semibold truncate text-sm">https://listener.app/join/NEHA20</span>
                </div>
                <button 
                  onClick={handleCopy}
                  className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl flex items-center gap-2 font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                >
                  <Copy size={18} /> {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>

              <div className="flex gap-12">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Referral Code</p>
                  <p className="font-extrabold text-slate-800 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">NEHA20</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Landing Page</p>
                  <p className="font-extrabold text-green-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Enabled
                  </p>
                </div>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
          </div>

          {/* Earnings Card */}
          <div className="bg-indigo-600 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl shadow-indigo-100 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-indigo-100/80 text-xs font-bold uppercase tracking-widest">Total Earnings</p>
              <h2 className="text-5xl font-extrabold mt-2 tracking-tighter">₹45,200</h2>
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-green-400 text-indigo-900 px-2 py-0.5 rounded text-[10px] font-black">↑ 12.5%</span>
                <span className="text-xs text-indigo-100">this month</span>
              </div>
            </div>
            <button className="w-full py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl transition-all font-bold text-sm relative z-10">
              Revenue Details
            </button>
            {/* Abstract Shape */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                <p className="text-green-600 text-xs font-bold mt-1">{stat.change} <span className="font-medium text-gray-300 ml-1">last month</span></p>
              </div>
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-indigo-600 border border-gray-100">
                <stat.icon size={22} />
              </div>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-extrabold tracking-tight">Onboarded Users & Revenue</h3>
              <p className="text-sm text-gray-400 font-medium">Monitoring your referral network performance</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="text" placeholder="Search users..." className="pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/10 transition-all"/>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                <Download size={14} /> Export
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-[0.1em]">
                  <th className="px-8 py-4">User Details</th>
                  <th className="px-8 py-4">Join Date</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Total Spend</th>
                  <th className="px-8 py-4 text-right">Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{row.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{row.id}</p>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-500 font-medium">{row.date}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold text-sm text-right text-slate-600">{row.spend}</td>
                    <td className="px-8 py-5 text-right">
                      <span className="text-indigo-600 font-black text-sm">{row.commission}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 text-center bg-gray-50/30 border-t border-gray-50">
            <button className="text-xs font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">Load More Results</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReferralDashboard;