import Time from './Time.jsx';

export default function TimeDisplay({time, text}) {
  return (
    <div className="time-container">
      <div className="time-text">{text}</div>
      <Time time={time} />
    </div>
  )
}
