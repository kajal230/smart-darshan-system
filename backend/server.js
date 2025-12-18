import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./shared/db/db.js";
import authRoutes from './services/auth-service/routes/auth.route.js';


import bookingRoutes from './services/booking-service/routes/booking.routes.js';



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);


app.use('/api/bookings', bookingRoutes);
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

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
