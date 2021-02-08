export function clockView(secTime: number): string {
  let minutes: number | string;
  let seconds: number | string;

  const hours = Math.floor(secTime / 3600);
  minutes = Math.floor((secTime - (hours * 3600)) / 60);
  seconds = secTime - (hours * 3600) - (minutes * 60);

  if (minutes < 10) { minutes = `0${minutes}` }
  if (seconds < 10) { seconds = `0${seconds}` }
  return `${minutes}:${seconds}`;
}
