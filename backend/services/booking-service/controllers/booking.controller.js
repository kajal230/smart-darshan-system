import {
  createTempleSlot,
  fetchAvailableSlots,
  bookTempleSlot
} from '../services/booking.service.js';

export const createSlot = async (req, res) => {
  try {
    const slot = await createTempleSlot(req.body);
    res.status(201).json(slot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAvailableSlots = async (req, res) => {
  try {
    const slots = await fetchAvailableSlots(req.params.templeId);
    res.json(slots);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const bookSlot = async (req, res) => {
  try {
    const booking = await bookTempleSlot(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
