// src/components/dashboard/Claims.js
export default function Claims({ showToast }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold">Claims</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-4xl">Document</span>
          </div>
          <h3 className="text-xl font-bold mb-3">No Open Claims</h3>
          <p className="text-gray-500 mb-6">Start a new claim when needed.</p>
          <button onClick={() => showToast("Opening claim form...")} className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
            File a New Claim
          </button>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Claim History</h3>
          <button className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold hover:bg-gray-100 transition">
            View History
          </button>
        </div>
      </div>
    </div>
  )
}