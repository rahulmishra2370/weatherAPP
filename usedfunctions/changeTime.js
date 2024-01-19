export function convertTimestampToDateTime(timestamp) {
  // Create a new Date object with the specific timestamp (in seconds)
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  // Extract individual components of the time
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time as a string
  const formattedTime = `${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;

  return formattedTime;
}
