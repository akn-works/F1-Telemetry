import { useState, useEffect } from 'react';
import { initialDrivers, TRACK_DATABASE, raceFeed, raceHistory, teamWins } from '../data/mockData';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import Drivers from './Drivers';
import Races from './Races';

export default function Formula1Dashboard() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [favorites, setFavorites] = useState(["ver", "nor", "ham"]);

  const [driversData, setDriversData] = useState(initialDrivers);
  const currentTrack = TRACK_DATABASE.silverstone;

  const toggleTheme = () => setIsDark(!isDark);
  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  // Simulated live telemetry
  useEffect(() => {
    if (activeTab !== "Dashboard") return;
    const interval = setInterval(() => {
      setDriversData(prev => prev.map(driver => {
        let newProgress = driver.lapProgress + (Math.random() * 0.008 + 0.002);
        if (newProgress > 1) newProgress = newProgress - 1;
        let newStat = driver.stat;
        if (driver.label === 'Speed Trap') newStat = `${Math.floor(290 + Math.random() * 25)} km/h`;
        if (driver.label === 'Last Lap' && newProgress < 0.05) newStat = `1:24.${Math.floor(100 + Math.random() * 800)}`;
        return { ...driver, lapProgress: newProgress, stat: newStat };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const searchResults = driversData.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.short.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSelect = (driver) => {
    setSelectedDriver(driver);
    setSearchQuery(driver.name);
    setIsSearchFocused(false);
    setActiveTab("Dashboard");
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${isDark ? 'dark bg-[#030712] text-slate-200' : 'bg-slate-50 text-slate-800'} font-sans overflow-hidden flex`}>
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 dark:bg-cyan-600/10 blur-[120px]"></div>
      </div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} toggleTheme={toggleTheme} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <Header
          isDark={isDark}
          toggleTheme={toggleTheme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
          searchResults={searchResults}
          handleSearchSelect={handleSearchSelect}
          currentTrack={currentTrack}
        />

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide">
          {activeTab === "Dashboard" && (
            <Dashboard
              driversData={driversData}
              raceFeed={raceFeed}
              currentTrack={currentTrack}
              selectedDriver={selectedDriver}
              setSelectedDriver={setSelectedDriver}
            />
          )}
          {activeTab === "Drivers" && (
            <Drivers driversData={driversData} favorites={favorites} toggleFavorite={toggleFavorite} />
          )}
          {activeTab === "Favorites" && (
            <Drivers driversData={driversData.filter(d => favorites.includes(d.id))} favorites={favorites} toggleFavorite={toggleFavorite} />
          )}
          {activeTab === "Races" && (
            <Races raceHistory={raceHistory} teamWins={teamWins} />
          )}
        </div>
      </main>
    </div>
  );
}
