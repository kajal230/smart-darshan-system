import { pool } from '../../../shared/db/db.js';


/**
 * =========================
 * ADMIN: CREATE SLOT
 * =========================
 */
export const createSlot = async (req, res) => {
  const { temple_id, slot_date, slot_time, capacity } = req.body;

  if (!temple_id || !slot_date || !slot_time || !capacity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
  `
  INSERT INTO slots 
  (temple_id, slot_date, slot_time, capacity, initial_capacity)
  VALUES ($1, $2, $3, $4, $4)
  RETURNING *
  `,
  [temple_id, slot_date, slot_time, capacity]
);


    res.status(201).json({
      message: 'Slot created successfully',
      slot: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create slot' });
  }
};

/**
 * =========================
 * USER: GET AVAILABLE SLOTS
 * =========================
 */
export const getAvailableSlots = async (req, res) => {
  const { templeId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT id, slot_date, slot_time, capacity
      FROM slots
      WHERE temple_id = $1
        AND capacity > 0
        AND slot_date >= CURRENT_DATE
      ORDER BY slot_date, slot_time
      `,
      [templeId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch slots' });
  }
};

/**
 * =========================
 * USER: BOOK SLOT (PHONE BASED)
 * =========================
 * Rules:
 * 1. First Come First Served
 * 2. Free booking
 * 3. Same phone cannot book again for 60 days
 * 4. Slot capacity decreases safely
 */
export const bookSlotByPhone = async (req, res) => {
  const { phone, slotId, templeId } = req.body;

  if (!phone || phone.length < 10 || !slotId || !templeId) {
    return res.status(400).json({ message: 'Invalid booking data' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    /**
     * 1️⃣ CHECK 60-DAY RESTRICTION
     */
    const previousBooking = await client.query(
      `
      SELECT 1 FROM bookings
      WHERE phone = $1
        AND booking_date >= NOW() - INTERVAL '60 days'
      `,
      [phone]
    );

    if (previousBooking.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        message: 'You can book only once in 2 months using this phone number'
      });
    }

    /**
     * 2️⃣ LOCK SLOT ROW (PREVENT OVERBOOKING)
     */
    const slotResult = await client.query(
      `
      SELECT capacity
      FROM slots
      WHERE id = $1
      FOR UPDATE
      `,
      [slotId]
    );

    if (slotResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slotResult.rows[0].capacity <= 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Slot is full' });
    }

    /**
     * 3️⃣ REDUCE SLOT CAPACITY
     */
    await client.query(
      `
      UPDATE slots
      SET capacity = capacity - 1
      WHERE id = $1
      `,
      [slotId]
    );

    /**
     * 4️⃣ CREATE BOOKING
     */
    await client.query(
      `
      INSERT INTO bookings (phone, temple_id, slot_id)
      VALUES ($1, $2, $3)
      `,
      [phone, templeId, slotId]
    );

    await client.query('COMMIT');

    res.json({
      message: 'Darshan booked successfully 🙏'
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Booking failed' });
  } finally {
    client.release();
  }
};
await sendNotification({
  phone,
  message: '🙏 Your darshan booking is confirmed. Jai Shree Krishna!'
});
