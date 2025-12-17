import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smart_darshan',
  password: 'kajal@234',
  port: 5432,
});


pool.on('connect', () => {
  console.log('PostgreSQL connected');
});
