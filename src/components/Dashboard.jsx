import { useRef, useEffect, useState } from 'react';
import { Activity, AlertTriangle, ChevronRight, ExternalLink, Map, Zap, Flag, Clock } from 'lucide-react';
import { GlassCard } from './SharedUI';

const feedTypeStyles = {
  alert: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
  info: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
  success: 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400',
  highlight: 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
  default: 'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300',
};

export default function Dashboard({ driversData, raceFeed, currentTrack, selectedDriver, setSelectedDriver }) {
  const trackPathRef = useRef(null);
  const [carPositions, setCarPositions] = useState({});

  useEffect(() => {
    const updatePositions = () => {
      if (trackPathRef.current) {
        const path = trackPathRef.current;
        const totalLength = path.getTotalLength();
        if (totalLength > 0) {
          const newPositions = {};
          driversData.forEach(d => {
            try {
              const point = path.getPointAtLength(totalLength * d.lapProgress);
              newPositions[d.id] = { x: point.x, y: point.y };
            } catch (e) {}
          });
          setCarPositions(newPositions);
        }
      }
    };
    const rafId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(rafId);
  }, [driversData]);

  const currentHighlights = selectedDriver
    ? driversData.filter(d => d.id === selectedDriver.id).concat(driversData.filter(d => d.id !== selectedDriver.id)).slice(0, 3)
    : driversData.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min">
      {/* HERO OVERVIEW */}
      <GlassCard className="lg:col-span-8 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 group-hover:opacity-50"></div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.6)] animate-pulse">Live</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider border-r border-slate-300 dark:border-slate-700 pr-3">Round 12</span>
              <a href="https://f1tv.formula1.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-indigo-600/90 hover:bg-indigo-500 backdrop-blur-sm rounded-full shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all hover:scale-105">
                <ExternalLink className="h-3 w-3" /> Watch F1TV
              </a>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {selectedDriver ? `${selectedDriver.name} - Telemetry` : 'British Grand Prix'}
            </h1>
            <p className="text-slate-500 dark:text-cyan-400/80 font-mono text-sm mt-1">
              {selectedDriver ? selectedDriver.team : currentTrack.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Lap</p>
            <p className="text-4xl lg:text-5xl font-black font-mono text-indigo-600 dark:text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.2)] dark:drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]">
              42<span className="text-2xl text-slate-400 dark:text-slate-600">/52</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-black/20 border border-slate-200 dark:border-white/5 backdrop-blur-sm">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{selectedDriver ? 'Current Position' : 'Track Temp'}</p>
            <p className="text-lg font-mono font-semibold dark:text-white transition-all">{selectedDriver ? `P${selectedDriver.pos}` : currentTrack.temp}</p>
          </div>
          <div className="border-l border-slate-200 dark:border-slate-800 pl-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{selectedDriver ? 'Gap to Leader' : 'Air Temp'}</p>
            <p className="text-lg font-mono font-semibold dark:text-white transition-all">{selectedDriver ? selectedDriver.gap : currentTrack.airTemp}</p>
          </div>
          <div className="border-l border-slate-200 dark:border-slate-800 pl-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Safety Car</p>
            <p className="text-lg font-mono font-semibold text-green-600 dark:text-green-400">Clear</p>
          </div>
        </div>
      </GlassCard>

      {/* RACE CONTROL FEED */}
      <GlassCard className="lg:col-span-4 flex flex-col h-[300px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-500" /> Race Control
          </h2>
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          {raceFeed.map((item) => (
            <div key={item.id} className="flex gap-3 items-start group">
              <div className={`p-2 rounded-lg shrink-0 transition-colors ${feedTypeStyles[item.type] || feedTypeStyles.default}`}>
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{item.time}</span>
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* LIVE STANDINGS */}
      <GlassCard className="lg:col-span-5 flex flex-col row-span-2" noPadding>
        <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-transparent flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">Live Standings</h2>
          {selectedDriver && (
            <button onClick={() => setSelectedDriver(null)} className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors">Clear Filter</button>
          )}
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/30">
                <th className="px-6 py-3 font-semibold">Pos</th>
                <th className="px-6 py-3 font-semibold">Driver</th>
                <th className="px-6 py-3 font-semibold text-right">Gap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {driversData.map((driver) => {
                const isSelected = selectedDriver?.id === driver.id;
                return (
                  <tr key={driver.pos} className={`transition-colors group cursor-default ${isSelected ? 'bg-indigo-50 dark:bg-indigo-500/20' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                    <td className="px-6 py-3 font-mono text-sm text-slate-900 dark:text-slate-300">{driver.pos}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 rounded-full shadow-sm dark:shadow-[0_0_5px_currentColor]" style={{ backgroundColor: driver.hex }}></div>
                        <div>
                          <p className={`text-sm font-bold transition-colors ${isSelected ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400'}`}>
                            {driver.short} <span className="font-normal opacity-70 ml-1">{driver.name.split(" ")[1]}</span>
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{driver.team}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-3 text-right font-mono text-sm ${driver.isFastest ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-slate-600 dark:text-slate-400'}`}>
                      {driver.gap}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* TRACK MAP */}
      <GlassCard className="lg:col-span-7 relative min-h-[400px] flex items-center justify-center overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-indigo-500/5 pointer-events-none"></div>
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <Map className="h-5 w-5 text-slate-400" />
          <span className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Live Telemetry Map</span>
        </div>
        <div className="relative w-full max-w-md aspect-video">
          <svg viewBox="0 0 800 400" className="w-full h-full drop-shadow-2xl">
            <path d={currentTrack.path} fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" className="text-slate-200 dark:text-slate-800" />
            <path ref={trackPathRef} d={currentTrack.path} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 dark:text-indigo-500/50" />
            {driversData.slice(0, 5).map((driver) => {
              const pos = carPositions[driver.id];
              const isSelected = selectedDriver?.id === driver.id;
              if (!pos) return null;
              return (
                <g key={driver.id} transform={`translate(${pos.x}, ${pos.y})`} className="transition-transform duration-[2000ms] ease-linear">
                  {isSelected && <circle r="14" className="fill-transparent stroke-[3px] animate-ping" stroke={driver.hex} />}
                  <circle r="8" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" fill={driver.hex} />
                  <text x={driver.pos % 2 === 0 ? "-32" : "12"} y="4" className="text-[10px] font-mono fill-slate-700 dark:fill-slate-300 font-bold drop-shadow-md">
                    {driver.short}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="absolute bottom-6 right-6 flex gap-4 text-xs font-medium bg-white/80 dark:bg-black/40 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.8)]"></div>Sector 1 (Yellow)</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>Sector 2 (Clear)</div>
        </div>
      </GlassCard>

      {/* DRIVER HIGHLIGHT CARDS */}
      {currentHighlights.map((card) => (
        <GlassCard key={card.id} className="lg:col-span-4 flex items-center gap-4 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-[3px] opacity-80 group-hover:opacity-100 shadow-[0_0_15px_currentColor] transition-all duration-500 z-10" style={{ borderColor: card.hex, color: card.hex }}></div>
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 relative z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img src={card.img} alt={card.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 z-0" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{card.label}</p>
            <p className="text-xl font-bold font-mono text-slate-900 dark:text-white drop-shadow-sm transition-all">{card.stat}</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{card.name}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-300 dark:text-slate-600 group-hover:text-cyan-500 transition-colors" />
        </GlassCard>
      ))}
    </div>
  );
}
