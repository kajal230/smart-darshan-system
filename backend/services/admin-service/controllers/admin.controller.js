import {
  calculateCrowdStatus,
  generateDailyReport
} from '../services/admin.service.js';

export const getTempleCrowdStatus = async (req, res) => {
  try {
    const status = await calculateCrowdStatus(req.params.templeId);
    res.json(status);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getDailyReport = async (req, res) => {
  try {
    const report = await generateDailyReport(req.params.date);
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
