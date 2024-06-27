import TimeDigit from './TimeDigit.jsx';

export default function Time({ time }) {
  if (time !== null && time !== undefined) {
    const timeStr = time.toString();
    const wholeSecs = timeStr.substring(0, timeStr.length - 1) || '0';
    const fractionalSecs = timeStr.substring(timeStr.length - 1);

    const secDigits = [...wholeSecs].map((digit, i) => {
      return <TimeDigit digit={digit} key={i} />;
    });

    const fractionalDigit = <TimeDigit digit={fractionalSecs} />;

    return (
      <div className="time-counter">
        {secDigits}
        <span className="time-dot">.</span>
        {fractionalDigit}
        {' s'}
      </div>
    )
  }
  return (
    <div className="time-counter">
      –
    </div>
  )
}
