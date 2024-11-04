export const dateTimeToData = (params: string) => {
  const date = new Date(params);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = days[date.getDay()];
  const year = date.getDate();
  const formattedDate = `${dayName} ${year}`;
  return formattedDate;
};
