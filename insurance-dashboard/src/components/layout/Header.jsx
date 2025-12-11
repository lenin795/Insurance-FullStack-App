// src/components/layout/Header.jsx
import { MdNotifications, MdDarkMode, MdLightMode } from 'react-icons/md';

export default function Header({ user, notifications, darkMode, setDarkMode }) {
  return (
    <header className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.486.567h-.09a6 6 0 01-3.486-.567l-.318-.158a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547 2 2 0 00-.547 1.022L3.124 21.26a2 2 0 002.122.959H19a2 2 0 002.122-.959l1.055-4.812a2 2 0 00-.547-1.022zM12 10a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              Insurance Dashboard
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back, {user.name?.split(" ")[0] || 'User'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
            title={darkMode ? "Switch to Light" : "Switch to Dark"}
          >
            {darkMode ? <MdLightMode className="w-5 h-5 text-yellow-400" /> : <MdDarkMode className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
          </button>
          
          <div className="relative">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg">
              <MdNotifications className="w-5 h-5" />
              <span className="font-bold">{notifications.length}</span>
            </div>
          </div>
          
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg ring-4 ring-indigo-500/20">
            {user.name?.[0]?.toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
