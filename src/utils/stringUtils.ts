export function capitalize(str: string = 'No string provided'): string {
  let newStr = str[0].toUpperCase() + str.substring(1, str.length);
  return newStr;
}

export function formatTime(time: string) {
  const [hour, minute] = time.split(':');
  const ampm = Number(hour) >= 12 ? 'PM' : 'AM';
  const formattedHour = Number(hour) % 12 || 12;
  return `${formattedHour}:${minute} ${ampm}`;
}
