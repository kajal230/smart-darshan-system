import { recommendRoute } from './traffic.service.js';

export const getParikramaRoute = async (req, res) => {
  /**
   * Normally comes from Google Maps API
   * Mock data for now
   */
  const shortRoute = {
    distance: 4, // km
    duration: 35 // min
  };

  const longRoute = {
    distance: 7,
    duration: 30
  };

  const recommendation = recommendRoute(shortRoute, longRoute);

  res.json({
    shortRoute,
    longRoute,
    ...recommendation
  });
};
