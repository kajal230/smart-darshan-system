import {
  fetchTemples,
  fetchTempleFullDetails
} from '../services/temple.service.js';

export const getAllTemples = async (req, res) => {
  try {
    const temples = await fetchTemples();
    res.json(temples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTempleDetails = async (req, res) => {
  try {
    const temple = await fetchTempleFullDetails(req.params.id);
    res.json(temple);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
