export const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};

export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

export const formatTime = (time) => {
  const [hours, minutes] = time.split(":").map(Number);

  const suffix = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12;

  return `${formattedHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

export const generateTimeSlots = (
  start,
  end,
  duration = 30
) => {
  const slots = [];

  let current = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  while (current + duration <= endMinutes) {
    const startTime = minutesToTime(current);
    const endTime = minutesToTime(current + duration);

    slots.push({
      startTime,
      endTime,
      label: formatTime(startTime),
    });

    current += duration;
  }

  return slots;
};