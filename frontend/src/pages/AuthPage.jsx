import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { colors } from "../utils/colors";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export default function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
  });

  const navigate = useNavigate(); // ✅ initialize navigate

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isLogin) {
        res = await axios.post("/auth/login", {
          username: form.username,
          password: form.password,
        });
      } else {
        res = await axios.post("/auth/register", {
          username: form.username,
          email: form.email,
          password: form.password,
          fullName: form.fullName,
        });
      }

      console.log("Backend response:", res.data);

      if (res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        alert(isLogin ? "Login successful!" : "Registration successful!");
        onLogin(); // callback to navigate to protected page
      } else {
        alert("Error: Invalid backend response");
      }

    } catch (err) {
      alert("Error: " + err.response?.data?.message || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `linear-gradient(135deg, ${colors.purple}, ${colors.purpleDeep})`,
      fontFamily: "Arial, sans-serif",
    }}>
      <div style={{
        backgroundColor: colors.white,
        borderRadius: "16px",
        padding: "50px 40px",
        width: "400px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "30px",
          color: colors.purpleDark
        }}>
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            style={{
              padding: "15px",
              borderRadius: "10px",
              border: `1px solid ${colors.purpleLight}`,
              fontSize: "1rem"
            }}
            required
          />
          {!isLogin && <>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              style={{
                padding: "15px",
                borderRadius: "10px",
                border: `1px solid ${colors.purpleLight}`,
                fontSize: "1rem"
              }}
              required
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              style={{
                padding: "15px",
                borderRadius: "10px",
                border: `1px solid ${colors.purpleLight}`,
                fontSize: "1rem"
              }}
              required
            />
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              style={{
                padding: "15px",
                borderRadius: "10px",
                border: `1px solid ${colors.purpleLight}`,
                fontSize: "1rem"
              }}
              required
            />
          </>}

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            style={{
              padding: "15px",
              borderRadius: "10px",
              border: `1px solid ${colors.purpleLight}`,
              fontSize: "1rem"
            }}
          />

          
          <button type="submit" style={{
            backgroundColor: colors.green,
            color: colors.black,
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = colors.greenLight}
          onMouseOut={(e) => e.target.style.backgroundColor = colors.green}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p style={{
          textAlign: "center",
          marginTop: "20px",
          color: colors.purpleDark,
          cursor: "pointer"
        }}
        onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>

        {/* ✅ Navigate to Create SOS Alert page */}
        <button 
          onClick={() => navigate("/create-alert")}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: colors.purple,
            color: colors.white,
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = colors.purpleDark}
          onMouseOut={(e) => e.target.style.backgroundColor = colors.purple}
        >
          🚨 Go to Create SOS Alert
        </button>

        {/* ✅ Navigate to User Dashboard page */}
<button 
  onClick={() => navigate("/dashboard")}
  style={{
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: colors.blue,
    color: colors.red,
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s"
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = colors.blueDark}
  onMouseOut={(e) => e.target.style.backgroundColor = colors.blue}
>
  📊 Go to Dashboard
</button>


      </div>
    </div>
  );
}
