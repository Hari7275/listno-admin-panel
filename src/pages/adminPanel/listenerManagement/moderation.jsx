import { useState } from "react";
import {
  AlertTriangle,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  XOctagon,
} from "lucide-react";

// Dummy Data
const moderationCases = [
  {
    caseId: "C-881",
    listenerName: "Rahul M.",
    listenerId: "L-104",
    listenerType: "EXTERNAL",
    issueType: "Inappropriate Language",
    flags: 3,
    status: "UNDER REVIEW",
    adminContext:
      '"User U-4412 reported aggressive behavior during a career coaching session. Audio logs match the claim. Second offense this month."',
  },
  {
    caseId: "C-882",
    listenerName: "Sneha T.",
    listenerId: "L-299",
    listenerType: "EXTERNAL",
    issueType: "Call Dropped Purposely",
    flags: 0,
    status: "RESOLVED",
    adminContext:
      '"Listener disconnected call immediately after answering 5 times in a row to manipulate response rate metrics. Warning issued."',
  },
  {
    caseId: "C-883",
    listenerName: "Vikram S.",
    listenerId: "L-305",
    listenerType: "INTERNAL",
    issueType: "Idle Alert",
    flags: 0,
    status: "OPEN",
    adminContext:
      '"Internal listener marked online but unresponsive to queue routing for 45 minutes. Shift supervisor notified."',
  },
];

// Helper to determine status badge colors
const getStatusStyles = (status) => {
  switch (status) {
    case "UNDER REVIEW":
      return "bg-yellow-50 text-yellow-700 border border-yellow-100";
    case "RESOLVED":
      return "bg-green-50 text-green-700 border border-green-100";
    case "OPEN":
      return "bg-red-50 text-red-700 border border-red-100";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-200";
  }
};

export default function ModerationPage() {
  const [openContexts, setOpenContexts] = useState({ "C-881": true });

  const toggleContext = (caseId) => {
    setOpenContexts((prev) => ({
      ...prev,
      [caseId]: !prev[caseId],
    }));
  };

  return (
    <div className="p-8 bg-[#f6f7fb] min-h-screen">
      {/* Header */}
      <div className="mb-10 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">
            Moderation & Cases
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            Review user complaints, warnings, and internal listener alerts with
            context.
          </p>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <p className="text-xs font-medium">6:08 PM | 4/19/2026</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#fafafa] text-gray-400 text-[11px] uppercase font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Case ID</th>
              <th className="px-6 py-4">Listener</th>
              <th className="px-6 py-4">Issue Context & Comments</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {moderationCases.map((row) => (
              <tr
                key={row.caseId}
                className="hover:bg-gray-50 transition-colors align-top"
              >
                {/* Case ID */}
                <td className="px-6 py-6 text-sm text-gray-950 font-semibold">
                  {row.caseId}
                </td>

                {/* Listener */}
                <td className="px-6 py-6">
                  <p className="font-semibold text-[15px] text-gray-950">
                    {row.listenerName}
                  </p>
                  <p className="text-[12px] text-gray-400 mb-2">
                    {row.listenerId}
                  </p>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide ${
                      row.listenerType === "INTERNAL"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {row.listenerType}
                  </span>
                </td>

                {/* Issue Context */}
                <td className="px-6 py-6 max-w-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-red-500 p-1 bg-red-50 rounded">
                      <AlertTriangle size={16} />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {row.issueType}
                    </p>

                    {row.flags > 0 && (
                      <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <XOctagon size={12} /> x{row.flags} Flags
                      </span>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                    <button
                      onClick={() => toggleContext(row.caseId)}
                      className="flex items-center gap-2 text-gray-950 hover:text-purple-700 transition w-full text-left"
                    >
                      <MessageSquare size={16} className="text-gray-400" />
                      <span className="text-[13px] font-semibold flex-1">
                        Admin Context:
                      </span>
                      {openContexts[row.caseId] ? (
                        <ChevronDown size={18} className="text-gray-400" />
                      ) : (
                        <ChevronRight size={18} className="text-gray-400" />
                      )}
                    </button>

                    {openContexts[row.caseId] && (
                      <p className="mt-2.5 text-[13px] text-gray-600 italic leading-relaxed pl-6">
                        {row.adminContext}
                      </p>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-6">
                  <span
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-full w-fit flex items-center gap-1.5 ${getStatusStyles(
                      row.status
                    )}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                    {row.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-6 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                      Suspend
                    </button>
                    <button className="text-xs font-semibold px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                      Review File
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}