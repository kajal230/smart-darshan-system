import { useEffect, useState } from 'react';
import { fetchTemples } from '../services/api';
import { Link } from 'react-router-dom';

export default function Temples() {
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    fetchTemples().then(res => setTemples(res.data));
  }, []);

  return (
    <div>
      <h2>Temples</h2>
      {temples.map(t => (
        <div key={t.id}>
          <Link to={`/temple/${t.id}`}>
            <h3>{t.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
