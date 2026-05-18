import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  IndianRupee,
  TrendingUp,
  Search,
  SlidersHorizontal,
  ArrowDownToLine,
  LogOut,
  Eye,
  Ban,
  Trash2,
  X,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';

import {
  useGetAdminAllUsersListQuery,
  useGetAdminUserDetailsByIdQuery,
  useDeleteUserByIdMutation,
} from '../../store/api/auth/list';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  // GET ALL USERS API
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetAdminAllUsersListQuery();

  // DELETE USER API
  const [deleteUserById, { isLoading: deleteLoading }] =
    useDeleteUserByIdMutation();


  // USER DETAILS API
  const {
    data: userDetailsData,
    isLoading: detailsLoading,
  } = useGetAdminUserDetailsByIdQuery(
    { userId: selectedUserId },
    {
      skip: !selectedUserId,
    }
  );

  // USERS LIST
  const users = data?.data?.adminAllUsersList?.users || [];

  // SINGLE USER DETAILS
  const selectedUserDetails =
    userDetailsData?.data?.adminUserDetailsById;

  // FILTER USERS
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user?.contact?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    if (statusFilter === 'All Status') return matchesSearch;

    return (
      matchesSearch &&
      user?.status?.toLowerCase() ===
        statusFilter.toLowerCase()
    );
  });

  
  // OPEN DELETE MODAL
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };
  // DELETE USER FUNCTION
 const confirmDelete = async () => {

  try {

    console.log("DELETE USER ID =>", userToDelete.userId);

    const response = await deleteUserById(
      userToDelete.userId
    ).unwrap();

    console.log("DELETE SUCCESS =>", response);

    setUserToDelete(null);

  } catch (error) {

    console.log("DELETE ERROR =>", error);

  }
};
  // TEMP SUSPEND FUNCTION
  const handleToggleSuspend = (userId) => {
    console.log('Suspend User:', userId);
  };

  
  // LOADING
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

 
  // ERROR
  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load users
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased relative overflow-x-hidden">

      {/* Header */}
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              User Management
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage and monitor all platform users
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">

            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition">
              <SlidersHorizontal size={16} />
              Last 30 Days
            </button>

            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition">
              <ArrowDownToLine size={16} />
              Import
            </button>

            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg shadow-sm hover:bg-purple-700 transition ml-auto md:ml-0">
              <LogOut size={16} className="rotate-180" />
              Export Users
            </button>

          </div>

        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Total Users */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">

            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 block">
                Total Users
              </span>

              <span className="text-2xl font-bold text-slate-900">
                {users.length}
              </span>
            </div>

            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users size={22} />
            </div>

          </div>

          {/* Active Users */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">

            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 block">
                Active Users
              </span>

              <span className="text-2xl font-bold text-slate-900">
                {
                  users.filter(
                    (u) =>
                      u?.status?.toLowerCase() === 'active'
                  ).length
                }
              </span>
            </div>

            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <UserCheck size={22} />
            </div>

          </div>

          {/* Revenue */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">

            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 block">
                Total Revenue
              </span>

              <span className="text-2xl font-bold text-slate-900">
                ₹0
              </span>
            </div>

            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <IndianRupee size={22} />
            </div>

          </div>

          {/* Avg Spent */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">

            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 block">
                Avg. Spent
              </span>

              <span className="text-2xl font-bold text-slate-900">
                ₹0
              </span>
            </div>

            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
              <TrendingUp size={22} />
            </div>

          </div>

        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">

          {/* Search */}
          <div className="relative w-full sm:max-w-md">

            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition"
            />

          </div>

          {/* Status Filter */}
          <div className="relative w-full sm:w-48">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 cursor-pointer text-slate-700 font-medium"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              ▼
            </div>

          </div>

        </div>

        {/* Table */}
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 font-semibold text-xs tracking-wider uppercase">
                  <th className="p-4">User</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Roles</th>
                  <th className="p-4">Active Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50 text-sm">

                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-8 text-slate-400"
                    >
                      No records found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (

                    <tr
                      key={user.userId}
                      className="hover:bg-slate-50/80 transition-colors"
                    >

                      {/* User */}
                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div className="flex flex-col items-center gap-1">

                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-100">

                              <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                alt={user.name}
                              />

                            </div>

                            <span className="text-[11px] font-medium text-slate-400">
                              ID: {user.userId}
                            </span>

                          </div>

                          <div>

                            <span className="font-semibold text-slate-900 block">
                              {user.name}
                            </span>

                            <span className="text-xs text-slate-400">
                              {user.location || 'N/A'}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* Contact */}
                      <td className="p-4">

                        <div className="flex flex-col">

                          <span className="text-slate-600 font-medium">
                            {user?.contact?.email || 'N/A'}
                          </span>

                          <span className="text-xs text-slate-400">
                            {user?.contact?.phone || 'N/A'}
                          </span>

                        </div>

                      </td>

                      {/* Roles */}
                      <td className="p-4">

                        <div className="flex flex-wrap gap-1">

                          {user?.roles?.map((role, index) => (
                            <span
                              key={index}
                              className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md"
                            >
                              {role}
                            </span>
                          ))}

                        </div>

                      </td>

                      {/* Active Role */}
                      <td className="p-4">

                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize tracking-wide ${
                            user.activeRole === 'LISTENER'
                              ? 'bg-emerald-50 text-green-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {user.activeRole}
                        </span>

                      </td>

                      {/* Status */}
                      <td className="p-4">

                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize tracking-wide ${
                            user?.status?.toLowerCase() ===
                            'active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : user?.status?.toLowerCase() ===
                                'suspended'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {user.status}
                        </span>

                      </td>

                      {/* Actions */}
                      <td className="p-4 relative text-center">

                        <div className="flex items-center justify-center gap-1.5">

                          {/* View */}
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setSelectedUserId(
                                user.userId
                              );
                            }}
                            className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Suspend */}
                          <button
                            onClick={() =>
                              handleToggleSuspend(
                                user.userId
                              )
                            }
                            className="p-1.5 hover:bg-amber-50 rounded-md text-slate-400 hover:text-amber-600 transition"
                          >
                            <Ban size={16} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() =>
                              handleDeleteClick(user)
                            }
                            className="p-1.5 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 transition"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                )}

              </tbody>

            </table>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between text-xs font-medium text-slate-500">

            <span>
              Showing {filteredUsers.length} users
            </span>

          </div>

        </div>

      </div>

      {/* USER DETAILS DRAWER */}
      {selectedUser && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/30 z-40"
            onClick={() => {
              setSelectedUser(null);
              setSelectedUserId(null);
            }}
          />

          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-slate-100">

            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">

              <span className="font-semibold text-slate-800 flex items-center gap-2">
                <ShieldCheck
                  size={18}
                  className="text-purple-600"
                />
                User Profile
              </span>

              <button
                onClick={() => {
                  setSelectedUser(null);
                  setSelectedUserId(null);
                }}
                className="p-1.5 hover:bg-slate-100 rounded-md"
              >
                <X size={18} />
              </button>

            </div>

            {/* Content */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">

              {detailsLoading ? (
                <div>Loading user details...</div>
              ) : (
                <>
                  {/* User Top */}
                  <div className="flex items-center gap-4 border-b border-slate-50 pb-5">

                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUserDetails?.name}`}
                      alt={selectedUserDetails?.name}
                      className="w-16 h-16 rounded-full bg-slate-100 border"
                    />

                    <div>

                      <h3 className="font-bold text-lg text-slate-900">
                        {selectedUserDetails?.name}
                      </h3>

                      <p className="text-sm text-slate-400">
                        {
                          selectedUserDetails?.contact
                            ?.email
                        }
                      </p>

                    </div>

                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">

                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-500">
                        Phone
                      </span>

                      <span className="font-semibold text-slate-800">
                        {
                          selectedUserDetails?.contact
                            ?.phone
                        }
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-500">
                        Location
                      </span>

                      <span className="font-semibold text-slate-800">
                        {
                          selectedUserDetails?.location
                        }
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-500">
                        Status
                      </span>

                      <span className="font-semibold text-slate-800">
                        {selectedUserDetails?.status}
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">
                        Active Role
                      </span>

                      <span className="font-semibold text-slate-800">
                        {
                          selectedUserDetails?.activeRole
                        }
                      </span>
                    </div>

                  </div>
                </>
              )}

            </div>

          </div>
        </>
      )}

      {/* DELETE MODAL */}
    {userToDelete && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-slate-900/40"
      onClick={() => setUserToDelete(null)}
    />

    {/* Modal Content Wrapper */}
    <div className="bg-white rounded-xl shadow-2xl border border-slate-100 max-w-md w-full relative z-10 overflow-hidden">
      
      {/* Absolute Close Button */}
      <button
        onClick={() => setUserToDelete(null)}
        className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        aria-label="Close modal"
      >
        <X size={18} />
      </button>

      {/* Main Body */}
      <div className="p-6 pt-8 flex gap-4"> {/* Added pt-8 to prevent text from bunching up against the X button */}
        <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
          <AlertTriangle size={20} />
        </div>

        <div className="space-y-1.5 pr-4"> {/* Added pr-4 to give space on the right side */}
          <h3 className="text-base font-bold text-slate-900">
            Delete account permanently?
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-slate-700">
              {userToDelete.name}
            </span>
            ?
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5 text-xs font-semibold">
        <button
          onClick={() => setUserToDelete(null)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          disabled={deleteLoading}
          className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition disabled:opacity-50"
        >
          {deleteLoading ? 'Deleting...' : 'Confirm Delete'}
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}