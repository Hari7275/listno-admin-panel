import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../app/hooks";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <LogOut size={16} />
          Logout
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.name || "Guest"}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
