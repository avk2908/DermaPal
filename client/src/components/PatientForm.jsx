import React, { useState } from "react";

export default function PatientForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newPatient = {
      id: `P-${Math.floor(Math.random()*90000)+10000}`,
      name: name || "Anonymous",
      age: age,
      symptoms: symptoms,
      date: new Date().toISOString(),
      prediction: "Pending Analysis",
      confidence: 0,
      severity: "Review",
      image: preview,
      hasHeatmap: false
    };

    // Mock simulation of API delay
    setTimeout(() => {
      // simulate artificial AI results
      const diseases = ["Melanoma", "Basal Cell Carcinoma", "Psoriasis", "Benign Nevus"];
      newPatient.prediction = diseases[Math.floor(Math.random() * diseases.length)];
      newPatient.confidence = 75 + Math.random() * 24; // 75 to 99
      newPatient.severity = newPatient.confidence > 92 ? "High" : newPatient.confidence > 82 ? "Medium" : "Low";
      newPatient.hasHeatmap = true;
      
      const existingPatients = JSON.parse(localStorage.getItem('dermaPalPatients')) || [];
      const updatedPatients = [newPatient, ...existingPatients];
      localStorage.setItem('dermaPalPatients', JSON.stringify(updatedPatients));

      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="page-container animate-fade-in">
        <div className="glass-panel" style={{ textAlign: "center", padding: "4rem 2rem", maxWidth: "500px" }}>
          <div style={{ 
            width: "80px", height: "80px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", 
            color: "#34d399", display: "flex", alignItems: "center", justifyContent: "center", 
            margin: "0 auto 1.5rem auto", fontSize: "2rem" 
          }}>
            ✓
          </div>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Submitted Successfully</h2>
          <p style={{ color: "white", marginBottom: "2rem" }}>
            Your details and dermatoscopic image have been sent for AI analysis. A doctor will review your results shortly.
          </p>
          <button className="btn-secondary" onClick={() => { setSubmitted(false); setImage(null); setPreview(null); setSymptoms(""); }}>
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="glass-panel" style={{ width: "100%", maxWidth: "600px", padding: "2.5rem" }}>
        
        <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", margin: "0 0 1.5rem 0", background: "linear-gradient(to right, #60a5fa, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          New Assessment Request
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#ffffff" }}>Full Name</label>
              <input type="text" className="glass-input" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div style={{ width: "120px" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#ffffff" }}>Age</label>
              <input type="number" className="glass-input" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#ffffff" }}>Symptoms Description</label>
            <textarea 
              className="glass-input" 
              placeholder="Please describe any itching, pain, or changes in the lesion..."
              rows="4" 
              value={symptoms} 
              onChange={(e) => setSymptoms(e.target.value)} 
              required
              style={{ resize: "vertical" }}
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", color: "#ffffff" }}>Lesion Image</label>
            
            <div style={{
              border: "2px dashed rgba(255, 255, 255, 0.2)",
              borderRadius: "1rem",
              padding: "2rem",
              textAlign: "center",
              position: "relative",
              background: preview ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              overflow: "hidden"
            }}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                required={!preview}
                style={{
                  position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer"
                }}
              />
              
              {preview ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <img src={preview} alt="Preview" style={{ maxHeight: "200px", borderRadius: "0.5rem", objectFit: "contain", marginBottom: "1rem" }} />
                  <span style={{ fontSize: "0.875rem", color: "#ffffff" }}>Click or drag to change image</span>
                </div>
              ) : (
                <div style={{ color: "#ffffff" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 1rem auto" }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <p style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", color: "#ffffff" }}>Drag & Drop your image here</p>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>or click to browse from your device</p>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: "1rem", padding: "1rem", fontSize: "1.125rem", position: "relative" }}>
            {loading ? "Analyzing..." : "Submit for AI Analysis"}
          </button>
        </form>

      </div>
    </div>
  );
}
