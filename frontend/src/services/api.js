import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api' // ✅ backend is on 3000
});

/* =====================
   TEMPLE APIs
===================== */

// Get all temples
export const fetchTemples = () =>
  API.get('/temples');

// Get temple details
export const fetchTempleDetails = (templeId) =>
  API.get(`/temples/${templeId}`);

// Get crowd status of a temple
export const fetchCrowdStatus = (templeId) =>
  API.get(`/admin/crowd/${templeId}`);

// Get available slots
export const fetchSlots = (templeId) =>
  API.get(`/bookings/slots/${templeId}`);


/* =====================
   ADMIN APIs
===================== */

export const fetchAdminDashboard = () =>
  API.get('/admin/dashboard');

export const fetchDailyReport = (date) =>
  API.get(`/admin/report/${date}`);


/* =====================
   AI CROWD APIs
===================== */

export const fetchPredictedCrowd = (templeId, slotTime) =>
  API.get(`/crowd/predict?templeId=${templeId}&slotTime=${slotTime}`);

export const fetchPeakHour = (templeId) =>
  API.get(`/crowd/peak-hour?templeId=${templeId}`);
export const fetchParikramaRoute = () =>
  API.get('/traffic/parikrama-route');
