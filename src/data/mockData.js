import { Zap, AlertTriangle, Flag, Clock, Activity } from 'lucide-react';

export const TRACK_DATABASE = {
  silverstone: {
    id: "silverstone",
    name: "Silverstone Circuit",
    location: "United Kingdom",
    temp: "24.5°C",
    airTemp: "18.2°C",
    path: "M 150,250 C 50,250 50,100 150,100 L 400,100 C 500,100 650,50 700,150 C 750,250 600,350 400,300 C 300,280 250,250 150,250 Z"
  },
  monza: {
    id: "monza",
    name: "Monza Circuit",
    location: "Italy",
    temp: "32.1°C",
    airTemp: "28.5°C",
    path: "M 200,300 L 250,100 C 300,50 600,50 600,50 C 650,50 700,100 650,200 L 400,350 C 350,400 200,350 200,300 Z"
  },
  suzuka: {
    id: "suzuka",
    name: "Suzuka Circuit",
    location: "Japan",
    temp: "27.8°C",
    airTemp: "22.4°C",
    path: "M 200,200 C 100,100 300,50 400,150 C 500,250 700,350 700,200 C 700,50 500,50 400,150 C 300,250 100,300 200,200 Z"
  }
};

export const initialDrivers = [
  { id: "ver", pos: 1, name: "Max Verstappen", short: "VER", team: "Red Bull Racing", gap: "Interval", isFastest: true, color: "bg-blue-600", hex: "#2563eb", teamColor: "from-blue-600 to-blue-800", img: "https://imgs.search.brave.com/ItkNLrRW_nEJEPmmuRXUcApQNhMhjs9qMOzQ7LnMF_E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi81LzUyLzIw/MjQtMDgtMjVfTW90/b3JzcG9ydCUyQ19G/b3JtZWxfMSUyQ19H/cm8lQzMlOUZlcl9Q/cmVpc19kZXJfTmll/ZGVybGFuZGVfMjAy/NF9TVFBfMzk3M19i/eV9TdGVwcm9fJTI4/bWVkaXVtX2Nyb3Al/MjkuanBnLzUxMnB4/LTIwMjQtMDgtMjVf/TW90b3JzcG9ydCUy/Q19Gb3JtZWxfMSUy/Q19Hcm8lQzMlOUZl/cl9QcmVpc19kZXJf/TmllZGVybGFuZGVf/MjAyNF9TVFBfMzk3/M19ieV9TdGVwcm9f/JTI4bWVkaXVtX2Ny/b3AlMjkuanBn", stat: "1:24.512", label: "Last Lap", lapProgress: 0.95 },
  { id: "nor", pos: 2, name: "Lando Norris", short: "NOR", team: "McLaren", gap: "+1.243", isFastest: false, color: "bg-orange-500", hex: "#f97316", teamColor: "from-orange-400 to-orange-600", img: "https://imgs.search.brave.com/d25SjV5q_7xiZbZMHKyHeeco7ODOChquFe6iHhLJdMk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85LzkwLzIw/MjQtMDgtMjVfTW90/b3JzcG9ydCUyQ19G/b3JtZWxfMSUyQ19H/cm8lQzMlOUZlcl9Q/cmVpc19kZXJfTmll/ZGVybGFuZGVfMjAy/NF9TVFBfMzk2OF9i/eV9TdGVwcm9fJTI4/Y3JvcHBlZDIlMjku/anBnLzUxMnB4LTIw/MjQtMDgtMjVfTW90/b3JzcG9ydCUyQ19G/b3JtZWxfMSUyQ19H/cm8lQzMlOUZlcl9Q/cmVpc19kZXJfTmll/ZGVybGFuZGVfMjAy/NF9TVFBfMzk2OF9i/eV9TdGVwcm9fJTI4/Y3JvcHBlZDIlMjku/anBn", stat: "312 km/h", label: "Speed Trap", lapProgress: 0.91 },
  { id: "lec", pos: 3, name: "Charles Leclerc", short: "LEC", team: "Ferrari", gap: "+4.562", isFastest: false, color: "bg-red-600", hex: "#dc2626", teamColor: "from-red-500 to-red-700", img: "https://imgs.search.brave.com/QSLzntgbRlhBAQO-b-YYp4HElm0Z_OHtNWoj12-p2dI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi83LzdiLzIw/MjQtMDgtMjVfTW90/b3JzcG9ydCUyQ19G/b3JtZWxfMSUyQ19H/cm8lQzMlOUZlcl9Q/cmVpc19kZXJfTmll/ZGVybGFuZGVfMjAy/NF9TVFBfMzk3OF9i/eV9TdGVwcm9fJTI4/Y3JvcHBlZDIlMjku/anBnLzUxMnB4LTIw/MjQtMDgtMjVfTW90/b3JzcG9ydCUyQ19G/b3JtZWxfMSUyQ19H/cm8lQzMlOUZlcl9Q/cmVpc19kZXJfTmll/ZGVybGFuZGVfMjAy/NF9TVFBfMzk3OF9i/eV9TdGVwcm9fJTI4/Y3JvcHBlZDIlMjku/anBn", stat: "Soft", label: "Current Tyre", lapProgress: 0.88 },
  { id: "ham", pos: 4, name: "Lewis Hamilton", short: "HAM", team: "Mercedes", gap: "+8.910", isFastest: false, color: "bg-teal-500", hex: "#14b8a6", teamColor: "from-teal-400 to-teal-600", img: "https://imgs.search.brave.com/Px1FJ06cRY0V3f5CmpmeFQrgS6DHJp0SnwrNoyG6U0E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9kL2QzL1By/aW1lX01pbmlzdGVy/X0tlaXJfU3Rhcm1l/cl9tZWV0c19TaXJf/TGV3aXNfSGFtaWx0/b25fJTI4NTQ1NjY5/MjgzODIlMjlfJTI4/Y3JvcHBlZCUyOS5q/cGcvNTEycHgtUHJp/bWVfTWluaXN0ZXJf/S2Vpcl9TdGFybWVy/X21lZXRzX1Npcl9M/ZXdpc19IYW1pbHRv/bl8lMjg1NDU2Njky/ODM4MiUyOV8lMjhj/cm9wcGVkJTI5Lmpw/Zw", stat: "7", label: "Pos Gained", lapProgress: 0.85 },
  { id: "pia", pos: 5, name: "Oscar Piastri", short: "PIA", team: "McLaren", gap: "+12.451", isFastest: false, color: "bg-orange-500", hex: "#f97316", teamColor: "from-orange-400 to-orange-600", img: "https://imgs.search.brave.com/gkmR-RPGlLLgZXfDU0cK5FrYuhtyBechfmiyvSDKGf0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIx/MDU3ODY1OS9waG90/by90b3BzaG90LW1j/bGFyZW5zLWF1c3Ry/YWxpYW4tZHJpdmVy/LW9zY2FyLXBpYXN0/cmktY2VsZWJyYXRl/cy13aW5uaW5nLXRo/ZS0yMDI1LXNhdWRp/LWFyYWJpYS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9djgt/cTFLQkdJTjNIbi11/RkQ4RDhhb01CNUtu/Z1gyVDZwbGVGS0pF/OWpfTT0", stat: "1:25.101", label: "Last Lap", lapProgress: 0.81 },
  { id: "sai", pos: 6, name: "Carlos Sainz", short: "SAI", team: "Ferrari", gap: "+14.220", isFastest: false, color: "bg-red-600", hex: "#dc2626", teamColor: "from-red-500 to-red-700", img: "https://imgs.search.brave.com/yfRgwDMhCpj1K4gE7_xd3cKSdC5ZEfzLy2vPd3tr69M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2NlL0Zv/cm11bGExR2FiZWxo/b2ZlbjIwMjJfJTI4/MDQlMjlfJTI4Y3Jv/cHBlZDIlMjkuanBn/LzUxMnB4LUZvcm11/bGExR2FiZWxob2Zl/bjIwMjJfJTI4MDQl/MjlfJTI4Y3JvcHBl/ZDIlMjkuanBn", stat: "Medium", label: "Current Tyre", lapProgress: 0.79 },
  { id: "rus", pos: 7, name: "George Russell", short: "RUS", team: "Mercedes", gap: "+18.773", isFastest: false, color: "bg-teal-500", hex: "#14b8a6", teamColor: "from-teal-400 to-teal-600", img: "https://imgs.search.brave.com/8cIe0Xs_nBV6JGBas4QOCtYT2bf8ufRKkGTpjE5Gj0M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi83LzdmL0tp/bmdzTGVvblNpbHZl/cnN0bmUwNDA3MjRf/JTI4Mjhfb2ZfMTEy/JTI5XyUyODUzODM4/MDA2MDI4JTI5XyUy/OGNyb3BwZWQlMjku/anBnLzUxMnB4LUtp/bmdzTGVvblNpbHZl/cnN0bmUwNDA3MjRf/JTI4Mjhfb2ZfMTEy/JTI5XyUyODUzODM4/MDA2MDI4JTI5XyUy/OGNyb3BwZWQlMjku/anBn", stat: "298 km/h", label: "Speed Trap", lapProgress: 0.75 },
  { id: "alo", pos: 8, name: "Fernando Alonso", short: "ALO", team: "Aston Martin", gap: "+22.105", isFastest: false, color: "bg-emerald-600", hex: "#059669", teamColor: "from-emerald-500 to-emerald-700", img: "https://imgs.search.brave.com/UMw179w7ado4DwX3lIUPuyEFOS_tsnpRsL4Log1-EE4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85Lzk3L0Fs/b25zby02OF8lMjgy/NDcxMDQ0NzA5OCUy/OS5qcGcvNTEycHgt/QWxvbnNvLTY4XyUy/ODI0NzEwNDQ3MDk4/JTI5LmpwZw", stat: "1:25.990", label: "Last Lap", lapProgress: 0.72 },
];

