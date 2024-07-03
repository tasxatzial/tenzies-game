import React from 'react';

export default function useCountdown({countdownDuration, onCountdownEnd}) {
  const [isCountdownStarted, setIsCountdownStarted] = React.useState(false);
  const [countdownTime, setCountdownTime] = React.useState(countdownDuration);

  React.useEffect(() => {
    if (!isCountdownStarted) {
      return;
    }
    const interval = setInterval(() => {
      setCountdownTime(t => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCountdownStarted]);

  React.useEffect(() => {
    if (!isCountdownStarted) {
      return;
    }
    if (countdownTime === 0) {
      setIsCountdownStarted(false);
      onCountdownEnd();
    }
  }, [countdownTime, isCountdownStarted, onCountdownEnd]);

  return {countdownTime, isCountdownStarted, setIsCountdownStarted, setCountdownTime};
}
