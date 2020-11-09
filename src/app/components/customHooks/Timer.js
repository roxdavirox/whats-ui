import { useState, useEffect } from 'react';

const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return {
    seconds,
    reset,
    startTimer,
    stopTimer,
  };
}

export default useTimer;
