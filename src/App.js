import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/UI/NavigationBar"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PetRegister from "./pages/PetRegister";
import Dashboard from "./pages/Dashboard";
import { LoginContext } from "./components/functions/LoginContext";

function App() {
  const { user } = useContext(LoginContext);

  return (
    <BrowserRouter>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<PetRegister />} />
            <Route path="/dashboard" element={user.auth ? <Dashboard />: <LoginPage />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
