import { test, expect, renderTest } from "march/testing"
import { DateRangePickerLab } from "./DateRangePickerLab.tsx"

// DateRangePickerLab'in testleri: kaydedince Testler sekmesinde çalışır
const radio = (root: Element, text: string) => [...root.querySelectorAll("[role=radio]")].find((b) => b.textContent?.trim() === text)

test("kendi hazır aralığım seçilince değer o aralık olur; custom={false} Özel'i kaldırır", async () => {
  const s = renderTest(() => <DateRangePickerLab />)
  const a = s.container.querySelector(".lab-a")!
  expect(a.querySelector("#lab-own")).not.toBe(null)
  expect(radio(a, "Bu hafta")?.getAttribute("aria-checked")).toBe("true")
  expect(radio(a, "Özel")).toBe(undefined)
  await s.click(radio(a, "Hafta sonu")!)
  expect(s.text()).toContain("A: 2026-11-21 → 2026-11-22")
  expect(radio(a, "Hafta sonu")?.getAttribute("aria-checked")).toBe("true")
  s.dispose()
})

test("hiçbir hazıra uymayan aralık Özel'de açılır: → işareti, bitiş yazılır, max dışı geçersiz", async () => {
  const s = renderTest(() => <DateRangePickerLab />)
  const b = s.container.querySelector(".lab-b")!
  expect(radio(b, "Özel")?.getAttribute("aria-checked")).toBe("true")
  expect(b.querySelector(".m-daterange-sep")?.textContent).toBe("→")
  const to = b.querySelector('[aria-label="Bitiş"]') as HTMLInputElement
  expect(to.getAttribute("placeholder")).toBe("gg.aa.yyyy")
  await s.type(to, "2026-03-20")
  expect(s.text()).toContain("B: 2026-03-02 → 2026-03-20")
  await s.type(to, "2027-01-05")
  expect(to.getAttribute("aria-invalid")).toBe("true")
  expect(s.text()).toContain("B: 2026-03-02 → 2026-03-20")
  s.dispose()
})

test("presets={false}: yalnız iki tarih alanı; işaret ve takvim düğmesi yok, labelledby grupta", async () => {
  const s = renderTest(() => <DateRangePickerLab />)
  const c = s.container.querySelector(".lab-c")!
  expect(c.getAttribute("role")).toBe("group")
  expect(c.getAttribute("aria-labelledby")).toBe("lab-c-title")
  expect(c.querySelector("[role=radiogroup]")).toBe(null)
  expect(c.querySelector(".m-daterange-sep")).toBe(null)
  expect(c.querySelector(".m-date-btn")).toBe(null)
  const from = c.querySelectorAll("input.m-date-input")[0] as HTMLInputElement
  await s.type(from, "2026-11-25")
  expect(s.text()).toContain("C: 2026-11-25 → 2026-11-30")
  s.dispose()
})

test("disabled her şeyi kapatır, readonly hazır aralıkları kilitler", () => {
  const s = renderTest(() => <DateRangePickerLab />)
  const off = s.container.querySelector(".lab-disabled")!
  expect([...off.querySelectorAll("button")].every((x) => x.disabled)).toBe(true)
  expect((off.querySelector('[aria-label="Kapalı bitiş"]') as HTMLInputElement).disabled).toBe(true)
  const ro = s.container.querySelector(".lab-readonly")!
  expect([...ro.querySelectorAll("[role=radio]")].every((x) => (x as HTMLButtonElement).disabled)).toBe(true)
  expect(radio(ro, "Bu hafta")?.getAttribute("aria-checked")).toBe("true")
  s.dispose()
})
