// src/components/ui/StatCard.js
export default function StatCard({ title, value, color = "indigo" }) {
  const colors = {
    indigo: "from-indigo-500 to-purple-600",
    green: "from-green-500 to-emerald-600",
    red: "from-red-500 to-pink-600"
  }

  return (
    <div className={`bg-gradient-to-br ${colors[color]} p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition`}>
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  )
}