// Tests for DateTimeInputLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <DateTimeInputLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) / s.text() read the visible text; s.click(target) and
//   s.type(target, text) act like a user (a target is a visible text, a label or an element) and wait for the view to
//   update, so tests that interact are async.
// - s.container is the root element of this render; s.flush() lets pending timers run; s.dispose() removes the render.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { DateTimeInputLab } from "./DateTimeInputLab.tsx"

// The value is stored in UTC (an ISO timestamp) but the fields edit it in the viewer's local time, so the expected
// values are computed with the same time zone as the test run instead of being hard-coded.
const FLIGHT = new Date("2026-03-14T09:30:00.000Z")
const local = (y: number, m: number, d: number, h: number, min: number) => new Date(y, m - 1, d, h, min).toISOString()

// Typing in the time field changes only the time: the stored UTC value moves to the new local time on the same day.
test("saat alanına yazınca UTC değer aynı günün yeni saatine geçer", async () => {
  const s = renderTest(() => <DateTimeInputLab />)
  const time = s.container.querySelector('[aria-label="Uçuş saati"]') as HTMLInputElement
  expect(time.value).toBe(`${String(FLIGHT.getHours()).padStart(2, "0")}:${String(FLIGHT.getMinutes()).padStart(2, "0")}`)
  await s.type(time, "10:45")
  expect(s.text()).toContain(`Uçuş (UTC): ${local(FLIGHT.getFullYear(), FLIGHT.getMonth() + 1, FLIGHT.getDate(), 10, 45)}`)
  s.dispose()
})

// Typing a date keeps the time of day. A date after `max` marks the field aria-invalid and leaves the value alone
// (the field does not accept it). onBlur is called when focus leaves; the Lab counts it and shows the count.
test("tarih yazılınca saat korunur; min / max dışı tarih geçersiz sayılır; onBlur sayar", async () => {
  const s = renderTest(() => <DateTimeInputLab />)
  const date = s.container.querySelector(".lab-flight input.m-date-input") as HTMLInputElement
  expect(date.getAttribute("placeholder")).toBe("gg.aa.yyyy")
  await s.type(date, "2026-03-20")
  expect(s.text()).toContain(`Uçuş (UTC): ${local(2026, 3, 20, FLIGHT.getHours(), FLIGHT.getMinutes())}`)
  await s.type(date, "2027-04-05")
  expect(date.getAttribute("aria-invalid")).toBe("true")
  expect(s.text()).toContain(`Uçuş (UTC): ${local(2026, 3, 20, FLIGHT.getHours(), FLIGHT.getMinutes())}`)
  date.dispatchEvent(new FocusEvent("blur"))
  await s.flush()
  expect(s.text()).toContain("odaktan çıkış: 1")
  s.dispose()
})

// An empty value shows "—". When only a day is typed, the time comes from `defaultTime` (09:00); picker={{ icon: false }}
// removes the calendar button and picker.placeholder is the empty text of the date field.
test("boş alana yalnız gün yazılınca defaultTime (09:00) kullanılır; ikon yok", async () => {
  const s = renderTest(() => <DateTimeInputLab />)
  expect(s.text()).toContain("Görüşme (UTC): —")
  const day = s.container.querySelector("#lab-call") as HTMLInputElement
  expect(day.getAttribute("placeholder")).toBe("Görüşme günü")
  expect(day.closest(".m-datetime")?.querySelector(".m-date-btn")).toBe(null)
  await s.type(day, "2026-04-05")
  expect(s.text()).toContain(`Görüşme (UTC): ${local(2026, 4, 5, 9, 0)}`)
  expect((s.container.querySelector('[aria-label="Görüşme saati"]') as HTMLInputElement).value).toBe("09:00")
  s.dispose()
})

// The Clear button sets the value to null, which empties both fields; disabled and readonly are passed to the time field too.
test("Temizle değeri boşaltır; devre dışı ve yalnız okunur alanlar", async () => {
  const s = renderTest(() => <DateTimeInputLab />)
  const clear = [...s.container.querySelectorAll("button")].find((b) => b.textContent?.includes("Temizle"))!
  await s.click(clear)
  expect(s.text()).toContain("Uçuş (UTC): —")
  expect((s.container.querySelector('[aria-label="Uçuş saati"]') as HTMLInputElement).value).toBe("")
  expect((s.container.querySelector('[aria-label="Kapalı saat"]') as HTMLInputElement).disabled).toBe(true)
  expect((s.container.querySelector('[aria-label="Kilitli saat"]') as HTMLInputElement).readOnly).toBe(true)
  s.dispose()
})
