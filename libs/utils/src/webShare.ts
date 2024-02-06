export function isWebShareAvailable(): boolean {
  return (
    typeof navigator !== "undefined" &&
    navigator.canShare &&
    navigator.canShare()
  );
}
