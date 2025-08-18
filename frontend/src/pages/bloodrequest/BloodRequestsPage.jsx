import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function UserBloodRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    requesterId: localStorage.getItem("userId") || 1,
    patientName: "",
    bloodType: "",
    unitsNeeded: 1,
    urgency: "MEDIUM",
    hospitalName: "",
    hospitalAddress: "",
    contactPerson: "",
    contactPhone: "",
    neededByDate: "",
    neededByTime: "",
    additionalRequirements: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId") || 1;
    axios
      .get("/blood/requests/active")
      .then((res) => {
        const myReqs = res.data.filter((r) => r.requesterId === Number(userId));
        setRequests(myReqs);
      })
      .catch((err) => console.error("Error fetching requests", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/blood/requests", formData)
      .then((res) => {
        setRequests([...requests, res.data]);
        setShowForm(false);
        setFormData({
          requesterId: localStorage.getItem("userId") || 1,
          patientName: "",
          bloodType: "",
          unitsNeeded: 1,
          urgency: "MEDIUM",
          hospitalName: "",
          hospitalAddress: "",
          contactPerson: "",
          contactPhone: "",
          neededByDate: "",
          neededByTime: "",
          additionalRequirements: "",
        });
      })
      .catch((err) => console.error("Error creating request", err));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#d9d4f0", padding: "30px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ color: "#3d2c85", fontSize: "2rem", fontWeight: "bold" }}>
          🩸 My Blood Requests
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#9a8fc9",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {showForm ? "Close Form" : "➕ New Request"}
        </button>
      </div>

      {/* FORM (toggle) */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            style={{
              background: "#b6aee3",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "25px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              display: "grid",
              gap: "12px",
            }}
          >
            <input
              type="text"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              required
              style={{ padding: "10px", borderRadius: "10px", border: "1px solid #9a8fc9" }}
            />
            <input
              type="text"
              placeholder="Blood Type (e.g. A+, O-)"
              value={formData.bloodType}
              onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
              required
              style={{ padding: "10px", borderRadius: "10px", border: "1px solid #9a8fc9" }}
            />
            <input
              type="number"
              min="1"
              placeholder="Units Needed"
              value={formData.unitsNeeded}
              onChange={(e) => setFormData({ ...formData, unitsNeeded: e.target.value })}
              style={{ padding: "10px", borderRadius: "10px", border: "1px solid #9a8fc9" }}
            />
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              style={{ padding: "10px", borderRadius: "10px", border: "1px solid #9a8fc9" }}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
            <input
              type="text"
              placeholder="Hospital Name"
              value={formData.hospitalName}
              onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
              style={{ padding: "10px", borderRadius: "10px", border: "1px solid #9a8fc9" }}
            />
            <input
              type="text"
              placeholder="Hospital Address"
              value={formData.hospitalAddress}
              onChange={(e) => setFormData({ ...formData, hospitalAddress: e.target.value })}
              style={{ padding: "10px", borderRadius: "10px", border: "1px solid #9a8fc9" }}
            />
            <input
              type="text"
              placeholder="Contact Person"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              style={{ padding: "10px", borderRadius: "10px", border: "1px solid #9a8fc9" }}
            />
            <input
              type="text"
              placeholder="Contact Phone"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              style={{ padding: "10px", borderRadius: "10px", border: "1px solid #9a8fc9" }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="date"
                value={formData.neededByDate}
                onChange={(e) => setFormData({ ...formData, neededByDate: e.target.value })}
                style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #9a8fc9" }}
              />
              <input
                type="time"
                value={formData.neededByTime}
                onChange={(e) => setFormData({ ...formData, neededByTime: e.target.value })}
                style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #9a8fc9" }}
              />
            </div>
            <textarea
              placeholder="Additional Requirements"
              value={formData.additionalRequirements}
              onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
              rows="3"
              style={{ padding: "10px", borderRadius: "10px", border: "1px solid #9a8fc9" }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 15px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#7e70b8",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* REQUEST CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {requests.map((req) => (
          <motion.div
            key={req.id}
            whileHover={{ scale: 1.05 }}
            style={{
              background: "#b6aee3",
              borderRadius: "20px",
              padding: "20px",
              color: "#2d1c61",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{req.patientName}</h2>
            <p style={{ marginTop: "8px" }}>
              <strong>Blood Type:</strong> {req.bloodType}
            </p>
            <p style={{ marginTop: "4px" }}>
              <strong>Units:</strong> {req.fulfilledUnits}/{req.unitsNeeded}
            </p>
            <p style={{ marginTop: "4px" }}>
              <strong>Hospital:</strong> {req.hospitalName}
            </p>
            <p style={{ marginTop: "4px" }}>
              <strong>Urgency:</strong> {req.urgency}
            </p>
            <p style={{ marginTop: "4px", fontStyle: "italic" }}>
              Status: {req.status}
            </p>
            <p style={{ marginTop: "8px", fontSize: "0.9rem" }}>
              Contact: {req.contactPerson} ({req.contactPhone})
            </p>
            <p style={{ marginTop: "4px", fontSize: "0.85rem", color: "#3d2c85" }}>
              Needed By: {req.neededByDate || "ASAP"} {req.neededByTime}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
