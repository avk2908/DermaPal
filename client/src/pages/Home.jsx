import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page-container animate-fade-in" style={{ padding: "0 1rem", textAlign: "center" }}>
      
      {/* Hero Section */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 0" }}>
        
        <div style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          background: "rgba(59, 130, 246, 0.1)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          borderRadius: "9999px",
          color: "#60a5fa",
          fontSize: "0.875rem",
          fontWeight: 600,
          marginBottom: "1.5rem",
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)"
        }}>
          ✨ Early-Stage Dermatological Screening
        </div>

        <h1 style={{ 
          fontSize: "3.5rem", 
          fontWeight: 800, 
          lineHeight: 1.2, 
          marginBottom: "1.5rem",
          background: "linear-gradient(to right, #ffffff, #94a3b8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          AI-Powered Skin Disease Classification
        </h1>
        
        <p style={{ 
          fontSize: "1.25rem", 
          color: "var(--color-text-muted)", 
          marginBottom: "3rem",
          lineHeight: 1.6,
          maxWidth: "600px",
          margin: "0 auto 3rem auto"
        }}>
          DermaPal leverages fine-tuned Convolutional Neural Networks and Grad-CAM visual explanations to provide transparent, reliable, and interpretable clinical decision support.
        </p>

        {/* Call to Actions */}
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/patient/login" className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>
            Get Started as Patient
          </Link>
          <Link to="/doctor/login" className="btn-secondary" style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}>
            Doctor Portal Access
          </Link>
        </div>
      </div>

      {/* Feature Cards Showcase */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: "2rem",
        maxWidth: "1000px",
        margin: "2rem auto",
        textAlign: "left"
      }}>
        
        <div className="glass-panel" style={{ padding: "2rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(59, 130, 246, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: "#60a5fa" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem 0" }}>High Accuracy Models</h3>
          <p style={{ color: "var(--color-text-muted)", margin: 0, fontSize: "0.9rem" }}>
            Trained on extensive datasets (ISIC, HAM10000) using state-of-the-art CNNs like EfficientNet and ResNet.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: "2rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(139, 92, 246, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: "#a78bfa" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          </div>
          <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem 0" }}>Interpretability</h3>
          <p style={{ color: "var(--color-text-muted)", margin: 0, fontSize: "0.9rem" }}>
            Grad-CAM heatmaps highlight precise lesion regions influencing predictions, breaking the black-box AI model.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: "2rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", color: "#34d399" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem 0" }}>Confidence Calibration</h3>
          <p style={{ color: "var(--color-text-muted)", margin: 0, fontSize: "0.9rem" }}>
            Ensures reliable confidence scores, reducing overconfident false predictions crucial for medical applications.
          </p>
        </div>

      </div>
    </div>
  );
}
