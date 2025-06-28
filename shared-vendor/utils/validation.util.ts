const REQUIRED_RULE_MESSAGE = "این فیلد الزامی است";
const INVALID_NATIONAL_CODE_MESSAGE = "کد ملی معتر نمی باشد";
const INVALID_MOBILE_NUMBER_MESSAGE = "شماره موبایل معتبر نمی باشد";

export const validateRequired = (value: unknown) => {
  if (value) return;

  return REQUIRED_RULE_MESSAGE;
};

export const validateMobileNumber = (value: string) => {
  if (!value || value.match(/^(09)[0-9]{9}$|^(۰۹)[۰۱۲۳۴۵۶۷۸۹]{9}$|^(٠٩)[٩٨٧٦٥٤٣٢١٠]{9}$/)) return true;

  return INVALID_MOBILE_NUMBER_MESSAGE;
};

export const validateNationalCode = (value: string) => {
  if (!/^\d{10}$/.test(value)) return INVALID_NATIONAL_CODE_MESSAGE;

  const check = +value[9];
  const sum =
    value
      .split("")
      .slice(0, 9)
      .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;

  const isValid = sum < 2 ? check === sum : check + sum === 11;

  if (isValid) return;

  return INVALID_NATIONAL_CODE_MESSAGE;
};

export const validateMinLength = (value: string, amount: number) => {
  const hasValidLength = value.length > amount - 1;

  if (!value || hasValidLength) return;

  return `این فیلد حداقل باید ${amount} کاراکتر داشته باشد`;
};
