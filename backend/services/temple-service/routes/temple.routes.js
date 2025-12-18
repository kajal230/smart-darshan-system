import express from 'express';
import {
  getAllTemples,
  getTempleDetails
} from '../controllers/temple.controller.js';

const router = express.Router();

router.get('/', getAllTemples);
router.get('/:id', getTempleDetails);

export default router;
