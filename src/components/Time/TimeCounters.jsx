import React from 'react';
import useTimer from '../../hooks/useTimer.js';
import TimeDisplay from './TimeDisplay.jsx';

export default function TimeCounters({isTimeStarted, isWon, isCountdownStarted}) {
  const [bestTime, setBestTime] = React.useState(() => {
    return JSON.parse(localStorage.getItem('tenzies-best-time-count'));
  });

  const {time, setTime} = useTimer({isTimeStarted});

  React.useEffect(() => {
    if (isCountdownStarted) {
      setTime(0);
    }
  }, [isCountdownStarted]);

  React.useEffect(() => {
    if (!isTimeStarted && !isWon) {
      return;
    }
    if (isWon && (time < bestTime || !bestTime)) {
      setBestTime(time);
      localStorage.setItem('tenzies-best-time-count', time);
    }
  }, [time, bestTime, isWon, isTimeStarted]);

  return (
    <div className="times-container">
      <TimeDisplay label="Time" time={time * 100}/>
      <TimeDisplay label="Best" time={bestTime ? 100 * bestTime : null}/>
    </div>
  )
}
