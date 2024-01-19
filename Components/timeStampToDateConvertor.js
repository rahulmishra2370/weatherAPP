export function convertTimestampToDate(timestamp) {
  // Create a new Date object with the timestamp (in seconds)
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  // Extract individual components of the date
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" }).substring(0, 3); // Get full month name
  const year = date.getFullYear();

  // Format the date as a string
  const formattedDate = `${day} ${month} `;

  return formattedDate;
}
