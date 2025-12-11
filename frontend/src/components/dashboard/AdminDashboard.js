import React, { useState, useEffect } from 'react';
import { policyAPI } from '../../services/api';
import StatCard from '../ui/StatCard';
import { MdPeople, MdPending, MdCheckCircle, MdClose } from 'react-icons/md';

export default function AdminDashboard({ allPolicies, showToast, fetchPolicies }) {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await policyAPI.getAllUsers();
      setUsers(data || []);
    } catch (err) {
      console.error('Users fetch failed:', err);
    }
  };

  const handleClaimAction = async (policyId, claimId, status) => {
    if (window.confirm(`Mark claim as ${status.toUpperCase()}?`)) {
      setLoading(true);
      try {
        await policyAPI.approveClaim(policyId, claimId, status);
        showToast(`Claim ${status.toUpperCase()}!`, 'success');
        fetchPolicies();
      } catch (err) {
        showToast('Action failed', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const stats = {
    totalPolicies: allPolicies.length,
    activePolicies: allPolicies.filter(p => p.policystatus === 'Active').length,
    pendingClaims: allPolicies.filter(p => p.claims?.some(c => c.status === 'pending')).length,
    totalUsers: users.length,
    totalPremium: allPolicies.reduce((sum, p) => sum + (p.PremiumAmount || 0), 0)
  };

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="flex items-center justify-between p-8 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-3xl shadow-2xl">
        <div>
          <h1 className="text-4xl font-black">ADMIN CONTROL PANEL</h1>
          <p className="text-red-100 mt-2">Manage all policies, users & claims</p>
        </div>
        <div className="text-4xl">👑</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Policies" value={stats.totalPolicies} color="indigo" icon="📋" />
        <StatCard title="Active Policies" value={stats.activePolicies} color="green" icon="✅" />
        <StatCard title="Pending Claims" value={stats.pendingClaims} color="orange" icon="⏳" />
        <StatCard title="Total Users" value={stats.totalUsers} color="purple" icon="👥" />
        <StatCard title="Premium Collected" value={`₹${(stats.totalPremium/1000).toFixed(0)}K`} color="red" icon="💰" />
      </div>

      {/* Tabbed Management */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
          <button onClick={() => setActiveTab('overview')} className={`p-6 font-bold text-lg transition-all ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-700'}`}>
            📊 Overview
          </button>
          <button onClick={() => setActiveTab('policies')} className={`p-6 font-bold text-lg transition-all ${activeTab === 'policies' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-600 hover:bg-green-50 dark:hover:bg-gray-700'}`}>
            📄 Policies
          </button>
          <button onClick={() => setActiveTab('users')} className={`p-6 font-bold text-lg transition-all ${activeTab === 'users' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-purple-50 dark:hover:bg-gray-700'}`}>
            👥 Users
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-8 rounded-2xl">
                <div className="text-4xl mb-4">⏳</div>
                <h3 className="text-2xl font-bold mb-2">Pending Claims</h3>
                <p className="text-4xl font-black">{stats.pendingClaims}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white p-8 rounded-2xl">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-2">Revenue</h3>
                <p className="text-4xl font-black">₹{(stats.totalPremium).toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white p-8 rounded-2xl">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-2xl font-bold mb-2">Growth</h3>
                <p className="text-4xl font-black">+{((stats.activePolicies/stats.totalPolicies)*100).toFixed(0)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className="p-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-bold">User</th>
                  <th className="py-4 px-6 text-left font-bold">Policy</th>
                  <th className="py-4 px-6 text-left font-bold">Premium</th>
                  <th className="py-4 px-6 text-left font-bold">Status</th>
                  <th className="py-4 px-6 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {allPolicies.slice(0, 10).map((policy) => (
                  <tr key={policy._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-6 font-medium">{policy.policyholdername}</td>
                    <td className="py-4 px-6">{policy.policyname}</td>
                    <td className="py-4 px-6 font-mono">₹{policy.PremiumAmount?.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                        policy.policystatus === 'Active' ? 'bg-green-100 text-green-800' :
                        policy.policystatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {policy.policystatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-red-600 hover:text-red-900 font-bold mr-4 text-sm">Delete</button>
                      <button className="text-indigo-600 hover:text-indigo-900 font-bold text-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="p-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-bold">Name</th>
                  <th className="py-4 px-6 text-left font-bold">Username</th>
                  <th className="py-4 px-6 text-left font-bold">Policies</th>
                  <th className="py-4 px-6 text-left font-bold">Role</th>
                  <th className="py-4 px-6 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-6 font-bold">{user.name}</td>
                    <td className="py-4 px-6">{user.username}</td>
                    <td className="py-4 px-6">{allPolicies.filter(p => p.userId?._id === user._id).length}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role?.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-indigo-600 hover:text-indigo-900 font-bold text-sm mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900 font-bold text-sm">Suspend</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
