import express from 'express';
import { getParikramaRoute } from './traffic.controller.js';

const router = express.Router();

router.get('/parikrama-route', getParikramaRoute);

export default router;
