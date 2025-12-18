import { pool } from '../../../shared/db/db.js';

export const fetchTemples = async () => {
  const result = await pool.query(
    `SELECT id, name, location, opening_time, closing_time
     FROM temples`
  );
  return result.rows;
};

export const fetchTempleFullDetails = async (templeId) => {
  const templeRes = await pool.query(
    'SELECT * FROM temples WHERE id = $1',
    [templeId]
  );

  if (templeRes.rows.length === 0) {
    throw new Error('Temple not found');
  }

  const historyRes = await pool.query(
    'SELECT description FROM temple_history WHERE temple_id = $1',
    [templeId]
  );

  const nearbyRes = await pool.query(
    'SELECT name, type, distance_km FROM nearby_places WHERE temple_id = $1',
    [templeId]
  );

  return {
    ...templeRes.rows[0],
    history: historyRes.rows,
    nearby_places: nearbyRes.rows
  };
};
