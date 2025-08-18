import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function HelpRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "MEDIUM",
  });

  useEffect(() => {
    axios.get("/help-requests/open")
      .then(res => setRequests(res.data))
      .catch(err => console.error("Error fetching requests", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/help-requests", formData)
      .then(res => {
        setRequests([...requests, res.data]); 
        setShowForm(false);
        setFormData({ title: "", description: "", category: "", urgency: "MEDIUM" });
      })
      .catch(err => console.error("Error creating request", err));
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
          🤝 Community Help Requests
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
              gap: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #9a8fc9",
              }}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="3"
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #9a8fc9",
              }}
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #9a8fc9",
              }}
            />
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #9a8fc9",
              }}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>

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
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
            <h2 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{req.title}</h2>
            <p style={{ marginTop: "10px" }}>{req.description}</p>
            <p style={{ marginTop: "5px", fontStyle: "italic" }}>Urgency: {req.urgency}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
