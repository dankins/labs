export function isWebShareAvailable(): boolean {
  return (
    typeof navigator !== "undefined" && typeof navigator.share === "function"
  );
}
