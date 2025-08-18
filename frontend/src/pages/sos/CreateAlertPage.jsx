import React, { useState, useEffect } from "react";
import axios from "axios";
import { colors } from "../../utils/colors";

axios.defaults.baseURL = "http://localhost:8080";

export default function CreateAlertPage() {
  const [form, setForm] = useState({
    alertType: "EMERGENCY",
    priorityLevel: "HIGH",
    alertMessage: "",
    latitude: "",
    longitude: ""
  });

  // Auto-detect user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }));
      },
      (err) => console.error("Location error:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("/sos/alert", {
        userId: 1, // 🔹 Replace with logged-in userId from backend
        alertType: form.alertType,
        priorityLevel: form.priorityLevel,
        alertMessage: form.alertMessage,
        latitude: form.latitude,
        longitude: form.longitude
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("🚨 SOS Alert Created!");
      console.log("Created Alert:", res.data);
    } catch (err) {
      console.error("Error creating alert:", err);
      alert("Failed to create alert");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `linear-gradient(135deg, ${colors.purple}, ${colors.purpleDeep})`
    }}>
      <div style={{
        backgroundColor: colors.white,
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        width: "400px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: colors.purpleDark }}>
          🚨 Create SOS Alert
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <select name="alertType" value={form.alertType} onChange={handleChange} style={inputStyle}>
            <option value="EMERGENCY">Emergency</option>
            <option value="FIRE">Fire</option>
            <option value="MEDICAL">Medical</option>
          </select>
          <select name="priorityLevel" value={form.priorityLevel} onChange={handleChange} style={inputStyle}>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <textarea
            name="alertMessage"
            value={form.alertMessage}
            onChange={handleChange}
            placeholder="Enter alert message..."
            style={{ ...inputStyle, minHeight: "100px" }}
          />
          <button type="submit" style={{
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: colors.green,
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            🚨 Submit Alert
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "1rem"
};

