import { useState } from 'react';
import { Calendar, Trophy, Filter } from 'lucide-react';
import { GlassCard } from './SharedUI';

export default function Races({ raceHistory, teamWins }) {
  const [historyFilter, setHistoryFilter] = useState("All");

  const filteredHistory = historyFilter === "All"
    ? raceHistory
    : raceHistory.filter(r => r.track.toLowerCase() === historyFilter.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min">
      {/* Flag Legend & Filters */}
      <GlassCard className="lg:col-span-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div><span className="text-xs font-bold text-slate-400 uppercase">Caution</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-600"></div><span className="text-xs font-bold text-slate-400 uppercase">Stopped</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="text-xs font-bold text-slate-400 uppercase">Active</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-xs font-bold text-slate-400 uppercase">Lapping</span></div>
        </div>
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            className="bg-slate-100 dark:bg-slate-800 text-sm rounded-lg px-3 py-1.5 border-none focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none"
            value={historyFilter}
            onChange={(e) => setHistoryFilter(e.target.value)}
          >
            <option value="All">All Tracks</option>
            <option value="Silverstone">Silverstone</option>
            <option value="Monaco">Monaco</option>
          </select>
        </div>
      </GlassCard>

      {/* History Table */}
      <GlassCard className="lg:col-span-8 flex flex-col" noPadding>
        <div className="p-6 border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-transparent">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-500" /> Race History
          </h2>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/30">
                <th className="px-6 py-3 font-semibold">Year</th>
                <th className="px-6 py-3 font-semibold">Track</th>
                <th className="px-6 py-3 font-semibold">Winner</th>
                <th className="px-6 py-3 font-semibold text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredHistory.map((race, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-mono text-sm text-slate-900 dark:text-slate-300">{race.year}</td>
                  <td className="px-6 py-4 text-sm font-medium dark:text-white">{race.track}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{race.winner}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{race.team}</p>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm text-slate-600 dark:text-slate-400">{race.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Constructor Wins */}
      <GlassCard className="lg:col-span-4 flex flex-col">
        <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white mb-6 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" /> Constructor Wins
        </h2>
        <div className="space-y-6">
          {teamWins.map((team, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-bold dark:text-white">{team.team}</span>
                <span className="font-mono text-slate-500">{team.wins} wins</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                <div className={`${team.color} h-2 rounded-full`} style={{ width: `${(team.wins / 21) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}