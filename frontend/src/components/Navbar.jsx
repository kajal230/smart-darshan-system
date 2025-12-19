import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#ff6f00', color: 'white' }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>
      <Link to="/temples" style={{ marginRight: 10 }}>Temples</Link>
      <Link to="/booking" style={{ marginRight: 10 }}>Booking</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}
