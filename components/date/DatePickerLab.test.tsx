// Tests for DatePickerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <DatePickerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) / s.text() read the visible text; s.click(target) and
//   s.type(target, text) act like a user (a target is a visible text, a label or an element) and wait for the view to
//   update, so tests that interact are async.
// - s.wait(fn) waits until fn() is truthy (here: until the calendar popover has drawn its days).
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { DatePickerLab } from "./DatePickerLab.tsx"

// The field is typed in the order of its `locale`: day.month.year for tr-TR, month/day/year for en-US. Either way the
// value is stored as an ISO date, and onChange runs (the Lab counts the changes).
test("dilin sırasıyla yazılan tarih ISO değer olur", async () => {
  const s = renderTest(() => <DatePickerLab />)
  await s.type("Teslim tarihi", "18.03.2026")
  expect(s.text().includes("Değer: 2026-03-18")).toBe(true)
  expect(s.text().includes("Değişiklik: 1")).toBe(true)
  await s.type("ABD tarihi", "4/7/2026")
  expect(s.text().includes("Ay/gün/yıl: 2026-04-07")).toBe(true)
})

// An impossible date (31 February) or one outside min / max marks the field aria-invalid instead of changing the value,
// so the old value stays.
test("olmayan ya da sınır dışı tarih geçersiz sayılır, değer değişmez", async () => {
  const s = renderTest(() => <DatePickerLab />)
  const field = await s.type("Teslim tarihi", "31.02.2026")
  expect(field.getAttribute("aria-invalid")).toBe("true")
  await s.type("Teslim tarihi", "01.01.2027")
  expect(field.getAttribute("aria-invalid")).toBe("true")
  expect(s.text().includes("Değer: 2026-03-14")).toBe(true)
})

// The calendar button opens the popover (aria-expanded true). Days the `calendar.isDisabled` rule blocks (Sundays here)
// are aria-disabled. Picking a day sets the value and closes the popover again.
test("takvim düğmesi takvimi açar, gün seçilince değer değişir ve takvim kapanır", async () => {
  const s = renderTest(() => <DatePickerLab />)
  const open = await s.click("Takvimi aç")
  expect(open.getAttribute("aria-expanded")).toBe("true")
  await s.wait(() => s.get('[data-date="2026-03-20"]'))
  expect(s.get('[data-date="2026-03-22"]')?.getAttribute("aria-disabled")).toBe("true")
  await s.click('[data-date="2026-03-20"]')
  expect(s.text().includes("Değer: 2026-03-20")).toBe(true)
  expect(open.getAttribute("aria-expanded")).toBe("false")
})

// Plain attributes reach the real input: name, required, placeholder; icon={false} leaves no calendar button;
// describedby and invalid become aria-describedby / aria-invalid; readonly and disabled are applied, and a disabled
// picker also disables its calendar button.
test("öznitelikler, icon={false}, salt okunur ve devre dışı", () => {
  const s = renderTest(() => <DatePickerLab />)
  const due = s.get(".lab-date input") as HTMLInputElement
  expect(due.name).toBe("due")
  expect(due.required).toBe(true)
  expect(due.placeholder).toBe("GG.AA.YYYY")
  expect(s.get(".lab-noicon .m-date-btn")).toBe(null)
  const plain = s.get("#lab-plain")
  expect(plain?.getAttribute("aria-describedby")).toBe("lab-hint")
  expect(plain?.getAttribute("aria-invalid")).toBe("true")
  expect((s.find("Salt okunur tarih") as HTMLInputElement).readOnly).toBe(true)
  expect((s.find("Kapalı tarih") as HTMLInputElement).disabled).toBe(true)
  expect((s.get(".lab-disabled .m-date-btn") as HTMLButtonElement | null)?.disabled).toBe(true)
})
