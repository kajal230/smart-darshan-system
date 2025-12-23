import express from 'express';
import {
   getAdminDashboard,
  getTempleCrowdStatus,
  getDailyReport
} from '../controllers/admin.controller.js';

const router = express.Router();
router.get('/dashboard', getAdminDashboard);
router.get('/crowd/:templeId', getTempleCrowdStatus);
router.get('/report/:date', getDailyReport);

export default router;
