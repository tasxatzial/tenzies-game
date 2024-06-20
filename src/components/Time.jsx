import React from 'react';
import TimeDigit from './TimeDigit';

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
      <>
        {secDigits}
        <span className="time-dot">.</span>
        {fractionalDigit}
        {' s'}
      </>
    )
  }
  return (
    <>
      –
    </>
  )
}
