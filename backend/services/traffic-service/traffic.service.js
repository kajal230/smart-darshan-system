/**
 * Traffic Intelligence Service
 * (Mocked – Google Maps API can be plugged later)
 */

export const getTrafficLevel = (distanceKm, durationMin) => {
  const speed = distanceKm / (durationMin / 60); // km/hr

  if (speed < 10) return 'HIGH';
  if (speed < 20) return 'MEDIUM';
  return 'LOW';
};

export const recommendRoute = (shortRoute, longRoute) => {
  const shortTraffic = getTrafficLevel(
    shortRoute.distance,
    shortRoute.duration
  );

  const longTraffic = getTrafficLevel(
    longRoute.distance,
    longRoute.duration
  );

  if (shortTraffic === 'HIGH' && longTraffic !== 'HIGH') {
    return {
      recommended: 'LONG',
      reason: 'Short route is congested'
    };
  }

  return {
    recommended: 'SHORT',
    reason: 'Short route is clear'
  };
};
