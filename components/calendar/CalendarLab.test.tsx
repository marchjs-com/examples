// Tests for CalendarLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CalendarLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements, s.text() is all visible text, and s.click(selector or text)
//   clicks like a user and waits until the view has updated (so those tests are async and await it). Every day cell
//   carries data-date="YYYY-MM-DD", which makes a day easy to find.
// - The tests check what a user or a screen reader can observe (aria-selected, aria-disabled, the month title, visible
//   text) rather than internal state. Part classes (.m-cal-title, .m-cal-range, .m-cal-prev) are in the Calendar docs.
// To adapt them: copy one test, change the date or the expected value.
import { test, expect, renderTest } from "march/testing"
import { CalendarLab } from "./CalendarLab.tsx"

// The first calendar starts with 14 March selected. Clicking another day selects it and runs onChange (counted) and
// onPick (which receives the ISO date); the selection moves.
test("bir güne basınca değer, onChange ve onPick değişir", async () => {
  const s = renderTest(() => <CalendarLab />)
  expect(s.get('.lab-cal [data-date="2026-03-14"]')?.getAttribute("aria-selected")).toBe("true")
  await s.click('.lab-cal [data-date="2026-03-18"]')
  expect(s.text().includes("Seçilen: 2026-03-18")).toBe(true)
  expect(s.text().includes("Değişiklik: 1 · onPick: 2026-03-18")).toBe(true)
  expect(s.get('.lab-cal [data-date="2026-03-18"]')?.getAttribute("aria-selected")).toBe("true")
})

// Days outside min / max and the day matched by isDisabled are aria-disabled, and clicking one changes nothing: the
// value stays and the callbacks do not run.
test("min / max dışı ve isDisabled günü seçilemez", async () => {
  const s = renderTest(() => <CalendarLab />)
  expect(s.get('.lab-cal [data-date="2026-03-03"]')?.getAttribute("aria-disabled")).toBe("true")
  expect(s.get('.lab-cal [data-date="2026-03-27"]')?.getAttribute("aria-disabled")).toBe("true")
  await s.click('.lab-cal [data-date="2026-03-20"]')
  expect(s.text().includes("Seçilen: 2026-03-14")).toBe(true)
  expect(s.text().includes("Değişiklik: 0")).toBe(true)
})

// The second calendar shows April 2026 (`initial`) with 6-12 April highlighted by rangeFrom / rangeTo: the ends are
// selected, the days in between carry the range class. Its own previous / next marks are named by `labels`, and the
// next button moves to May. The title is in English because that calendar uses locale="en-US".
test("aralık vurgulanır; kendi ay işaretiyle sonraki aya geçilir", async () => {
  const s = renderTest(() => <CalendarLab />)
  expect(s.get('.lab-range [data-date="2026-04-06"]')?.getAttribute("aria-selected")).toBe("true")
  expect(s.get('.lab-range [data-date="2026-04-09"]')?.classList.contains("m-cal-range")).toBe(true)
  expect(s.get(".lab-range .m-cal-title")?.textContent).toBe("April 2026")
  await s.click("Sonraki (aralık)")
  expect(s.get(".lab-range .m-cal-title")?.textContent).toBe("May 2026")
})

// The third calendar turns parts off: no weekday header row, no month buttons, and renderDay draws its own content in
// a day cell (a day divisible by four gets a bullet).
test("weekdays={false}, nav={false} ve renderDay", () => {
  const s = renderTest(() => <CalendarLab />)
  expect(s.all(".lab-busy [role=columnheader]").length).toBe(0)
  expect(s.get(".lab-busy .m-cal-prev")).toBe(null)
  expect(s.get('.lab-busy [data-date="2026-05-08"]')?.textContent).toBe("8•")
  expect(s.get('.lab-busy [data-date="2026-05-09"]')?.textContent).toBe("9")
})
