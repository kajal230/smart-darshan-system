import { useEffect, useState } from 'react';
import { fetchParikramaRoute } from '../services/api';

export default function Parikrama() {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    fetchParikramaRoute().then(res => setRoute(res.data));
  }, []);

  if (!route) return <p>Loading route...</p>;

  return (
    <div>
      <h2>🛕 Parikrama Route Recommendation</h2>

      <p>Short Route: {route.shortRoute.distance} km – {route.shortRoute.duration} mins</p>
      <p>Long Route: {route.longRoute.distance} km – {route.longRoute.duration} mins</p>

      <h3>
        ✅ Recommended: {route.recommended} Route
      </h3>

      <p>Reason: {route.reason}</p>
    </div>
  );
}
