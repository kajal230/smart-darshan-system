import express from 'express';
import {
  getTempleMapData,
  getTrafficZones
} from '../controllers/map.controller.js';

const router = express.Router();

router.get('/temple/:id', getTempleMapData);
router.get('/traffic/:templeId', getTrafficZones);

export default router;