export const raceFeed = [
  { id: 1, time: "Lap 42", msg: "DRS Enabled", type: "info", icon: Zap },
  { id: 2, time: "Lap 41", msg: "Yellow Flag - Sector 2", type: "alert", icon: AlertTriangle },
  { id: 3, time: "Lap 40", msg: "Blue Flag - Car 2 (SAR)", type: "info", icon: Flag },
  { id: 4, time: "Lap 40", msg: "VER - Pit Stop (2.4s)", type: "event", icon: Clock },
  { id: 5, time: "Lap 39", msg: "NOR - Fastest Lap (1:24.331)", type: "highlight", icon: Activity },
  { id: 6, time: "Lap 38", msg: "Green Flag - Sector 1", type: "success", icon: Flag },
  { id: 7, time: "Lap 15", msg: "Red Flag - Session Stopped", type: "alert", icon: AlertTriangle },
];

export const raceHistory = [
  { year: 2023, track: "Silverstone", winner: "Max Verstappen", team: "Red Bull Racing", time: "1:25:16.938" },
  { year: 2022, track: "Silverstone", winner: "Carlos Sainz", team: "Ferrari", time: "2:17:50.311" },
  { year: 2021, track: "Silverstone", winner: "Lewis Hamilton", team: "Mercedes", time: "1:58:23.284" },
  { year: 2020, track: "Silverstone", winner: "Lewis Hamilton", team: "Mercedes", time: "1:28:01.283" },
  { year: 2023, track: "Monaco", winner: "Max Verstappen", team: "Red Bull Racing", time: "1:48:51.980" },
  { year: 2022, track: "Monaco", winner: "Sergio Perez", team: "Red Bull Racing", time: "1:56:30.265" },
];

export const teamWins = [
  { team: "Red Bull Racing", wins: 21, color: "bg-blue-600" },
  { team: "Mercedes", wins: 1, color: "bg-teal-500" },
  { team: "Ferrari", wins: 1, color: "bg-red-600" },
];