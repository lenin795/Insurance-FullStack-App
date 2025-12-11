export default function StatCard({ title, value, color, icon }) {
  const colors = {
    indigo: 'from-indigo-500 to-indigo-600',
    green: 'from-emerald-500 to-teal-600',
    purple: 'from-purple-500 to-violet-600',
    red: 'from-red-500 to-orange-600',
    orange: 'from-orange-500 to-yellow-600'
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 hover:border-transparent hover:bg-gradient-to-br hover:from-white/50">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${colors[color] || 'from-gray-500 to-gray-600'} text-white shadow-lg group-hover:scale-110 transition-transform`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="text-3xl font-black text-gray-900 dark:text-white">{value}</div>
      </div>
      <h3 className="font-bold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">{title}</h3>
    </div>
  );
}
