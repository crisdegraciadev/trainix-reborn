export function convertToUTC(date: Date) {
  console.log({ date });
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset);
}
