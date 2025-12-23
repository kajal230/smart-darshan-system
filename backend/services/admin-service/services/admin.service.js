import { pool } from '../../../shared/db/db.js';

/**
 * =========================
 * CALCULATE CROWD STATUS
 * =========================
 * Uses derived booking count
 */
export const calculateCrowdStatus = async (templeId) => {
  const result = await pool.query(
    `
    SELECT
      COALESCE(SUM(initial_capacity), 0) AS total_capacity,
      COALESCE(SUM(initial_capacity - capacity), 0) AS total_booked
    FROM slots
    WHERE temple_id = $1
    `,
    [templeId]
  );

  const total_capacity = Number(result.rows[0].total_capacity);
  const total_booked = Number(result.rows[0].total_booked);

  if (total_capacity === 0) {
    return {
      temple_id: templeId,
      crowd_percentage: 0,
      crowd_level: 'NO DATA'
    };
  }

  const percentage = Math.round(
    (total_booked / total_capacity) * 100
  );

  let level = 'LOW';
  if (percentage >= 70) level = 'HIGH';
  else if (percentage >= 40) level = 'MEDIUM';

  return {
    temple_id: templeId,
    crowd_percentage: percentage,
    crowd_level: level
  };
};

/**
 * =========================
 * DAILY REPORT
 * =========================
 */
export const generateDailyReport = async (date) => {
  const result = await pool.query(
    `
    SELECT
      t.name AS temple,
      COUNT(b.id) AS total_bookings
    FROM bookings b
    JOIN slots s ON b.slot_id = s.id
    JOIN temples t ON s.temple_id = t.id
    WHERE DATE(b.booking_date) = $1
    GROUP BY t.name
    `,
    [date]
  );

  return result.rows;
};
