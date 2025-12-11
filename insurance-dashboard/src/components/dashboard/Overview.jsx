import React from 'react';
import { MdShield, MdLocalHospital, MdTrendingUp, MdAccountBalanceWallet } from 'react-icons/md';
import StatCard from '../ui/StatCard';

export default function Overview({ policies = [], setShowClaim, showToast }) {
  const stats = {
    totalPolicies: policies.length,
    activePolicies: policies.filter(p => p.policystatus === 'Active').length,
    totalCoverage: policies.reduce((sum, p) => sum + parseFloat(p.sumInsured?.replace(/[^\d]/g, '') || 0), 0),
    totalPremium: policies.reduce((sum, p) => sum + (p.PremiumAmount || 0), 0)
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2">Your Insurance Hub</h1>
            <p className="text-indigo-100 text-lg">Manage policies, claims & coverage</p>
          </div>
          <div className="text-5xl">🛡️</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-6 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Policies" value={stats.activePolicies} color="indigo" icon={<MdShield className="text-3xl" />} />
        <StatCard title="Pending Claims" value="0" color="orange" icon={<MdLocalHospital className="text-3xl" />} />
        <StatCard title="Total Coverage" value={`₹${(stats.totalCoverage/10000000).toFixed(1)}Cr`} color="green" icon={<MdTrendingUp className="text-3xl" />} />
        <StatCard title="Annual Premium" value={`₹${stats.totalPremium.toLocaleString()}`} color="purple" icon={<MdAccountBalanceWallet className="text-3xl" />} />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="group bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer" onClick={() => setShowClaim(true)}>
          <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform">📋</div>
          <h3 className="text-2xl font-bold mb-2">File Claim</h3>
          <p className="opacity-90">Submit new insurance claim</p>
        </div>
        
        <div className="group bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer">
          <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform">🛒</div>
          <h3 className="text-2xl font-bold mb-2">Buy Policy</h3>
          <p className="opacity-90">Get new insurance coverage</p>
        </div>
        
        <div className="group bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer">
          <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform">📊</div>
          <h3 className="text-2xl font-bold mb-2">View Reports</h3>
          <p className="opacity-90">Coverage & claims summary</p>
        </div>
      </div>

      {/* Recent Policies */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Recent Policies</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              <tr>
                <th className="py-4 px-6 text-left font-bold text-gray-900 dark:text-white">Policy</th>
                <th className="py-4 px-6 text-left font-bold text-gray-900 dark:text-white">Type</th>
                <th className="py-4 px-6 text-left font-bold text-gray-900 dark:text-white">Premium</th>
                <th className="py-4 px-6 text-left font-bold text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {policies.slice(0, 5).map((policy) => (
                <tr key={policy._id} className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
                  <td className="py-5 px-6 font-semibold text-gray-900 dark:text-white">{policy.policyname}</td>
                  <td className="py-5 px-6">
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-sm font-bold rounded-full">
                      {policy.policytype}
                    </span>
                  </td>
                  <td className="py-5 px-6 font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{policy.PremiumAmount?.toLocaleString()}
                  </td>
                  <td className="py-5 px-6">
                    <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                      policy.policystatus === 'Active' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {policy.policystatus}
                    </span>
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
