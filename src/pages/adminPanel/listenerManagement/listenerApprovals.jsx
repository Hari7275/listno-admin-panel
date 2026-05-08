import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  Search,
  Download,
  Star,
  ChevronRight,
} from "lucide-react";
import { useGetAdminCoachDashboardQuery, useGetAdminCoachProfileQuery, useUpdateCoachStatusMutation } from "../../../store/api/auth/adminLogin";


export default function ListenerApprovalsPage() {
  const navigate = useNavigate();

  // Pending approvals
  const { data: approvalData, isLoading: approvalLoading } =
    useGetAdminCoachDashboardQuery({
      page: 0,
      size: 10,
      status: "UNDER_REVIEW",
    });

  // Active listeners
  const { data: listenerData, isLoading: listenerLoading } =
    useGetAdminCoachDashboardQuery({
      page: 0,
      size: 10,
      status: "VERIFIED",
    });

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All Levels");
  const [type, setType] = useState("All Types");
  const [status, setStatus] = useState("All Status");
  const [online, setOnline] = useState("Online & Offline");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedCoachId, setSelectedCoachId] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("New");
  const [selectedType, setSelectedType] = useState("EXTERNAL");
  const [internalNotes, setInternalNotes] = useState("");

  const approvals = approvalData?.data?.adminCoachDashboard?.content || [];
  const listeners = listenerData?.data?.adminCoachDashboard?.content || [];

  const { data: profileData, isLoading: profileLoading } =
    useGetAdminCoachProfileQuery(
      { coachId: selectedCoachId },
      { skip: !selectedCoachId }
    );
    
  const profile = profileData?.data?.adminCoachProfile;

