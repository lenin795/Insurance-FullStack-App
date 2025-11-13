// src/components/layout/Header.js
export default function Header({ user, notifications, darkMode, setDarkMode }) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Insurance Dashboard</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {user.name.split(" ")[0]}</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 transition">
            {darkMode ? "Light" : "Dark"}
          </button>
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">Notifications ({notifications.length})</div>
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {user.avatar}
          </div>
        </div>
      </div>
    </header>
  )
}