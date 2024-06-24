import Time from './Time.jsx';

export default function TimeContainer({time, text}) {
  return (
    <div className="time-container">
      <div className="time-text">{text}</div>
      <Time time={time} />
    </div>
  )
}
