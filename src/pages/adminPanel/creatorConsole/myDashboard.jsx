import React from 'react';
import { Link as LinkIcon, Copy } from 'lucide-react';

const DashboardContent = () => {
  const referrals = [
    { name: 'Ravi Verma', date: '12 Oct 2023', status: 'Active', commission: '₹1,000', isActive: true },
    { name: 'Aisha Khan', date: '15 Oct 2023', status: 'Active', commission: '₹336', isActive: true },
    { name: 'Rahul D', date: '01 Nov 2023', status: 'Inactive', commission: '₹0', isActive: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans text-gray-900">
      <div className="mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">
            Welcome back, Neha! 👋
          </h1>
          <p className="text-gray-500">
            Here is what's happening with your referrals today.
          </p>
        </div>

        {/* Top Cards (Referral Link & Payout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Referral Link Card */}
           <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                Your Referral Link
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 rounded-xl p-2 border border-gray-200">
                <input
                  type="text"
                  readOnly
                  value="https://listener.app/join/NEHA20"
                  className="bg-transparent w-full flex-1 outline-none text-gray-700 px-3 py-2 font-medium"
                />
                <button className="w-full sm:w-auto whitespace-nowrap bg-[#5c50e6] hover:bg-[#4b40cc] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>
            <div className="mt-6 flex flex-col">
              <span className="text-xs font-medium text-gray-500 mb-1">Your Code</span>
              <span className="text-[#5c50e6] font-bold text-lg">NEHA20</span>
            </div>
          </div> 


          {/* Available for Payout Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                Available for Payout
              </h2>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">
                ₹12,400
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Total earned: ₹45,200
              </div>
            </div>
            <button className="mt-6 w-full bg-[#5c50e6] hover:bg-[#4b40cc] text-white py-3 rounded-xl font-medium transition-colors">
              Request Payout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Stat 1 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Total Users Referred</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-900">1,240</div>
            </div>
            <div className="mt-2 text-sm font-medium text-green-600 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              +12 <span className="text-gray-400 ml-1">vs last month</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Active Users</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-900">850</div>
            </div>
            <div className="mt-2 text-sm font-medium text-green-600 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              +8 <span className="text-gray-400 ml-1">vs last month</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Conversion Rate</h3>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-900">68%</div>
            </div>
            <div className="mt-2 text-sm font-medium text-green-600 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              +1.2% <span className="text-gray-400 ml-1">vs last month</span>
            </div>
          </div>
        </div>

        {/* Recent Referrals Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Recent Referrals</h2>
            <p className="text-sm text-gray-500 mt-1">Users who recently joined using your link</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Your Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {referrals.map((referral, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {referral.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                      {referral.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        referral.isActive 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-right font-semibold ${
                      referral.isActive ? 'text-emerald-600' : 'text-gray-400'
                    }`}>
                      {referral.commission}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardContent;