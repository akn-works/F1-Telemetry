import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDrivers,
  updateSpeed,
  toggleDarkMode,
} from "../store/f1Slice";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function F1Dashboard() {
  const dispatch = useDispatch();
  const { drivers, speed, loading, darkMode } = useSelector(
    (state) => state.f1
  );

  const [search, setSearch] = useState("");
  const [chartData, setChartData] = useState([]);

  // Fetch data
  useEffect(() => {
    dispatch(fetchDrivers());
  }, []);

  // Real-time speed
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateSpeed());

      setChartData((prev) => [
        ...prev.slice(-9),
        { time: prev.length, speed: speed },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [speed]);

  const filteredDrivers = drivers.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen p-4 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-red-500 text-xl font-bold">F1 DASH</h1>
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Toggle Mode
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search driver..."
        className="p-2 mb-4 w-full text-black"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LEADERBOARD */}
      <div className="bg-gray-900 p-4 rounded-xl mb-4">
        <h2 className="mb-2">Leaderboard</h2>

        {loading && <p>Loading...</p>}

        {filteredDrivers.map((d, i) => (
          <div key={i} className="flex justify-between mb-1">
            <span>{i + 1}. {d.name}</span>
            <span>{d.team}</span>
          </div>
        ))}
      </div>

      {/* SPEED */}
      <div className="bg-gray-900 p-4 rounded-xl text-center mb-4">
        <p>Speed</p>
        <h1 className="text-red-500 text-3xl">{speed} km/h</h1>
      </div>

      {/* CHART */}
      <div className="bg-gray-900 p-4 rounded-xl">
        <h2 className="mb-2">Speed Chart</h2>
        <LineChart width={300} height={200} data={chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="speed" />
        </LineChart>
      </div>
    </div>
  );
}