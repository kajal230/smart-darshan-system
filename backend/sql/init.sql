-- USERS TABLE
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  last_booking_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TEMPLES TABLE
CREATE TABLE temples (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  daily_limit INT NOT NULL,
  opening_time TIME,
  closing_time TIME
);

-- SLOTS TABLE
CREATE TABLE slots (
  id SERIAL PRIMARY KEY,
  temple_id INT REFERENCES temples(id),
  slot_date DATE NOT NULL,
  slot_time TIME NOT NULL,
  capacity INT NOT NULL,
  booked_count INT DEFAULT 0
);

-- BOOKINGS TABLE
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  slot_id INT REFERENCES slots(id),
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
