// src/components/dashboard/Policies.js
export default function Policies({ policies, showToast }) {
  const handleView = (id) => showToast(`Viewing ${id} details`, "success")
  const handleDownload = (id) => showToast(`Downloading ${id} PDF...`, "success")

  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold">Your Policies</h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Sum Insured</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {policies.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-6 py-5 font-mono font-semibold">{p.id}</td>
                <td className="px-6 py-5">{p.type}</td>
                <td className="px-6 py-5">{p.provider}</td>
                <td className="px-6 py-5 font-medium">{p.sumInsured}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <button onClick={() => handleView(p.id)} className="text-indigo-600 hover:underline mr-4">View</button>
                  <button onClick={() => handleDownload(p.id)} className="text-purple-600 hover:underline">PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}