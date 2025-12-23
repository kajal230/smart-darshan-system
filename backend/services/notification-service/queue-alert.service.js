import { sendNotification } from './notification.service.js';
import { pool } from '../../shared/db/db.js';

export const checkAndSendQueueAlerts = async () => {
  const result = await pool.query(`
    SELECT b.phone, t.name, s.capacity, s.initial_capacity
    FROM bookings b
    JOIN slots s ON b.slot_id = s.id
    JOIN temples t ON s.temple_id = t.id
    WHERE s.capacity * 100 / s.initial_capacity < 30
  `);

  for (const row of result.rows) {
    await sendNotification({
      phone: row.phone,
      message: `⚠️ High crowd alert at ${row.name}. Please arrive early for darshan.`
    });
  }
};
