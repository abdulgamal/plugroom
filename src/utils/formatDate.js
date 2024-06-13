export function parseDateTime(dateString) {
  // Use Date.parse() to convert the string to milliseconds
  const milliseconds = Date.parse(dateString);

  // Check if parsing was successful (returns NaN on error)
  if (isNaN(milliseconds)) {
    return "Invalid date format";
  }

  // Create a Date object from the milliseconds
  const dateObject = new Date(milliseconds);

  // Get year, month (0-indexed), day, hours, minutes, and seconds
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  // Format the date and time
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Return the formatted date and time
  return `${formattedDate} ${formattedTime}`;
}

export function getHoursDifference(startTime, endTime) {
  // Use Date.parse() to convert strings to milliseconds
  const startTimeMs = Date.parse(startTime);
  const endTimeMs = Date.parse(endTime);

  // Check if parsing was successful (returns NaN on error)
  if (isNaN(startTimeMs) || isNaN(endTimeMs)) {
    return "Invalid date format";
  }

  // Calculate the difference in milliseconds
  const differenceMs = endTimeMs - startTimeMs;

  // Convert milliseconds to hours (divide by 1000 for seconds, 3600 for hours)
  const differenceHours = differenceMs / (1000 * 3600);

  // Round the difference (optional, adjust as needed)
  // const roundedHours = Math.round(differenceHours);

  return differenceHours;
}

export function hasPassed(dateString) {
  // Convert the date string to a Date object
  const targetDate = new Date(dateString);

  // Get the current date and time
  const currentDate = new Date();

  // Check if the target date and time has passed
  if (targetDate < currentDate) {
    return true; // Time has passed
  } else {
    return false; // Time has not passed
  }
}
