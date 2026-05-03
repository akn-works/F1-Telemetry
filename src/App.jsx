import { BrowserRouter, Routes, Route } from "react-router-dom";
import F1Dashboard from "./pages/F1Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<F1Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}