// Universal timestamping.
// Proven to be quite useful

export interface ITimestamp {
  minutes: number;
  seconds: number;
  milliseconds: number;
  toInt(): number;
}

export class Timestamp implements ITimestamp {
  constructor(
    public minutes: number,
    public seconds: number,
    public milliseconds: number
  ) {}

  /**
   * Convert time stamp mm:ss:ms to total milliseconds as intervals are stored
   * in the database as flat integers
   * @returns integer
   */
  toInt(): number {
    return this.minutes * 60000 + this.seconds * 1000 + this.milliseconds;
  }

  toString(millisecondsFlag = true): string {
    const minutes = String(this.minutes).padStart(2, "0");
    const seconds = String(this.seconds).padStart(2, "0");
    const milliseconds = String(this.milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}${millisecondsFlag ? "." + milliseconds : ""}`;
  }
}

export const intToTimestamp = (time: number): Timestamp => {
  const minutes = Math.floor((time / 60000) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time % 1000) / 10);

  return new Timestamp(minutes, seconds, milliseconds);
};
