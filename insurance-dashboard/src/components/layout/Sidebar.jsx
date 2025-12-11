import NavItem from "../ui/NavItem.jsx";
import { MdLogout } from 'react-icons/md';

export default function Sidebar({ user, setView, onLogout, currentView }) {
  const avatar = user.name ? user.name.charAt(0).toUpperCase() : 'U';
  
  return (
    <aside className="w-72 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 min-h-screen p-6 flex flex-col shadow-2xl">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-10 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl ring-4 ring-white/20">
          {avatar}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white truncate">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.username || user.email}</p>
          {user.role && (
            <span className={`inline-flex mt-1 text-xs font-bold px-3 py-1 rounded-full shadow-md ${
              user.role === 'admin' 
                ? 'bg-gradient-to-r from-red-400 to-red-600 text-white' 
                : 'bg-gradient-to-r from-green-400 to-green-600 text-white'
            }`}>
              {user.role.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <NavItem label="Overview" icon="dashboard" onClick={() => setView("overview")} active={currentView === "overview"} />
        <NavItem label="My Policies" icon="description" onClick={() => setView("policies")} active={currentView === "policies"} />
        <NavItem label="Claims" icon="local_hospital" onClick={() => setView("claims")} active={currentView === "claims"} />
        {user.role !== 'admin' && (
          <NavItem label="Buy Policy" icon="shopping_cart" onClick={() => setView("buy")} active={currentView === "buy"} />
        )}
        <NavItem label="Profile" icon="person" onClick={() => setView("profile")} active={currentView === "profile"} />
      </nav>

      {/* Logout Button */}
      <button 
        onClick={onLogout}
        className="mt-8 w-full flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-200 active:scale-[0.98]"
      >
        <MdLogout className="text-xl" />
        Sign Out
      </button>
    </aside>
  );
}
