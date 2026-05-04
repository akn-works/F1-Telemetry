import { useRef, useEffect } from 'react';
import { Search, CloudRain, Sun, Moon } from 'lucide-react';

export default function Header({
  isDark, toggleTheme,
  searchQuery, setSearchQuery,
  isSearchFocused, setIsSearchFocused,
  searchResults,
  handleSearchSelect,
  currentTrack,
}) {
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSearchFocused]);

  return (
    <header className="h-20 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 lg:px-10 bg-white/10 dark:bg-[#030712]/50 backdrop-blur-xl shrink-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-md relative" ref={searchRef}>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setIsSearchFocused(true); }}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search drivers, teams..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700/50 rounded-full leading-5 bg-slate-100/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 sm:text-sm transition-all"
          />
        </div>

        {isSearchFocused && searchQuery && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-xl border border-slate-200/50 dark:border-indigo-500/20 rounded-2xl shadow-xl overflow-hidden z-50">
            {searchResults.length > 0 ? (
              <ul className="max-h-60 overflow-auto divide-y divide-slate-100 dark:divide-slate-800">
                {searchResults.map((driver) => (
                  <li
                    key={driver.id}
                    onClick={() => handleSearchSelect(driver)}
                    className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: driver.hex }}></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{driver.name}</p>
                      <p className="text-xs text-slate-500">{driver.team}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-sm text-slate-500 text-center">No results found.</div>
            )}
          </div>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 backdrop-blur-md">
          <CloudRain className="h-4 w-4 text-cyan-500" />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-none">{currentTrack.name.split(" ")[0]}</span>
            <span className="text-sm font-bold leading-none mt-1">{currentTrack.airTemp} / Wet</span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-cyan-400 transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] dark:hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-2 border-white dark:border-slate-800 shadow-md flex items-center justify-center cursor-pointer">
          <span className="font-bold text-white text-sm">TR</span>
        </div>
      </div>
    </header>
  );
}
