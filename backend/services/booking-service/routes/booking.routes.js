import express from 'express';
import {
  createSlot,
  getAvailableSlots,
  bookSlot
} from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/slots', createSlot);        // Admin
router.get('/slots/:templeId', getAvailableSlots);
router.post('/book', bookSlot);           // User

export default router;
