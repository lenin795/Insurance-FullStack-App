// src/components/dashboard/Overview.js
import StatCard from "../ui/StatCard.js"

export default function Overview({ policies, setShowClaim, showToast }) {
  const active = policies.filter(p => p.status === "Active").length
  const totalSum = policies.reduce((a, p) => a + parseInt(p.sumInsured.replace(/[^0-9]/g, "")), 0)

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Policies" value={active} color="indigo" />
        <StatCard title="Total Coverage" value={`₹${(totalSum / 100000).toFixed(1)}L`} color="green" />
        <StatCard title="Renewals Due" value="1" color="red" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Your Policies</h3>
            <button
              onClick={() => { setShowClaim(true); showToast("Claim form opened"); }}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            >
              File Claim
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-xs text-gray-500 border-b dark:border-gray-700">
                <tr>
                  <th className="py-3 text-left">ID</th>
                  <th className="py-3 text-left">Type</th>
                  <th className="py-3 text-left">Provider</th>
                  <th className="py-3 text-left">Premium</th>
                  <th className="py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {policies.map(p => (
                  <tr key={p.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="py-5 font-semibold">{p.id}</td>
                    <td>{p.type}</td>
                    <td>{p.provider}</td>
                    <td>{p.premium}</td>
                    <td>
                      <span className={`px-4 py-2 rounded-full text-xs font-bold ${p.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl text-white">
          <h3 className="text-xl font-bold mb-4">Quick Buy</h3>
          <button className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold hover:bg-gray-100 transition">
            Get New Policy Quote
          </button>
        </div>
      </div>
    </div>
  )
}