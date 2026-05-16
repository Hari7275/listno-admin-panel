import React, { useState } from 'react';
import { 
  Plus, Search, Filter, MoreVertical, 
  Edit2, Trash2, X, ChevronDown, Info 
} from 'lucide-react';

const OfferManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const offers = [
    { id: 1, name: 'Diwali Dhamaka', type: 'Festival', discount: '50% OFF', validity: '20 Oct - 25 Oct', limit: '2 / user', priority: 1, status: true },
    { id: 2, name: 'Welcome Bonus', type: 'New User', discount: 'Flat ₹100', validity: 'Always Active', limit: '1 / user', priority: 10, status: true },
    { id: 3, name: 'Midnight Happy Hour', type: 'Happy Hour', discount: '10 Free Mins', validity: 'Daily (12AM - 2AM)', limit: '1 / user', priority: 5, status: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Offer Management</h1>
            <p className="text-sm text-slate-400 font-medium mt-1">
              Create and manage discounts, coupons, and free minute campaigns.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus size={18} /> Create Offer
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search offers..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>
          <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none">
            <option>All Types</option>
            <option>Festival</option>
            <option>New User</option>
          </select>
          <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Offers Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Offer Name</th>
                <th className="p-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="p-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Discount</th>
                <th className="p-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Validity</th>
                <th className="p-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Usage Limit</th>
                <th className="p-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Priority</th>
                <th className="p-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="p-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                  <td className="p-4 font-bold text-slate-800 text-sm">{offer.name}</td>
                  <td className="p-4 text-xs font-bold text-slate-500 uppercase">{offer.type}</td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg text-xs font-black">
                      {offer.discount}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-500 font-medium">{offer.validity}</td>
                  <td className="p-4 text-xs text-slate-500 font-medium text-center">{offer.limit}</td>
                  <td className="p-4 text-center font-bold text-slate-700">{offer.priority}</td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${offer.status ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${offer.status ? 'left-6' : 'left-1'}`}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Edit2 size={16}/></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900">Create New Offer</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full border border-slate-100 shadow-sm"><X size={20}/></button>
            </div>
            
            <div className="p-8 grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Offer Name</label>
                <input type="text" placeholder="e.g. Diwali Special" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 outline-none" />
              </div>
              
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Offer Type</label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none">
                    <option>Festival</option>
                    <option>New User</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Discount Type</label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none">
                    <option>Percent (%)</option>
                    <option>Flat Amount</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Analytics Preview Box from Video */}
              <div className="col-span-2 bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={16} className="text-indigo-600" />
                  <span className="text-xs font-black text-indigo-900 uppercase tracking-tight">Analytics Preview</span>
                </div>
                <p className="text-xs text-indigo-700/80 font-medium leading-relaxed">
                  Based on active users, this offer is estimated to increase conversions by <strong className="text-indigo-900">+12.5%</strong> with a margin impact of <strong className="text-red-600">-4.5%</strong>.
                </p>
              </div>

              <div className="col-span-2 flex justify-end gap-3 pt-4">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600">Cancel</button>
                <button className="px-8 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-200">Save Offer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferManagement;