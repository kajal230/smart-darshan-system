import { useEffect, useState } from 'react';
import { fetchTemples } from '../services/api';
import TempleCard from '../components/TempleCard';

export default function Temples() {
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    fetchTemples().then(res => setTemples(res.data));
  }, []);

  return (
    <div className="page">
      <h2>Temples</h2>

      {temples.map(t => (
        <TempleCard key={t.id} temple={t} />
      ))}
    </div>
  );
}
