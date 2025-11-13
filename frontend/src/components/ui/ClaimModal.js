// src/components/ui/ClaimModal.js
import { useState } from "react"

export default function ClaimModal({ policy, onClose, showToast }) {
  const [formData, setFormData] = useState({ type: "", description: "", file: null })

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast(`Claim submitted for ${policy.id}! Review in 48 hours.`, "success")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">File Claim - {policy.id}</h3>
          <button onClick={onClose} className="text-3xl hover:text-red-600">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-red-200 dark:bg-gray-700"
          >
            <option value="">Select Claim Type</option>
            <option>Hospitalization</option>
            <option>Accident</option>
            <option>Theft / Loss</option>
            <option>Natural Calamity</option>
          </select>

          <textarea
            required
            rows="5"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the incident..."
            className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-4 focus:ring-red-200 dark:bg-gray-700"
          />

          <input type="file" className="w-full px-5 py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl" />

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition transform hover:scale-105"
            >
              Submit Claim
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 dark:border-gray-600 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}