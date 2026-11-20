import { test, expect, renderTest } from "march/testing"
import { CalendarLab } from "./CalendarLab.tsx"

// CalendarLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bir güne basınca değer, onChange ve onPick değişir", async () => {
  const s = renderTest(() => <CalendarLab />)
  expect(s.get('.lab-cal [data-date="2026-03-14"]')?.getAttribute("aria-selected")).toBe("true")
  await s.click('.lab-cal [data-date="2026-03-18"]')
  expect(s.text().includes("Seçilen: 2026-03-18")).toBe(true)
  expect(s.text().includes("Değişiklik: 1 · onPick: 2026-03-18")).toBe(true)
  expect(s.get('.lab-cal [data-date="2026-03-18"]')?.getAttribute("aria-selected")).toBe("true")
})

test("min / max dışı ve isDisabled günü seçilemez", async () => {
  const s = renderTest(() => <CalendarLab />)
  expect(s.get('.lab-cal [data-date="2026-03-03"]')?.getAttribute("aria-disabled")).toBe("true")
  expect(s.get('.lab-cal [data-date="2026-03-27"]')?.getAttribute("aria-disabled")).toBe("true")
  await s.click('.lab-cal [data-date="2026-03-20"]')
  expect(s.text().includes("Seçilen: 2026-03-14")).toBe(true)
  expect(s.text().includes("Değişiklik: 0")).toBe(true)
})

test("aralık vurgulanır; kendi ay işaretiyle sonraki aya geçilir", async () => {
  const s = renderTest(() => <CalendarLab />)
  expect(s.get('.lab-range [data-date="2026-04-06"]')?.getAttribute("aria-selected")).toBe("true")
  expect(s.get('.lab-range [data-date="2026-04-09"]')?.classList.contains("m-cal-range")).toBe(true)
  expect(s.get(".lab-range .m-cal-title")?.textContent).toBe("April 2026")
  await s.click("Sonraki (aralık)")
  expect(s.get(".lab-range .m-cal-title")?.textContent).toBe("May 2026")
})

test("weekdays={false}, nav={false} ve renderDay", () => {
  const s = renderTest(() => <CalendarLab />)
  expect(s.all(".lab-busy [role=columnheader]").length).toBe(0)
  expect(s.get(".lab-busy .m-cal-prev")).toBe(null)
  expect(s.get('.lab-busy [data-date="2026-05-08"]')?.textContent).toBe("8•")
  expect(s.get('.lab-busy [data-date="2026-05-09"]')?.textContent).toBe("9")
})
