import express from 'express';
import {
  getTempleCrowdStatus,
  getDailyReport
} from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/crowd/:templeId', getTempleCrowdStatus);
router.get('/report/:date', getDailyReport);

export default router;
