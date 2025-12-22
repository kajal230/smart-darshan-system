export default function CrowdBadge({ level }) {
  const colors = {
    LOW: 'green',
    MEDIUM: 'orange',
    HIGH: 'red'
  };

  return (
    <span
      style={{
        color: 'white',
        background: colors[level],
        padding: '4px 8px',
        borderRadius: '5px'
      }}
    >
      {level}
    </span>
  );
}
