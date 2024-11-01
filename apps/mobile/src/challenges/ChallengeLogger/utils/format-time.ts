import type { Timestamp } from "../hooks";

/**
 * Formats a timestamp into a string in the format "MM:SS.MS"
 * @param time - The timestamp to format
 * @returns The formatted string
 */
export const formatTime = (time: Timestamp) => {
  const minutes = String(time.minutes).padStart(2, "0");
  const seconds = String(time.seconds).padStart(2, "0");
  const milliseconds = String(time.milliseconds).padStart(2, "0");

  return `${minutes}:${seconds}.${milliseconds}`;
};
