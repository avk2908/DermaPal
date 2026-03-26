import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PatientLogin from "./pages/PatientLogin.jsx";
import DoctorLogin from "./pages/DoctorLogin.jsx";
import PatientForm from "./components/PatientForm.jsx";
import DoctorDashboard from "./components/DoctorDashboard.jsx";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="glass-panel" style={{ 
      margin: '1rem', 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: '1rem',
      zIndex: 50,
      borderRadius: '1rem'
    }}>
      <Link to="/" style={{ 
        fontWeight: 800, 
        fontSize: '1.5rem',
        background: 'linear-gradient(to right, #60a5fa, #c084fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textDecoration: 'none'
      }}>
        DermaPal
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" className={isActive("/")}>Home</Link>
        <Link to="/patient/login" className={location.pathname.includes("/patient") ? "nav-link active" : "nav-link"}>Patient</Link>
        <Link to="/doctor/login" className={location.pathname.includes("/doctor") ? "nav-link active" : "nav-link"}>Doctor</Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/dashboard" element={<PatientForm />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        </Routes>
      </main>
    </div>
  );
}
