export const converTime = (param: number) => {
  const epochTimestamp = param * 1000; // Convert seconds to milliseconds
  const date = new Date(epochTimestamp);
  const fixedTime = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
    .replace(":00", "");
  return fixedTime;
};
