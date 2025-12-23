import { pool } from '../../../shared/db/db.js';

/**
 * =========================
 * ADMIN DASHBOARD
 * =========================
 * - Slot status
 * - Crowd level
 */
export const getAdminDashboard = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        t.name AS temple_name,
        s.slot_date,
        s.slot_time,
        s.capacity,
        s.initial_capacity,
        (s.initial_capacity - s.capacity) AS booked,
        CASE
          WHEN ((s.initial_capacity - s.capacity) * 100.0 / s.initial_capacity) < 40 THEN 'LOW'
          WHEN ((s.initial_capacity - s.capacity) * 100.0 / s.initial_capacity) BETWEEN 40 AND 70 THEN 'MEDIUM'
          ELSE 'HIGH'
        END AS crowd_level
      FROM slots s
      JOIN temples t ON t.id = s.temple_id
      ORDER BY s.slot_date, s.slot_time
    `);

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Admin Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load admin dashboard'
    });
  }
};

/**
 * =========================
 * DAILY REPORT
 * =========================
 */
export const getDailyReport = async (req, res) => {
  const { date } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        t.name AS temple_name,
        COUNT(b.id) AS total_bookings
      FROM bookings b
      JOIN temples t ON t.id = b.temple_id
      WHERE DATE(b.booking_date) = $1
      GROUP BY t.name
    `, [date]);

    res.status(200).json({
      success: true,
      date,
      report: result.rows
    });
  } catch (error) {
    console.error('Daily Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate report'
    });
  }
};

/**
 * =========================
 * TEMPLE CROWD STATUS
 * =========================
 */
export const getTempleCrowdStatus = async (req, res) => {
  try {
    const { templeId } = req.params;

    const result = await pool.query(`
      SELECT 
        COALESCE(SUM(initial_capacity), 0) AS total_capacity,
        COALESCE(SUM(initial_capacity - capacity), 0) AS booked
      FROM slots
      WHERE temple_id = $1
    `, [templeId]);

    const total = Number(result.rows[0].total_capacity);
    const booked = Number(result.rows[0].booked);

    const percentage = total > 0 ? Math.round((booked / total) * 100) : 0;

    let level = 'LOW';
    if (percentage >= 70) level = 'HIGH';
    else if (percentage >= 40) level = 'MEDIUM';

    res.json({
      temple_id: templeId,
      crowd_percentage: percentage,
      crowd_level: level
    });

  } catch (error) {
    console.error('Crowd Status Error:', error);
    res.status(500).json({ message: 'Failed to get crowd status' });
  }
};
