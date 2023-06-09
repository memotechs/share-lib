export const generateKey = (length = 36) => {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = length; i > 0; i--) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

export const generateDigitCode = (length = 4): string => {
  const startAt = 1 + '0'.repeat(length - 1);
  const endAt = 9 + '0'.repeat(length - 1);
  const generateCode = `${Math.floor(
    Number(startAt) + Math.random() * Number(endAt),
  )}`;
  return generateCode;
};
