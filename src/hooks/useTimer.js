import React from 'react';

export default function useTimer({isTimeStarted}) {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    if (!isTimeStarted) {
      return;
    }
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [isTimeStarted]);

  return {time, setTime};
}
