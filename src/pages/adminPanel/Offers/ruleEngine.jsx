import React, { useState } from 'react';
import { 
  Plus, Settings, ToggleLeft, ToggleRight, 
  Edit2, Trash2, X, ChevronDown, Info, AlertTriangle, 
  Search, SlidersHorizontal, ArrowDownToLine, RefreshCw, Zap
} from 'lucide-react';

const initialRules = [
  { id: 1, name: 'Inactive Win-back Offer', type: 'USER_ACTIVITY', condition: 'Last login > 15 days', actionType: 'DISCOUNT_PERCENT', actionValue: '30%', priority: 5, isActive: true },
  { id: 2, name: 'Whale Spender Multiplier', type: 'TRANSACTION', condition: 'Total spend > ₹10,000', actionType: 'FREE_VIDEO_CALL', actionValue: '5m', priority: 1, isActive: true },
  { id: 3, name: 'Weekend Surge Pricing Free Chat', type: 'DATE_RANGE', condition: 'Day = Sat OR Sun', actionType: 'FREE_CHAT', actionValue: '10m', priority: 10, isActive: false }
];

export default function RuleEngine() {
  const [rules, setRules] = useState(initialRules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form Logic States
  const [ruleName, setRuleName] = useState('');
  const [conditionType, setConditionType] = useState('USER_ATTRIBUTE');
  const [criteriaField, setCriteriaField] = useState('Total Spend');
  const [operator, setOperator] = useState('>');
  const [criteriaValue, setCriteriaValue] = useState('');
  const [actionType, setActionType] = useState('FREE_CHAT');
  const [actionValue, setActionValue] = useState('');
  const [priority, setPriority] = useState('10');

  const handleToggleStatus = (id) => {
    setRules(rules.map(rule => rule.id === id ? { ...rule, isActive: !rule.isActive } : rule));
  };

  const handleCreateRule = (e) => {
    e.preventDefault();
    const newRule = {
      id: Date.now(),
      name: ruleName || 'Untitled Logic Rule',
      type: conditionType,
      condition: `${criteriaField} ${operator} ${criteriaValue || '0'}`,
      actionType: actionType,
      actionValue: actionValue || '0',
      priority: parseInt(priority) || 10,
      isActive: true
    };
    setRules([...rules, newRule]);
    setIsModalOpen(false);
    setRuleName('');
    setCriteriaValue('');
    setActionValue('');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased font-sans">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        
        {/* Breadcrumb & Navigation Header Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-xs">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                <Zap size={20} fill="currentColor" strokeWidth={0} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900">Rule Engine</h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Automation & Automation Blocks</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-black text-slate-500 bg-white border border-slate-200/80 rounded-xl shadow-xs hover:bg-slate-50 transition cursor-pointer">
              <SlidersHorizontal size={14} strokeWidth={2.5} /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-black text-slate-500 bg-white border border-slate-200/80 rounded-xl shadow-xs hover:bg-slate-50 transition cursor-pointer">
              <ArrowDownToLine size={14} strokeWidth={2.5} /> Export logs
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-black text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-lg shadow-slate-900/10 transition-all ml-auto md:ml-0 cursor-pointer"
            >
              <Plus size={14} strokeWidth={3} /> Create New Rule
            </button>
          </div>
        </div>

        {/* Live Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder="Filter specific active workflow rules..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/60 transition shadow-xs"
            />
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs text-slate-400 hover:text-slate-600 transition cursor-pointer ml-auto sm:ml-0">
            <RefreshCw size={14} strokeWidth={2.5} />
          </div>
        </div>

        {/* Data Table Viewport */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-black text-[10px] tracking-widest uppercase">
                  <th className="p-4 pl-8">Rule Structure / Identity</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Condition Expression</th>
                  <th className="p-4">Trigger Action Payload</th>
                  <th className="p-4 text-center">Priority</th>
                  <th className="p-4 text-center">Engine Status</th>
                  <th className="p-4 pr-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-600">
                {rules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-4 pl-8">
                      <span className="font-black text-slate-900 text-sm block">{rule.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">ID: system_rule_{rule.id}</span>
                    </td>
                    <td className="p-4">
                      <span className="inline-block text-[10px] font-black tracking-wider px-2 py-1 rounded-md bg-slate-100 text-slate-500">
                        {rule.type}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">{rule.condition}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-indigo-700 bg-indigo-50 border border-indigo-100/40 px-2.5 py-1 rounded-lg">
                        {rule.actionType} <span className="opacity-40">→</span> {rule.actionValue}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded font-black text-[11px] ${rule.priority <= 2 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-700'}`}>
                        {rule.priority}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggleStatus(rule.id)}
                        className={`transition-colors rounded-full focus:outline-none cursor-pointer ${rule.isActive ? 'text-indigo-600' : 'text-slate-300'}`}
                      >
                        {rule.isActive ? <ToggleRight size={38} strokeWidth={1.2} /> : <ToggleLeft size={38} strokeWidth={1.2} />}
                      </button>
                    </td>
                    <td className="p-4 pr-8 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer">
                          <Edit2 size={14} strokeWidth={2.5} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer">
                          <Trash2 size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CREATE LOGIC RULE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Navigation Block */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Create Logic Rule</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">System Rule Configurator</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full border border-slate-100 shadow-sm transition cursor-pointer"
              >
                <X size={18} strokeWidth={2.5}/>
              </button>
            </div>
            
            {/* Scrollable Container Content Body */}
            <form onSubmit={handleCreateRule} className="p-8 space-y-6 overflow-y-auto flex-1">
              
              {/* Parameter Block: Rule Name */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Rule Identity / Title</label>
                <input 
                  type="text" 
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  placeholder="e.g. Reactivate Churn Users" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none focus:border-indigo-500 transition" 
                />
              </div>

              {/* Logical Evaluation Box: IF BLOCK */}
              <div className="space-y-4 pt-2">
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 w-max">
                  <Settings size={12} strokeWidth={3} /> IF Conditional Logic Block
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Select Conditional Input */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Condition Type</label>
                    <div className="relative">
                      <select 
                        value={conditionType}
                        onChange={(e) => setConditionType(e.target.value)}
                        className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-black text-slate-700 outline-none cursor-pointer focus:bg-white focus:border-indigo-500 transition"
                      >
                        <option value="USER_ATTRIBUTE">USER_ATTRIBUTE</option>
                        <option value="USER_ACTIVITY">USER_ACTIVITY</option>
                        <option value="DATE_RANGE">DATE_RANGE</option>
                        <option value="TRANSACTION">TRANSACTION</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Inner Target Metric Expression Builder Row */}
                  <div>
                    <div className="relative">
                      <select 
                        value={criteriaField}
                        onChange={(e) => setCriteriaField(e.target.value)}
                        className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-black text-slate-700 outline-none cursor-pointer focus:bg-white focus:border-indigo-500 transition"
                      >
                        <option value="Last Login">Last Login</option>
                        <option value="Total Spend">Total Spend</option>
                        <option value="Signup Days">Signup Days</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Math Condition Parameter Settings */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="relative col-span-1">
                      <select 
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        className="w-full appearance-none px-2 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-black text-slate-700 text-center outline-none cursor-pointer focus:bg-white focus:border-indigo-500 transition"
                      >
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value="=">=</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} strokeWidth={2.5} />
                    </div>
                    
                    <input 
                      type="text"
                      value={criteriaValue}
                      onChange={(e) => setCriteriaValue(e.target.value)}
                      placeholder="e.g. 15"
                      className="col-span-2 px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <button type="button" className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer transition">
                  + Add Nested AND Parameter Clause
                </button>
              </div>

              {/* Execution Block Settings: THEN BLOCK */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 w-max">
                  <Settings size={12} strokeWidth={3} /> THEN Executable Action Payload
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Action Dropdown Type selectors */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Action Type</label>
                    <div className="relative">
                      <select 
                        value={actionType}
                        onChange={(e) => setActionType(e.target.value)}
                        className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-black text-slate-700 outline-none cursor-pointer focus:bg-white focus:border-indigo-500 transition"
                      >
                        <option value="FREE_CHAT">FREE_CHAT</option>
                        <option value="FREE_CALL">FREE_CALL</option>
                        <option value="DISCOUNT_PERCENT">DISCOUNT_PERCENT</option>
                        <option value="DISCOUNT_FLAT">DISCOUNT_FLAT</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Operational Value field specs */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Action Value</label>
                    <input 
                      type="text"
                      value={actionValue}
                      onChange={(e) => setActionValue(e.target.value)}
                      placeholder="e.g. 10m / 30%"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Rule Processing Engine Priority Configurations */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Engine Priority Rank Block (1-100)</label>
                  <input 
                    type="number"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    placeholder="10"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none focus:border-indigo-500 transition"
                  />
                </div>

                {/* Priority Conflict Error Alert Notification Box */}
                {priority === '10' && (
                  <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-150">
                    <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={16} strokeWidth={2.5} />
                    <div className="space-y-0.5">
                      <h5 className="text-[11px] font-black text-amber-900 uppercase tracking-wide">Priority Conflict Warning Alert</h5>
                      <p className="text-xs text-amber-700/90 font-medium leading-relaxed">
                        Rule <strong className="text-amber-900 font-bold">Weekend Surge Pricing Free Chat</strong> already contains rank priority 10. Change rank value index allocation parameters to prevent pipeline collision.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Buttons layout */}
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)} 
                  className="px-5 py-3 text-xs font-black text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-7 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black shadow-lg shadow-slate-900/10 transition cursor-pointer"
                >
                  Activate Logic Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}