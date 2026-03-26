import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login
    navigate("/patient/dashboard");
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="glass-panel" style={{ width: "100%", maxWidth: "420px", padding: "2.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", margin: "0 0 0.5rem 0", color: "white" }}>
            Patient Portal
          </h2>
          <p style={{ color: "var(--color-text-muted)", margin: 0 }}>
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#e2e8f0" }}>Email Address</label>
            <input 
              type="email" 
              className="glass-input" 
              placeholder="patient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#e2e8f0" }}>Password</label>
            <input 
              type="password" 
              className="glass-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }}>
            Sign In
          </button>
        </form>
        
        <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
          Mock Auth: Enter any credentials to proceed.
        </div>
      </div>
    </div>
  );
}
