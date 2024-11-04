export function generateRandomNumber(max: number): number {
  if (max <= 0) {
    throw new Error("Length must be a positive integer");
  }
  return Math.floor(Math.random() * max);
}
