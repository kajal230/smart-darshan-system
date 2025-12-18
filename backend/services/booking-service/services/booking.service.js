import { pool } from '../../../shared/db/db.js';
import { canUserBook } from '../../auth-service/services/auth.service.js';

export const createTempleSlot = async ({
  temple_id,
  slot_date,
  slot_time,
  capacity
}) => {
  const result = await pool.query(
    `INSERT INTO slots (temple_id, slot_date, slot_time, capacity)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [temple_id, slot_date, slot_time, capacity]
  );

  return result.rows[0];
};

// Get only slots with available capacity
export const fetchAvailableSlots = async (templeId) => {
  const result = await pool.query(
    `SELECT * FROM slots
     WHERE temple_id = $1
     AND booked_count < capacity
     ORDER BY slot_time`,
    [templeId]
  );

  return result.rows;
};

export const bookTempleSlot = async ({ user_id, slot_id }) => {
  // 1️⃣ Check cooldown
  const allowed = await canUserBook(user_id);
  if (!allowed) {
    throw new Error('You can book only once every 2 months');
  }

  // 2️⃣ Start transaction (VERY IMPORTANT)
  await pool.query('BEGIN');

  // 3️⃣ Lock slot row (FCFS)
  const slotRes = await pool.query(
    `SELECT * FROM slots
     WHERE id = $1
     FOR UPDATE`,
    [slot_id]
  );

  const slot = slotRes.rows[0];

  if (!slot || slot.booked_count >= slot.capacity) {
    await pool.query('ROLLBACK');
    throw new Error('Slot is full');
  }

  // 4️⃣ Create booking
  await pool.query(
    `INSERT INTO bookings (user_id, slot_id)
     VALUES ($1, $2)`,
    [user_id, slot_id]
  );

  // 5️⃣ Update slot count
  await pool.query(
    `UPDATE slots
     SET booked_count = booked_count + 1
     WHERE id = $1`,
    [slot_id]
  );

  // 6️⃣ Update user last booking date
  await pool.query(
    `UPDATE users
     SET last_booking_date = CURRENT_DATE
     WHERE id = $1`,
    [user_id]
  );

  await pool.query('COMMIT');

  return { message: 'Booking successful (Free Darshan)' };
};
