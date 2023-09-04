import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PetRegister from "./pages/PetRegister";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<PetRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
