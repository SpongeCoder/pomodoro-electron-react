export function clockView(secTime: number): string {
  let minutes: number | string;
  let seconds: number | string;

  minutes = Math.floor(secTime / 60);
  seconds = secTime - (minutes * 60);

  if (minutes < 10) { minutes = `0${minutes}` }
  if (seconds < 10) { seconds = `0${seconds}` }
  return `${minutes}:${seconds}`;
}
