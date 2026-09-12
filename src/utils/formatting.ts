export function formatDurationMs(ms?: number): string {
  if (!ms || isNaN(ms)) return '--:--';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function formatDurationSec(sec?: number): string {
  if (!sec || isNaN(sec)) return '--:--';
  return formatDurationMs(sec * 1000);
}
