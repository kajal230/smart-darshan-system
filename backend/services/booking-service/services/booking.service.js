import { pool } from '../../../shared/db/db.js';

/**
 * CREATE SLOT (ADMIN)
 */
export const createTempleSlot = async ({
  temple_id,
  slot_date,
  slot_time,
  capacity
}) => {
  const result = await pool.query(
    `
    INSERT INTO slots
    (temple_id, slot_date, slot_time, capacity, initial_capacity)
    VALUES ($1, $2, $3, $4, $4)
    RETURNING *
    `,
    [temple_id, slot_date, slot_time, capacity]
  );

  return result.rows[0];
};

/**
 * FETCH AVAILABLE SLOTS
 */
export const fetchAvailableSlots = async (templeId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM slots
    WHERE temple_id = $1
      AND capacity > 0
      AND slot_date >= CURRENT_DATE
    ORDER BY slot_date, slot_time
    `,
    [templeId]
  );

  return result.rows;
};

/**
 * BOOK SLOT (PHONE BASED)
 */
export const bookTempleSlot = async ({ phone, temple_id, slot_id }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1️⃣ Check 60-day restriction
    const prev = await client.query(
      `
      SELECT 1 FROM bookings
      WHERE phone = $1
        AND booking_date >= NOW() - INTERVAL '60 days'
      `,
      [phone]
    );

    if (prev.rows.length > 0) {
      throw new Error('You can book only once in 2 months');
    }

    // 2️⃣ Lock slot
    const slotRes = await client.query(
      `
      SELECT capacity
      FROM slots
      WHERE id = $1
      FOR UPDATE
      `,
      [slot_id]
    );

    if (!slotRes.rows.length || slotRes.rows[0].capacity <= 0) {
      throw new Error('Slot is full');
    }

    // 3️⃣ Reduce capacity
    await client.query(
      `
      UPDATE slots
      SET capacity = capacity - 1
      WHERE id = $1
      `,
      [slot_id]
    );

    // 4️⃣ Create booking
    await client.query(
      `
      INSERT INTO bookings (phone, temple_id, slot_id)
      VALUES ($1, $2, $3)
      `,
      [phone, temple_id, slot_id]
    );

    await client.query('COMMIT');

    return { message: 'Booking successful' };

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};
