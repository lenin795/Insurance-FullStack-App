// src/components/dashboard/BuyPolicy.js
import { useState } from "react"

export default function BuyPolicy({ showToast }) {
  const [form, setForm] = useState({ type: "Health Insurance", sum: "₹5,00,000", tenure: "1 year" })

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast(`Quote requested for ${form.type}`, "success")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center">Buy a New Policy</h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-5 py-4 border rounded-xl dark:bg-gray-700">
            <option>Health Insurance</option>
            <option>Motor Insurance</option>
            <option>Term Life</option>
          </select>
          <div className="grid md:grid-cols-2 gap-6">
            <input value={form.sum} onChange={(e) => setForm({ ...form, sum: e.target.value })} placeholder="Sum Insured" className="px-5 py-4 border rounded-xl dark:bg-gray-700" />
            <input value={form.tenure} onChange={(e) => setForm({ ...form, tenure: e.target.value })} placeholder="Tenure" className="px-5 py-4 border rounded-xl dark:bg-gray-700" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-xl font-bold hover:shadow-2xl transition">
            Get Quote
          </button>
        </form>
      </div>
    </div>
  )
}