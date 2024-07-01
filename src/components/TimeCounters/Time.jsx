import TimeDigit from './TimeDigit.jsx';

export default function Time({time}) {
  if (time !== null) {
    const timeStr = time.toString();
    const wholeSecs = timeStr.substring(0, timeStr.length - 3) || '0';
    const fractionalSecs = timeStr.substring(timeStr.length - 3, timeStr.length - 2) || '0';

    const wholeDigits = [...wholeSecs].map((digit, i) => {
      return <TimeDigit digit={digit} key={i} />;
    });

    const fractionalDigits = <TimeDigit digit={fractionalSecs} />;

    return (
      <div className="time">
        {wholeDigits}
        <span className="time-dot">.</span>
        {fractionalDigits}
        {' s'}
      </div>
    )
  }

  return (
    <div className="time">
      –
    </div>
  )
}
