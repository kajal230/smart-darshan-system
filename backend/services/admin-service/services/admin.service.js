import { pool } from '../../../shared/db/db.js';

export const calculateCrowdStatus = async (templeId) => {
  const result = await pool.query(
    `SELECT
       SUM(booked_count) AS total_booked,
       SUM(capacity) AS total_capacity
     FROM slots
     WHERE temple_id = $1`,
    [templeId]
  );

  const { total_booked, total_capacity } = result.rows[0];

  if (!total_capacity) {
    return { level: 'NO DATA', percentage: 0 };
  }

  const percentage = Math.round(
    (total_booked / total_capacity) * 100
  );

  let level = 'LOW';
  if (percentage > 75) level = 'HIGH';
  else if (percentage > 40) level = 'MEDIUM';

  return {
    temple_id: templeId,
    crowd_percentage: percentage,
    crowd_level: level
  };
};

export const generateDailyReport = async (date) => {
  const result = await pool.query(
    `SELECT
       t.name AS temple,
       COUNT(b.id) AS total_bookings
     FROM bookings b
     JOIN slots s ON b.slot_id = s.id
     JOIN temples t ON s.temple_id = t.id
     WHERE DATE(b.booking_date) = $1
     GROUP BY t.name`,
    [date]
  );

  return result.rows;
};
