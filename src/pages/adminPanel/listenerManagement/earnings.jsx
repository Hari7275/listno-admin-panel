import { Wallet, FileDown, TrendingUp, CheckCircle2 } from "lucide-react";

const payoutData = [
  { name: "Anjali K.", id: "L-104", avatar: "https://randomuser.me/api/portraits/women/44.jpg", type: "EXTERNAL", gross: "₹10,985", cut: "-₹2,535", net: "₹8,450", status: "PENDING" },
  { name: "Rahul M.", id: "L-299", avatar: "https://randomuser.me/api/portraits/men/35.jpg", type: "EXTERNAL", gross: "₹0", cut: "-₹0", net: "₹0", status: "PENDING" },
  { name: "Vikram S.", id: "L-305", avatar: "https://randomuser.me/api/portraits/men/32.jpg", type: "INTERNAL", gross: "₹3,200", cut: "-₹0", net: "₹3,200", status: "SALARIED" },
  { name: "Sneha T.", id: "L-412", avatar: "https://randomuser.me/api/portraits/women/68.jpg", type: "EXTERNAL", gross: "₹780", cut: "-₹180", net: "₹600", status: "PENDING" },
];

function StatCard({ title, value, subText, isPrimary = false }) {
  return (
    <div className={`p-6 rounded-[20px] border border-gray-100 shadow-sm flex-1 min-w-[240px] ${isPrimary ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
      <p className={`text-sm font-medium mb-2 ${isPrimary ? 'text-indigo-100' : 'text-gray-500'}`}>{title}</p>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      {subText && <p className={`text-sm ${isPrimary ? 'text-indigo-200' : 'text-green-600 font-semibold'}`}>{subText}</p>}
    </div>
  );
}

export default function EarningsPayoutsPage() {
  return (
    <div className="p-8 bg-[#f6f7fb] min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-950">Earnings & Payouts</h1>
        <p className="text-sm text-gray-500 mt-1">
          Listener-wise financial oversight, platform commissions, and manual payout controls.
        </p>
      </div>

      {/* Top Stats and CTA Row */}
      <div className="flex flex-wrap gap-6 mb-8">
        <StatCard title="Today's Total Earnings" value="₹4,50,200" subText="↑ 8%" />
        <StatCard title="Platform Commission" value="₹1,35,060" />
        <StatCard title="Pending Payouts" value="₹1,20,500" />

        {/* Action Card */}
        <div className="bg-indigo-700 p-6 rounded-[20px] shadow-sm flex-1 min-w-[100px] flex flex-col justify-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm font-medium text-indigo-100 mb-2">Run Batch Payout</p>
            <h3 className="text-3xl font-bold">142</h3>
            <p className="text-sm text-indigo-200 mt-1">Pending accounts</p>
          </div>
        </div>
      </div>

      {/* Ledger Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-950">Listener Payout Ledger</h2>
          <button className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
            <FileDown size={16} /> Download CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#fafafa] text-gray-400 text-[11px] uppercase font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Listener</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Gross Earnings</th>
                <th className="px-6 py-4">Platform Cut (30%)</th>
                <th className="px-6 py-4">Net Payout Amount</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payoutData.map((row, idx) => (
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
                  <td className="px-6 py-4 font-medium text-gray-900">{row.gross}</td>
                  <td className="px-6 py-4 text-red-500 font-medium">{row.cut}</td>
                  <td className="px-6 py-4 font-bold text-green-600">{row.net}</td>
                  <td className="px-6 py-4">
                    {row.status === "SALARIED" ? (
                      <span className="text-gray-400 text-sm italic">Salaried</span>
                    ) : (
                      <button className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
                        Approve Payout
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}