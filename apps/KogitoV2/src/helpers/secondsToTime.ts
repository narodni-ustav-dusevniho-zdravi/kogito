export const secondsToTime = (seconds: number): string => {
  seconds = seconds < 0 ? 0 : seconds;

  const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0'),
    m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');

  return h !== '00' ? `${h}:${m}:${s}` : `${m}:${s}`;
};
