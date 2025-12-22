import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page">
      <h1>Easy Darshan</h1>
      <p>Smart Temple Booking System</p>

      <Link to="/temples">View Temples</Link>
    </div>
  );
}
