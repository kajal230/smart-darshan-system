import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./shared/db/db.js";
import authRoutes from './services/auth-service/routes/auth.route.js';


import bookingRoutes from './services/booking-service/routes/booking.routes.js';

import templeRoutes from './services/temple-service/routes/temple.routes.js';
import adminRoutes from './services/admin-service/routes/admin.routes.js';
import mapRoutes from './services/map-service/routes/map.routes.js';
import crowdRoutes from './services/crowd-service/crowd.routes.js';

import trafficRoutes from './services/traffic-service/traffic.routes.js';








dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/crowd', crowdRoutes);

app.use('/api/traffic', trafficRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/temples', templeRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/maps', mapRoutes);

app.get("/", (req, res) => {
  res.send("App is running");
});

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("DB connected at:", result.rows[0].now);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
