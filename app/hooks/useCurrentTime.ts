import { useState, useEffect } from 'react';

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeTimer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      clearInterval(timeTimer);
    };
  }, []);

  return currentTime;
}
