export const convertToPersianNumbers = (value) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return value.toString().replace(/\d/g, (digit) => persianDigits[digit]);
};
