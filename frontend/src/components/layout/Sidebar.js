// src/components/layout/Sidebar.js
import NavItem from "../ui/NavItem.js"

export default function Sidebar({ user, setView, onLogout, currentView }) {
  return (
    <aside className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
          {user.avatar}
        </div>
        <div>
          <h3 className="font-bold text-lg">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem label="Overview" icon="Dashboard" onClick={() => setView("overview")} active={currentView === "overview"} />
        <NavItem label="Policies" icon="Policy" onClick={() => setView("policies")} active={currentView === "policies"} />
        <NavItem label="Claims" icon="Claim" onClick={() => setView("claims")} active={currentView === "claims"} />
        <NavItem label="Buy Policy" icon="Shopping Cart" onClick={() => setView("buy")} active={currentView === "buy"} />
        <NavItem label="Profile" icon="Person" onClick={() => setView("profile")} active={currentView === "profile"} />
      </nav>

      <button onClick={onLogout} className="mt-6 w-full text-left px-4 py-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 transition">
        Sign Out
      </button>
    </aside>
  )
}