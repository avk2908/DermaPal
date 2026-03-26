import React, { useEffect, useState } from "react";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  const mockPatients = [
    {
      id: "P-49281",
      name: "Sarah Jenkins",
      age: 34,
      symptoms: "Irregularly shaped darker patch on right shoulder, slowly growing over 6 months. Occasional mild itching.",
      date: new Date().toISOString(),
      prediction: "Melanoma",
      confidence: 94.2,
      severity: "High",
      hasHeatmap: true
    },
    {
      id: "P-10394",
      name: "Marcus Cole",
      age: 42,
      symptoms: "Small, pearly bump on the nose, bleeds occasionally when washing face.",
      date: new Date(Date.now() - 86400000).toISOString(),
      prediction: "Basal Cell Carcinoma",
      confidence: 88.7,
      severity: "Medium",
      hasHeatmap: true
    },
    {
      id: "P-88231",
      name: "Emma Watson",
      age: 28,
      symptoms: "Red, scaly patch on elbow. Very itchy, flaking.",
      date: new Date(Date.now() - 172800000).toISOString(),
      prediction: "Psoriasis",
      confidence: 97.1,
      severity: "Low",
      hasHeatmap: false
    }
  ];

  async function fetchPatients() {
    setLoading(true);
    try {
      const localPatients = JSON.parse(localStorage.getItem('dermaPalPatients'));
      if (localPatients && localPatients.length > 0) {
        setPatients(localPatients);
      } else {
        localStorage.setItem('dermaPalPatients', JSON.stringify(mockPatients));
        setPatients(mockPatients);
      }
    } catch (err) {
      console.warn("Error loading data", err);
      setPatients(mockPatients);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  const getSeverityStyle = (severity) => {
    switch(severity?.toLowerCase()) {
      case "high": return { bg: "rgba(239, 68, 68, 0.2)", color: "#f87171" };
      case "medium": return { bg: "rgba(245, 158, 11, 0.2)", color: "#fbbf24" };
      case "low": return { bg: "rgba(16, 185, 129, 0.2)", color: "#34d399" };
      default: return { bg: "rgba(148, 163, 184, 0.2)", color: "#94a3b8" };
    }
  };

  const renderProgressBar = (confidence) => {
    const isHigh = confidence > 90;
    const isMed = confidence > 75;
    const color = isHigh ? "#10b981" : isMed ? "#f59e0b" : "#ef4444";
    
    return (
      <div style={{ marginTop: "0.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.25rem", color: "#cbd5e1" }}>
          <span>Confidence Score</span>
          <span style={{ color }}>{confidence ? confidence.toFixed(1) : "0.0"}%</span>
        </div>
        <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "999px", overflow: "hidden" }}>
          <div style={{ width: `${confidence || 0}%`, height: "100%", background: color, borderRadius: "999px", transition: "width 1s ease-out" }}></div>
        </div>
      </div>
    );
  };

  const filteredPatients = activeTab === "All" ? patients : patients.filter(p => p.severity === activeTab);

  return (
    <div className="page-container animate-fade-in" style={{ alignItems: "stretch", padding: "2rem" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
        <div>
          <h2 style={{ fontSize: "2.25rem", fontWeight: "bold", margin: "0 0 0.5rem 0", background: "linear-gradient(to right, #34d399, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Clinical Overview
          </h2>
          <p style={{ color: "var(--color-text-muted)", margin: 0 }}>Review AI predictions, Grad-CAM heatmaps, and patient confident scores.</p>
        </div>
        
        <button onClick={fetchPatients} className="btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.5rem" }}><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          Refresh Data
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem" }}>
        {["All", "High", "Medium", "Low"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "rgba(255,255,255,0.1)" : "transparent",
              border: "1px solid",
              borderColor: activeTab === tab ? "rgba(255,255,255,0.2)" : "transparent",
              color: activeTab === tab ? "white" : "var(--color-text-muted)",
              padding: "0.5rem 1.25rem",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "all 0.2s",
              fontWeight: 500
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "4rem", color: "var(--color-text-muted)" }}>
          <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
          <span style={{ marginLeft: "1rem" }}>Syncing Database...</span>
        </div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", 
          gap: "2rem" 
        }}>
          {filteredPatients.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", color: "var(--color-text-muted)", background: "rgba(0,0,0,0.2)", borderRadius: "1rem", border: "1px dashed rgba(255,255,255,0.1)" }}>
              No cases found matching your criteria.
            </div>
          ) : (
            filteredPatients.map((p, idx) => {
              const sevStyle = getSeverityStyle(p.severity || "Low");
              return (
                <div key={idx} className="glass-panel" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.25rem", fontFamily: "monospace" }}>{p.id || `P-${Math.floor(Math.random()*90000)+10000}`}</div>
                      <h3 style={{ margin: 0, fontSize: "1.25rem", color: "white" }}>{p.name || "Anonymous Patient"}</h3>
                      <div style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                        Age: {p.age || "--"} • {new Date(p.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ 
                      background: sevStyle.bg, 
                      color: sevStyle.color, 
                      padding: "0.25rem 0.75rem", 
                      borderRadius: "999px", 
                      fontSize: "0.75rem", 
                      fontWeight: 600,
                      border: `1px solid ${sevStyle.color}40`
                    }}>
                      {p.severity || "Review"}
                    </div>
                  </div>

                  {/* Prediction & Confidence */}
                  <div style={{ background: "rgba(0,0,0,0.25)", padding: "1rem", borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>AI Prediction</div>
                    <div style={{ fontSize: "1.125rem", fontWeight: 600, color: "#e2e8f0" }}>{p.prediction || "Pending Analysis"}</div>
                    {renderProgressBar(p.confidence)}
                  </div>

                  {/* Heatmap Visual (Mocked representation) */}
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>Original Lesion</div>
                      <div style={{ height: "120px", background: "#1e293b", borderRadius: "0.5rem", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {p.image ? (
                          <img src={p.image.startsWith('data:') ? p.image : `data:image/jpeg;base64,${p.image}`} alt="Lesion" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                        ) : null}
                        <div style={{ display: p.image ? 'none' : 'block', color: "#475569" }}>No Image</div>
                      </div>
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
                        <span>Grad-CAM Heatmap</span>
                        {p.hasHeatmap && <span style={{ color: "#34d399", fontSize: "0.65rem", padding: "0 4px", background: "rgba(52,211,153,0.1)", borderRadius: "4px" }}>Available</span>}
                      </div>
                      <div style={{ 
                        height: "120px", 
                        background: p.hasHeatmap ? "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(239,68,68,0.4))" : "#1e293b", 
                        borderRadius: "0.5rem", 
                        position: "relative", 
                        overflow: "hidden",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: p.hasHeatmap ? "1px solid rgba(239,68,68,0.3)" : "none"
                      }}>
                        {p.hasHeatmap ? (
                          <div style={{ position: "absolute", inset: 0, opacity: 0.6, backgroundImage: "radial-gradient(circle at 50% 50%, rgba(239,68,68,0.8) 0%, rgba(245,158,11,0.5) 40%, rgba(59,130,246,0.2) 70%, transparent 100%)", filter: "blur(8px)" }}></div>
                        ) : (
                          <div style={{ color: "#475569" }}>N/A</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <div style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>Clinical Notes</div>
                    <div style={{ fontSize: "0.875rem", color: "#cbd5e1", lineHeight: 1.5, background: "rgba(255,255,255,0.03)", padding: "0.75rem", borderRadius: "0.5rem" }}>
                      {p.symptoms || "No clinical symptoms reported by patient."}
                    </div>
                  </div>
                  
                  <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "0.5rem" }}>
                    <button className="btn-primary" style={{ flex: 1, padding: "0.5rem", fontSize: "0.875rem" }}>Full Report</button>
                    <button className="btn-secondary" style={{ flex: 1, padding: "0.5rem", fontSize: "0.875rem" }}>Update Status</button>
                  </div>

                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}