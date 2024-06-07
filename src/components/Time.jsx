import React from "react";
import TimeDigit from "./TimeDigit";

export default function Time({time, text}) {
  const timeStr = time.toString();
  const wholeSecs = timeStr.substring(0, timeStr.length - 1) || '0';
  const fractionalSecs = timeStr.substring(timeStr.length - 1);

  const secDigits = [...wholeSecs].map((digit, i) => {
    return <TimeDigit digit={digit} key={i} />;
  });

  const fractionalDigits = [...fractionalSecs].map((digit, i) => {
    return <TimeDigit digit={digit} key={i} />;
  });

  return (
    <div className="time-container">
      <div className="time-text">{text}</div>
      <div className="time-counter">
        {secDigits}<span className="time-dot">.</span>{fractionalDigits} s
      </div>
    </div>
  );
}
