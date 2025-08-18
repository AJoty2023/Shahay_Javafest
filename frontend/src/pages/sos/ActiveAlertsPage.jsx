import React, { useEffect, useState } from "react";
import { getActiveAlerts, respondToAlert, resolveAlert } from "../../api/sosApi";
import { AlertCard } from "../../components/ui/AlertCard";

const ActiveAlertsPage = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    const response = await getActiveAlerts();
    setAlerts(response.data);
  };

  const handleRespond = async (alertId) => {
    const responderId = 1; // Replace with logged-in user ID
    await respondToAlert(alertId, responderId);
    fetchAlerts();
  };

  const handleResolve = async (alertId) => {
    await resolveAlert(alertId);
    fetchAlerts();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Active SOS Alerts</h1>
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          alert={alert}
          onRespond={handleRespond}
          onResolve={handleResolve}
        />
      ))}
    </div>
  );
};

export default ActiveAlertsPage;
