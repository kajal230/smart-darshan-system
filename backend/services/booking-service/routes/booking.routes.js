import express from 'express';
import {
  createSlot,
  getAvailableSlots,
  bookSlotByPhone
} from '../controllers/booking.controller.js';

const router = express.Router();

/**
 * ADMIN ROUTES
 */

// Create a new slot (Admin only)
router.post('/slots', createSlot);

/**
 * USER ROUTES
 */

// Get available slots for a temple
router.get('/slots/:templeId', getAvailableSlots);

// Book a slot (Phone-based, FCFS)
router.post('/book', bookSlotByPhone);

export default router;
