import {
  predictCrowdLevel,
  getPeakHour
} from './crowd-prediction.service.js';

export const getPredictedCrowd = async (req, res) => {
  const { templeId, slotTime } = req.query;

  if (!templeId || !slotTime) {
    return res.status(400).json({ message: 'templeId and slotTime required' });
  }

  try {
    const prediction = await predictCrowdLevel(templeId, slotTime);
    res.json({ predictedCrowd: prediction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Prediction failed' });
  }
};

export const getPeakHourForecast = async (req, res) => {
  const { templeId } = req.query;

  try {
    const peakHour = await getPeakHour(templeId);
    res.json({ peakHour });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Peak hour fetch failed' });
  }
};
