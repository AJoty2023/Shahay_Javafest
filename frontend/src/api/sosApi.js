import axios from "axios";

const API_BASE = "http://localhost:8080/sos";

export const createSOSAlert = (data) => axios.post(`${API_BASE}/alert`, data);
export const createVoiceSOSAlert = (data, audioFile) => {
    const formData = new FormData();
    for (let key in data) formData.append(key, data[key]);
    if (audioFile) formData.append("audioFile", audioFile);
    return axios.post(`${API_BASE}/alert/voice`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
export const getActiveAlerts = () => axios.get(`${API_BASE}/alerts/active`);
export const respondToAlert = (alertId, responderId) =>
    axios.put(`${API_BASE}/alert/${alertId}/respond?responderId=${responderId}`);
export const resolveAlert = (alertId) => axios.put(`${API_BASE}/alert/${alertId}/resolve`);
export const getNearbyAlerts = (latitude, longitude, radiusKm = 5) =>
    axios.get(`${API_BASE}/alerts/nearby`, { params: { latitude, longitude, radiusKm } });
export const getUserAlerts = (userId) =>
    axios.get(`${API_BASE}/alerts/user/${userId}`);
