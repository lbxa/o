import { useCallback, useMemo, useState } from "react";

import { Timestamp } from "../utils";

export const useStopwatch = (): {
  time: Timestamp;
  start: () => void;
  stop: () => void;
  reset: () => void;
} => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const start = useCallback(() => {
    if (startTime === null) {
      const initialStartTime = Date.now() - elapsedTime;
      setStartTime(initialStartTime);
      const interval = setInterval(() => {
        setElapsedTime(Date.now() - initialStartTime);
      }, 10);
      setTimerInterval(interval);
    }
  }, [startTime, elapsedTime]);

  const stop = useCallback(() => {
    if (startTime !== null) {
      setElapsedTime(Date.now() - startTime);
      setStartTime(null);
      if (timerInterval !== null) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  }, [startTime, timerInterval]);

  const reset = useCallback(() => {
    stop();
    setElapsedTime(0);
  }, [stop]);

  const getTime = useCallback(() => {
    const minutes = Math.floor((elapsedTime / 60000) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    return new Timestamp(minutes, seconds, milliseconds);
  }, [elapsedTime]);

  const time = useMemo(() => getTime(), [getTime]);

  return {
    time,
    start,
    stop,
    reset,
  };
};
