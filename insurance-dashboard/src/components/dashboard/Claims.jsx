import React, { useState } from 'react';
import { MdAddCircle, MdHistory } from 'react-icons/md';

export default function Claims({ policies = [], showToast, fetchPolicies }) {
  const [activeTab, setActiveTab] = useState('new');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between p-8 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-3xl shadow-2xl">
        <div>
          <h1 className="text-4xl font-black">Claims Management</h1>
          <p className="opacity-90 mt-2">File new claims & track status</p>
        </div>
        <div className="text-5xl">🏥</div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setActiveTab('new')}
          className={`flex-1 p-6 font-bold text-xl transition-all ${activeTab === 'new' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' : 'text-gray-600 hover:bg-orange-50 dark:hover:bg-gray-700'}`}
        >
          <MdAddCircle className="w-8 h-8 mr-3 inline" />
          New Claim
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 p-6 font-bold text-xl transition-all ${activeTab === 'history' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' : 'text-gray-600 hover:bg-orange-50 dark:hover:bg-gray-700'}`}
        >
          <MdHistory className="w-8 h-8 mr-3 inline" />
          History
        </button>
      </div>

      {/* New Claim Form */}
      {activeTab === 'new' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">File New Claim</h2>
          {policies.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-8">🚫</div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Active Policies</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Purchase a policy first to file claims</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Select Policy</label>
                  <select className="w-full p-5 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-lg font-semibold focus:border-orange-500 focus:ring-4 focus:ring-orange-200/50">
                    {policies.map(policy => (
                      <option key={policy._id}>{policy.policyname} - {policy.policytype}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Claim Amount</label>
                  <input 
                    type="number" 
                    placeholder="₹50,000" 
                    className="w-full p-5 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-lg font-semibold focus:border-orange-500 focus:ring-4 focus:ring-orange-200/50"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Description</label>
                  <textarea 
                    rows="6"
                    placeholder="Describe the incident in detail..."
                    className="w-full p-5 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-lg resize-vertical focus:border-orange-500 focus:ring-4 focus:ring-orange-200/50"
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all">
                  Submit Claim
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Claim History */}
      {activeTab === 'history' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Claim History</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white p-8 rounded-2xl shadow-xl text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">Approved</h3>
              <p className="text-4xl font-black">0</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-8 rounded-2xl shadow-xl text-center">
              <div className="text-5xl mb-4">⏳</div>
              <h3 className="text-2xl font-bold mb-2">Pending</h3>
              <p className="text-4xl font-black">0</p>
            </div>
            <div className="bg-gradient-to-br from-red-400 to-pink-500 text-white p-8 rounded-2xl shadow-xl text-center">
              <div className="text-5xl mb-4">❌</div>
              <h3 className="text-2xl font-bold mb-2">Rejected</h3>
              <p className="text-4xl font-black">0</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
