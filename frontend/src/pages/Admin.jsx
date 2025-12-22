import { useEffect, useState } from 'react';
import { fetchAdminDashboard } from '../services/api';
import CrowdBadge from '../components/CrowdBadge';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAdminDashboard()
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📊 Admin Dashboard</h2>

      {/* TABLE */}
      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>Temple</th>
            <th>Date</th>
            <th>Time</th>
            <th>Remaining</th>
            <th>Total</th>
            <th>Crowd</th>
          </tr>
        </thead>
        <tbody>
          {data.map(slot => (
            <tr key={slot.id}>
              <td>{slot.temple_name}</td>
              <td>{slot.slot_date}</td>
              <td>{slot.slot_time}</td>
              <td>{slot.capacity}</td>
              <td>{slot.initial_capacity}</td>
              <td>
                <CrowdBadge level={slot.crowd_level} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* CHART */}
      <h3 style={{ marginTop: '40px' }}>Remaining Capacity per Slot</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="slot_time" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="capacity" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
