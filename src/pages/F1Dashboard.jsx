import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [speed, setSpeed] = useState(280)
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.floor(Math.random() * 20) + 280)
      setTime(prev => prev + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-red-500 text-2xl font-bold mb-4">F1 DASH</h1>

      <div className="bg-gray-900 p-4 rounded-xl mb-4">
        <h2 className="text-xl">Monaco Grand Prix</h2>
        <p className="text-sm text-gray-400">Lap 32 / 78</p>
      </div>

      <div className="bg-gray-900 p-4 rounded-xl mb-4">
        <h3 className="mb-2">Leaderboard</h3>
        {["Max Verstappen","Lewis Hamilton","Charles Leclerc","Lando Norris","Fernando Alonso"].map((d,i)=> (
          <div key={i} className="flex justify-between text-sm mb-1">
            <span>{i+1}. {d}</span>
            <span className="text-gray-400">Team</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 p-4 rounded-xl mb-4 text-center">
        <p className="text-gray-400">Speed</p>
        <h1 className="text-red-500 text-3xl">{speed} km/h</h1>
      </div>

      <div className="bg-gray-900 p-4 rounded-xl mb-4 text-center">
        <p className="text-gray-400">Race Time</p>
        <h1>{time}s</h1>
      </div>

      <div className="bg-gray-900 p-4 rounded-xl mb-4">
        <p>Weather</p>
        <p className="text-sm text-gray-400">Temp: 28°C</p>
        <p className="text-sm text-gray-400">Wind: 12 km/h</p>
      </div>
    </div>
  )
}

