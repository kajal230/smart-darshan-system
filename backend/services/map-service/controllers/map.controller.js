import {
  fetchTempleMapInfo,
  fetchTrafficZones
} from '../services/map.service.js';

export const getTempleMapData = async (req, res) => {
  try {
    const data = await fetchTempleMapInfo(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTrafficZones = async (req, res) => {
  try {
    const zones = await fetchTrafficZones(req.params.templeId);
    res.json(zones);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
