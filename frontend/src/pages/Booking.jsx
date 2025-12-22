import { useParams } from 'react-router-dom';

export default function Booking() {
  const { slotId } = useParams();

  return (
    <div className="page">
      <h2>Booking Page</h2>
      <p>Slot ID: {slotId}</p>

      <p>Booking logic coming next (Day 10)</p>
    </div>
  );
}
