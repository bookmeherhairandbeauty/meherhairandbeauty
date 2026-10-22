import { services } from "../data/services.js";
export function localDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type).value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}
export function validateBooking(data, now = new Date()) {
  const errors = {};
  if (!data.name?.trim()) errors.name = "Please enter your full name.";
  if (
    !/^[+\d\s().-]+$/.test(data.phone || "") ||
    (data.phone || "").replace(/\D/g, "").length < 7 ||
    (data.phone || "").replace(/\D/g, "").length > 15
  )
    errors.phone = "Please enter a valid mobile number (7–15 digits).";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address or leave it blank.";
  if (!data.category) errors.category = "Please choose a service category.";
  if (
    !services.some(
      (s) => s.id === data.service && s.categoryId === data.category,
    )
  )
    errors.service = "Please choose a service in this category.";
  const date = new Date(`${data.date}T12:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(data.date || "") ||
    Number.isNaN(date.valueOf()) ||
    localDate(date) !== data.date ||
    data.date < localDate(now)
  )
    errors.date = "Please choose today or a future date.";
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time || ""))
    errors.time = "Please enter your preferred time.";
  else if (
    !errors.date &&
    `${data.date}T${data.time}` <=
      `${localDate(now)}T${new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now)}`
  )
    errors.time = "Please choose a future time.";
  return errors;
}
