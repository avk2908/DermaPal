import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login
    navigate("/doctor/dashboard");
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="glass-panel" style={{ width: "100%", maxWidth: "420px", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
        {/* Subtle accent glow */}
        <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "150px", height: "150px", background: "rgba(16, 185, 129, 0.2)", filter: "blur(50px)", borderRadius: "50%" }}></div>

        <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", margin: "0 0 0.5rem 0", color: "white" }}>
            Doctor Portal
          </h2>
          <p style={{ color: "white", margin: 0 }}>
            Secure access for clinical personnel
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative", zIndex: 1 }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#ffffff" }}>Professional Email</label>
            <input 
              type="email" 
              className="glass-input" 
              placeholder="doctor@clinic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#ffffff" }}>Password / PIN</label>
            <input 
              type="password" 
              className="glass-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: "1rem", background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.39)" }}>
            Authenticate
          </button>
        </form>
        
        <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.875rem", color: "white", position: "relative", zIndex: 1 }}>
          Mock Auth: Enter any credentials to proceed.
        </div>
      </div>
    </div>
  );
}
