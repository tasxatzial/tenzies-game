export default function TimeDisplay({time, label}) {
  let timeElements = null;
  if (time !== null) {
    const timeStr = time.toString();
    const wholeSecs = timeStr.substring(0, timeStr.length - 3) || '0';
    const fractionalSecs = timeStr.substring(timeStr.length - 3, timeStr.length - 2) || '0';

    timeElements = [...wholeSecs, '.', ...fractionalSecs].map((c, i) => {
      if (c === '.') {
        return <span key={i} className="time-dot">.</span>
      }
      return <span key={i} className="time-digit">{c}</span>
    });
  }

  return (
    <div className="time-container">
      <div className="time-label">{label}</div>
      <div className="time">
        {timeElements || '–'}
        {timeElements ? ' s' : ''}
      </div>
    </div>
  )
}
