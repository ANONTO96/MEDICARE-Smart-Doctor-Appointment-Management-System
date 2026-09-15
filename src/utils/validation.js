export const isValidPhone = (phone) => {
  const cleanedPhone = phone.replace(/\s+/g, "");

  return /^01[3-9]\d{8}$/.test(cleanedPhone);
};

export const isValidEmail = (email) => {
  if (!email) return true;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isPastDate = (date) => {
  if (!date) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(`${date}T00:00:00`);

  return selectedDate < today;
};