// Construct the documents array manually
const documents = [
  {
    name: "Aadhaar Card Front",
    url: profile?.aadhaarCardFrontKey,
    type: "ID Proof"
  },
  {
    name: "Aadhaar Card Back",
    url: profile?.aadhaarCardBackKey,
    type: "ID Proof"
  }
].filter(doc => doc.url); // Only show if the URL/Key actually exists

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [updateCoachStatus, { isLoading: statusLoading }] = useUpdateCoachStatusMutation();

  const filteredListeners = listeners.filter((user) => {
    return (
      (search === "" ||
        user.displayName?.toLowerCase().includes(search.toLowerCase()) ||
        user.coachId?.toLowerCase().includes(search.toLowerCase())) &&
      (level === "All Levels" || user.coachLevelName === level) &&
      (type === "All Types" || user.coachType === type) &&
      (status === "All Status" ||
        (status === "Active" && user.visibilityStatus === "VISIBLE") ||
        (status === "Blocked" && user.visibilityStatus !== "VISIBLE")) &&
      (online === "Online & Offline" ||
        (online === "Online" && user.online) ||
        (online === "Offline" && !user.online))
    );
  });

  if (approvalLoading || listenerLoading) {
    return <div className="p-6 text-center">Loading data...</div>;
  }

  return (
    <div className="max-w-[1150px] mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[28px] font-semibold text-[#1F2937]">
            Listener Management & Approvals
          </h1>
          <p className="text-[14px] text-[#6B7280] mt-1">
            Review new applications and manage your existing listener network from one place.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-medium hover:bg-gray-50">
          <Download size={16} />
          Export All
        </button>
      </div>

      {/* APPROVAL SECTION */}
      
<div>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 rounded-xl flex items-center justify-center">
      <UserCheck className="text-purple-600" size={20} />
    </div>

    <h2 className="text-[18px] font-semibold text-gray-800">
      Action Required: Pending Approvals
    </h2>

    <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full">
      {approvals.length} Pending
    </span>
  </div>

  <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#f1ece6]">
    {/* SCROLLABLE WRAPPER */}
    <div className="overflow-x-auto">
      <div className="min-w-[850px]"> {/* Ensures columns don't collapse on small screens */}
        
        {/* Header */}
        <div className="grid grid-cols-5 px-6 py-4 text-xs font-semibold text-gray-500 uppercase bg-[#f7f3ee] border-b border-[#eee7df]">
          <span className="text-[#8b6f47]">Applicant</span>
          <span>Type</span>
          <span>Experience</span>
          <span>Categories</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        {approvals.map((item) => (
          <div
            key={item.coachId}
            className="grid grid-cols-5 px-6 py-5 items-center border-b border-[#f3ede7] last:border-none hover:bg-[#faf7f4] transition"
          >
            {/* Applicant Column */}
            <div className="flex items-center gap-3 bg-[#fffdfb] -mx-2 px-2 py-2 rounded-lg">
              {/* FIXED ROUND IMAGE/INITIAL */}
              <div className="w-11 h-11 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center font-medium text-sm border border-gray-100">
                {item.profilePhoto ? (
                   <img 
                    src={item.profilePhoto} 
                    alt="" 
                    className="w-full h-full object-cover"
                   />
                ) : (
                  item.initial
                )}
              </div>
              
              <div className="truncate">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {item.displayName}
                </p>
                <p className="text-xs text-gray-400">
                  {item.coachId}
                </p>
              </div>
            </div>

            {/* Type */}
            <span
              className={`text-xs px-3 py-1 rounded-md w-fit font-semibold ${
                item.coachType === "EXTERNAL"
                  ? "bg-[#f3f0ff] text-gray-600"
                  : "bg-[#efe7ff] text-purple-600"
              }`}
            >
              {item.coachType}
            </span>

            {/* Experience */}
            <span className="text-sm text-gray-600 font-medium">
              {item.experienceYears} Years
            </span>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
              {item.categoryNames?.map((cat, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-[#f1f3f5] text-gray-700 rounded-full font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Action */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSelectedApplicant(item);
                  setSelectedCoachId(item.coachId);
                }}
                className="px-5 py-2 text-sm text-white rounded-xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 shadow-md hover:opacity-95 transition whitespace-nowrap"
              >
                Review Application
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

{/* ACTIVE LISTENER DIRECTORY */}
<div className="space-y-4">
  {/* HEADER */}
  <div className="flex flex-wrap justify-between items-center">
    <h2 className="text-[20px] font-semibold flex items-center gap-2 text-gray-800">
      <Users size={20} className="text-blue-500" />
      Active Listener Directory
    </h2>

    {/* SEARCH */}
    <div className="relative">
      <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
      <input
        type="text"
        placeholder="Search ID or Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-9 pr-4 py-2.5 border border-[#e6e0d9] rounded-xl text-sm outline-none w-[240px] bg-white focus:border-blue-400 transition-colors"
      />
    </div>
  </div>

  {/* CARD */}
  <div className="bg-white rounded-2xl border border-[#efe7df] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
    {/* FILTER BAR */}
    <div className="flex flex-wrap gap-3 px-6 py-4 bg-[#f7f3ee] border-b border-[#eee6dd]">
      {[
        { value: level, set: setLevel, options: ["All Levels", "Expert", "Celebrity"] },
        { value: type, set: setType, options: ["All Types", "INTERNAL", "EXTERNAL"] },
        { value: status, set: setStatus, options: ["All Status", "Active", "Blocked"] },
        { value: online, set: setOnline, options: ["Online & Offline", "Online", "Offline"] }
      ].map((filter, i) => (
        <select
          key={i}
          value={filter.value}
          onChange={(e) => filter.set(e.target.value)}
          className="px-4 py-2 text-sm border border-[#e6e0d9] rounded-xl bg-white text-gray-700 outline-none hover:bg-gray-50 cursor-pointer"
        >
          {filter.options.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      ))}
    </div>

    {/* SCROLLABLE TABLE WRAPPER */}
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* TABLE HEADER */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1.2fr] px-8 py-4 text-xs font-bold text-gray-500 uppercase border-b border-[#eee6dd] bg-white">
          <span>ID & Name</span>
          <span>Type</span>
          <span>Level</span>
          <span>Status</span>
          <span>Rating</span>
          <span>Total Calls</span>
          <span>Today's Earnings</span>
          <span className="text-right">Action</span>
        </div>

        {/* ROWS */}
        <div className="divide-y divide-[#f3ede7]">
          {filteredListeners.map((user) => (
            <div
              key={user.coachId}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1.2fr] px-8 py-5 items-center hover:bg-[#faf7f4] transition-colors"
            >
              {/* USER */}
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={user.profilePhoto || "/default-avatar.png"}
                    alt="avatar"
                    className="rounded-full w-[40px] h-[40px] object-cover border border-gray-100"
                  />
                  {user.online === true && (
                    <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="truncate">
                  <p className="text-[14px] font-bold text-gray-800 truncate">
                    {user.displayName}
                  </p>
                  <p className="text-[12px] text-gray-500">L-{user.coachId}</p>
                </div>
              </div>

              {/* TYPE */}
              <div>
                <span className={`text-[11px] px-2.5 py-1 rounded-md font-bold tracking-wide w-fit ${
                  user.coachType === "INTERNAL"
                    ? "bg-[#efe7ff] text-purple-600"
                    : "bg-[#f1f3f5] text-gray-600"
                }`}>
                  {user.coachType}
                </span>
              </div>

              {/* LEVEL */}
              <span className="text-sm text-gray-700 flex items-center gap-1.5 font-medium">
                {user.coachLevelName === "Celebrity" && <span className="text-yellow-500">🌟</span>}
                {user.coachLevelName === "Expert" && <span className="text-blue-500">🏅</span>}
                {user.coachLevelName}
              </span>

              {/* STATUS */}
              <div>
                <span
                  className={`text-[11px] px-3 py-1 rounded-full font-bold w-fit ${
                    user.visibilityStatus === "VISIBLE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.visibilityStatus === "VISIBLE" ? "Active" : "Blocked"}
                </span>
              </div>

              {/* RATING */}
              <span className="flex items-center gap-1 text-sm font-bold text-gray-700">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                {user.rankingScore}
              </span>

              {/* CALLS */}
              <span className="text-sm text-gray-600 font-medium">
                {user.totalCalls}
              </span>

              {/* EARNINGS */}
              <span className="text-sm font-bold text-green-600">
                ₹{user.todayEarnings}
              </span>

              {/* ACTION */}
              <div
                onClick={() => navigate(`/adminPanel/listenerManagement/listeners/${user.coachId}`)}
                className="flex justify-end items-center gap-1 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors group"
              >
                <span className="text-sm font-semibold">View Profile</span>
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

      {/* REVIEW APPLICATION MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedApplicant(null)}
          />

          {profileLoading ? (
            <div className="bg-white px-6 py-4 rounded-xl shadow-lg z-50">
              Loading profile...
            </div>
          ) : (
            (() => {
              const data = profile || selectedApplicant;

              return (
                <div className="relative w-[95%] sm:w-[90%] md:w-[700px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                  {/* HEADER */}
                  <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Applicant Review
                      </h2>
                      <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                        {data?.verificationStatus || "N/A"}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedApplicant(null)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
                    >
                      ✕
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* PROFILE */}
                    <div className="flex gap-4 items-start">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
                        {data?.profilePhoto ? (
                          <img
                            src={data.profilePhoto}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg font-semibold text-gray-700">
                            {data?.displayName?.charAt(0) || "U"}
                          </span>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {data?.displayName || "N/A"}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {data?.coachId || "N/A"} •{" "}
                          {data?.experienceYears
                            ? `${data.experienceYears} yrs`
                            : "N/A"}
                        </p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-gray-600">
                          <span>📧 {data?.email || "N/A"}</span>
                          <span>📞 {data?.phone || "N/A"}</span>
                          <span>📍 {data?.cityName || "N/A"}, {data?.stateName || ""}</span>
                          <span>🟢 {data?.online ? "Online" : "Offline"}</span>
                        </div>
                      </div>
                    </div>

                    {/* BIO + EXPERTISE */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                        <h4 className="text-sm font-semibold mb-2">Professional Bio</h4>
                        <p className="text-sm text-gray-600">
                          {data?.bio || "No bio available"}
                        </p>
                      </div>

                      <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                        <h4 className="text-sm font-semibold mb-2">Expertise Categories</h4>
                        <div className="flex gap-2 flex-wrap">
                          {data?.categoryNames?.length > 0 ? (
                            data.categoryNames.map((cat, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs bg-gray-50 rounded-full text-gray-700"
                              >
                                {cat}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-gray-400">No categories</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* MEDIA */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                      <h4 className="text-sm font-semibold mb-3">Onboarding Media</h4>
                      {data?.introVideo ? (
                        <video controls className="w-full h-56 rounded-xl bg-black mb-4">
                          <source src={data.introVideo} type="video/mp4" />
                        </video>
                      ) : (
                        <div className="w-full h-56 flex items-center justify-center bg-gray-100 rounded-xl mb-4 text-sm text-gray-400">
                          No intro video available
                        </div>
                      )}

                      <div className="flex gap-3">
                        {[1, 2, 3].map((i) => (
                          <img
                            key={i}
                            src={`https://i.pravatar.cc/150?img=${i}`}
                            alt={`Preview ${i}`}
                            onClick={() => setPreviewImage(`https://i.pravatar.cc/600?img=${i}`)}
                            className="w-24 h-24 rounded-xl object-cover cursor-pointer"
                          />
                        ))}
                      </div>
                    </div>

                    {/* DOCUMENT SECTION (NEW) */}
<div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
  <h4 className="text-sm font-semibold mb-3">Uploaded Documents</h4>
  <div className="space-y-3">
    {documents.length > 0 ? (
      documents.map((doc, i) => (
        <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
              {/* Check if it's a PDF or Image based on the key string */}
              {doc.url.toLowerCase().endsWith('.pdf') ? (
                <span className="text-red-500 font-bold text-[10px]">PDF</span>
              ) : (
                <span className="text-blue-500 font-bold text-[10px]">IMG</span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                {doc.name}
              </p>
              <p className="text-[10px] text-gray-400 uppercase">
                {doc.type}
              </p>
            </div>
          </div>
          
          {/* Optional: Add a View/Download button */}
          <a 
            href={doc.url} 
            target="_blank" 
            rel="noreferrer"
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            View
          </a>
        </div>
      ))
    ) : (
      <p className="text-xs text-gray-400 text-center py-4">No documents uploaded</p>
    )}
  </div>
</div>

                    {/* VOICE */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                      <h4 className="text-sm font-semibold mb-3">Voice Sample</h4>
                      {data?.voiceSample ? (
                        <audio controls className="w-full">
                          <source src={data.voiceSample} type="audio/mpeg" />
                        </audio>
                      ) : (
                        <p className="text-sm text-gray-400">No voice sample</p>
                      )}
                    </div>

                    {/* ADMIN ASSESSMENT */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition space-y-4">
                      <h4 className="text-sm font-semibold">Admin Assessment</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Listener Level Name
                          </label>
                          <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="border rounded-lg p-2 text-sm"
                          >
                            <option>New</option>
                            <option>Normal</option>
                            <option>Expert</option>
                            <option>Premium</option>
                          </select>
                        </div>
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Coach Type
                          </label>
                          <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="border rounded-lg p-2 text-sm"
                          >
                            <option>EXTERNAL</option>
                            <option>INTERNAL</option>
                          </select>
                        </div>
                      </div>
                      <textarea
                        value={internalNotes}
                        onChange={(e) => setInternalNotes(e.target.value)}
                        className="w-full border rounded-lg p-3 text-sm"
                        placeholder="Internal notes..."
                      />
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="border-t p-4 flex gap-3">
                    <button
                      onClick={() => {
                        setActionType("REJECT");
                        setConfirmOpen(true);
                      }}
                      disabled={statusLoading}
                      className="flex-1 py-3 rounded-xl bg-red-500 text-white"
                    >
                      {statusLoading ? "Processing..." : "REJECT"}
                    </button>

                    <button
                      onClick={() => {
                        setActionType("HOLD");
                        setConfirmOpen(true);
                      }}
                      disabled={statusLoading}
                      className="flex-1 py-3 rounded-xl border disabled:opacity-50"
                    >
                      {statusLoading ? "Processing..." : "HOLD"}
                    </button>

                    <button
                      onClick={() => {
                        setActionType("APPROVE");
                        setConfirmOpen(true);
                      }}
                      disabled={statusLoading}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    >
                      {statusLoading ? "Processing..." : "APPROVE"}
                    </button>
                  </div>
                </div>
              );
            })()
          )}

          {/* CONFIRMATION POPUP */}
          {confirmOpen && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setConfirmOpen(false)}
              />
              <div className="relative bg-white w-[90%] sm:w-[380px] rounded-2xl shadow-xl p-6">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
                >
                  ✕
                </button>
                <h2 className="text-lg font-semibold text-center">Are you sure?</h2>
                <p className="text-sm text-gray-500 text-center mt-2">
                  You are about to {actionType?.toLowerCase()} this applicant.
                </p>
                <div className="mt-6">
                  <button
                    onClick={async () => {
                      try {
                        let payload = {
                          coachId: selectedCoachId,
                          status: actionType,
                        };

                        if (actionType === "APPROVE") {
                          payload.bodyData = {
                            listenerLevelName: selectedLevel,
                            coachType: selectedType,
                            internalNotes: internalNotes,
                          };
                        } else {
                          payload.bodyData = {
                            //internalNotes: internalNotes,
                            listenerLevelName: selectedLevel,
                          };
                        }

                        await updateCoachStatus(payload).unwrap();
                        alert(`${actionType} successful ✅`);
                        setConfirmOpen(false);
                        setSelectedApplicant(null);
                      } catch (err) {
                        console.error("API ERROR:", err?.data || err);
                        alert(err?.data?.message || "Action failed ❌");
                      }
                    }}
                    disabled={statusLoading}
                    className={`w-full py-3 rounded-xl text-white font-medium transition
                      ${actionType === "REJECT" && "bg-red-500 hover:bg-red-600"}
                      ${actionType === "HOLD" && "bg-gray-500 hover:bg-gray-600"}
                      ${actionType === "APPROVE" && "bg-gradient-to-r from-purple-600 to-blue-600"}
                      ${statusLoading && "opacity-50 cursor-not-allowed"}
                    `}
                  >
                    {statusLoading ? "Processing..." : actionType}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* IMAGE PREVIEW */}
          {previewImage && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70">
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-[90%] max-h-[90%] rounded-xl"
              />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-5 right-5 text-white text-2xl"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}