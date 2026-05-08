import React, { useState } from "react";
import { Activity, Bell, HeartPulse, ArrowRight, DollarSign, X, Wifi, UserCheck } from "lucide-react";

// Matches data shown in the video list
const listenersOnCall = [
  {
    name: "Anjali K.",
    id: "L-104",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    type: "EXTERNAL",
    status: "On Call",
    talkingWith: "U-8821",
    duration: "09:44",
    earnings: "876",
  },
  {
    name: "Vikram S.",
    id: "L-305",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    type: "INTERNAL",
    status: "On Call",
    talkingWith: "U-1192",
    duration: "06:00",
    earnings: "288",
  },
  {
    name: "Rohan D.",
    id: "L-511",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    type: "EXTERNAL",
    status: "Online",
    talkingWith: "--",
    duration: "--:--",
    earnings: "0",
  },
];


export default function LiveMonitoringPage() {
  const [activeModal, setActiveModal] = useState(null); // 'health' or 'nudge'
  const [selectedListener, setSelectedListener] = useState(null);
  const [nudgePreset, setNudgePreset] = useState("Check Mic");

  const closeModal = () => {
    setActiveModal(null);
    setSelectedListener(null);
  };

  return (
    <div className=" font-sans">
      {/* Page Header */}
      <div className="mb-10 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-950">Live Monitoring</h1>
            <div className="w-2 h-2 rounded-full bg-blue-700 mt-1 animate-pulse"></div>
          </div>
          <p className="text-sm text-gray-500 mt-1.5">
            Real-time view of ongoing calls and active listeners.
          </p>
        </div>
        
        
      </div>

      {/* Stats Cards Row */}
      {/* Stats Cards Grid - Matched to image_55fefb.jpg */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Currently Live Calls", value: "24", change: "12%" },
          { title: "Listeners Online", value: "142", change: null },
          { title: "Live Platform Earnings/Hr", value: "₹45,000", change: "5%", unit: "Hr" },
        ].map((card, idx) => (
          <div key={idx} className="bg-white p-7 rounded-[22px] border border-[#f1ece6] shadow-sm flex-1">
            <p className="text-[14px] text-gray-500 font-medium mb-4">{card.title}</p>
            
            <div className="flex items-baseline gap-1">
              <h3 className="text-[40px] font-bold text-gray-950 tracking-tight leading-none">
                {card.value}
              </h3>
              {card.unit && (
                <span className="text-[20px] font-semibold text-gray-400">/{card.unit}</span>
              )}
            </div>

            {card.change && (
              <div className="flex items-center gap-1 mt-3">
                <span className="text-[14px] font-bold text-[#10b981]">
                  ↑ {card.change}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Table Card */}
    {/* Table Section - Updated to match video content precisely */}
      <div className="bg-white rounded-2xl border border-[#f1ece6] shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left border-collapse">
            <thead className="bg-[#f7f3ee] text-[#8b6f47] text-[11px] uppercase font-bold tracking-widest border-b border-[#eee7df]">
              <tr>
                <th className="px-6 py-4">Listener</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Live Status</th>
                <th className="px-6 py-4 text-center">Talking With</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Current Earnings</th>
                <th className="px-6 py-4 text-right pr-10">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3ede7]">
              {listenersOnCall.map((listener, idx) => (
                <tr key={idx} className="hover:bg-[#faf7f4] transition-colors group">
                  {/* Listener Info */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <img src={listener.avatar} alt="" className="w-11 h-11 rounded-full object-cover border border-gray-100" />
                      <div>
                        <p className="font-bold text-[14px] text-gray-900 leading-tight">{listener.name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5 uppercase">{listener.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Type Badge */}
                  <td className="px-6 py-5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                      listener.type === "INTERNAL" ? "bg-[#efe7ff] text-purple-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      {listener.type}
                    </span>
                  </td>

                  {/* Live Status - Updated to match glowing pulse effect from video */}
<td className="px-6 py-5">
  <div className="flex items-center gap-2.5">
    <div className="relative flex h-2 w-2">
      {/* The glowing outer pulse - only for "On Call" */}
      {listener.status === "On Call" && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
      )}
      {/* The solid center dot */}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${
        listener.status === "On Call" ? "bg-blue-600" : "bg-green-500"
      }`}></span>
    </div>
    <span className={`text-[13px] font-bold ${
      listener.status === "On Call" ? "text-blue-600" : "text-green-600"
    }`}>
      {listener.status}
    </span>
  </div>
</td>

                  {/* Talking With */}
                  <td className="px-6 py-5 text-[13px] text-gray-600 font-semibold text-center">
                    {listener.talkingWith}
                  </td>

                  {/* Duration */}
                  <td className="px-6 py-5 text-[13px] text-gray-900 font-bold tabular-nums">
                    {listener.duration}
                  </td>

                  {/* Current Earnings */}
                  <td className="px-6 py-5 text-[13px] text-green-600 font-bold">
                    ₹{listener.earnings}
                  </td>

                  {/* Admin Actions - Updated Icons and Layout */}
                  <td className="px-6 py-5 text-right pr-8">
                    <div className="flex items-center gap-3 justify-end">
                      <button 
                        onClick={() => { setSelectedListener(listener); setActiveModal('health'); }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-blue-100 text-blue-600 text-[12px] font-bold hover:bg-blue-600 hover:text-white transition-all duration-200"
                      >
                        <Activity size={25} /> Connection Health
                      </button>
                      <button 
                        onClick={() => { setSelectedListener(listener); setActiveModal('nudge'); }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 text-gray-600 text-[12px] font-bold hover:bg-gray-900 hover:text-white transition-all duration-200"
                      >
                        <Bell size={25} /> System Nudge
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {activeModal === 'health' && (
  <Modal 
    title={
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Wifi size={20} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">Connection Health</h3>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Live Diagnostics: {selectedListener?.name}</p>
        </div>
      </div>
    } 
    onClose={closeModal}
  >
    {/* 4 Metric Cards - Exact Colors & Styling from Video */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="p-4 rounded-2xl bg-[#f8fafc] border border-blue-50">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ping</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-[#10b981]">42</span>
          <span className="text-[12px] font-bold text-gray-300">ms</span>
        </div>
      </div>
      <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Packet Loss</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-[#10b981]">0.1</span>
          <span className="text-[12px] font-bold text-gray-300">%</span>
        </div>
      </div>
      <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Bitrate</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-gray-900">1.2</span>
          <span className="text-[12px] font-bold text-gray-300">Mbps</span>
        </div>
      </div>
      <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Jitter</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-[#10b981]">8</span>
          <span className="text-[12px] font-bold text-gray-300">ms</span>
        </div>
      </div>
    </div>

    {/* Network Stability with Animated Bars */}
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Network Stability (Last 60s)</span>
        <span className="text-[10px] font-bold text-white bg-[#10b981] px-2.5 py-0.5 rounded-full">Excellent</span>
      </div>
      
      <div className="flex items-end gap-[3px] h-16 px-1">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="flex-1 bg-[#10b981]/20 rounded-t-[1px] transition-all duration-500 ease-in-out"
            style={{ 
              height: `${40 + Math.random() * 60}%`,
              animation: `barPulse 2s infinite ease-in-out ${i * 0.1}s`,
              backgroundColor: i > 25 ? '#10b981' : '' 
            }}
          ></div>
        ))}
      </div>
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes barPulse {
        0%, 100% { transform: scaleY(1); opacity: 0.3; }
        50% { transform: scaleY(0.7); opacity: 0.8; }
      }
    `}} />
  </Modal>
)}

      {activeModal === 'nudge' && (
        <Modal title="System Nudge" subtitle={`Target: ${selectedListener?.name} (${selectedListener?.id})`} onClose={closeModal}>
          <div className="space-y-6">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Choose Preset Alert</label>
              <div className="flex flex-wrap gap-2">
                {["Check Mic", "Shift Ending", "Wrap Up"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setNudgePreset(type)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${nudgePreset === type ? 'bg-purple-600 border-purple-600 text-white shadow-md transform scale-105' : 'bg-white border-gray-100 text-gray-500 hover:border-purple-200 hover:text-purple-600'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Message Preview</label>
              <textarea 
                className="w-full border-2 border-gray-50 rounded-2xl p-4 text-sm text-gray-700 focus:border-purple-100 focus:bg-purple-50/10 outline-none h-28 resize-none transition-all"
                placeholder="Type custom nudge message..."
                value={nudgePreset === "Wrap Up" ? "Please wrap up the current call shortly." : nudgePreset === "Check Mic" ? "Please check your microphone connection." : "Your shift ends in 10 minutes."}
                readOnly
              />
            </div>
            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex gap-3">
               <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Activity size={14} className="text-blue-600" />
               </div>
               <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                 Nudges are delivered instantly to the listener's dashboard as a priority notification. <span className="font-bold underline">End-users cannot see these communications.</span>
               </p>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-2xl font-bold text-sm shadow-[0_4px_12px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] transition-all active:scale-[0.98]">
              Send Silent Alert
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatCard({ title, value, change, icon: Icon, color, unit }) {
  return (
    <div className="bg-white p-6 rounded-[22px] border border-[#f1ece6] shadow-[0_2px_8px_rgba(0,0,0,0.03)] group hover:border-gray-200 transition-all">
      <div className="flex justify-between items-start mb-6">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{title}</p>
        <div className={`p-2.5 rounded-xl bg-gray-50/80 ${color} group-hover:scale-110 transition-transform`}><Icon size={18} /></div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <h3 className="text-[32px] font-extrabold text-gray-950 tracking-tight">{value}</h3>
        {unit && <span className="text-xl font-bold text-gray-400">/{unit}</span>}
      </div>
      {change && (
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-[12px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">{change}</span>
          <span className="text-[11px] font-medium text-gray-400 italic">vs last hour</span>
        </div>
      )}
    </div>
  );
}

function Modal({ title, subtitle, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-[#fafafa]">
          <div>
            <h3 className="text-xl font-extrabold text-gray-950 tracking-tight">{title}</h3>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-1">{subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-gray-100 rounded-full transition-all text-gray-400"><X size={20} /></button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

function HealthStat({ label, value, unit }) {
  return (
    <div className="p-4 border border-gray-100 rounded-2xl bg-white hover:border-blue-100 transition-colors">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</p>
      <p className="text-2xl font-extrabold text-gray-900">{value}<span className="text-[14px] text-gray-300 ml-1 font-bold">{unit}</span></p>
    </div>
  );
}