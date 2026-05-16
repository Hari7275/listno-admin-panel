import React from 'react';
import { 
  TrendingUp, Users, CreditCard, PieChart, 
  BarChart2, Zap, MoreHorizontal, ChevronRight,
  Search, Bell, Download
} from 'lucide-react';

const OffersDashboard = () => {
  const stats = [
    { label: 'Total Revenue (7d)', value: '₹18,50,000', change: '14%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Offer Users', value: '14,203', change: '2.1%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Subscriptions', value: '8,912', change: '1.5%', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Overall Offer Usage', value: '42%', sub: 'Of total transacting users', icon: PieChart, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const performingOffers = [
    { name: 'Diwali Dhamaka', desc: '50% Off • Festival', claims: '4864 claims', progress: 85, color: 'bg-orange-500' },
    { name: 'Welcome Bonus', desc: 'Flat ₹100 • New User', claims: '3824 claims', progress: 65, color: 'bg-indigo-500' },
    { name: 'Midnight Happy Hour', desc: '10 PM - 2 AM • Flash', claims: '2202 claims', progress: 40, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen text-slate-900 font-sans p-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Offers & Growth</h1>
            <p className="text-slate-400 text-sm mt-1 font-medium">
              High-level view of offer redemption, revenue impact, and rule executions.
            </p>
          </div>
          
        </div>

        {/* Stats Grid - Updated to White Theme */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  {stats.map((stat, i) => (
    <div 
      key={i} 
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group hover:border-indigo-100 transition-all"
    >
      {/* Top Label & Menu Icon */}
      <div className="flex justify-between items-start mb-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          {stat.label}
        </p>
        <button className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={18}/>
        </button>
      </div>

      {/* Main Value */}
      <h3 className="text-[28px] font-black text-slate-900 tracking-tight leading-none mb-4">
        {stat.value}
      </h3>

      {/* Footer Metric / Change Indicator */}
      <div className="flex items-center gap-1.5">
        {stat.change ? (
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
            <TrendingUp size={14} className="stroke-[3px]" />
            <span>{stat.change}</span>
            <span className="text-slate-300 font-medium ml-0.5 uppercase text-[10px] tracking-wide">
              vs last period
            </span>
          </div>
        ) : (
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
            {stat.sub}
          </p>
        )}
      </div>

      {/* Subtle background decoration to keep it from looking "flat" */}
      <div className="absolute -right-2 -bottom-2 text-slate-50/50 pointer-events-none group-hover:text-indigo-50/50 transition-colors">
        <stat.icon size={64} strokeWidth={1} />
      </div>
    </div>
  ))}
</div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
  
  {/* Daily Revenue vs Offer Impact */}
  <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[400px] flex flex-col">
    <div className="flex items-center gap-2 mb-2">
      <TrendingUp size={18} className="text-indigo-600" />
      <h3 className="text-lg font-black text-slate-900 tracking-tight">Daily Revenue vs Offer Impact</h3>
    </div>
    <p className="text-xs text-slate-400 font-medium mb-10">
      Purple indicates revenue driven by offers.
    </p>
    
    {/* Bar Chart Area */}
    <div className="flex-1 flex items-end justify-between gap-2 px-2">
      {[40, 65, 30, 85, 55, 75, 45, 95, 60, 80, 50, 70, 40, 60, 90].map((h, i) => (
        <div key={i} className="flex-1 group relative flex flex-col items-center">
          {/* Main Bar */}
          <div className="w-full bg-slate-100 rounded-t-sm transition-all" style={{ height: `${h}%` }}></div>
          {/* Offer Impact Overlay */}
          <div className="absolute bottom-0 w-full bg-indigo-600 rounded-t-sm" style={{ height: `${h * 0.4}%` }}></div>
        </div>
      ))}
    </div>
  </div>

  {/* Top Performing Offers */}
  <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
    <div className="flex items-center gap-2 mb-8">
      <Zap size={18} className="text-amber-500" fill="currentColor" />
      <h3 className="text-lg font-black text-slate-900 tracking-tight">Top Performing Offers</h3>
    </div>

    <div className="space-y-8 flex-1">
      {performingOffers.map((offer, i) => (
        <div key={i}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-bold text-slate-800 text-sm leading-tight">{offer.name}</p>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">{offer.desc}</p>
            </div>
            <span className="text-xs font-black text-slate-900">{offer.claims}</span>
          </div>
          
          {/* Progress Bar matched to image */}
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div 
              className={`h-full transition-all duration-1000 ${offer.color} rounded-full`} 
              style={{ width: `${offer.progress}%` }}
            ></div>
            <div className="flex-1 bg-slate-200/50"></div>
          </div>
        </div>
      ))}
    </div>
  </div>

</div>
      </div>
    </div>
  );
};

export default OffersDashboard;