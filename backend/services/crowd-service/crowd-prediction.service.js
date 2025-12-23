import { pool } from '../../shared/db/db.js';

/**
 * Predict crowd level based on historical bookings (last 30 days)
 * This is a data-driven heuristic ML approach
 */
export const predictCrowdLevel = async (templeId, slotTime) => {
  const result = await pool.query(
    `
    SELECT COUNT(*) AS total_bookings
    FROM bookings b
    JOIN slots s ON s.id = b.slot_id
    WHERE s.temple_id = $1
      AND s.slot_time = $2
      AND b.booking_date >= NOW() - INTERVAL '30 days'
    `,
    [templeId, slotTime]
  );

  const bookings = parseInt(result.rows[0].total_bookings);

  if (bookings >= 40) return 'HIGH';
  if (bookings >= 20) return 'MEDIUM';
  return 'LOW';
};

/**
 * Peak hour forecasting
 */
export const getPeakHour = async (templeId) => {
  const result = await pool.query(
    `
    SELECT s.slot_time, COUNT(*) AS total
    FROM bookings b
    JOIN slots s ON s.id = b.slot_id
    WHERE s.temple_id = $1
    GROUP BY s.slot_time
    ORDER BY total DESC
    LIMIT 1
    `,
    [templeId]
  );

  return result.rows[0] || null;
};
