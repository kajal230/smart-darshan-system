import express from 'express';
import {
  getPredictedCrowd,
  getPeakHourForecast
} from './crowd.controller.js';

const router = express.Router();

router.get('/predict', getPredictedCrowd);
router.get('/peak-hour', getPeakHourForecast);

export default router;
