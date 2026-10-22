import { test } from "node:test";
import assert from "node:assert/strict";
import { categories, services, formatPrice } from "../src/data/services.js";
import { validateBooking, localDate } from "../src/lib/booking.js";
const now = new Date("2026-10-09T09:30:00Z");
const valid = {
  name: "Asha & Jo",
  phone: "+44 7903 129511",
  email: "asha@example.com",
  category: "haircuts",
  service: "haircuts-1",
  date: "2026-10-10",
  time: "14:30",
  notes: "Cut & style\nThank you!",
};
test("complete request and optional fields pass", () => {
  assert.deepEqual(validateBooking(valid, now), {});
  assert.deepEqual(
    validateBooking({ ...valid, email: "", notes: "" }, now),
    {},
  );
});
test("empty required fields and malformed contact details fail", () => {
  const errors = validateBooking({}, now);
  for (const key of ["name", "phone", "category", "service", "date", "time"])
    assert.ok(errors[key]);
  assert.ok(
    validateBooking({ ...valid, email: "bad", phone: "abcdefg" }, now).email,
  );
  assert.ok(validateBooking({ ...valid, phone: "abcdefg" }, now).phone);
});
test("past, impossible dates and times fail; today future time passes", () => {
  for (const date of ["2026-10-08", "2026-02-30", "no-date"])
    assert.ok(validateBooking({ ...valid, date }, now).date);
  for (const time of ["25:00", "12:99", ""])
    assert.ok(validateBooking({ ...valid, time }, now).time);
  assert.ok(
    validateBooking({ ...valid, date: "2026-10-09", time: "09:00" }, now).time,
  );
  assert.deepEqual(
    validateBooking({ ...valid, date: "2026-10-09", time: "11:00" }, now),
    {},
  );
  assert.equal(localDate(now), "2026-10-09");
});
test("a service must belong to its selected category", () => {
  assert.ok(validateBooking({ ...valid, category: "waxing" }, now).service);
  assert.ok(validateBooking({ ...valid, service: "missing" }, now).service);
});
test("catalogue identifiers are unique and prices preserve starting prices", () => {
  assert.equal(new Set(services.map((s) => s.id)).size, services.length);
  assert.equal(categories.length, 9);
  assert.equal(services.length, 53);
  assert.equal(
    formatPrice(services.find((s) => s.name === "Hair Cut")),
    "From £15.00",
  );
  assert.equal(
    formatPrice(services.find((s) => s.name === "Full Arms")),
    "£15.00",
  );
  assert.ok(services.every((s) => Number.isFinite(s.price) && s.price >= 0));
});

test("date boundaries use London time, regardless of visitor timezone", () => {
  assert.equal(localDate(new Date("2026-07-09T23:30:00Z")), "2026-07-10");
  assert.equal(localDate(new Date("2026-12-09T23:30:00Z")), "2026-12-09");
});
