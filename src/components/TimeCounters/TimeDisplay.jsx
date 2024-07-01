import Time from './Time.jsx';

export default function TimeDisplay({time, label}) {
  return (
    <div className="time-container">
      <div className="time-label">{label}</div>
      <Time time={time}/>
    </div>
  )
}
