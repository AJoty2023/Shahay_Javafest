

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, HelpCircle, Droplet, Search, Shield } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "SOS Alert",
      desc: "Trigger emergency SOS and notify responders immediately.",
      icon: <AlertTriangle className="w-8 h-8 text-purple-700" />,
      path: "/sos",
    },
    {
      title: "Help Request",
      desc: "Request assistance from volunteers in your area.",
      icon: <HelpCircle className="w-8 h-8 text-purple-700" />,
      path: "/help",
    },
    {
      title: "Blood Request",
      desc: "Ask for urgent blood donation support.",
      icon: <Droplet className="w-8 h-8 text-purple-700" />,
      path: "/blood",
    },
    {
      title: "Missing Person",
      desc: "Report or search for missing persons.",
      icon: <Search className="w-8 h-8 text-purple-700" />,
      path: "/missing",
    },
    {
      title: "Abuse Reports",
      desc: "Report cases of abuse or harassment.",
      icon: <Shield className="w-8 h-8 text-purple-700" />,
      path: "/abuse",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#d9d4f0", // light lavender background
        fontFamily: "sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          padding: "20px 40px",
          borderBottom: "2px solid #9a8fc9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "#3d2c85",
            fontSize: "1.8rem",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          Rescue Connect
        </h1>
      </nav>

      {/* Cards Section */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          justifyContent: "center", // centers the last row
        }}
      >
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(card.path)}
            style={{
              background: "#b6aee3", // soft purple card
              borderRadius: "20px",
              padding: "25px",
              color: "#2d1c61",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              height: "200px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {card.icon}
              <h2 style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                {card.title}
              </h2>
            </div>
            <p style={{ marginTop: "10px", fontSize: "0.95rem", opacity: 0.9 }}>
              {card.desc}
            </p>
            <button
              style={{
                marginTop: "auto",
                padding: "10px 20px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#9a8fc9",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#7e70b8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#9a8fc9")
              }
            >
              Go →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
