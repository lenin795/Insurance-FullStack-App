import { 
  MdDashboard, 
  MdDescription, 
  MdLocalHospital, 
  MdShoppingCart, 
  MdPerson 
} from 'react-icons/md';

export default function NavItem({ label, icon, active, onClick }) {
  // Icon mapping for Material Design
  const icons = {
    dashboard: MdDashboard,
    description: MdDescription,
    'local_hospital': MdLocalHospital,
    'shopping_cart': MdShoppingCart,
    person: MdPerson
  };

  const IconComponent = icons[icon];

  return (
    <button
      onClick={onClick}
      className={`
        w-full px-6 py-4 flex items-center gap-4 rounded-2xl font-semibold text-left transition-all duration-200 group 
        ${active 
          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-[1.02] border-2 border-white/20' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:text-indigo-600 hover:shadow-lg hover:scale-[1.01] hover:border hover:border-indigo-200/50 dark:hover:border-indigo-500/30'
        }
      `}
    >
      <div className={`
        p-2 rounded-xl transition-all group-hover:rotate-3 group-hover:scale-110
        ${active 
          ? 'bg-white/20 backdrop-blur-sm shadow-lg' 
          : 'bg-indigo-100/50 dark:bg-indigo-900/30 hover:bg-indigo-200/50 dark:hover:bg-indigo-800/50'
        }
      `}>
        {IconComponent ? (
          <IconComponent 
            className={`w-6 h-6 transition-all ${active ? 'text-white shadow-lg' : 'text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`} 
          />
        ) : (
          <div className={`w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg ${active ? 'shadow-white/30' : ''}`} />
        )}
      </div>
      <span className="tracking-wide">{label}</span>
    </button>
  );
}
