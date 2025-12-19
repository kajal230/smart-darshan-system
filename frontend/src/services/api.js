import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const fetchTemples = () => API.get('/temples');
export const fetchTempleDetails = (id) => API.get(`/temples/${id}`);
export const fetchCrowdStatus = (id) => API.get(`/admin/crowd/${id}`);
