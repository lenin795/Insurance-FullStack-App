// src/components/ui/Toast.js
export default function Toast({ message, type = "success", onClose }) {
  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600"

  return (
    <div className={`fixed bottom-8 right-8 ${bgColor} text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 animate-slideUp z-50`}>
      <span className="text-lg font-medium">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200 text-xl font-bold">×</button>
    </div>
  )
}