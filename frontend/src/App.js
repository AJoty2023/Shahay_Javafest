// import { useEffect, useState } from "react";

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("/hello")
//       .then(res => res.text())
//       .then(data => setMessage(data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>{message || "Loading..."}</h1>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AuthPage from "./pages/AuthPage";
// import ActiveAlertsPage from "./pages/sos/ActiveAlertsPage";
// // import SOSAlertFormPage from "./pages/sos/SOSAlertFormPage";
// import CreateAlertPage from "./pages/sos/CreateAlertPage";



// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

//   const handleLogin = () => setIsLoggedIn(true);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={isLoggedIn ? <Navigate to="/active-alerts" /> : <AuthPage onLogin={handleLogin} />} />

//         {/* Protected Routes */}
//         <Route path="/active-alerts" element={isLoggedIn ? <ActiveAlertsPage /> : <Navigate to="/login" />} />
//         {/* <Route path="/create-alert" element={isLoggedIn ? <SOSAlertFormPage /> : <Navigate to="/login" />} /> */}
//         {/* <Route path="/create-alert" element={isLoggedIn ? <CreateAlertPage /> : <Navigate to="/login" />} /> */}
//         <Route
//           path="/create-alert"
//           element={<CreateAlertPage />}
//         />

//         {/* Default redirect */}
//         <Route path="*" element={<Navigate to={isLoggedIn ? "/active-alerts" : "/login"} />} />
//       </Routes>
//     </Router>
//   );
// }
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CreateAlertPage from "./pages/sos/CreateAlertPage";
import UserDashboard from "./pages/UserDashboard";
import HelpRequestsPage from "./pages/helprequest/HelpRequestsPage";
import BloodRequestsPage from "./pages/bloodrequest/BloodRequestsPage";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <AuthPage onLogin={handleLogin} />} 
        />

        {/* Protected Routes */}
        {/* <Route 
          path="/dashboard" 
          element={isLoggedIn ? <UserDashboard /> : <Navigate to="/login" />} 
        /> */}

        <Route path="/dashboard" element={<UserDashboard />} />

        <Route
          path="/create-alert"
          element={<CreateAlertPage />}
        />

        <Route
          path="/help"
          element={<HelpRequestsPage/>}
        />

        <Route
          path="/blood"
          element={<BloodRequestsPage/>}
        />

        <Route 
          path="/create-alert" 
          element={isLoggedIn ? <CreateAlertPage /> : <Navigate to="/login" />} 
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}
