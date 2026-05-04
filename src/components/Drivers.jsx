import { Heart } from 'lucide-react';
import { GlassCard } from './SharedUI';

export default function Drivers({ driversData, favorites, toggleFavorite }) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
      {driversData.map((driver) => (
        <GlassCard key={driver.id} className="flex flex-col relative group">
          <button
            onClick={() => toggleFavorite(driver.id)}
            className="absolute top-4 right-4 z-20 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Heart className={`h-5 w-5 ${favorites.includes(driver.id) ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          <div className="relative w-28 h-28 mx-auto mb-4 mt-2">
            <div className="absolute inset-0 rounded-full border-[3px] opacity-70 group-hover:opacity-100 shadow-[0_0_15px_currentColor] transition-all duration-500 z-10" style={{ borderColor: driver.hex, color: driver.hex }}></div>
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 relative z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-50 group-hover:opacity-10 transition-opacity duration-500"></div>
              <img src={driver.img} alt={driver.name} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 z-0" />
            </div>
          </div>

          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{driver.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{driver.team}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-auto border-t border-slate-200 dark:border-white/5 pt-4">
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Position</p>
              <p className="text-lg font-mono font-bold dark:text-white">P{driver.pos}</p>
            </div>
            <div className="text-center border-l border-slate-200 dark:border-white/5">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Best Time</p>
              <p className="text-sm font-mono font-bold dark:text-white mt-1">{driver.stat}</p>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
