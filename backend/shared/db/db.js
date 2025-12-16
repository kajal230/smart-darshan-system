import pkg from 'pg';
const { Pool } = pkg;


export const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'smart_darshan',
password: 'password',
port: 5432,
});