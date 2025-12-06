export function timeAgo(postDateString: string): string {
  const postDate = new Date(postDateString); // Convert input date string to Date object
  const currentDate = new Date(); // Get the current date and time

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = currentDate.getTime() - postDate.getTime();

  // Define time constants in milliseconds
  const oneMinute = 60 * 1000; // 60 seconds
  const oneHour = 60 * oneMinute; // 60 minutes
  const oneDay = 24 * oneHour; // 24 hours
  const oneMonth = 30 * oneDay; // Approximate 30 days
  const oneYear = 12 * oneMonth; // 12 months

  // Calculate the time difference and return appropriate string
  if (differenceInMilliseconds < oneMinute) {
    return "just now";
  } else if (differenceInMilliseconds < oneHour) {
    const minutes = Math.floor(differenceInMilliseconds / oneMinute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (differenceInMilliseconds < oneDay) {
    const hours = Math.floor(differenceInMilliseconds / oneHour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (differenceInMilliseconds < oneMonth) {
    const days = Math.floor(differenceInMilliseconds / oneDay);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (differenceInMilliseconds < oneYear) {
    const months = Math.floor(differenceInMilliseconds / oneMonth);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(differenceInMilliseconds / oneYear);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}
