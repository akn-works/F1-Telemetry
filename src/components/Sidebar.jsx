import { LayoutDashboard, Users, Flag, Star, Settings } from 'lucide-react';
import { NeonGlow } from './SharedUI';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Drivers" },
  { icon: Flag, label: "Races" },
  { icon: Star, label: "Favorites" },
];

export default function Sidebar({ activeTab, setActiveTab, toggleTheme }) {
  return (
    <aside className="w-20 lg:w-64 border-r border-slate-200 dark:border-white/10 flex-shrink-0 flex flex-col items-center lg:items-stretch py-8 bg-white/30 dark:bg-slate-900/30 backdrop-blur-2xl z-20">
      {/* Logo */}
      <div
        className="flex items-center justify-center lg:justify-start lg:px-8 mb-12 relative group cursor-pointer"
        onClick={() => setActiveTab("Dashboard")}
      >
        <NeonGlow color="bg-red-500" />
        <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          <span className="font-black text-white text-xl tracking-tighter italic">F1</span>
        </div>
        <span className="hidden lg:block ml-4 font-bold text-xl tracking-wider text-slate-800 dark:text-white uppercase">Control</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 w-full flex flex-col gap-4 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`relative flex items-center justify-center lg:justify-start w-full p-3 rounded-xl transition-all group overflow-hidden
                ${isActive
                  ? 'bg-slate-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-white/5'
                }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 dark:bg-indigo-500 rounded-r shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
              )}
              <item.icon className="h-5 w-5" />
              <span className="hidden lg:block ml-3 font-medium">{item.label}</span>
              {isActive && <div className="absolute inset-0 bg-indigo-500/5 dark:bg-indigo-400/5 pointer-events-none"></div>}
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="mt-auto px-4 w-full">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center lg:justify-start w-full p-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all"
        >
          <Settings className="h-5 w-5" />
          <span className="hidden lg:block ml-3 font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
}
