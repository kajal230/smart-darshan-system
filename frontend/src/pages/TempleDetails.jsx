// import { useParams, Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { fetchTempleDetails, fetchCrowdStatus, fetchSlots } from '../services/api';
// import { fetchPredictedCrowd, fetchPeakHour } from '../services/api';
// import CrowdBadge from '../components/CrowdBadge';

// const [predictedCrowd, setPredictedCrowd] = useState(null);
// const [peakHour, setPeakHour] = useState(null);

// useEffect(() => {
//   fetchPredictedCrowd(id, slot.slot_time)
//     .then(res => setPredictedCrowd(res.data.predictedCrowd));

//   fetchPeakHour(id)
//     .then(res => setPeakHour(res.data.peakHour));
// }, []);


// export default function TempleDetails() {
//   const { id } = useParams();

//   const [temple, setTemple] = useState(null);
//   const [crowd, setCrowd] = useState(null);
//   const [slots, setSlots] = useState([]);

//   useEffect(() => {
//     fetchTempleDetails(id).then(res => setTemple(res.data));
//     fetchCrowdStatus(id).then(res => setCrowd(res.data));
//     fetchSlots(id).then(res => setSlots(res.data));
//   }, [id]);

//   if (!temple) return <p>Loading...</p>;

//   return (
//     <div className="page">
//       <h2>
//         {temple.name}
//         {crowd && <CrowdBadge level={crowd.crowd_level} />}
//       </h2>

//       <p>{temple.location}</p>

//       <h3>Available Slots</h3>
//       {slots.map(slot => (
//         <div key={slot.id} className="card">
//           <p>{slot.slot_date} – {slot.slot_time}</p>
//           <p>Seats left: {slot.capacity - slot.booked_count}</p>

//           <Link to={`/booking/${slot.id}`}>Book</Link>
//           <p>
//   🔮 Predicted Crowd: {predictedCrowd && <CrowdBadge level={predictedCrowd} />}
// </p>

// {peakHour && (
//   <p>📈 Peak Hour: {peakHour.slot_time}</p>
// )}

//         </div>
//       ))}
//     </div>
//   );
// }
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  fetchTempleDetails,
  fetchCrowdStatus,
  fetchSlots,
  fetchPredictedCrowd,
  fetchPeakHour
} from '../services/api';
import CrowdBadge from '../components/CrowdBadge';

export default function TempleDetails() {
  const { id } = useParams();

  const [temple, setTemple] = useState(null);
  const [crowd, setCrowd] = useState(null);
  const [slots, setSlots] = useState([]);
  const [predictedCrowd, setPredictedCrowd] = useState(null);
  const [peakHour, setPeakHour] = useState(null);

  useEffect(() => {
    fetchTempleDetails(id).then(res => setTemple(res.data));
    fetchCrowdStatus(id).then(res => setCrowd(res.data));
    fetchSlots(id).then(res => setSlots(res.data));

    fetchPeakHour(id).then(res => setPeakHour(res.data));
  }, [id]);

  if (!temple) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>
        {temple.name}
        {crowd && <CrowdBadge level={crowd.crowd_level} />}
      </h2>

      <p>{temple.location}</p>

      <h3>Available Slots</h3>

      {slots.map(slot => (
        <div key={slot.id} className="card">
          <p>{slot.slot_date} – {slot.slot_time}</p>
          <p>Seats left: {slot.capacity}</p>

          <Link to={`/booking/${slot.id}`}>Book</Link>

          {predictedCrowd && (
            <p>🔮 Predicted Crowd: <CrowdBadge level={predictedCrowd} /></p>
          )}

          {peakHour && (
            <p>📈 Peak Hour: {peakHour.slot_time}</p>
          )}
        </div>
      ))}
    </div>
  );
}
