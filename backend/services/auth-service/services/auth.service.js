import { pool } from '../../../shared/db/db.js';

export const register = async ({ name, email, phone }) => {
  // Check if user already exists
  const existingUser = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error('User already registered');
  }

  // Insert new user
  const result = await pool.query(
    `INSERT INTO users (name, email, phone)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, phone]
  );

  return result.rows[0];
};
export const canUserBook = async (userId) => {
  const result = await pool.query(
    'SELECT last_booking_date FROM users WHERE id = $1',
    [userId]
  );

  const lastDate = result.rows[0].last_booking_date;

  if (!lastDate) return true;

  const now = new Date();
  const lastBooking = new Date(lastDate);

  const diffMonths =
    (now.getFullYear() - lastBooking.getFullYear()) * 12 +
    (now.getMonth() - lastBooking.getMonth());

  return diffMonths >= 2;
};
