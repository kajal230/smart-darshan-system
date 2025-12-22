import { Link } from 'react-router-dom';

export default function TempleCard({ temple }) {
  return (
    <div className="card">
      <h3>{temple.name}</h3>
      <p>{temple.location}</p>

      <Link to={`/temple/${temple.id}`}>
        View Details
      </Link>
    </div>
  );
}
