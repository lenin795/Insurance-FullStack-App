// src/components/ui/NavItem.js
export default function NavItem({ label, icon, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${active
        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  )
}