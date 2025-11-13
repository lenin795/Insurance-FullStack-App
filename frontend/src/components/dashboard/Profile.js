// src/components/dashboard/Profile.js
export default function Profile({ user }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold">Profile Settings</h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
            {user.avatar}
          </div>
          <div>
            <h3 className="text-2xl font-bold">{user.name}</h3>
            <p className="text-gray-500">Member since 2023</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div><label className="block text-sm font-medium text-gray-600">Name</label><p className="mt-2 text-lg font-semibold">{user.name}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Email</label><p className="mt-2 text-lg">{user.email}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Phone</label><p className="mt-2 text-lg">{user.phone}</p></div>
        </div>
        <div className="mt-10 flex gap-4">
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">Edit Profile</button>
        </div>
      </div>
    </div>
  )
}