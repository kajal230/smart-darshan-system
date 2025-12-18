import { pool } from '../../../shared/db/db.js';

export const fetchTempleMapInfo = async (templeId) => {
  const result = await pool.query(
    `SELECT name, latitude, longitude
     FROM temples
     WHERE id = $1`,
    [templeId]
  );

  if (result.rows.length === 0) {
    throw new Error('Temple not found');
  }

  return result.rows[0];
};

export const fetchTrafficZones = async (templeId) => {
  const result = await pool.query(
    `SELECT zone_name, congestion_level, description
     FROM traffic_zones
     WHERE temple_id = $1`,
    [templeId]
  );

  return result.rows;
};
