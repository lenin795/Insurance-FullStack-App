import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

export default function Policies({ policies = [], showToast, fetchPolicies }) {
  const handleDelete = async (policyId) => {
    if (window.confirm('Delete this policy?')) {
      try {
        // await policyAPI.deletePolicy(policyId); // Uncomment when backend ready
        showToast('Policy deleted!', 'success');
        fetchPolicies();
      } catch (err) {
        showToast('Delete failed', 'error');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between p-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl shadow-2xl">
        <div>
          <h1 className="text-4xl font-black">Your Policies</h1>
          <p className="opacity-90 mt-2">Manage all your active insurance policies</p>
        </div>
        <div className="text-5xl">📄</div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30">
              <tr>
                <th className="py-5 px-6 text-left font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">Policy Name</th>
                <th className="py-5 px-6 text-left font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">Type</th>
                <th className="py-5 px-6 text-left font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">Provider</th>
                <th className="py-5 px-6 text-left font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">Premium</th>
                <th className="py-5 px-6 text-left font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">Coverage</th>
                <th className="py-5 px-6 text-left font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">Status</th>
                <th className="py-5 px-6 text-left font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {policies.map((policy) => (
                <tr key={policy._id} className="hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all">
                  <td className="py-5 px-6 font-bold text-xl text-gray-900 dark:text-white">{policy.policyname}</td>
                  <td className="py-5 px-6">
                    <span className="px-4 py-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-sm font-bold rounded-xl shadow-sm">
                      {policy.policytype}
                    </span>
                  </td>
                  <td className="py-5 px-6 font-semibold text-gray-900 dark:text-white">{policy.providername}</td>
                  <td className="py-5 px-6">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{policy.PremiumAmount?.toLocaleString()}</span>
                  </td>
                  <td className="py-5 px-6 font-mono text-lg text-blue-600 dark:text-blue-400">{policy.sumInsured}</td>
                  <td className="py-5 px-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                      policy.policystatus === 'Active' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {policy.policystatus}
                    </span>
                  </td>
                  <td className="py-5 px-6 flex gap-2">
                    <button className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1">
                      <MdEdit className="w-4 h-4" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(policy._id)}
                      className="p-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1"
                    >
                      <MdDelete className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {policies.length === 0 && (
        <div className="text-center py-20">
          <div className="text-8xl mb-8">📭</div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">No Policies Yet</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Start by purchasing your first insurance policy</p>
          <button className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl transition-all">
            Buy Policy Now
          </button>
        </div>
      )}
    </div>
  );
}
